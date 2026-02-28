import { adminDb } from '@/lib/firebase';
import { Download, Users } from 'lucide-react';
import ClientDownloadButton from '@/app/dashboard/ClientDownloadButton';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
    let members: any[] = [];
    let error = '';

    try {
        const snapshot = await adminDb.collection('growth_community_members')
            .orderBy('createdAt', 'desc')
            .get();

        // Safely map docs ensuring all fields are serializable
        members = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                gender: data.gender || '',
                interests: Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''),
                createdAt: data.createdAt || ''
            };
        });
    } catch (e: any) {
        console.error("Error fetching members:", e);
        error = "Failed to load members. " + e.message;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                            <Users className="w-8 h-8 text-indigo-600" />
                            Growth Community Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            View and manage community member submissions.
                        </p>
                    </div>

                    <ClientDownloadButton members={members} />
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Gender</th>
                                    <th className="p-4">Interests</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-400">
                                            No members found yet.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50 transition-colors text-sm text-gray-700">
                                            <td className="p-4 whitespace-nowrap">
                                                {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                                                <span className="block text-xs text-gray-400">
                                                    {member.createdAt ? new Date(member.createdAt).toLocaleTimeString() : ''}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold">{member.name}</td>
                                            <td className="p-4">{member.email}</td>
                                            <td className="p-4">{member.phone}</td>
                                            <td className="p-4">{member.gender}</td>
                                            <td className="p-4 max-w-xs truncate" title={member.interests}>
                                                {member.interests}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-400 text-center">
                        Showing {members.length} records • {new Date().toLocaleTimeString()}
                    </div>
                </div>

            </div>
        </div>
    );
}
