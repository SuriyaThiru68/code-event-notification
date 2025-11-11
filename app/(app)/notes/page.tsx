'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Edit, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Note type to include _id from MongoDB
interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
      if (data.length > 0) {
        setSelectedNote(data[0]);
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleNewNote = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Note', content: ' ', tags: [] }),
      });
      if (!response.ok) throw new Error('Failed to create note');
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setIsEditing(true);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string, tags: string[]) => {
    setIsSaving(true);
    try {
      // Ensure we have valid data before sending
      if (!id || !title) {
        throw new Error('Note ID and title are required');
      }

      console.log('Updating note:', { id, title, content, tags });
      
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content: content || ' ', 
          tags: tags || [] 
        }),
      });
      
      const data = await response.json();
      console.log('Update response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update note');
      }
      
      // Show success message
      toast({ 
        title: 'Success', 
        description: 'Note updated successfully'
      });
      
      await fetchNotes(); // Re-fetch to get updated data
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: (error as Error).message 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
        if (!id) {
          throw new Error('Note ID is required');
        }

        console.log('Deleting note:', id);
      
        const response = await fetch(`/api/notes/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
      
        const data = await response.json();
        console.log('Delete response:', data);
      
        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete note');
        }
      
        const newNotes = notes.filter(n => n._id !== id);
        setNotes(newNotes);
      
        if (selectedNote?._id === id) {
          setSelectedNote(newNotes.length > 0 ? newNotes[0] : null);
        }
      
        toast({ 
          title: 'Success', 
          description: 'Note deleted successfully.' 
        });
      } catch (error) {
        console.error('Error deleting note:', error);
        toast({ 
          variant: 'destructive', 
          title: 'Error', 
          description: (error as Error).message 
        });
      }
    };
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-2xl">My Notes</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleNewNote} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <PlusCircle className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent className="p-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {notes.map(note => (
                <button
                  key={note._id}
                  onClick={() => handleSelectNote(note)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-muted ${selectedNote?._id === note._id ? 'bg-muted' : ''}`}
                >
                  <p className="font-semibold truncate">{note.title}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(note.createdAt), 'MMM d, yyyy')}</p>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        {selectedNote ? (
          isEditing ? (
            <NoteEditor note={selectedNote} onSave={handleUpdateNote} onCancel={() => setIsEditing(false)} isSaving={isSaving} />
          ) : (
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {selectedNote.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <h2 className="text-2xl font-bold font-headline">{selectedNote.title}</h2>
                  <p className="text-sm text-muted-foreground">{format(new Date(selectedNote.updatedAt), "PPP 'at' p")}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteNote(selectedNote._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="prose prose-stone dark:prose-invert max-w-none flex-grow overflow-y-auto">
                {selectedNote.content.split('\n').map((line, i) => <p key={i}>{line || '\u00A0'}</p>)}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="mt-4 text-lg font-semibold">No note selected</h3>
            <p className="mt-1 text-sm text-muted-foreground">Select a note or create a new one to get started.</p>
            <Button className="mt-6" onClick={handleNewNote} disabled={isSaving}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Note
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

interface NoteEditorProps {
  note: Note;
  onSave: (id: string, title: string, content: string, tags: string[]) => void;
  onCancel: () => void;
  isSaving: boolean;
}

function NoteEditor({ note, onSave, onCancel, isSaving }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags.join(', '));

  const handleSave = () => {
    onSave(note._id, title, content, tags.split(',').map(t => t.trim()).filter(Boolean));
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="text-2xl font-bold font-headline border-0 shadow-none focus-visible:ring-0 px-0 mb-2"
        placeholder="Note title"
      />
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="flex-grow resize-none border-0 shadow-none focus-visible:ring-0 px-0"
        placeholder="Start writing your note..."
      />
      <Input
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="border-0 shadow-none focus-visible:ring-0 px-0 mt-2"
        placeholder="Tags (comma-separated)"
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Note
        </Button>
      </div>
    </div>
  );
}
