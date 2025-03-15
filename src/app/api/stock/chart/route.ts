import { NextRequest, NextResponse } from 'next/server';
import { getStockChart } from '../../../../lib/yahooFinanceApi';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get('symbol');
  const interval = searchParams.get('interval') || '1d';
  const range = searchParams.get('range') || '1mo';

  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol parameter is required' },
      { status: 400 }
    );
  }

  try {
    const data = await getStockChart(symbol, interval as string, range as string);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching stock chart data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock chart data' },
      { status: 500 }
    );
  }
}
