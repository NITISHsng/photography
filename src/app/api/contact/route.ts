import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: Request) {

  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.service || !body.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await client.connect();
    const db = client.db();
    const collection = db.collection('contactMessages');

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date()
    });

    return NextResponse.json({ message: 'Message received', id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('Error saving contact message:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
