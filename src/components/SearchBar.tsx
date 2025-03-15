import React, { useState } from 'react';
import { useStockSearch } from '../hooks/useStockData';

interface SearchBarProps {
  onSelectStock: (symbol: string) => void;
}

export default function SearchBar({ onSelectStock }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { searchResults, isLoading } = useStockSearch(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectStock = (symbol: string) => {
    onSelectStock(symbol);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="주식 심볼 또는 회사명 검색..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul>
            {searchResults.map((result, index) => (
              <li 
                key={index}
                onClick={() => handleSelectStock(result.symbol)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{result.symbol}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{result.exchange}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{result.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length > 1 && searchResults.length === 0 && !isLoading && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-4 text-center text-gray-500 dark:text-gray-400">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
