import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { transformChartData } from '../utils/dataTransformers';
import { StockChartData } from '../types/stock';

interface StockChartProps {
  data: StockChartData | null;
  isLoading: boolean;
  interval: string;
  range: string;
}

export default function StockChart({ data, isLoading, interval, range }: StockChartProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const chartData = transformChartData(data);

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">차트 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          가격 차트 ({data.meta.symbol})
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280' }}
                tickMargin={10}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fill: '#6B7280' }}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151',
                  color: '#F9FAFB'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#3B82F6" 
                activeDot={{ r: 8 }} 
                name="종가"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          거래량
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280' }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151',
                  color: '#F9FAFB'
                }} 
              />
              <Bar 
                dataKey="volume" 
                fill="#10B981" 
                name="거래량"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
