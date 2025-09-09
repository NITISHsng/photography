import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const requiredFields = [ 
      'name',
      'email',
      'phone',
      'age', // Added
      'gender', // Added
      'role',
      'experience',
      // 'portfolio',
      'location',
      'availability',
      'expectedSalary',
      'resumeLink', // Added
      'agree', // Added
      'message',
      // 'skills',
      'pincode', // Added
      'district', // Added
      'state', // Added
      'country' // Added
    ];

    // ✅ Validate required fields
    for (const field of requiredFields) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return NextResponse.json({ error: `Missing or empty field: ${field}` }, { status: 400 });
      }
    }

    await client.connect();
    const db = client.db();
    const collection = db.collection('joinUsApplicants');

    const result = await collection.insertOne({
      ...formData,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Application submitted', id: result.insertedId }, { status: 201 });

  } catch (err) {
    console.error('Error saving application:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}