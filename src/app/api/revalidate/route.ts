import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

async function handleRevalidation(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  // If a secret is configured in .env, verify it
  if (secret && secret !== 'your_secret') {
    const authHeader = req.headers.get('authorization');
    const secretHeader =
      req.headers.get('x-sanity-secret') || req.headers.get('x-webhook-secret');
    const querySecret = req.nextUrl.searchParams.get('secret');

    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    const providedSecret = token || secretHeader || querySecret;

    if (providedSecret !== secret) {
      return NextResponse.json(
        { message: 'Ungültiger Revalidierungs-Schlüssel (Unauthorized).' },
        { status: 401 }
      );
    }
  }

  try {
    // Revalidate all cached queries tagged with 'sanity' immediately
    revalidateTag('sanity', { expire: 0 });

    // Revalidate global root layout and all child routes
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'On-Demand ISR Revalidierung erfolgreich ausgeführt.',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        revalidated: false,
        message: 'Fehler bei der Revalidierung.',
        error: error?.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}
