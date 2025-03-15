import { NextRequest, NextResponse } from 'next/server';
import { getSecFilings } from '../../../../lib/yahooFinanceApi';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol parameter is required' },
      { status: 400 }
    );
  }

  try {
    const data = await getSecFilings(symbol);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching SEC filing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEC filing data' },
      { status: 500 }
    );
  }
}
