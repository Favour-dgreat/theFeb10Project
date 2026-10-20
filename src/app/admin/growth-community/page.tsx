import { adminDb } from '@/lib/firebase-admin';
import { Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ClientDownloadButton from './ClientDownloadButton';
import SendInviteButton from './SendInviteButton';

export const dynamic = 'force-dynamic';

export default async function AdminGrowthCommunityPage() {
    let members: any[] = [];
    let error = '';

    try {
        const snapshot = await adminDb.collection('growth_community_members')
            .orderBy('createdAt', 'desc')
            .get();

        members = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                gender: data.gender || '',
                interests: Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''),
                createdAt: data.createdAt || '',
                inviteSent: Boolean(data.inviteSent),
                inviteSentAt: data.inviteSentAt || null,
            };
        });
    } catch (e: any) {
        console.error("Error fetching members:", e);
        error = "Failed to load members: " + (e?.message || 'Unknown error');
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Link
                            href="/admin/dashboard"
                            className="inline-flex items-center gap-2 text-sm text-[#2e3b86] font-semibold hover:underline mb-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Admin Dashboard
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                            <Users className="w-8 h-8 text-[#2e3b86]" />
                            Growth Community Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            View member submissions and send WhatsApp community invitations.
                        </p>
                    </div>

                    <ClientDownloadButton members={members} />
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Gender</th>
                                    <th className="p-4">Interests</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-10 text-center text-gray-400">
                                            No community members found yet.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50/80 transition-colors text-sm text-gray-700">
                                            <td className="p-4 whitespace-nowrap">
                                                {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                                                <span className="block text-xs text-gray-400">
                                                    {member.createdAt ? new Date(member.createdAt).toLocaleTimeString() : ''}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold text-gray-900">{member.name}</td>
                                            <td className="p-4">{member.email}</td>
                                            <td className="p-4">{member.phone}</td>
                                            <td className="p-4">{member.gender}</td>
                                            <td className="p-4 max-w-xs truncate" title={member.interests}>
                                                {member.interests || 'None'}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <SendInviteButton member={member} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                        <span>Showing {members.length} records</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
