'use client';

import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';

export default function SalesPage() {
  const { loading, setLoading } = useStore();
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    recentSales: [],
    topProducts: [],
    salesByPeriod: []
  });
  
  // Simulate data loading
  useEffect(() => {
    const loadSalesData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setSalesData({
          totalSales: 24580.75,
          recentSales: [
            { id: 1, product: 'Premium WordPress Theme', amount: 59, date: '2023-11-15', customer: 'John Doe' },
            { id: 2, product: 'React Dashboard Template', amount: 49, date: '2023-11-14', customer: 'Sarah Smith' },
            { id: 3, product: 'E-commerce Template', amount: 69, date: '2023-11-13', customer: 'Michael Brown' },
            { id: 4, product: 'Portfolio Template', amount: 39, date: '2023-11-12', customer: 'Emily Johnson' },
            { id: 5, product: 'Admin Dashboard', amount: 79, date: '2023-11-11', customer: 'Robert Wilson' },
          ],
          topProducts: [
            { id: 1, name: 'Premium WordPress Theme', sales: 145, revenue: 8555 },
            { id: 2, name: 'React Dashboard Template', sales: 98, revenue: 4802 },
            { id: 3, name: 'E-commerce Template', sales: 87, revenue: 6003 },
            { id: 4, name: 'Portfolio Template', sales: 65, revenue: 2535 },
            { id: 5, name: 'Admin Dashboard', sales: 54, revenue: 4266 },
          ],
          salesByPeriod: [
            { period: 'Jan', sales: 4200 },
            { period: 'Feb', sales: 3800 },
            { period: 'Mar', sales: 5100 },
            { period: 'Apr', sales: 4800 },
            { period: 'May', sales: 5300 },
            { period: 'Jun', sales: 5900 },
            { period: 'Jul', sales: 6100 },
            { period: 'Aug', sales: 5800 },
            { period: 'Sep', sales: 6500 },
            { period: 'Oct', sales: 7200 },
            { period: 'Nov', sales: 6800 },
            { period: 'Dec', sales: 7500 },
          ]
        });
      } catch (error) {
        console.error('Error loading sales data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSalesData();
  }, [setLoading]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor your sales performance and track revenue.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900">
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900">
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Sales overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total Sales</h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${salesData.totalSales.toLocaleString()}
          </p>
          <div className="mt-4 flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              8.2%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Average Order Value</h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">$58.45</p>
          <div className="mt-4 flex items-center">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              3.5%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversion Rate</h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3.2%</p>
          <div className="mt-4 flex items-center">
            <span className="text-red-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              0.8%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Sales chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Sales Trend</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Year</button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Month</button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Week</button>
          </div>
        </div>
        
        {/* Chart placeholder */}
        <div className="h-80 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Sales chart will be displayed here</p>
        </div>
      </div>

      {/* Recent sales and top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent sales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Sales</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {salesData.recentSales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{sale.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sale.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sale.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">${sale.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none">
              View All Sales
            </button>
          </div>
        </div>
        
        {/* Top products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Products</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sales</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {salesData.topProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}