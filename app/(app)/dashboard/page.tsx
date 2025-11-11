
'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mainUser, notes } from '@/lib/data';
import { format } from 'date-fns';
import { Icons } from '@/components/icons';
import { useEffect, useState } from 'react';
import type { Contest } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContests() {
      try {
        const response = await fetch('/api/contests');
        if (!response.ok) {
          throw new Error('Failed to fetch contests');
        }
        const data = await response.json();
        const formattedContests: Contest[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.event,
          platform: item.host,
          startTime: new Date(item.start),
          endTime: new Date(item.end),
          link: item.href,
          thumbnail: `https://picsum.photos/seed/${item.id}/400/200`,
        }));
        
        const upcomingContests = formattedContests
          .filter(c => c.startTime > new Date())
          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
          
        setContests(upcomingContests);
      } catch (err) {
        // For dashboard, we can fail silently or show a small error state
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Contests
            </CardTitle>
            <Icons.contests className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{contests.length}</div>}
            <p className="text-xs text-muted-foreground">
              New contests available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Notes</CardTitle>
            <Icons.notes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notes.length}</div>
            <p className="text-xs text-muted-foreground">
              Total notes created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="font-headline">Upcoming Contests</CardTitle>
              <CardDescription>
                Ready, set, code! Here are the upcoming challenges.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/contests">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contest</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Platform
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Starts At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                    Array.from({length: 5}).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                            <TableCell className="hidden xl:table-column"><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell className="hidden xl:table-column"><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                        </TableRow>
                    ))
                ) : (
                    contests.slice(0, 5).map(contest => (
                    <TableRow key={contest.id}>
                        <TableCell>
                        <div className="font-medium">{contest.name}</div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                        <Badge variant="outline">{contest.platform}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        {format(contest.startTime, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">{format(contest.startTime, 'p')}</TableCell>
                    </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Notes</CardTitle>
            <CardDescription>
              Quick access to your latest thoughts and solutions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            {notes.slice(0,4).map(note => (
                <div key={note.id} className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-md">
                        <Icons.notes className="h-5 w-5" />
                    </div>
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {note.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {note.tags.join(', ')}
                    </p>
                    </div>
                    <div className="ml-auto font-medium text-sm">{format(note.createdAt, 'MMM d')}</div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
