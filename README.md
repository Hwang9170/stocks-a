# 미국 주식 리서치 웹사이트

## 프로젝트 소개

이 프로젝트는 미국 주식 시장 데이터를 시각화하여 투자자들의 의사 결정을 돕는 웹 애플리케이션입니다. 사용자 친화적인 인터페이스를 통해 주식 검색, 차트 시각화, 기술적 분석 지표, 회사 성과 지표 등 다양한 기능을 제공합니다. 이 웹사이트는 투자자들이 데이터 기반의 투자 결정을 내릴 수 있도록 도와주는 종합적인 도구입니다.

## 주요 기능

### 1. 주식 검색 기능
- 주식 심볼 또는 회사명으로 검색 가능
- 실시간 검색 결과 표시
- 자동 완성 기능으로 빠른 검색 지원

### 2. 주가 차트 시각화
- 다양한 기간(일간, 주간, 월간) 선택 가능
- 다양한 범위(1개월, 6개월, 1년, 5년) 선택 가능
- 가격 및 거래량 차트 제공
- 이동평균선, 볼린저 밴드 등 기술적 지표 오버레이 가능

### 3. 기술적 분석 지표 시각화
- 단기, 중기, 장기 전망 제공
- 기술적 분석 점수 및 방향성 표시
- 섹터 및 시장 평균과의 비교 분석

### 4. 회사 성과 지표 시각화
- 회사의 성과 지표를 섹터 평균과 비교하는 레이더 차트
- 혁신성, 채용, 지속가능성 등 다양한 지표 포함
- 분기별, 연도별 성과 추이 분석

### 5. 반응형 디자인
- 모바일, 태블릿, 데스크톱 환경 모두 지원
- 다양한 화면 크기에 최적화된 레이아웃
- 다크 모드 지원으로 사용자 경험 향상

## 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 15.2.2
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4.0.14
- **상태 관리**: React Hooks
- **차트 라이브러리**: Recharts 2.15.1
- **아이콘**: Lucide React 0.482.0
- **UI 컴포넌트**: Radix UI

### 백엔드
- **API 라우팅**: Next.js API Routes
- **데이터 소스**: Yahoo Finance API
- **데이터 캐싱**: 서버 사이드 캐싱 메커니즘

### 배포
- **호스팅**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 설치 및 실행 방법

### 필수 요구사항
- Node.js 20.0.0 이상
- npm 10.0.0 이상 또는 pnpm 10.0.0 이상

### 로컬 개발 환경 설정

1. 프로젝트 클론
```bash
git clone <repository-url>
cd stock_app
```

2. 의존성 설치
```bash
npm install
# 또는
pnpm install
```

3. 개발 서버 실행
```bash
npm run dev
# 또는
pnpm dev
```

4. 브라우저에서 `http://localhost:3000` 접속

### 프로덕션 빌드

```bash
npm run build
npm run start
# 또는
pnpm build
pnpm start
```

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
├── public/
│   └── assets/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 최근 업데이트 내역

### 2025년 3월 15일
- Next.js 15.1.4에서 15.2.2로 업데이트
- Tailwind CSS 3.4.17에서 4.0.14로 업데이트
- Lucide React 0.364.0에서 0.482.0으로 업데이트
- Recharts 2.12.4에서 2.15.1로 업데이트
- PostCSS 구성 파일 업데이트 (Tailwind CSS 4.0 호환성)

- 반응형 디자인 개선
- 다크 모드 지원 추가
- 성능 최적화

- 초기 버전 출시
- 기본 주식 검색 및 차트 기능 구현
- 기술적 분석 지표 시각화 구현

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

3. **Tailwind CSS 4.0 관련 오류**
   - 오류: `Error: Cannot find module '@tailwindcss/postcss'`
   - 해결: `npm install @tailwindcss/postcss --save-dev` 명령어로 패키지 설치

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 연락처

프로젝트 관리자 - [이메일 주소]

프로젝트 링크: [GitHub 저장소 URL]

---

이 주식 리서치 웹사이트는 투자자들이 데이터 기반의 투자 결정을 내릴 수 있도록 도와주는 종합적인 도구입니다. 지속적인 개선과 업데이트를 통해 더 나은 사용자 경험을 제공하기 위해 노력하고 있습니다. 피드백과 기여는 언제나 환영합니다!
