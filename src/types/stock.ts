// 주식 데이터 타입 정의

// 주식 차트 데이터 타입
export interface StockChartData {
  meta: {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: TradingPeriod;
      regular: TradingPeriod;
      post: TradingPeriod;
    };
    dataGranularity: string;
    range: string;
    validRanges: string[];
  };
  timestamp: number[];
  indicators: {
    quote: {
      high: number[];
      open: number[];
      low: number[];
      close: number[];
      volume: number[];
    }[];
    adjclose?: {
      adjclose: number[];
    }[];
  };
}

// 거래 기간 타입
interface TradingPeriod {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

// 주식 인사이트 데이터 타입
export interface StockInsightsData {
  symbol: string;
  instrumentInfo: {
    technicalEvents: {
      shortTermOutlook: Outlook;
      intermediateTermOutlook: Outlook;
      longTermOutlook: Outlook;
    };
    keyTechnicals: {
      support: number;
      resistance: number;
      stopLoss: number;
    };
    valuation: {
      description: string;
      discount: string;
      relativeValue: string;
    };
  };
  companySnapshot: {
    sectorInfo: string;
    company: CompanyMetrics;
    sector: CompanyMetrics;
  };
  recommendation: {
    targetPrice: number;
    rating: string;
  };
  reports: {
    id: string;
    provider: string;
    reportDate: string;
    reportTitle: string;
  }[];
  sigDevs: {
    headline: string;
    date: string;
  }[];
  secReports: {
    id: string;
    type: string;
    title: string;
    description: string;
    filingDate: number;
    formType: string;
  }[];
}

// 전망 타입
interface Outlook {
  direction: string;
  score: number;
  scoreDescription: string;
}

// 회사 지표 타입
interface CompanyMetrics {
  innovativeness: number;
  hiring: number;
  sustainability: number;
  insiderSentiments: number;
  earningsReports: number;
  dividends: number;
}

// SEC 파일링 데이터 타입
export interface SecFilingData {
  filings: {
    date: string;
    epochDate: number;
    type: string;
    title: string;
    edgarUrl: string;
    exhibits: {
      type: string;
      url: string;
    }[];
  }[];
}

// 애널리스트 의견 데이터 타입
export interface AnalystOpinionData {
  hits: {
    report_title: string;
    ticker: string[];
    provider: string;
    author: string;
    abstract: string;
    report_date: number;
  }[];
}

// 주식 검색 결과 타입
export interface StockSearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}
