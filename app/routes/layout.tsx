import { redirect, Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "~/lib/axios";

/**
 * Layout loader - Check authentication
 */
export async function loader({ request }: Route.LoaderArgs) {
  if (!isAuthenticated()) {
    return redirect("/login");
  }
  return null;
}

/**
 * Protected layout component
 */
export default function Layout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("appName")}
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/dashboard"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {t("nav.dashboard")}
                </a>
                <a
                  href="/compliance"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {t("nav.compliance")}
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  // TODO: Implement logout
                }}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                {t("auth.logout")}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
