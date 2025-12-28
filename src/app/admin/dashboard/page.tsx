'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all'); // all, stage1, stage2, winners

    // Simple Auth
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple hardcoded password for MVP
            setIsAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
        } else {
            alert('Invalid Password');
        }
    };

    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth');
        if (isAuth) setIsAuthenticated(true);
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;

        const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setApplications(apps);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    // Actions
    const handleInviteStage2 = async (appId: string) => {
        if (!confirm('Are you sure you want to invite this applicant to Stage 2?')) return;

        try {
            const res = await fetch('/api/admin/invite-stage2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId: appId })
            });
            if (res.ok) alert('Invitation sent successfully!');
            else alert('Failed to send invitation');
        } catch (e) {
            console.error(e);
            alert('Error sending invitation');
        }
    };

    const handleSelectWinner = async (appId: string) => {
        if (!confirm('CONFIRM: Select this applicant as a WINNER? This will send the final email.')) return;

        try {
            const res = await fetch('/api/admin/select-winner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId: appId })
            });
            if (res.ok) alert('Winner selected and notified!');
            else alert('Failed to process winner selection');
        } catch (e) {
            console.error(e);
            alert('Error processing winner');
        }
    };

    // Filtering
    const filteredApps = applications.filter(app => {
        if (activeTab === 'all') return true;
        if (activeTab === 'stage1') return app.status === 'STAGE_1_SUBMITTED';
        if (activeTab === 'stage2') return app.status === 'UNDER_REVIEW' || app.status === 'STAGE_2_INVITED'; // Show opened and submitted stage 2
        if (activeTab === 'winners') return app.status === 'SELECTED_WINNER';
        return true;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Admin Login</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded mb-4"
                        placeholder="Enter Admin Password"
                    />
                    <button className="w-full bg-blue-900 text-white p-3 rounded font-bold">Access Dashboard</button>
                    <p className="text-xs text-gray-400 mt-4 text-center">Hint: admin123</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-[#1a237e] text-white p-6 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">FEB10 Admin Dashboard</h1>
                        <p className="text-blue-200 text-sm">Managing {applications.length} applications</p>
                    </div>
                    <button onClick={() => { localStorage.removeItem('admin_auth'); setIsAuthenticated(false); }} className="text-sm bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">Logout</button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Total Enrolled</h3>
                        <p className="text-3xl font-black text-gray-800">{applications.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Stage 1 Pending</h3>
                        <p className="text-3xl font-black text-gray-800">{applications.filter(a => a.status === 'STAGE_1_SUBMITTED').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Stage 2 Submitted</h3>
                        <p className="text-3xl font-black text-gray-800">{applications.filter(a => a.stage2?.status === 'UNDER_REVIEW').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Selected Winners</h3>
                        <p className="text-3xl font-black text-gray-800">{applications.filter(a => a.status === 'SELECTED_WINNER').length}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {['all', 'stage1', 'stage2', 'winners'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === tab ? 'bg-[#1a237e] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            {tab === 'all' && 'All Applications'}
                            {tab === 'stage1' && 'Review Stage 1'}
                            {tab === 'stage2' && 'Review Stage 2'}
                            {tab === 'winners' && 'Final Winners'}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Applicant</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stage 1 Info</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stage 2 Info</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading data...</td></tr>
                                ) : filteredApps.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">No applications found in this category.</td></tr>
                                ) : (
                                    filteredApps.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900">{app.firstName} {app.surname}</div>
                                                <div className="text-xs text-gray-500">{app.email}</div>
                                                <div className="text-xs font-mono text-gray-400 mt-1">{app.applicationId}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'SELECTED_WINNER' ? 'bg-green-100 text-green-700' :
                                                        app.status === 'STAGE_2_INVITED' ? 'bg-purple-100 text-purple-700' :
                                                            app.status === 'STAGE_1_SUBMITTED' ? 'bg-yellow-100 text-yellow-800' :
                                                                app.stage2?.status === 'UNDER_REVIEW' ? 'bg-orange-100 text-orange-800' :
                                                                    'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {app.stage2?.status === 'UNDER_REVIEW' ? 'S2 SUBMITTED' : app.status?.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 max-w-xs">
                                                {app.stage1 ? (
                                                    <div>
                                                        <div className="font-semibold">{app.stage1.department} ({app.stage1.level}L)</div>
                                                        <div>CGPA: {app.stage1.cgpa}</div>
                                                        <details className="mt-1 cursor-pointer text-blue-600 text-xs">
                                                            <summary>Read Essay</summary>
                                                            <p className="mt-1 p-2 bg-gray-100 rounded text-gray-700 italic">{app.stage1.essay}</p>
                                                        </details>
                                                    </div>
                                                ) : <span className="text-gray-400 italic">Not started</span>}
                                            </td>
                                            <td className="p-4 text-sm max-w-xs">
                                                {app.stage2?.files ? (
                                                    <div className="space-y-1">
                                                        {Object.entries(app.stage2.files).map(([key, url]: any) => (
                                                            <a href={url} target="_blank" key={key} className="block text-blue-600 hover:underline text-xs truncate">
                                                                📄 {key}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : <span className="text-gray-400 italic text-xs">No files</span>}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col space-y-2">
                                                    {app.status === 'STAGE_1_SUBMITTED' && (
                                                        <button
                                                            onClick={() => handleInviteStage2(app.applicationId)}
                                                            className="bg-[#1a237e] text-white px-3 py-2 rounded text-xs font-bold hover:bg-blue-900"
                                                        >
                                                            Invite Stage 2
                                                        </button>
                                                    )}

                                                    {app.stage2?.status === 'UNDER_REVIEW' && app.status !== 'SELECTED_WINNER' && (
                                                        <button
                                                            onClick={() => handleSelectWinner(app.applicationId)}
                                                            className="bg-green-600 text-white px-3 py-2 rounded text-xs font-bold hover:bg-green-700"
                                                        >
                                                            Select Winner
                                                        </button>
                                                    )}

                                                    {app.status === 'ENROLLED' && (
                                                        <span className="text-xs text-gray-400">Waiting for Stage 1</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
