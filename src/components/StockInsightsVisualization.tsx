import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { transformCompanyMetrics, transformTechnicalEvents } from '../utils/dataTransformers';
import { StockInsightsData } from '../types/stock';

interface StockInsightsVisualizationProps {
  data: StockInsightsData | null;
  isLoading: boolean;
}

export default function StockInsightsVisualization({ data, isLoading }: StockInsightsVisualizationProps) {
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

  const technicalEvents = data.instrumentInfo?.technicalEvents;
  const companyMetrics = data.companySnapshot?.company;
  const sectorMetrics = data.companySnapshot?.sector;
  
  const technicalData = transformTechnicalEvents(technicalEvents);
  const metricsData = transformCompanyMetrics(companyMetrics, sectorMetrics);

  return (
    <div className="space-y-6">
      {technicalData && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            기술적 분석 지표
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">단기 전망</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${technicalData.shortTerm.direction === 'up' ? 'bg-green-500' : technicalData.shortTerm.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <p className="text-gray-700 dark:text-gray-300">{technicalData.shortTerm.description}</p>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div 
                  className={`h-2 rounded-full ${technicalData.shortTerm.direction === 'up' ? 'bg-green-500' : technicalData.shortTerm.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}
                  style={{ width: `${technicalData.shortTerm.score * 10}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">중기 전망</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${technicalData.intermediateTerm.direction === 'up' ? 'bg-green-500' : technicalData.intermediateTerm.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <p className="text-gray-700 dark:text-gray-300">{technicalData.intermediateTerm.description}</p>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div 
                  className={`h-2 rounded-full ${technicalData.intermediateTerm.direction === 'up' ? 'bg-green-500' : technicalData.intermediateTerm.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}
                  style={{ width: `${technicalData.intermediateTerm.score * 10}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">장기 전망</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${technicalData.longTerm.direction === 'up' ? 'bg-green-500' : technicalData.longTerm.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <p className="text-gray-700 dark:text-gray-300">{technicalData.longTerm.description}</p>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div 
                  className={`h-2 rounded-full ${technicalData.longTerm.direction === 'up' ? 'bg-green-500' : technicalData.longTerm.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}
                  style={{ width: `${technicalData.longTerm.score * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {metricsData && metricsData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            회사 성과 지표
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metricsData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280' }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#6B7280' }} />
                <Radar
                  name="회사"
                  dataKey="company"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="섹터 평균"
                  dataKey="sector"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {data.recommendation && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            애널리스트 추천
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">목표가: <span className="font-medium">${data.recommendation.targetPrice}</span></p>
              <p className="text-gray-700 dark:text-gray-300">평가: <span className="font-medium">{data.recommendation.rating}</span></p>
            </div>
            <div className={`px-4 py-2 rounded-full ${
              data.recommendation.rating.includes('Buy') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              data.recommendation.rating.includes('Sell') ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {data.recommendation.rating}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
