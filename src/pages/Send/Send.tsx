import { useGenerateWallet } from './hooks/useGenerateWallet.ts';
import { useAppProvider } from '../../AppContext.tsx';

export const Send = () => {
  const { address, balance } = useAppProvider();

  const generateWallet = useGenerateWallet();

  return (
    <div className="w-full">
      <div className="flex items-start sm:items-center h-full sm:bg-center">
        <div className="flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl">
          <div className="flex flex-col flex-1 rounded-xl bg-white p-6 justify-center">
            <h2 className="flex text-xl font-medium group">Generate keys</h2>
            <div className="text-gray-400 mb-6">
              <p>Address: {address}</p>
            </div>
            <button onClick={generateWallet} className="bg-blue-500 text-white p-2 rounded-md">
              Generate
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start sm:items-center h-full sm:bg-center">
        <div className="flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl">
          <div className="flex flex-col flex-1 rounded-xl bg-white p-6 justify-center">
            <h2 className="flex text-xl font-medium group">Claim funds (FAUCET)</h2>
            <div className="text-gray-400 mb-6">
              <p>Balance: {balance}</p>
            </div>
            <button onClick={generateWallet} className="bg-blue-500 text-white p-2 rounded-md">
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
