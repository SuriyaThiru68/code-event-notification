
'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { mainUser } from '@/lib/data';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Github,
  Info,
  Linkedin,
  Save,
  X,
  Mail,
  MapPin,
  GraduationCap,
  Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ratingData = [
  { month: 'Jan', rating: 1400 },
  { month: 'Feb', rating: 1420 },
  { month: 'Mar', rating: 1450 },
  { month: 'Apr', rating: 1480 },
  { month: 'May', rating: 1470 },
  { month: 'Jun', rating: 1460 },
  { month: 'Jul', rating: 1490 },
  { month: 'Aug', rating: 1510 },
  { month: 'Sep', rating: 1550 },
  { month: 'Oct', rating: 1530 },
  { month: 'Nov', rating: 1540 },
  { month: 'Dec', rating: 1560 },
];

const fundamentalsData = [
  { name: 'GFG', value: 5 },
  { name: 'HackerRank', value: 25 },
];

const dsaData = [
    { name: 'Easy', value: 257 },
    { name: 'Medium', value: 109 },
    { name: 'Hard', value: 6 },
];

const FUNDAMENTALS_COLORS = ['#4ade80', '#2dd4bf'];
const DSA_COLORS = ['#4ade80', '#facc15', '#f87171'];

const initialProblemSolvingStats = [
    { name: 'LeetCode', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/leetcode.svg', url: '#' },
    { name: 'GeeksForGeeks', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/geeksforgeeks.svg', url: '#' },
    { name: 'CodeChef', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/codechef.svg', url: '#' },
    { name: 'HackerRank', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/hackerrank.svg', url: '#' },
];

type PlatformLink = {
  name: string;
  url: string;
  icon: string;
};

const platformIcons: { [key: string]: string } = {
    leetcode: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/leetcode.svg',
    hackerrank: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/hackerrank.svg',
    codechef: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/codechef.svg',
    geeksforgeeks: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/geeksforgeeks.svg',
    codeforces: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/codeforces.svg',
    topcoder: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/topcoder.svg',
    atcoder: 'https://static.atcoder.jp/assets/favicon.png',
    github: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg',
    default: 'https://www.google.com/s2/favicons?sz=64&domain_url=example.com'
};

export default function ProfilePage() {
  const [problemSolvingStats, setProblemSolvingStats] = useState(initialProblemSolvingStats);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(mainUser.experience);
  const [user, setUser] = useState(mainUser);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  const handleAddPlatform = () => {
    if (newPlatformName && newPlatformUrl) {
      const lowerCaseName = newPlatformName.toLowerCase().replace(/\s/g, '');
      const icon = platformIcons[lowerCaseName] || `https://www.google.com/s2/favicons?sz=64&domain_url=${newPlatformUrl}`;
      
      const newPlatform: PlatformLink = {
        name: newPlatformName,
        url: newPlatformUrl,
        icon: icon,
      };
      setProblemSolvingStats([...problemSolvingStats, newPlatform]);
      setNewPlatformName('');
      setNewPlatformUrl('');
      setIsDialogOpen(false);
    }
  };

  const handleSaveDescription = () => {
    setUser({ ...user, experience: description });
    setIsEditingDescription(false);
  };
  const handleCancelEditDescription = () => {
    setDescription(user.experience);
    setIsEditingDescription(false);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Sidebar */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
              <AvatarImage src={user.avatar} alt={`@${user.name}`} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className='flex items-center gap-2'>
                <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">@SURIYA_T</p>
            <div className="flex items-center gap-4 mt-4">
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-left w-full mt-6 space-y-2 text-sm text-muted-foreground">
                <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4'/>
                    <span>India</span>
                </div>
                 <div className='flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4'/>
                    <span>Kalaignar Karunanidhi Institute...</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex-row items-center justify-between p-4'>
                <CardTitle className='text-base font-semibold'>Problem Solving Stats</CardTitle>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Add Platform</DialogTitle>
                        <DialogDescription>
                            Add a new coding platform link to your profile.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="platform-name" className="text-right">
                            Platform
                            </Label>
                            <Input
                            id="platform-name"
                            value={newPlatformName}
                            onChange={(e) => setNewPlatformName(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g., LeetCode"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="platform-url" className="text-right">
                            URL
                            </Label>
                            <Input
                            id="platform-url"
                            value={newPlatformUrl}
                            onChange={(e) => setNewPlatformUrl(e.target.value)}
                            className="col-span-3"
                            placeholder="https://leetcode.com/username"
                            />
                        </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddPlatform}>Add Platform</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className='p-4 pt-0'>
                <div className='space-y-2'>
                {problemSolvingStats.map(stat => (
                    <a key={stat.name} href={stat.url} target="_blank" rel="noopener noreferrer" className='flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted'>
                        <div className='flex items-center gap-2'>
                            <img src={stat.icon} className='h-5 w-5' alt={stat.name}/>
                            <span>{stat.name}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <ArrowUpRight className='h-4 w-4 text-muted-foreground'/>
                        </div>
                    </a>
                ))}
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader className='flex-row items-center justify-between p-4'>
                <CardTitle className='text-base font-semibold'>Development Stats</CardTitle>
                <ChevronDown className='h-5 w-5'/>
            </CardHeader>
        </Card>

      </div>

      {/* Main Content */}
      <div className="lg:col-span-9 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className='pb-2'>
                <CardDescription className='flex items-center justify-between'>
                    <span>Total Questions</span>
                    <Info className='h-4 w-4'/>
                </CardDescription>
                <CardTitle className="text-4xl font-bold">1,094</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
                <CardDescription className='flex items-center justify-between'>
                    <span>Total Active Days</span>
                    <Info className='h-4 w-4'/>
                </CardDescription>
                <CardTitle className="text-4xl font-bold">294</CardTitle>
            </CardHeader>
          </Card>
          <Card className='md:col-span-1'>
             <CardHeader className='pb-2'>
                <CardDescription>Submissions</CardDescription>
                <CardTitle className="text-sm font-normal">1226 | Max.Streak 208</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
                {/* Placeholder for heatmap */}
                <div className="h-[50px] bg-muted rounded-b-lg flex items-center justify-center text-xs text-muted-foreground">
                    Submission Heatmap Placeholder
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className='md:col-span-2'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Total Contests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='text-5xl font-bold'>54</div>
                    <div className='mt-4 space-y-2 text-sm'>
                        <div className='flex justify-between items-center p-2 rounded-md bg-muted/50'>
                            <span className='flex items-center gap-2'><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/leetcode.svg" className='h-4 w-4'/> LeetCode</span>
                            <span className='font-semibold'>2</span>
                        </div>
                        <div className='flex justify-between items-center p-2 rounded-md bg-muted/50'>
                            <span className='flex items-center gap-2'><img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/codechef.svg" className='h-4 w-4'/> CodeChef</span>
                            <span className='font-semibold'>52</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className='md:col-span-3'>
                 <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Problems Solved</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='grid grid-cols-2 gap-6'>
                        <div>
                             <h3 className='font-semibold mb-2 flex items-center gap-1'>Fundamentals <Info className='h-3 w-3'/></h3>
                             <div className='flex items-center gap-4'>
                                <div className='relative h-24 w-24'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={fundamentalsData} cx="50%" cy="50%" innerRadius={30} outerRadius={40} dataKey="value" stroke="none">
                                                {fundamentalsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={FUNDAMENTALS_COLORS[index % FUNDAMENTALS_COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className='absolute inset-0 flex items-center justify-center text-lg font-bold'>30</div>
                                </div>
                                <div className='space-y-2 text-sm w-full'>
                                    <div className='flex justify-between'><span><Badge className='bg-green-200 text-green-800 mr-2'/>GFG</span> <span>5</span></div>
                                    <div className='flex justify-between'><span><Badge className='bg-teal-200 text-teal-800 mr-2'/>HackerRank</span> <span>25</span></div>
                                </div>
                             </div>
                        </div>
                        <div>
                             <h3 className='font-semibold mb-2'>DSA</h3>
                             <div className='flex items-center gap-4'>
                                <div className='relative h-24 w-24'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={dsaData} cx="50%" cy="50%" innerRadius={30} outerRadius={40} dataKey="value" stroke="none">
                                                {dsaData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={DSA_COLORS[index % DSA_COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className='absolute inset-0 flex items-center justify-center text-lg font-bold'>372</div>
                                </div>
                                <div className='space-y-2 text-sm w-full'>
                                    <div className='flex justify-between'><span><Badge className='bg-green-200 text-green-800 mr-2'/>Easy</span> <span>257</span></div>
                                    <div className='flex justify-between'><span><Badge className='bg-yellow-200 text-yellow-800 mr-2'/>Medium</span> <span>109</span></div>
                                    <div className='flex justify-between'><span><Badge className='bg-red-200 text-red-800 mr-2'/>Hard</span> <span>6</span></div>
                                </div>
                             </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rating</CardTitle>
            <CardDescription>12 Apr 2025 - Biweekly Contest 154 - Rank: 16950</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ratingData}>
                <defs>
                    <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 20', 'dataMax + 20']} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rating"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorRating)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-12">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>About Me</CardTitle>
                {!isEditingDescription && (
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingDescription(true)}>
                        <Github className="h-4 w-4" />
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isEditingDescription ? (
                    <div className="space-y-4">
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md min-h-[120px]"/>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={handleCancelEditDescription}><X className="h-4 w-4 mr-2" />Cancel</Button>
                            <Button onClick={handleSaveDescription}><Save className="h-4 w-4 mr-2" />Save</Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground">{user.experience}</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
