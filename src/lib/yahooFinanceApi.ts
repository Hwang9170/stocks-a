import axios from 'axios';

// Yahoo Finance API 연동을 위한 모듈
// 실제 API 호출 시 사용할 기본 설정

const BASE_URL = 'https://query1.finance.yahoo.com/v8';

// API 요청을 위한 기본 설정
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

// 주식 차트 데이터 가져오기
export async function getStockChart(symbol: string, interval: string = '1d', range: string = '1mo') {
  try {
    // 실제 환경에서는 아래 주석을 해제하고 실제 API 호출
    // const response = await api.get(`/finance/chart/${symbol}`, {
    //   params: {
    //     interval,
    //     range,
    //     includePrePost: false,
    //     events: 'div,split',
    //   }
    // });
    // return response.data;
    
    // 개발 환경에서는 더미 데이터 반환
    return {
      meta: {
        symbol,
        currency: 'USD',
        exchangeName: 'NMS',
        instrumentType: 'EQUITY',
        firstTradeDate: 1546300800,
        regularMarketTime: 1615566000,
        gmtoffset: -18000,
        timezone: 'EST',
        exchangeTimezoneName: 'America/New_York',
        chartPreviousClose: 121.42,
        priceHint: 2
      },
      timestamp: Array.from({ length: 30 }, (_, i) => 1614556800 + i * 86400),
      indicators: {
        quote: [{
          high: Array.from({ length: 30 }, () => Math.random() * 50 + 120),
          low: Array.from({ length: 30 }, () => Math.random() * 30 + 110),
          open: Array.from({ length: 30 }, () => Math.random() * 40 + 115),
          close: Array.from({ length: 30 }, () => Math.random() * 40 + 115),
          volume: Array.from({ length: 30 }, () => Math.random() * 100000000)
        }],
        adjclose: [{
          adjclose: Array.from({ length: 30 }, () => Math.random() * 40 + 115)
        }]
      }
    };
  } catch (error) {
    console.error('주식 차트 데이터 가져오기 실패:', error);
    throw error;
  }
}

// 주식 인사이트 데이터 가져오기
export async function getStockInsights(symbol: string) {
  try {
    // 실제 환경에서는 아래 주석을 해제하고 실제 API 호출
    // const response = await api.get(`/finance/insights/${symbol}`);
    // return response.data;
    
    // 개발 환경에서는 더미 데이터 반환
    return {
      symbol,
      instrumentInfo: {
        technicalEvents: {
          provider: 'Trading Central',
          sector: 'Technology',
          shortTermOutlook: {
            stateDescription: 'Bullish',
            direction: 'up',
            score: 7,
            scoreDescription: 'Strong',
            sectorDirection: 'up',
            sectorScore: 6,
            sectorScoreDescription: 'Positive',
            indexDirection: 'up',
            indexScore: 5,
            indexScoreDescription: 'Neutral'
          },
          intermediateTermOutlook: {
            stateDescription: 'Bullish',
            direction: 'up',
            score: 8,
            scoreDescription: 'Very Strong',
            sectorDirection: 'up',
            sectorScore: 7,
            sectorScoreDescription: 'Strong',
            indexDirection: 'up',
            indexScore: 6,
            indexScoreDescription: 'Positive'
          },
          longTermOutlook: {
            stateDescription: 'Bullish',
            direction: 'up',
            score: 9,
            scoreDescription: 'Very Strong',
            sectorDirection: 'up',
            sectorScore: 8,
            sectorScoreDescription: 'Very Strong',
            indexDirection: 'up',
            indexScore: 7,
            indexScoreDescription: 'Strong'
          }
        },
        keyTechnicals: {
          provider: 'Trading Central',
          support: 120.5,
          resistance: 145.8,
          stopLoss: 115.2
        },
        valuation: {
          color: 1,
          description: 'Undervalued',
          discount: '15%',
          relativeValue: 'Positive',
          provider: 'Trading Central'
        }
      },
      companySnapshot: {
        sectorInfo: 'Technology',
        company: {
          innovativeness: 9,
          hiring: 7,
          sustainability: 8,
          insiderSentiments: 6,
          earningsReports: 8,
          dividends: 5
        },
        sector: {
          innovativeness: 7,
          hiring: 6,
          sustainability: 6,
          insiderSentiments: 5,
          earningsReports: 7,
          dividends: 4
        }
      },
      recommendation: {
        targetPrice: 155.75,
        provider: 'Trading Central',
        rating: 'Buy'
      }
    };
  } catch (error) {
    console.error('주식 인사이트 데이터 가져오기 실패:', error);
    throw error;
  }
}

// SEC 파일링 데이터 가져오기
export async function getSecFilings(symbol: string) {
  try {
    // 실제 환경에서는 아래 주석을 해제하고 실제 API 호출
    // const response = await api.get(`/finance/secFilings/${symbol}`);
    // return response.data;
    
    // 개발 환경에서는 더미 데이터 반환
    return {
      filings: Array.from({ length: 10 }, (_, i) => ({
        date: `2023-${(12 - i).toString().padStart(2, '0')}-15`,
        epochDate: 1671062400 - i * 2592000,
        type: i % 3 === 0 ? '10-K' : i % 3 === 1 ? '10-Q' : '8-K',
        title: i % 3 === 0 ? 'Annual Report' : i % 3 === 1 ? 'Quarterly Report' : 'Current Report',
        edgarUrl: `https://www.sec.gov/Archives/edgar/data/123456/000000000000000${i}`,
        exhibits: Array.from({ length: 3 }, (_, j) => ({
          type: `EX-${j + 1}`,
          url: `https://www.sec.gov/Archives/edgar/data/123456/000000000000000${i}/ex${j + 1}.htm`
        }))
      }))
    };
  } catch (error) {
    console.error('SEC 파일링 데이터 가져오기 실패:', error);
    throw error;
  }
}

// 애널리스트 의견 데이터 가져오기
export async function getAnalystOpinions(symbol: string) {
  try {
    // 실제 환경에서는 아래 주석을 해제하고 실제 API 호출
    // const response = await api.get(`/finance/analystOpinions/${symbol}`);
    // return response.data;
    
    // 개발 환경에서는 더미 데이터 반환
    return {
      result: [{
        entityIdType: 'TICKER',
        hits: Array.from({ length: 5 }, (_, i) => ({
          report_title: `${symbol} Analysis Report ${i + 1}`,
          ticker: [symbol],
          provider: `Research Firm ${i + 1}`,
          author: `Analyst ${i + 1}`,
          pdf_url: `https://example.com/reports/${symbol}_${i + 1}.pdf`,
          snapshot_url: `https://example.com/snapshots/${symbol}_${i + 1}.html`,
          id: `report_${i + 1}`,
          report_type: i % 2 === 0 ? 'Earnings' : 'Industry',
          abstract: `This is an abstract for the ${symbol} analysis report ${i + 1}.`,
          report_date: 1671062400 - i * 2592000
        }))
      }]
    };
  } catch (error) {
    console.error('애널리스트 의견 데이터 가져오기 실패:', error);
    throw error;
  }
}

// 주식 검색 결과 가져오기
export async function searchStocks(query: string) {
  try {
    // 실제 환경에서는 아래 주석을 해제하고 실제 API 호출
    // const response = await api.get(`/finance/search`, {
    //   params: { q: query }
    // });
    // return response.data;
    
    // 개발 환경에서는 더미 데이터 반환
    const dummyResults = [
      { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', exchange: 'NASDAQ' },
      { symbol: 'META', name: 'Meta Platforms, Inc.', exchange: 'NASDAQ' }
    ];
    
    // 검색어에 따라 필터링
    const filteredResults = dummyResults.filter(
      item => item.symbol.toLowerCase().includes(query.toLowerCase()) || 
              item.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      results: filteredResults
    };
  } catch (error) {
    console.error('주식 검색 실패:', error);
    throw error;
  }
}
