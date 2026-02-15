import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Translation resources
 */
const resources = {
  en: {
    common: {
      "appName": "ParseGuard",
      "welcome": "Welcome to ParseGuard",
      "loading": "Loading...",
      "error": "An error occurred",
      "success": "Success",
      "auth": {
        "login": "Login",
        "logout": "Logout",
        "register": "Register",
        "email": "Email",
        "password": "Password",
        "loginButton": "Sign In",
        "registerButton": "Sign Up",
        "noAccount": "Don't have an account?",
        "haveAccount": "Already have an account?"
      },
      "dashboard": {
        "title": "Dashboard",
        "stats": "Statistics",
        "activity": "Recent Activity",
        "totalCompliance": "Total Compliance",
        "totalDocuments": "Total Documents",
        "pending": "Pending",
        "highRisk": "High Risk"
      },
      "compliance": {
        "title": "Compliance",
        "list": "Compliance Items",
        "create": "Create Item",
        "edit": "Edit Item",
        "delete": "Delete",
        "status": "Status",
        "priority": "Priority",
        "dueDate": "Due Date"
      },
      "nav": {
        "home": "Home",
        "dashboard": "Dashboard",
        "compliance": "Compliance",
        "documents": "Documents"
      }
    }
  },
  ar: {
    common: {
      "appName": "ParseGuard",
      "welcome": "مرحبا بك في ParseGuard",
      "loading": "جاري التحميل...",
      "error": "حدث خطأ",
      "success": "نجح",
      "auth": {
        "login": "تسجيل الدخول",
        "logout": "تسجيل الخروج",
        "register": "التسجيل",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "loginButton": "دخول",
        "registerButton": "تسجيل",
        "noAccount": "ليس لديك حساب؟",
        "haveAccount": "لديك حساب بالفعل؟"
      },
      "dashboard": {
        "title": "لوحة التحكم",
        "stats": "الإحصائيات",
        "activity": "النشاط الأخير",
        "totalCompliance": "إجمالي الامتثال",
        "totalDocuments": "إجمالي المستندات",
        "pending": "قيد الانتظار",
        "highRisk": "مخاطر عالية"
      },
      "compliance": {
        "title": "الامتثال",
        "list": "عناصر الامتثال",
        "create": "إنشاء عنصر",
        "edit": "تعديل العنصر",
        "delete": "حذف",
        "status": "الحالة",
        "priority": "الأولوية",
        "dueDate": "تاريخ الاستحقاق"
      },
      "nav": {
        "home": "الرئيسية",
        "dashboard": "لوحة التحكم",
        "compliance": "الامتثال",
        "documents": "المستندات"
      }
    }
  }
};

/**
 * Initialize i18next for SSR
 */
export async function initI18n(lng = 'en') {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        lng,
        fallbackLng: 'en',
        resources,
        defaultNS: 'common',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });
  }
  return i18n;
}

export default i18n;
