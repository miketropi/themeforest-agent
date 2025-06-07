'use client';

import { useState } from 'react';
import useStore from '../../store/useStore';

export default function SettingsPage() {
  
  
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>
      
      
    </div>
  );
}