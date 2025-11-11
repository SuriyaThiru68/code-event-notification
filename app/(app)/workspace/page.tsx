'use client';

import { useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mainUser } from '@/lib/data';

const initialCodeSnippet = `function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));
`;

export default function WorkspacePage() {
  const [code, setCode] = useState(initialCodeSnippet);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simple sandboxed evaluation
    try {
      const logOutput: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logOutput.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      };

      // Use a function constructor for a slightly safer eval
      const runnable = new Function(code);
      runnable();
      
      console.log = originalLog;
      setOutput(logOutput);

    } catch (error: any) {
      setOutput([`Error: ${error.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Collaborative Workspace
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={mainUser.avatar} />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
            <Play className="mr-2 h-4 w-4" /> {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>
      <Card className="flex-grow">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full rounded-lg border"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full flex-col p-4">
              <h2 className="font-semibold mb-2">File Explorer</h2>
              <div className="flex-grow text-sm text-muted-foreground">
                <p>problem.md</p>
                <p className="text-primary">solution.js</p>
                <p>test.js</p>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <div className="flex h-full flex-col">
                  <div className="py-2 px-4 border-b">
                    <span className="text-sm font-medium">solution.js</span>
                  </div>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-grow resize-none border-0 rounded-none focus-visible:ring-0 font-mono text-sm"
                    placeholder="Write your code here..."
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30}>
                <Tabs defaultValue="output" className="h-full flex flex-col">
                  <TabsList className="mx-4 mt-2 self-start">
                    <TabsTrigger value="output">Output</TabsTrigger>
                    <TabsTrigger value="terminal">Terminal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="output" className="flex-grow p-4 font-mono text-sm">
                    {output.map((line, index) => (
                      <p key={index}>&gt; {line}</p>
                    ))}
                  </TabsContent>
                  <TabsContent
                    value="terminal"
                    className="flex-grow p-4 font-mono text-sm"
                  >
                    <p className="text-muted-foreground">user@collabflow:~$</p>
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}
