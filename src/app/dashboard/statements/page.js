'use client';

import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import Pagination from '../../components/Pagination';

export default function StatementsPage() {
  const [statements, setStatements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    pages: 1,
    page_size: 50,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useStore();

  const getStatements = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${ process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI }/api/v1/statements`, {
        method: 'GET',
      }).then((res) => res.json());

      if (response.results) {
        setStatements(response.results);

        setPagination({
          pages: response?.pagination.pages,
          page_size: response?.pagination.page_size,
        })
      }

    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getStatements();
  }, [])

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statements</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View your financial statements and transaction history.
        </p>
      </div>

      {/* Statements table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th> */}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Detail</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading statements...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-red-500">
                  Error loading statements
                </td>
              </tr>
            ) : statements.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No statements found
                </td>
              </tr>
            ) : (
              statements.map((statement) => (
                <tr key={statement.unique_id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(statement.date).toLocaleDateString()}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {statement.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {statement.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {statement.detail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    <span className={statement.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                      ${Math.abs(statement.amount).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
  );
}