import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// GET /api/notes - Fetch all notes
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('eventnotify');
    const notesCollection = db.collection('notes');
    const notes = await notesCollection.find({}).sort({ createdAt: -1 }).toArray();
    console.log('[NOTES][GET] notes count:', notes.length);
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// POST /api/notes - Create a new note
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[NOTES][POST] Incoming body:', body);
    const { title, content, tags } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const sanitizedContent = content || ' ';
    const client = await clientPromise;
    const db = client.db('eventnotify');
    const notesCollection = db.collection('notes');

    const newNote = {
      title,
      content: sanitizedContent,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await notesCollection.insertOne(newNote);
    console.log('[NOTES][POST] Inserted note _id:', result.insertedId);

    return NextResponse.json({ message: 'Note saved successfully', ...newNote, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Failed to save note:', error);
    let errorMessage = 'Failed to save note';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
