'use client';

import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';

type Props = {
  lastUpdated: string;
  autoFetchEnabled: boolean;
  onToggleAutoFetch: () => void;
  onRefresh: () => void;
};

export default function SubHeader({
  lastUpdated,
  autoFetchEnabled,
  onToggleAutoFetch,
  onRefresh,
}: Props) {
  return (
    <div className="flex items-center justify-between px-3 py-3 bg-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Last updated {lastUpdated}</span>

        <button
          onClick={onToggleAutoFetch}
          className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        >
          {autoFetchEnabled ? (
            <>
              <FiPause className="w-4 h-4" />
              Pause auto-fetch
            </>
          ) : (
            <>
              <FiPlay className="w-4 h-4" />
              Resume auto-fetch
            </>
          )}
        </button>

        <button
          onClick={onRefresh}
          className="p-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          <FiRefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
