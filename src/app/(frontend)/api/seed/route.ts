import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { seedData } from '@/seed';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    
    // In production, require a strong secret
    const expectedSecret = process.env.PAYLOAD_SECRET || 'fallback-secret';
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized. Invalid seed token.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const reset = body.reset === true;
    const environment = body.environment || process.env.NODE_ENV || 'development';

    if (environment === 'production' && !body.force) {
      return NextResponse.json({ error: 'Seed operations are restricted in production unless "force": true is provided.' }, { status: 403 });
    }

    const payload = await getPayload({ config: configPromise });
    await seedData(payload, { reset, environment });

    return NextResponse.json({ success: true, message: 'Database successfully seeded.' });
  } catch (err: any) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
