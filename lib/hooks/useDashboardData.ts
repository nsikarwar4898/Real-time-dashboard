import { useEffect, useRef, useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Layouts } from 'react-grid-layout';
import { defaultLayouts } from '@/lib/utils/gridLayout';

export function useDashboardData(initialData: DashboardApiResponse) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
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
  const [lastUpdated, setLastUpdated] = useState('just now');
  const [initialLoad, setInitialLoad] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Failed to fetch');
      const newData = await res.json();
      setData(newData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetchEnabled) {
      intervalRef.current = setInterval(fetchData, 20000);
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
    data,
    loading,
    layout,
    autoFetchEnabled,
    lastUpdated,
    initialLoad,
    fetchData,
    resetLayout,
    setAutoFetchEnabled,
    handleLayoutChange,
    setLayout,
  };
}
