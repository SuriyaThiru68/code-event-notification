import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = new Date().toISOString();
    const url = `${process.env.CONTESTS_API_URL}&start__gt=${now}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `ApiKey ${process.env.CONTESTS_API_KEY}`
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contests: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const allowedHosts = [
      'leetcode.com',
      'codechef.com',
      'ctftime.org',
      'rmc25.kattis.com',
      'atcoder.jp',
      'projecteuler.net',
      'hackerrank.com',
      'hackerearth.com',
      'topcoder.com',
      'geeksforgeeks.org',
      'kaggle.com',
      'cses.fi',
      'interviewbit.com',
      'algoexpert.io',
      'exercism.org',
      'codewars.com',
      'codingame.com',
      'replit.com',
      'freecodecamp.org',
    ];

    const isEnglish = (str: string) => {
      return /^[\x00-\x7F]*$/.test(str);
    };

    const filteredContests = data.objects.filter((contest: any) => {
      const isAllowedHost = allowedHosts.some(host => contest.host.includes(host));
      const hasEnglishName = isEnglish(contest.event);
      return isAllowedHost && hasEnglishName;
    });

    return NextResponse.json(filteredContests);
  } catch (error) {
    console.error('[CONTESTS_API_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
