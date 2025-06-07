'use client';

import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import StarRating from '@/app/components/StarRating';
import { Search, ExternalLink } from 'lucide-react';

export default function ItemsPage() {
  const { user } = useStore();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI}/api/v1/items`, {
        method: 'GET',
        headers: {
          'username': user?.username
        },
      }).then((res) => res.json());

      if(response.matches){
        setItems(response.matches);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Items
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your portfolio of digital products.
              </p>
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" width="40%" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Item</th>
                  <th scope="col" className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Tags</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Price</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading items...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                          <Search className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">Error loading items</p>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">No items found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-start space-x-4">
                          {item.previews?.live_site && (
                            <div className="flex-shrink-0">
                              <img
                                src={item.previews.icon_with_landscape_preview.icon_url}
                                alt={item.name}
                                className="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <a 
                                href={item.url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 flex items-center gap-1"
                              >
                                {item.name}
                                <ExternalLink size={14} className="opacity-60" />
                              </a>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {item.description}
                            </p>
                            {/* Mobile tags */}
                            <div className="md:hidden mt-2">
                              <div className="flex flex-wrap gap-1">
                                {item.tags?.slice(0, 3).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {item.tags?.length > 3 && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    +{item.tags.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-md font-semibold text-gray-900 dark:text-white">
                            ${(item.price_cents / 100).toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <div className="flex gap-0.5">
                              <StarRating rating={item.rating.rating} />
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({item.rating.count || 0} reviews)
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
