'use client';

import { SummarySkeleton } from '@/components/organsims';
import { Location } from '@/lib/types/types';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/organsims/dashboard/Map'), { ssr: false });

type DashboardLocationsProps = {
  loading: boolean;
  locations: Location[];
};

export default function DashboardLocations({ loading, locations }: DashboardLocationsProps) {
  return (
    <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
      {loading ? (
        <SummarySkeleton />
      ) : (
        <>
          <div className="text-sm text-title font-medium px-4 py-2 border-b border-border">
            Locations
          </div>
          <div className="flex-1 p-4 rounded-xl">
            <Map locations={locations} />
          </div>
        </>
      )}
    </div>
  );
}
