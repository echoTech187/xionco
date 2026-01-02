/* eslint-disable @typescript-eslint/no-explicit-any */

import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Aktifkan Edge Runtime yang direkomendasikan untuk streaming
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response('Message is required', { status: 400 });
    }

    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Gunakan generateContentStream untuk mendapatkan respons streaming
    const streamResult = await client.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    // Buat stream yang bisa dibaca oleh browser dari generator async
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamResult) {
          // Pastikan ada teks di dalam chunk dan kirimkan
          const text = chunk.text;
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    // Kembalikan stream sebagai respons
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);

    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        { error: 'Invalid API Key or Unauthorized' },
        { status: 401 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
