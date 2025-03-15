"use client";
import { useState, useEffect } from 'react';

// 간소화된 데이터 페칭 로직 구현

/**
 * 주식 차트 데이터를 가져오는 훅
 * @param symbol 주식 심볼
 * @param interval 데이터 간격
 * @param range 데이터 범위
 */
export function useStockChart(symbol: string, interval: string = '1d', range: string = '1mo') {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stock/chart?symbol=${symbol}&interval=${interval}&range=${range}`);
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        console.error('주식 차트 데이터 가져오기 실패:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // 15분마다 데이터 갱신
    const intervalId = setInterval(fetchData, 900000);
    return () => clearInterval(intervalId);
  }, [symbol, interval, range]);

  return {
    chartData,
    isLoading,
    isError: error,
    mutate: async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/stock/chart?symbol=${symbol}&interval=${interval}&range=${range}`);
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
}

/**
 * 주식 인사이트 데이터를 가져오는 훅
 * @param symbol 주식 심볼
 */
export function useStockInsights(symbol: string) {
  const [insightsData, setInsightsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stock/insights?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        const data = await response.json();
        setInsightsData(data);
      } catch (err) {
        console.error('주식 인사이트 데이터 가져오기 실패:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // 1시간마다 데이터 갱신
    const intervalId = setInterval(fetchData, 3600000);
    return () => clearInterval(intervalId);
  }, [symbol]);

  return {
    insightsData,
    isLoading,
    isError: error
  };
}

/**
 * SEC 파일링 데이터를 가져오는 훅
 * @param symbol 주식 심볼
 */
export function useSecFilings(symbol: string) {
  const [secFilingsData, setSecFilingsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stock/sec-filing?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        const data = await response.json();
        setSecFilingsData(data);
      } catch (err) {
        console.error('SEC 파일링 데이터 가져오기 실패:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // 24시간마다 데이터 갱신
    const intervalId = setInterval(fetchData, 86400000);
    return () => clearInterval(intervalId);
  }, [symbol]);

  return {
    secFilingsData,
    isLoading,
    isError: error
  };
}

/**
 * 애널리스트 의견 데이터를 가져오는 훅
 * @param symbol 주식 심볼
 */
export function useAnalystOpinions(symbol: string) {
  const [analystOpinionsData, setAnalystOpinionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stock/analyst-opinions?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        const data = await response.json();
        setAnalystOpinionsData(data);
      } catch (err) {
        console.error('애널리스트 의견 데이터 가져오기 실패:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // 1시간마다 데이터 갱신
    const intervalId = setInterval(fetchData, 3600000);
    return () => clearInterval(intervalId);
  }, [symbol]);

  return {
    analystOpinionsData,
    isLoading,
    isError: error
  };
}

/**
 * 주식 검색 결과를 가져오는 훅
 * @param query 검색어
 */
export function useStockSearch(query: string) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length <= 1) {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stock/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('API 요청 실패');
        }
        const data = await response.json();
        setSearchResults(data?.results || []);
      } catch (err) {
        console.error('주식 검색 실패:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    // 검색어 입력 후 300ms 지연 시간 추가
    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    searchResults,
    isLoading,
    isError: error
  };
}
