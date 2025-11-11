import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// GET /api/notes/[id] - Fetch a single note
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('eventnotify');
    const notesCollection = db.collection('notes');
    const note = await notesCollection.findOne({ _id: new ObjectId(id) });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('Failed to fetch note:', error);
    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
  }
}

// PUT /api/notes/[id] - Update a note
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, tags } = body;
    console.log(`[NOTES][PUT] Request id: ${id}, body:`, body);
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db('eventnotify');
    const notesCollection = db.collection('notes');
    const updatedNote = {
      title,
      content: content || ' ',
      tags: tags || [],
      updatedAt: new Date(),
    };
    const result = await notesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedNote }
    );
    console.log('[NOTES][PUT] Update result:', result);
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json({
      message: 'Note updated successfully',
      note: { _id: id, ...updatedNote },
    });
  } catch (error) {
    console.error('Failed to update note:', error);
    let errorMessage = 'Failed to update note';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE /api/notes/[id] - Delete a note
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db('eventnotify');
    const notesCollection = db.collection('notes');
    const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });
    console.log('[NOTES][DELETE] Delete result:', result);
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
