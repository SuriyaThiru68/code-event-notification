import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { note } = req.body;

    if (!note) {
      return res.status(400).json({ error: 'Note content is required' });
    }

    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri, {});

    try {
      await client.connect();
      const database = client.db('eventnotify');
      const notesCollection = database.collection('notes');

      const result = await notesCollection.insertOne({ note, createdAt: new Date() });

      res.status(201).json({ message: 'Note saved successfully', insertedId: result.insertedId });
    } catch (error) {
      console.error('Failed to save note:', error);
      res.status(500).json({ error: 'Failed to save note' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
