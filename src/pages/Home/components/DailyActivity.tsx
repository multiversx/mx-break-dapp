import { explorerAddress } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useGetDailyActivity } from 'hooks/useGetDailyActivity';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { getIsMobileDeviceScreen } from '../../../helpers/getIsMobileDevideScreen.ts';

export const DailyActivity = () => {
  const { dailyEntries } = useGetDailyActivity();

  const isMobileDevice = getIsMobileDeviceScreen();

  const navigateToBlock = (hash: string) => () => {
    window.open(`${explorerAddress}/blocks/${hash}`, '_blank');
  };

  if (!dailyEntries || dailyEntries.length === 0) return null;

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
                <th scope="col" className="px-4 md:px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  TXS / Day
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  MAX TPS
                </th>
                {!isMobileDevice && (
                  <th scope="col" className="px-4 md:px-6 py-3 text-right">
                    BLOCK #
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {dailyEntries.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-800 hover:underline cursor-pointer"
                  onClick={navigateToBlock(entry.maxTpsBlockHash)}
                >
                  <th
                    scope="row"
                    className={`px-4 md:px-6 py-4 font-medium whitespace-nowrap ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    {entry.date}
                  </th>
                  <td
                    className={`px-4 md:px-6 py-4 font-medium ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    {entry.transactions.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 md:px-6 py-4 font-medium ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    <span
                      className={`flex flex-row gap-3 items-center justify-center p-1 ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                    >
                      {`${entry.maxTps.toLocaleString()}`}
                    </span>
                  </td>
                  {!isMobileDevice && (
                    <td
                      className={`px-4 md:px-6 py-4 font-medium ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                    >
                      <div className="flex flex-row gap-3 items-center justify-end p-1">
                        <div className="flex items-center gap-1 text-white p-2">
                          <div className="ml-1 mt-1 w-full overflow-hidden max-w-40 mr-2">
                            <Trim
                              text={entry.maxTpsBlockHash}
                              className={`${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                            />
                          </div>
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="sm"
                            className={`${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                          />
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
