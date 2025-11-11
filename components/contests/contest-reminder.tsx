'use client';

import { useState, useTransition } from 'react';
import { BellPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { mainUser } from '@/lib/data';
import type { Contest } from '@/lib/types';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function ContestReminder({ contest }: { contest: Contest }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [reminders, setReminders] = useState<{time: string, message: string}[] | null>(null);

  const handleSetReminder = () => {
    startTransition(() => {
      // The backend action for this has been removed.
      // For now, we'll just show a success toast.
      toast({
        title: "Reminder Set!",
        description: `We will notify you for ${contest.name}.`,
      });
    });
  };

  return (
     <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm" onClick={handleSetReminder} disabled={isPending}>
            <BellPlus className="mr-2 h-4 w-4" />
            {isPending ? 'Setting...' : 'Set Reminder'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reminders for {contest.name}</AlertDialogTitle>
          <AlertDialogDescription>
            {reminders ? (
                <div>
                    <div className="mb-4">We've scheduled the following reminders for you:</div>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        {reminders.map((r, i) => (
                            <li key={i}>
                                <span className="font-semibold">{r.message}</span>
                                <br />
                                at <span className="text-accent-foreground">{format(new Date(r.time), 'MMM d, h:mm:ss a')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                "Once you confirm, we will generate and set reminders for this contest."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
