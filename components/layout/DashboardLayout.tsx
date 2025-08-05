'use client';

import { ReactNode } from 'react';
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Header, SubHeader } from '../organsims';
import React from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardLayoutProps = {
  editMode: boolean;
  lastUpdated: string;
  autoFetchEnabled: boolean;
  children: ReactNode;
  layout: Layouts;
  onToggleEditMode: () => void;
  onReset: () => void;
  onRefresh: () => void;
  onToggleAutoFetch: () => void;
  onLayoutChange: (layout: unknown, layouts: Layouts) => void;
};

export default function DashboardLayout({
  editMode,
  lastUpdated,
  autoFetchEnabled,
  layout,
  children,
  onToggleEditMode,
  onReset,
  onRefresh,
  onToggleAutoFetch,
  onLayoutChange,
}: DashboardLayoutProps) {
  return (
    <div className="p-4">
      <Header editMode={editMode} onToggleEditMode={onToggleEditMode} onReset={onReset} />

      <SubHeader
        lastUpdated={lastUpdated}
        autoFetchEnabled={autoFetchEnabled}
        onToggleAutoFetch={onToggleAutoFetch}
        onRefresh={onRefresh}
      />

      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, md: 786, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        isResizable={false}
        isDraggable={editMode}
        containerPadding={[0, 0]}
        margin={[10, 10]}
        useCSSTransforms={true}
        onLayoutChange={onLayoutChange}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
}
