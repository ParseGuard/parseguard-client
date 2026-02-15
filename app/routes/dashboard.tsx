import type { Route } from "./+types/dashboard";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { dashboardApi } from "~/lib/api";
import type { DashboardStats, ActivityItem } from "~/types/api";

/**
 * Dashboard loader - Fetch data on server
 */
export async function loader({}: Route.LoaderArgs): Promise<{
  stats: DashboardStats;
  activity: ActivityItem[];
}> {
  const [stats, activity] = await Promise.all([
    dashboardApi.getStats(),
    dashboardApi.getActivity(10),
  ]);

  return { stats, activity };
}

/**
 * Dashboard page component
 */
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { stats, activity } = loaderData;
  const { t } = useTranslation();

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t("dashboard.title")}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t("dashboard.totalCompliance")}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stats.totalCompliance}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t("dashboard.totalDocuments")}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stats.totalDocuments}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t("dashboard.pending")}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-600 dark:text-yellow-400">
                  {stats.pendingItems}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t("dashboard.highRisk")}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">
                  {stats.highRiskItems}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            {t("dashboard.activity")}
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {activity.map((item: ActivityItem, idx: number) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {idx !== activity.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          <span className="text-white text-xs">{item.type[0]}</span>
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <time dateTime={item.timestamp}>
                            {new Date(item.timestamp).toLocaleString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
