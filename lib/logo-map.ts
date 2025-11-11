export const platformLogos: { [key: string]: string } = {
  'leetcode.com': '/logos/leetcode.svg',
  'codechef.com': '/logos/codechef.svg',
  'ctftime.org': '/logos/ctftime.png',
  'kattis.com': '/logos/kattis.svg',
  'atcoder.jp': '/logos/atcoder.svg',
  'projecteuler.net': '/logos/projecteuler.png',
  'hackerrank.com': '/logos/hackerrank.svg',
  'hackerearth.com': '/logos/hackerearth.svg',
  'topcoder.com': '/logos/topcoder.svg',
  'geeksforgeeks.org': '/logos/geeksforgeeks.svg',
  'kaggle.com': '/logos/kaggle.svg',
  'cses.fi': '/logos/cses.svg',
  'interviewbit.com': '/logos/interviewbit.svg',
  'algoexpert.io': '/logos/algoexpert.svg',
  'exercism.org': '/logos/exercism.svg',
  'codewars.com': '/logos/codewars.svg',
  'codingame.com': '/logos/codingame.svg',
  'replit.com': '/logos/replit.svg',
  'freecodecamp.org': '/logos/freecodecamp.svg',
  'codeforces.com': '/logos/codeforces.svg',
};

export const getLogo = (host: string): string => {
  const lowerHost = host.toLowerCase();
  for (const key in platformLogos) {
    if (lowerHost.includes(key)) {
      return platformLogos[key];
    }
  }
  return '/logos/default.svg'; // A default fallback logo
};
