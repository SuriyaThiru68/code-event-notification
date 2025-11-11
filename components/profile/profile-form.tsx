'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  skills: z.string().min(10, 'Please list at least a few skills.'),
  experience: z.string().min(50, 'Please describe your experience in more detail (min. 50 characters).'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      skills: user.skills,
      experience: user.experience,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    startTransition(() => {
      // Here you would typically save the data to your backend.
      // For this example, we'll just show a toast.
      console.log(data);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully saved.',
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React, Node.js, Python, SQL" {...field} />
              </FormControl>
              <FormDescription>
                A comma-separated list of your technical skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your professional journey..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe your work experience, projects, and accomplishments.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
