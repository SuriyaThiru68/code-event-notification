import type { User, Contest, Note, CalendarEvent, Todo } from './types';
import { getLogo } from './logo-map';

export const mainUser: User = {
  name: 'SURIYA',
  avatar: 'https://picsum.photos/seed/mainuser/100/100',
  email: 'suriyathiru666@gmail.com',
  skills: 'Next.js, TypeScript, Tailwind CSS, GenAI, Python',
  experience: '5 years of experience in full-stack development, specializing in building scalable web applications with modern technologies. Passionate about AI integration and creating seamless user experiences.',
};

export const contests: Contest[] = [
  {
    id: '1',
    name: 'Weekly Contest 350',
    platform: 'LeetCode',
    startTime: new Date('2025-07-20T10:30:00'),
    endTime: new Date('2025-07-20T12:00:00'),
    link: '#',
    thumbnail: getLogo('leetcode.com'),
  },
  {
    id: '2',
    name: 'CodeChef Starters 101',
    platform: 'CodeChef',
    startTime: new Date('2025-07-22T20:00:00'),
    endTime: new Date('2025-07-22T22:00:00'),
    link: '#',
    thumbnail: getLogo('codechef.com'),
  },
  {
    id: '3',
    name: 'Codeforces Round #886 (Div. 2)',
    platform: 'Codeforces',
    startTime: new Date('2025-07-24T17:35:00'),
    endTime: new Date('2025-07-24T19:35:00'),
    link: '#',
    thumbnail: getLogo('codeforces.com'),
  },
  {
    id: '4',
    name: 'ProjectEuler+ Contest',
    platform: 'HackerRank',
    startTime: new Date('2025-07-25T00:00:00'),
    endTime: new Date('2025-08-01T00:00:00'),
    link: '#',
    thumbnail: getLogo('hackerrank.com'),
  },
  {
    id: '5',
    name: 'HackerEarth Data Science Challenge',
    platform: 'HackerEarth',
    startTime: new Date('2025-07-19T18:00:00'),
    endTime: new Date('2025-07-26T18:00:00'),
    link: '#',
    thumbnail: getLogo('hackerearth.com'),
  },
  {
    id: '6',
    name: 'AtCoder Beginner Contest 300',
    platform: 'AtCoder',
    startTime: new Date('2025-07-21T12:00:00'),
    endTime: new Date('2025-07-21T13:40:00'),
    link: '#',
    thumbnail: getLogo('atcoder.jp'),
  },
  {
    id: '7',
    name: 'TopCoder SRM 850',
    platform: 'TopCoder',
    startTime: new Date('2025-07-27T12:00:00'),
    endTime: new Date('2025-07-27T13:30:00'),
    link: '#',
    thumbnail: getLogo('topcoder.com'),
  },
  {
    id: '8',
    name: 'GeeksforGeeks Job-a-Thon',
    platform: 'GeeksforGeeks',
    startTime: new Date('2025-07-23T20:00:00'),
    endTime: new Date('2025-07-23T23:00:00'),
    link: '#',
    thumbnail: getLogo('geeksforgeeks.org'),
  },
];

export const notes: Note[] = [
  {
    id: 'note-1',
    title: 'Dynamic Programming Patterns',
    content: 'Review common DP patterns: \n- Fibonacci sequence\n- Knapsack problem\n- Longest common subsequence',
    createdAt: new Date('2025-07-17T10:00:00'),
    tags: ['algorithms', 'interview-prep'],
  },
  {
    id: 'note-2',
    title: 'Next.js 15 Features',
    content: 'Explore new features in Next.js 15, especially the improved React Compiler and caching strategies.',
    createdAt: new Date('2025-07-15T14:30:00'),
    tags: ['nextjs', 'web-dev'],
  },
];

export const initialTodos: Todo[] = [
    { id: 'todo-1', text: 'Prepare for CodeForces Round #950', completed: false },
    { id: 'todo-2', text: 'Finish workspace UI implementation', completed: false },
    { id: 'todo-3', text: 'Review graph theory for interviews', completed: true },
    { id: 'todo-4', text: 'Set up new GenAI flow for code suggestions', completed: false },
];


export const calendarEvents: CalendarEvent[] = [
  ...contests.map(c => ({
    id: `contest-${c.id}`,
    title: c.name,
    date: c.startTime,
    type: 'contest' as const,
  })),
  {
    id: 'deadline-1',
    title: 'Project Alpha Deadline',
    date: new Date('2025-07-26T23:59:59'),
    type: 'deadline',
  },
];
