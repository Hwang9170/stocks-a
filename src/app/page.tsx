"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import StockChart from '../components/StockChart';
import StockInsightsVisualization from '../components/StockInsightsVisualization';
import { useStockChart, useStockInsights } from '../hooks/useStockData';

export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [interval, setInterval] = useState<string>('1d');
  const [range, setRange] = useState<string>('1mo');
  
  const { chartData, isLoading: isChartLoading } = useStockChart(selectedSymbol, interval, range);
  const { insightsData, isLoading: isInsightsLoading } = useStockInsights(selectedSymbol);

  const handleSelectStock = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const handleIntervalChange = (newInterval: string) => {
    setInterval(newInterval);
  };

  const handleRangeChange = (newRange: string) => {
    setRange(newRange);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            미국 주식 리서치 플랫폼
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            주식 데이터를 시각화하여 투자 결정에 도움을 주는 플랫폼입니다.
          </p>
          <div className="w-full max-w-xl">
            <SearchBar onSelectStock={handleSelectStock} />
          </div>
        </div>

        {!selectedSymbol && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              시작하기
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              주식 심볼 또는 회사명을 검색하여 시작하세요. 예: AAPL, MSFT, GOOGL
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">주식 차트</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  다양한 기간의 주가 및 거래량 차트를 확인할 수 있습니다.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 dark:text-green-400 mb-2">기술적 분석</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  단기, 중기, 장기 기술적 분석 지표를 시각화하여 제공합니다.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2">회사 성과</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  회사의 성과 지표를 섹터 평균과 비교하여 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedSymbol && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedSymbol}
                </h2>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                      type="button"
                      onClick={() => handleIntervalChange('1d')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                        interval === '1d'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      일간
                    </button>
                    <button
                      type="button"
                      onClick={() => handleIntervalChange('1wk')}
                      className={`px-4 py-2 text-sm font-medium ${
                        interval === '1wk'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      주간
                    </button>
                    <button
                      type="button"
                      onClick={() => handleIntervalChange('1mo')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                        interval === '1mo'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      월간
                    </button>
                  </div>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                      type="button"
                      onClick={() => handleRangeChange('1mo')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                        range === '1mo'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      1개월
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRangeChange('6mo')}
                      className={`px-4 py-2 text-sm font-medium ${
                        range === '6mo'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      6개월
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRangeChange('1y')}
                      className={`px-4 py-2 text-sm font-medium ${
                        range === '1y'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      1년
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRangeChange('5y')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                        range === '5y'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      5년
                    </button>
                  </div>
                </div>
              </div>
              <StockChart 
                data={chartData} 
                isLoading={isChartLoading} 
                interval={interval} 
                range={range} 
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                주식 인사이트
              </h2>
              <StockInsightsVisualization 
                data={insightsData} 
                isLoading={isInsightsLoading} 
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
