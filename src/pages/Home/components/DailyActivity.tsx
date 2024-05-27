import { explorerAddress } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useGetDailyActivity } from 'hooks/useGetDailyActivity';

export const DailyActivity = () => {
  const { dailyEntries } = useGetDailyActivity();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-white text-4xl font-medium">Daily Activity</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-neutral-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Transactions / Day
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  MAX TPS
                </th>
              </tr>
            </thead>
            <tbody>
              {dailyEntries.map((entry, index) => (
                <tr key={index} className="border-b border-neutral-800">
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium whitespace-nowrap ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    {new Date(entry.timestamp).toLocaleString()}
                  </th>
                  <td
                    className={`px-6 py-4 font-medium ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    {entry.tpsPerDay.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    <div className="flex flex-nowrap flex-shrink-0 justify-end">
                      <a
                        href={`${explorerAddress}/blocks/${entry.block}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 p-2 hover:underline"
                      >
                        <span className="mx-2 text-left">{`${entry.maxTps.toLocaleString()} (block ${entry.block})`}</span>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
