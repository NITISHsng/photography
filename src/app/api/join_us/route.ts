import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
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

  const collection=await getCollection('joinUsApplicants');
    const result = await collection.insertOne({
      ...formData,
    });

    return NextResponse.json({ message: 'Application submitted', id: result.insertedId }, { status: 201 });

  } catch (err) {
    console.error('Error saving application:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}