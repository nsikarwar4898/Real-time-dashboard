'use client';

import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import { content } from '@/lib/utils/content';

type Props = {
  lastUpdated: string;
  autoFetchEnabled: boolean;
  onToggleAutoFetch: () => void;
  onRefresh: () => void;
};

export default function TitleBar({
  lastUpdated,
  autoFetchEnabled,
  onToggleAutoFetch,
  onRefresh,
}: Props) {
  return (
    <div className="flex  flex-col md:flex-row items-center justify-between px-3 py-3 bg-background">
      <h1 className="text-2xl text-title flex justify-start pl-4 md:pl-1 w-full   font-bold">
        {content.subHeader.title}
      </h1>

      <div className="flex items-center w-full justify-around md:justify-end gap-2 text-sm text-title">
        <span>
          {content.subHeader.updateStatus} {lastUpdated}
        </span>

        <button
          onClick={onToggleAutoFetch}
          className="flex items-center gap-1 px-2 py-1 text-sm border border-border rounded-lg  bg-card-bg"
        >
          {autoFetchEnabled ? (
            <>
              <FiPause className="w-4 h-4" />
              <p className="text-sm md:text-nowrap">{content.subHeader.pause}</p>
            </>
          ) : (
            <>
              <FiPlay className="w-4 h-4" />
              {content.subHeader.resume}
            </>
          )}
        </button>

        <button onClick={onRefresh} className="p-2 border border-border bg-card-bg rounded-lg ">
          <FiRefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
