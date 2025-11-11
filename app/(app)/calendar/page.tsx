'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Swords, Calendar as CalendarIcon } from 'lucide-react';
import type { Contest } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  type: 'contest';
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContests() {
      try {
        const response = await fetch('/api/contests');
        if (!response.ok) {
          throw new Error('Failed to fetch contests');
        }
        const data = await response.json();
        const formattedEvents: CalendarEvent[] = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.event,
          date: new Date(item.start),
          type: 'contest' as const,
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchContests();
  }, []);

  const selectedDayEvents = date
    ? events.filter(
        event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  const eventDays = events.map(event => event.date);

  const getIcon = (type: 'contest') => {
    switch (type) {
      case 'contest':
        return <Swords className="h-4 w-4" />;
    }
  };

  const getColor = (type: 'contest') => {
    switch (type) {
      case 'contest':
        return 'bg-primary/20 text-primary-foreground';
    }
  };

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_400px] gap-6">
      <Card>
        <CardContent className="p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0"
            classNames={{
              day: 'h-12 w-12 text-base',
              head_cell: 'w-12',
              caption: 'flex items-center justify-between px-2 pt-2 relative',
              nav_button: 'h-8 w-8',
            }}
            modifiers={{ events: eventDays }}
            modifiersClassNames={{
              events:
                'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary',
            }}
            disabled={loading}
          />
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Events for {date ? format(date, 'MMMM d, yyyy') : '...'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-[calc(100vh-250px)]">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedDayEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDayEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div
                      className={cn(
                        'p-2 rounded-full mt-1',
                        getColor(event.type)
                      )}
                    >
                      {getIcon(event.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(event.date, 'p')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground pt-10">
                <CalendarIcon className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-4">No events scheduled for this day.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
