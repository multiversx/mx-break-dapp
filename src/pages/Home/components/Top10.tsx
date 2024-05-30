import { explorerAddress } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useGetTop10 } from 'hooks/useGetTop10';
import { Trim } from '@multiversx/sdk-dapp/UI';

export const Top10 = () => {
  const { top10 } = useGetTop10();

  const navigateToBlock = (hash: string) => () => {
    window.open(`${explorerAddress}/blocks/${hash}`, '_blank');
  };

  if (!top10 || top10.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-white text-4xl font-medium">Top 10</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-neutral-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  MAX TPS
                </th>
                <th scope="col" className="px-6 py-3 text-right mr-10">
                  Block #
                </th>
              </tr>
            </thead>
            <tbody>
              {top10?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-800 hover:underline cursor-pointer"
                  onClick={navigateToBlock(item.hash)}
                >
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium whitespace-nowrap ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    {index + 1}
                  </th>
                  <td
                    className={`px-6 py-4 font-medium whitespace-nowrap ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    {item.txCount.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium whitespace-nowrap ${index === 0 ? 'text-teal' : 'text-neutral-500'}`}
                  >
                    <div className="flex flex-row gap-3 items-center justify-end p-1">
                      <div className="flex items-center gap-1 text-white p-2">
                        <div className="ml-1 mt-1 w-full overflow-hidden max-w-14 md:max-w-40 mr-2">
                          <Trim
                            text={item.hash}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
