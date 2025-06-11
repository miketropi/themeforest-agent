'use client';

import { useState, useEffect, useCallback } from 'react';
import useStore from '../../store/useStore';
import Pagination from '../../components/Pagination';
import { ArrowDownToLine, Search, X } from 'lucide-react';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

export default function StatementsPage() {
  const [statements, setStatements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    pages: 1,
    page_size: 50,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: ''
  });
  const { user } = useStore();

  const getStatements = useCallback(async (dateFilters = null) => {
    setIsLoading(true);
    setError(null);

    const page = currentPage;

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (page > 1) params.append('page', page);
      
      // Add date filters if provided
      const filtersToUse = dateFilters || filters;
      if (filtersToUse.from_date) params.append('from_date', filtersToUse.from_date);
      if (filtersToUse.to_date) params.append('to_date', filtersToUse.to_date);

      const queryString = params.toString();
      const url = `/api/v1/statements${queryString ? `?${queryString}` : ''}`;

      const response = await fetchWithAuth(url).then(res => res.json());
      console.log('fetchWithAuth', response);
      if (response.results) {
        setStatements(response.results);

        if(response?.pagination){
          setPagination({
            pages: response?.pagination.pages,
            page_size: response?.pagination.page_size,
          });
        } else {
          setPagination({
            pages: 1,
            page_size: 50,
          });
        }
      }

    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    getStatements(1, filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      from_date: '',
      to_date: ''
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    getStatements(1, clearedFilters);
  };

  useEffect(() => {
    getStatements();
  }, [getStatements])


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Statements
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                View your financial statements and transaction history.
              </p>
            </div>
          </div>
        </div>

        {/* Filter section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              Filter Statements
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="from_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    id="from_date"
                    value={filters.from_date}
                    onChange={(e) => handleFilterChange('from_date', e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base py-3 px-4 transition-colors duration-200 border"
                  />
                </div>
                <div>
                  <label htmlFor="to_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    id="to_date"
                    value={filters.to_date}
                    onChange={(e) => handleFilterChange('to_date', e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base py-3 px-4 transition-colors duration-200 border"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 cursor-pointer"
                >
                  <Search size={16} />
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 cursor-pointer"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statements table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Order ID</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Type</th>
                  <th scope="col" className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Detail</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading statements...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                          <X className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">Error loading statements</p>
                      </div>
                    </td>
                  </tr>
                ) : statements.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">No statements found</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Try adjusting your filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  statements.map((statement) => (
                    <tr key={statement.unique_id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {statement.order_id}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                          statement.type === 'Sale' 
                            ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-400/30'
                            : statement.type === 'Author Fee'
                            ? 'bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-400/30'
                            : 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30'
                        }`}>
                          {statement.type}
                        </span>
                        <div className="md:hidden mt-2 space-y-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: statement.detail }}></div>
                          {statement.type === 'Sale' && (
                            <button
                              onClick={() => window.open(`/api/v1/statements/download/${statement.order_id}`, '_blank')}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:bg-blue-500/20 transition-colors duration-150"
                            >
                              <ArrowDownToLine size={14} />
                              Download PDF
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: statement.detail }}></div>
                          {statement.type === 'Sale' && (
                            <button
                              onClick={() => window.open(`/api/v1/statement-pdf?order_id=${statement.order_id}`, '_blank')}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:bg-blue-500/20 transition-colors duration-150 opacity-50 cursor-not-allowed"
                            >
                              <ArrowDownToLine size={14} />
                              Download PDF
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className={`text-md ${statement.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            ${Math.abs(statement.amount).toFixed(2)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <Pagination
              current_page={currentPage}
              pages={pagination.pages}
              page_size={pagination.page_size}
              onChange={ num => {
                setCurrentPage(num);
              } }
            />
          </div>
        </div>
      </div>
    </div>
  );
}