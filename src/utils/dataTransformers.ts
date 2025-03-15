import { StockChartData } from '../types/stock';

/**
 * 차트 데이터를 Recharts 라이브러리에서 사용할 수 있는 형식으로 변환
 * @param data Yahoo Finance API에서 가져온 차트 데이터
 */
export function transformChartData(data: StockChartData) {
  if (!data || !data.timestamp || !data.indicators || !data.indicators.quote || data.indicators.quote.length === 0) {
    return [];
  }

  const { timestamp, indicators } = data;
  const quote = indicators.quote[0];
  
  return timestamp.map((time, index) => {
    return {
      date: new Date(time * 1000).toLocaleDateString(),
      open: quote.open[index],
      high: quote.high[index],
      low: quote.low[index],
      close: quote.close[index],
      volume: quote.volume[index],
      adjClose: indicators.adjclose ? indicators.adjclose[0].adjclose[index] : quote.close[index],
    };
  });
}

/**
 * 기술적 지표 데이터를 시각화에 적합한 형식으로 변환
 * @param technicalEvents 기술적 지표 데이터
 */
export function transformTechnicalEvents(technicalEvents: any) {
  if (!technicalEvents) {
    return null;
  }

  const { shortTermOutlook, intermediateTermOutlook, longTermOutlook } = technicalEvents;
  
  return {
    shortTerm: {
      score: shortTermOutlook.score,
      direction: shortTermOutlook.direction,
      description: shortTermOutlook.scoreDescription,
    },
    intermediateTerm: {
      score: intermediateTermOutlook.score,
      direction: intermediateTermOutlook.direction,
      description: intermediateTermOutlook.scoreDescription,
    },
    longTerm: {
      score: longTermOutlook.score,
      direction: longTermOutlook.direction,
      description: longTermOutlook.scoreDescription,
    },
  };
}

/**
 * 회사 지표 데이터를 레이더 차트에 적합한 형식으로 변환
 * @param companyMetrics 회사 지표 데이터
 * @param sectorMetrics 섹터 지표 데이터
 */
export function transformCompanyMetrics(companyMetrics: any, sectorMetrics: any) {
  if (!companyMetrics || !sectorMetrics) {
    return [];
  }
  
  return [
    { 
      subject: '혁신성', 
      company: companyMetrics.innovativeness, 
      sector: sectorMetrics.innovativeness,
      fullMark: 10 
    },
    { 
      subject: '채용', 
      company: companyMetrics.hiring, 
      sector: sectorMetrics.hiring,
      fullMark: 10 
    },
    { 
      subject: '지속가능성', 
      company: companyMetrics.sustainability, 
      sector: sectorMetrics.sustainability,
      fullMark: 10 
    },
    { 
      subject: '내부자 심리', 
      company: companyMetrics.insiderSentiments, 
      sector: sectorMetrics.insiderSentiments,
      fullMark: 10 
    },
    { 
      subject: '실적 보고서', 
      company: companyMetrics.earningsReports, 
      sector: sectorMetrics.earningsReports,
      fullMark: 10 
    },
    { 
      subject: '배당금', 
      company: companyMetrics.dividends, 
      sector: sectorMetrics.dividends,
      fullMark: 10 
    },
  ];
}

/**
 * SEC 파일링 데이터를 테이블에 적합한 형식으로 변환
 * @param filings SEC 파일링 데이터
 */
export function transformSecFilings(filings: any) {
  if (!filings || !filings.length) {
    return [];
  }
  
  return filings.map((filing: any) => {
    return {
      date: new Date(filing.epochDate * 1000).toLocaleDateString(),
      type: filing.type,
      title: filing.title,
      url: filing.edgarUrl,
    };
  });
}

/**
 * 애널리스트 의견 데이터를 테이블에 적합한 형식으로 변환
 * @param opinions 애널리스트 의견 데이터
 */
export function transformAnalystOpinions(opinions: any) {
  if (!opinions || !opinions.hits || !opinions.hits.length) {
    return [];
  }
  
  return opinions.hits.map((hit: any) => {
    return {
      title: hit.report_title,
      provider: hit.provider,
      author: hit.author,
      date: new Date(hit.report_date * 1000).toLocaleDateString(),
      abstract: hit.abstract,
    };
  });
}
