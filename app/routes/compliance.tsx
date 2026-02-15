import type { Route } from "./+types/compliance";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { complianceApi } from "~/lib/api";
import type { ComplianceItem } from "~/types/api";

/**
 * Compliance loader - Fetch all items
 */
export async function loader({}: Route.LoaderArgs): Promise<ComplianceItem[]> {
  return await complianceApi.list();
}

/**
 * Compliance list component
 */
export default function Compliance({ loaderData }: Route.ComponentProps) {
  const items = loaderData;
  const { t } = useTranslation();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("compliance.title")}
        </h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {t("compliance.create")}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item: ComplianceItem) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.priority === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : item.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {item.priority}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'pending'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        : item.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                {item.dueDate && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("compliance.dueDate")}: {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
