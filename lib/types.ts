export type User = {
  name: string;
  avatar: string;
  email: string;
  skills: string;
  experience: string;
  profileSummary?: string;
};

export type Contest = {
  id: string;
  name: string;
  platform: string;
  startTime: Date;
  endTime: Date;
  link: string;
  thumbnail: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  tags: string[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  type: 'contest' | 'deadline' | 'personal';
};

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};
