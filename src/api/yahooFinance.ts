import { StockChartData, StockInsightsData, SecFilingData, AnalystOpinionData } from '../types/stock';

// Yahoo Finance API 연동 모듈

/**
 * 주식 차트 데이터를 가져오는 함수
 * @param symbol 주식 심볼
 * @param interval 데이터 간격 (1d, 1wk, 1mo 등)
 * @param range 데이터 범위 (1d, 5d, 1mo, 3mo, 6mo, 1y, 5y 등)
 */
export async function getStockChart(
  symbol: string,
  interval: string = '1d',
  range: string = '1mo'
): Promise<StockChartData | null> {
  try {
    // 실제 API 호출 코드
    const response = await fetch(`/api/stock/chart?symbol=${symbol}&interval=${interval}&range=${range}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.chart.result[0] as StockChartData;
  } catch (error) {
    console.error('주식 차트 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * 주식 인사이트 데이터를 가져오는 함수
 * @param symbol 주식 심볼
 */
export async function getStockInsights(symbol: string): Promise<StockInsightsData | null> {
  try {
    const response = await fetch(`/api/stock/insights?symbol=${symbol}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.finance.result as StockInsightsData;
  } catch (error) {
    console.error('주식 인사이트 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * SEC 파일링 데이터를 가져오는 함수
 * @param symbol 주식 심볼
 */
export async function getSecFilings(symbol: string): Promise<SecFilingData | null> {
  try {
    const response = await fetch(`/api/stock/sec-filing?symbol=${symbol}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.quoteSummary.result[0].secFilings as SecFilingData;
  } catch (error) {
    console.error('SEC 파일링 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * 애널리스트 의견 데이터를 가져오는 함수
 * @param symbol 주식 심볼
 */
export async function getAnalystOpinions(symbol: string): Promise<AnalystOpinionData | null> {
  try {
    const response = await fetch(`/api/stock/analyst-opinions?symbol=${symbol}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.result[0] as AnalystOpinionData;
  } catch (error) {
    console.error('애널리스트 의견 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * 주식 검색 함수
 * @param query 검색어
 */
export async function searchStocks(query: string) {
  try {
    const response = await fetch(`/api/stock/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('주식 검색 실패:', error);
    return [];
  }
}
