'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { initialTodos } from '@/lib/data';
import type { Todo } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;
    const newTodo: Todo = {
      id: `todo-${Date.now()}`,
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setNewTodoText('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Todo List
        </h1>

        <Card>
            <CardHeader>
                 <div className="flex gap-2">
                    <Input
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTodo(); } }}
                        placeholder="What needs to be done?"
                    />
                    <Button onClick={handleAddTodo}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='mb-4 text-sm text-muted-foreground'>
                    {pendingCount} pending &bull; {completedCount} completed
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-3">
                        {todos.map(todo => (
                            <div key={todo.id} className="flex items-center gap-3 rounded-lg p-3 bg-muted/50">
                                <Checkbox
                                    id={`todo-${todo.id}`}
                                    checked={todo.completed}
                                    onCheckedChange={() => handleToggleTodo(todo.id)}
                                />
                                <label
                                    htmlFor={`todo-${todo.id}`}
                                    className={cn(
                                        "flex-1 text-sm cursor-pointer",
                                        todo.completed && "line-through text-muted-foreground"
                                    )}
                                >
                                    {todo.text}
                                </label>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    </div>
  );
}
