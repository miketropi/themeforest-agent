'use client';

import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

export default function Dashboard() {
  const { user, loading, setLoading } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {
              mounted && <>Welcome back, {user?.username || 'User'}! Here&apos;s what&apos;s happening with your account today.</>
            }
          </p>
        </div>
        <div className="flex space-x-3">
          {/* <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900">
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900">
            <span>Refresh</span>
          </button> */}
        </div>
      </div>
      {/* {
        JSON.stringify(user)
      } */}
      
    </div>
  );
}
