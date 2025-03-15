import {
  StockChartData,
  StockInsightsData,
  SecFilingData,
  AnalystOpinionData,
} from '../types/stock';

/**
 * Yahoo Finance API - 주식 차트 데이터 가져오기
 */
export async function getStockChart(
  symbol: string,
  interval: string = '1d',
  range: string = '1mo'
): Promise<StockChartData | null> {
  try {
    const response = await fetch(`/api/stock/chart?symbol=${symbol}&interval=${interval}&range=${range}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json() as {
      chart: {
        result: StockChartData[];
        error: null | { code: string; description: string };
      };
    };

    return data.chart.result[0];
  } catch (error) {
    console.error('주식 차트 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * Yahoo Finance API - 주식 인사이트 데이터 가져오기
 */
export async function getStockInsights(symbol: string): Promise<StockInsightsData | null> {
  try {
    const response = await fetch(`/api/stock/insights?symbol=${symbol}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json() as {
      finance: {
        result: StockInsightsData[];
      };
    };

    return data.finance.result[0];
  } catch (error) {
    console.error('주식 인사이트 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * Yahoo Finance API - SEC 파일링 데이터 가져오기
 */
export async function getSecFilings(symbol: string): Promise<SecFilingData | null> {
  try {
    const response = await fetch(`/api/stock/sec-filing?symbol=${symbol}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json() as {
      quoteSummary: {
        result: { secFilings: SecFilingData }[];
      };
    };

    return data.quoteSummary.result[0].secFilings;
  } catch (error) {
    console.error('SEC 파일링 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * Yahoo Finance API - 애널리스트 의견 데이터 가져오기
 */
export async function getAnalystOpinions(symbol: string): Promise<AnalystOpinionData | null> {
  try {
    const response = await fetch(`/api/stock/analyst-opinions?symbol=${symbol}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json() as {
      result: AnalystOpinionData[];
    };

    return data.result[0];
  } catch (error) {
    console.error('애널리스트 의견 데이터 가져오기 실패:', error);
    return null;
  }
}

/**
 * Yahoo Finance API - 주식 검색
 */
export async function searchStocks(query: string) {
  try {
    const response = await fetch(`/api/stock/search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json() as {
      results: any[]; // 필요시 정확한 타입 정의
    };

    return data.results;
  } catch (error) {
    console.error('주식 검색 실패:', error);
    return [];
  }
}
