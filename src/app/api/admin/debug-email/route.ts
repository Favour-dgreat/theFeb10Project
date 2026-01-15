import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export async function GET() {
    try {
        const q = query(collection(db, 'applications'), where('emailStatus', '==', 'FAILED'), limit(5));
        const snapshot = await getDocs(q);
        return NextResponse.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
