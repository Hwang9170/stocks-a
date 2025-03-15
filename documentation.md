# 주식 리서치 웹사이트 사용 설명서

## 개요

이 문서는 미국 주식 시장 데이터를 시각화하여 투자 결정에 도움을 주는 웹사이트 모델에 대한 설명서입니다. 이 웹사이트는 주식 검색, 차트 시각화, 기술적 분석 지표, 회사 성과 지표 등 다양한 기능을 제공합니다.

## 주요 기능

1. **주식 검색 기능**
   - 주식 심볼 또는 회사명으로 검색 가능
   - 실시간 검색 결과 표시

2. **주가 차트 시각화**
   - 다양한 기간(일간, 주간, 월간) 선택 가능
   - 다양한 범위(1개월, 6개월, 1년, 5년) 선택 가능
   - 가격 및 거래량 차트 제공

3. **기술적 분석 지표 시각화**
   - 단기, 중기, 장기 전망 제공
   - 기술적 분석 점수 및 방향성 표시

4. **회사 성과 지표 시각화**
   - 회사의 성과 지표를 섹터 평균과 비교하는 레이더 차트
   - 혁신성, 채용, 지속가능성 등 다양한 지표 포함

5. **반응형 디자인**
   - 모바일, 태블릿, 데스크톱 환경 모두 지원
   - 다양한 화면 크기에 최적화된 레이아웃

## 프로젝트 구조

```
stock_app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── stock/
│   │   │       ├── analyst-opinions/
│   │   │       ├── chart/
│   │   │       ├── insights/
│   │   │       └── sec-filing/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StockChart.tsx
│   │   └── StockInsightsVisualization.tsx
│   ├── hooks/
│   │   └── useStockData.ts
│   ├── lib/
│   │   └── yahooFinanceApi.ts
│   ├── types/
│   │   └── stock.ts
│   └── utils/
│       └── dataTransformers.ts
├── package.json
└── tailwind.config.js
```

## 기술 스택

- **프레임워크**: Next.js
- **스타일링**: Tailwind CSS
- **차트 라이브러리**: Recharts
- **아이콘**: Lucide React
- **데이터 페칭**: React 내장 기능(useEffect, useState)

## 사용 방법

### 로컬 개발 환경 설정

1. 프로젝트 클론
   ```bash
   git clone <repository-url>
   cd stock_app
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 개발 서버 실행
   ```bash
   npm run dev
   ```

4. 브라우저에서 `http://localhost:3000` 접속

### 주식 검색 및 데이터 확인

1. 메인 페이지의 검색창에 주식 심볼(예: AAPL, MSFT, GOOGL) 또는 회사명 입력
2. 검색 결과에서 원하는 주식 선택
3. 선택한 주식의 차트 및 데이터 확인
4. 차트 상단의 버튼을 통해 다양한 기간 및 범위 선택 가능

## API 엔드포인트

이 웹사이트는 다음과 같은 API 엔드포인트를 제공합니다:

1. `/api/stock/chart?symbol={symbol}&interval={interval}&range={range}`
   - 주식 차트 데이터 제공
   - 파라미터:
     - symbol: 주식 심볼(필수)
     - interval: 데이터 간격(1d, 1wk, 1mo 등)
     - range: 데이터 범위(1mo, 6mo, 1y, 5y 등)

2. `/api/stock/insights?symbol={symbol}`
   - 주식 인사이트 데이터 제공
   - 파라미터:
     - symbol: 주식 심볼(필수)

3. `/api/stock/sec-filing?symbol={symbol}`
   - SEC 파일링 데이터 제공
   - 파라미터:
     - symbol: 주식 심볼(필수)

4. `/api/stock/analyst-opinions?symbol={symbol}`
   - 애널리스트 의견 데이터 제공
   - 파라미터:
     - symbol: 주식 심볼(필수)

## 향후 개선 사항

1. **실제 Yahoo Finance API 연동**
   - 현재는 더미 데이터를 사용하고 있으며, 실제 API 연동 필요

2. **사용자 인증 기능 추가**
   - 로그인/회원가입 기능
   - 개인 포트폴리오 관리 기능

3. **알림 기능 추가**
   - 가격 변동, 실적 발표 등에 대한 알림 설정

4. **추가 데이터 시각화**
   - 재무제표 데이터 시각화
   - 섹터 및 산업 비교 기능

5. **성능 최적화**
   - 데이터 캐싱 개선
   - 코드 스플리팅 적용

## 문제 해결

### 빌드 오류

빌드 과정에서 다음과 같은 오류가 발생할 수 있습니다:

1. **모듈 경로 문제**
   - 오류: `Module not found: Can't resolve '../../lib/yahooFinanceApi'`
   - 해결: API 엔드포인트 파일의 import 경로를 올바르게 수정

2. **React 훅 사용 오류**
   - 오류: `You're importing a component that needs useState. This React hook only works in a client component.`
   - 해결: 파일 상단에 `"use client";` 지시문 추가

## 결론

이 주식 리서치 웹사이트 모델은 미국 주식 시장 데이터를 시각화하여 투자 결정에 도움을 주는 기능을 제공합니다. 현재는 프론트엔드 UI와 데이터 구조만 구현된 상태이며, 실제 API 연동을 통해 완전한 기능을 갖춘 웹사이트로 발전시킬 수 있습니다.

이 문서가 웹사이트의 기능과 사용 방법을 이해하는 데 도움이 되길 바랍니다.
