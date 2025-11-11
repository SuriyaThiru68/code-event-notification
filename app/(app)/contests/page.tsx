'use client';

import { useState, useEffect } from 'react';
import { ContestCard } from '@/components/contests/contest-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import type { Contest } from '@/lib/types';
import { getLogo } from '@/lib/logo-map';

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          thumbnail: item.thumbnail_url || getLogo(item.host),
        }));
        
        const upcomingContests = formattedContests
          .filter(c => c.startTime > new Date())
          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
          
        setContests(upcomingContests);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Upcoming Coding Contests
      </h1>
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
          ))}
        </div>
      )}
      {error && (
         <Alert variant="destructive">
            <Icons.alertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {contests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
}

// Add alert-triangle to icons
import { AlertTriangle } from 'lucide-react';
Icons.alertTriangle = AlertTriangle;
