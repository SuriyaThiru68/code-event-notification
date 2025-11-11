'use client';

import { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { User } from '@/lib/types';
import { generateSummaryAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

export function ProfileSummary({ user }: { user: User }) {
  const { toast } = useToast();
  const [isSummaryPending, startSummaryTransition] = useTransition();
  const [summary, setSummary] = useState(user.profileSummary || '');
  
  const handleGenerateSummary = () => {
    startSummaryTransition(async () => {
      const result = await generateSummaryAction({ skills: user.skills, experience: user.experience });
      if (result.success && result.summary) {
        setSummary(result.summary);
        toast({
          title: 'Summary Generated!',
          description: 'Your new AI-powered profile summary is ready.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card>
        <CardHeader className="flex flex-row items-start justify-between">
            <div>
                <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-primary"/> AI Profile Summary
                </CardTitle>
                <CardDescription>Let AI craft a professional summary for you based on your profile.</CardDescription>
            </div>
            <Button type="button" onClick={handleGenerateSummary} disabled={isSummaryPending}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isSummaryPending ? 'Generating...' : 'Generate'}
            </Button>
        </CardHeader>
        <CardContent>
            <Textarea
                readOnly
                value={summary || "Click 'Generate' to create your summary based on your skills and experience from the 'Edit Profile' tab."}
                className="min-h-[150px] bg-muted/50 italic"
            />
        </CardContent>
    </Card>
  );
}
