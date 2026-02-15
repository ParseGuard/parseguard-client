import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '~/lib/services/ApiService';
import type { DocumentAnalysis } from '~/types/api';

/**
 * Document Analysis Component
 * Allows users to paste text and get AI analysis
 */
export default function DocumentAnalyzer() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.analyzeDocument(text);
      setAnalysis(result);
    } catch (err) {
      setError(t('ai.analyzeError') || 'Failed to analyze document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('ai.documentAnalyzer') || 'AI Document Analyzer'}
      </h2>

      <div className="mb-4">
        <label htmlFor="document-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('ai.pasteText') || 'Paste Document Text'}
        </label>
        <textarea
          id="document-text"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder={t('ai.placeholder') || 'Enter text to analyze...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || !text.trim()}
        className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (t('ai.analyzing') || 'Analyzing...') : (t('ai.analyzeButton') || 'Analyze Document')}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-6 space-y-6">
          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-end border-b border-gray-200 dark:border-gray-700 pb-4">
            <button
              onClick={async () => {
                try {
                  await apiService.createDocumentFromText(
                    `AI Analysis - ${new Date().toLocaleString()}`,
                    `Original Text:\n${text}\n\nSummary:\n${analysis.summary}\n\nRisks:\n${analysis.risk_indicators.join('\n')}`
                  );
                  alert(t('ai.saveSuccess') || 'Saved successfully');
                } catch (e) {
                  alert(t('ai.saveError') || 'Failed to save');
                }
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              💾 {t('ai.saveAsDocument') || 'Save as Document'}
            </button>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('ai.summary') || 'Executive Summary'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{analysis.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compliance Topics */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('ai.topics') || 'Compliance Topics'}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {analysis.compliance_topics.map((topic, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-300">{topic}</li>
                ))}
              </ul>
            </div>

            {/* Risk Indicators */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('ai.risks') || 'Risk Indicators'}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {analysis.risk_indicators.map((risk, idx) => (
                  <li key={idx} className="text-red-600 dark:text-red-400">{risk}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggested Items */}
          {analysis.suggested_items.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('ai.suggestedItems') || 'Suggested Actions'}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {analysis.suggested_items.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                        item.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {t(`compliance.risks.${item.risk_level}`) || item.risk_level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.description}</p>
                    <button
                      onClick={async () => {
                        try {
                          await apiService.createComplianceItem({
                            title: item.title,
                            description: item.description,
                            risk_level: item.risk_level,
                            status: 'pending',
                            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                          });
                          alert(t('ai.saveSuccess') || 'Saved successfully');
                        } catch (e) {
                          alert(t('ai.saveError') || 'Failed to save');
                        }
                      }}
                      className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                    >
                      + {t('ai.saveComplianceItem') || 'Save Item'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Confidence Score */}
          <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
            <span>AI Confidence: {(analysis.confidence * 100).toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
