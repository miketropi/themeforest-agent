'use client';

import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import StarRating from '@/app/components/StarRating';

export default function ItemsPage() {
  const { user } = useStore();
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI}/api/v1/items`, {
      method: 'GET',
      headers: {
        'username': user?.username
      },
    }).then((res) => res.json());

    if(response.matches){
      setItems(response.matches);
    }
  }

  useEffect(() => {
    getItems();
  }, [])
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Items</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your portfolio of digital products.
          </p>
        </div>
        
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" width="40%" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tags</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    {item.previews?.live_site && (
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          src={item.previews.icon_with_landscape_preview.icon_url}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover border border-gray-100 p-1"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h4 className="text-base leading-6 tracking-wide">
                      <a 
                        href={item.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {item.name}
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {item.description}
                      </p>
                      
                    </h4>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${(item.price_cents / 100).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex gap-0.5">
                      <StarRating rating={item.rating.rating} />
                    </div>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      ({item.rating.count || 0})
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
