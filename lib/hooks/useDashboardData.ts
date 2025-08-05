import { useEffect, useRef, useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Layouts } from 'react-grid-layout';
import { defaultLayouts } from '@/lib/utils/gridLayout';

export function useDashboardData(initialData: DashboardApiResponse) {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<Layouts>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboardLayout');
      if (saved) {
        try {
          return JSON.parse(saved) as Layouts;
        } catch (e) {
          console.error('Invalid saved layout:', e);
        }
      }
    }
    return defaultLayouts;
  });
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const [islastUpdated, setIsLastUpdated] = useState('just now');
  const [initialLoad, setInitialLoad] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const dashboardResponse = await fetch('/api/dashboard');
      if (!dashboardResponse.ok) throw new Error('Failed to fetch');
      const newData = await dashboardResponse.json();
      setDashboardData(newData);
      setIsLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (autoFetchEnabled) {
      intervalRef.current = setInterval(fetchDashboardData, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    const intervalId = setInterval(() => {
      if (window.theme_loaded === true) {
        setInitialLoad(true);
        clearInterval(intervalId);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(intervalId);
    };
  }, [autoFetchEnabled]);

  const resetLayout = () => {
    setLayout(defaultLayouts);
    localStorage.removeItem('dashboardLayout');
  };

  const handleLayoutChange = (_layout: unknown, allLayouts: Layouts) => {
    setLayout(allLayouts);
    localStorage.setItem('dashboardLayout', JSON.stringify(allLayouts));
  };

  return {
    isEditMode,
    dashboardData,
    isLoading,
    layout,
    autoFetchEnabled,
    islastUpdated,
    initialLoad,
    fetchDashboardData,
    resetLayout,
    setAutoFetchEnabled,
    handleLayoutChange,
    setLayout,
    setIsEditMode,
  };
}
