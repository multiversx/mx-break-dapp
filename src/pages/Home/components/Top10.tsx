import { explorerAddress } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useGetTop10 } from 'hooks/useGetTop10';

export const Top10 = () => {
  const { top10, first3colors } = useGetTop10();

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
                <th scope="col" className="px-6 py-3 text-right">
                  Block #
                </th>
              </tr>
            </thead>
            <tbody>
              {top10.map((item, index) => (
                <tr key={index} className="border-b border-neutral-800">
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium whitespace-nowrap ${
                      index < 3 ? first3colors[index] : 'text-yellow-100'
                    }`}
                  >
                    {index + 1}
                  </th>
                  <td
                    className={`px-6 py-4 font-medium whitespace-nowrap ${
                      index < 3 ? first3colors[index] : 'text-yellow-100'
                    }`}
                  >
                    {item.maxTps}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium whitespace-nowrap ${
                      index < 3 ? first3colors[index] : 'text-yellow-100'
                    }`}
                  >
                    <div className="flex flex-nowrap flex-shrink-0 justify-end">
                      <a
                        href={`${explorerAddress}/blocks/${item.block}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs p-2 hover:underline"
                      >
                        <span className="mx-2 text-left">{item.block}</span>
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
