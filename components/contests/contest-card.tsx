import type { Contest } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '../icons';
import { format } from 'date-fns';
import ContestReminder from './contest-reminder';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ContestCardProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestCardProps) {
  const handleShare = (platform: 'whatsapp') => {
    const text = `Check out this coding contest!\n\n*${contest.name}* on *${contest.platform}*\n\nStarts: ${format(contest.startTime, "MMM d, yyyy 'at' p")}\n\nJoin here: ${contest.link}`;
    const encodedText = encodeURIComponent(text);

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }
  };



  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full bg-muted flex items-center justify-center">
          {contest.thumbnail.startsWith('/logos/') ? (
            <div className="text-2xl font-bold text-muted-foreground">{contest.platform}</div>
          ) : (
            <Image
              src={contest.thumbnail}
              alt={`Thumbnail for ${contest.name}`}
              fill
              className="object-cover"
              data-ai-hint="abstract technology"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{contest.platform}</Badge>
        <h3 className="font-semibold text-lg leading-tight truncate">{contest.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {format(contest.startTime, "MMM d, yyyy 'at' p")}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={contest.link} target="_blank">
            Go to Contest
          </Link>
        </Button>
        <div className='flex items-center gap-2'>
            <ContestReminder contest={contest} />
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className='h-9 w-9'>
                        <Icons.share className='h-4 w-4'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                        <Icons.whatsapp className='h-4 w-4' />
                        <span className='ml-2'>Share on WhatsApp</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
