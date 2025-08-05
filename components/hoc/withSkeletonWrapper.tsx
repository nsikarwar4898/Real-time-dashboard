'use client';

import React from 'react';
import { SummarySkeleton } from '../molecules';

type WithSkeletonWrapperProps = {
  loading: boolean;
  children: React.ReactNode;
};

export function withSkeletonWrapper() {
  return function SkeletonWrapper({ loading, children }: WithSkeletonWrapperProps) {
    return (
      <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
        {loading ? <SummarySkeleton /> : children}
      </div>
    );
  };
}
