import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const format = searchParams.get('format');
        const onlyMissing = searchParams.get('onlyMissing') !== 'false';

        const snapshot = await getDocs(collection(db, 'applications'));

        let apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (onlyMissing) {
            apps = apps.filter(app => {
                const phone = (app.stage0?.phone || app.phone || "").trim();
                const invalidPlaceholders = ["", "n/a", "na", "none", "placeholder", "nil", "null"];
                return !phone || invalidPlaceholders.includes(phone.toLowerCase());
            });
        }

        const data = apps.map(app => ({
            applicationId: app.applicationId,
            name: `${app.firstName} ${app.surname}`,
            email: app.email,
            phone: app.stage0?.phone || app.phone || '',
            status: app.status || 'ENROLLED',
            joined: app.createdAt || ''
        }));

        if (format === 'csv') {
            const headers = ['Application ID', 'Name', 'Email', 'Phone', 'School', 'Status', 'Joined'];
            const rows = data.map(app => {
                const appData = apps.find(a => a.applicationId === app.applicationId);
                return [
                    app.applicationId,
                    `"${app.name}"`,
                    app.email,
                    app.phone,
                    `"${appData?.stage1?.school || ''}"`,
                    app.status,
                    app.joined
                ];
            });

            const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

            return new NextResponse(csvContent, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename="applicants_${onlyMissing ? 'missing_phone_' : ''}${Date.now()}.csv"`
                }
            });
        }

        return NextResponse.json({
            count: data.length,
            applicants: data
        });
    } catch (error) {
        console.error("Audit Error:", error);
        return NextResponse.json({ error: 'Failed to audit records' }, { status: 500 });
    }
}
