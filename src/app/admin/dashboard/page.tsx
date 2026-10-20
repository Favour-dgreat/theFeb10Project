'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all'); // all, stage1, stage2, winners
    const [searchTerm, setSearchTerm] = useState('');

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
    const handleInviteStage1 = async (appId: string) => {
        if (!confirm('Send Stage 1 invitation/reminder to this applicant?')) return;

        try {
            const res = await fetch('/api/admin/invite-stage1', {
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

    const exportToCSV = (data: any[], filename = 'export.csv') => {
        if (data.length === 0) {
            alert('No data to export');
            return;
        }

        const headers = [
            'Application ID', 'Name', 'Email', 'Phone', 'Status', 'Joined',
            'School', 'Department', 'Matric Number', 'Level', 'CGPA', 'Essay',
            'S2: Student ID', 'S2: Transcript', 'S2: Admission Letter', 'S2: Govt ID',
            'S2: Fees Proof', 'S2: Passport', 'S2: Financial Need', 'S2: Other Docs'
        ];
        const csvRows = [
            headers.join(','),
            ...data.map(app => [
                app.applicationId,
                `"${app.firstName} ${app.surname}"`,
                app.email,
                app.stage0?.phone || app.phone || '',
                app.status,
                app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '',
                `"${(app.stage1?.school || '').replace(/"/g, '""')}"`,
                `"${(app.stage1?.department || '').replace(/"/g, '""')}"`,
                app.stage1?.matricNumber || '',
                app.stage1?.level || '',
                app.stage1?.cgpa || '',
                `"${(app.stage1?.essay || '').replace(/"/g, '""')}"`,
                app.stage2?.files?.studentId || '',
                app.stage2?.files?.transcript || '',
                app.stage2?.files?.admissionLetter || '',
                app.stage2?.files?.govtId || '',
                app.stage2?.files?.feesProof || '',
                app.stage2?.files?.passport || '',
                app.stage2?.files?.financialNeed || '',
                app.stage2?.files?.otherDocs || ''
            ].join(','))
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Filtering
    const filteredApps = applications.filter(app => {
        // Tab Filter
        let matchesTab = true;
        if (activeTab === 'stage1') matchesTab = app.status === 'STAGE_1_SUBMITTED';
        else if (activeTab === 'stage2') matchesTab = app.status === 'UNDER_REVIEW' || app.status === 'STAGE_2_INVITED';
        else if (activeTab === 'winners') matchesTab = app.status === 'SELECTED_WINNER';

        // Search Filter (Email)
        const matchesSearch = app.email?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
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
                    <div className="flex items-center space-x-4">
                        <div className="text-right mr-4">
                            <h1 className="text-2xl font-bold">FEB10 Admin Dashboard</h1>
                            <p className="text-blue-200 text-sm">Managing {applications.length} applications</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                href="/admin/growth-community"
                                className="bg-[#f06436] hover:bg-[#d95328] text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2"
                            >
                                👥 Growth Community
                            </Link>
                            <button
                                onClick={() => exportToCSV(filteredApps, `applicants_${activeTab}_${Date.now()}.csv`)}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2"
                            >
                                📊 Export {activeTab.toUpperCase()} CSV
                            </button>
                            <button
                                onClick={() => window.open('/api/admin/audit-phones?format=csv&onlyMissing=true')}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2"
                            >
                                ⚠️ Missing Phones CSV
                            </button>
                        </div>
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

                {/* Tabs & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                        {['all', 'stage1', 'stage2', 'winners'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#1a237e] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                {tab === 'all' && 'All Applications'}
                                {tab === 'stage1' && 'Review Stage 1'}
                                {tab === 'stage2' && 'Review Stage 2'}
                                {tab === 'winners' && 'Final Winners'}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-grow md:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full text-black pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Applicant</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stage 0 Info</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stage 1 Info</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stage 2 Info</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">S0 Email</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">S1 Email</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">S2 Email</th>
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
                                                <div className="text-xs text-gray-600">
                                                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '-'}
                                                </div>
                                                <div className="text-[10px] text-gray-400">
                                                    {app.createdAt ? new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'SELECTED_WINNER' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'STAGE_2_INVITED' ? 'bg-purple-100 text-purple-700' :
                                                        app.status === 'STAGE_1_INVITED' ? 'bg-blue-100 text-blue-700' :
                                                            app.status === 'STAGE_1_SUBMITTED' ? 'bg-yellow-100 text-yellow-800' :
                                                                app.stage2?.status === 'UNDER_REVIEW' ? 'bg-orange-100 text-orange-800' :
                                                                    'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {app.stage2?.status === 'UNDER_REVIEW' ? 'S2 SUBMITTED' : app.status?.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                <div className="font-semibold text-gray-900">{app.firstName} {app.stage0?.middleName ? `${app.stage0.middleName} ` : ''}{app.surname}</div>
                                                <div className="text-xs text-blue-600">{app.email}</div>
                                                {app.stage0 && (
                                                    <div className="mt-2 text-[10px] space-y-0.5 border-t pt-2">
                                                        <div className="flex justify-between"><span>Phone:</span> <span className="font-medium text-gray-800">{app.stage0.phone}</span></div>
                                                        <div className="flex justify-between"><span>Gender:</span> <span className="font-medium text-gray-800">{app.stage0.gender}</span></div>
                                                        <div className="flex justify-between"><span>State Of Residence:</span> <span className="font-medium text-gray-800">{app.stage0.stateOfResidence}</span></div>

                                                        {!app.stage0.migrated ? (
                                                            <div className="mt-1 pt-1 border-t text-[9px] grid grid-cols-2 gap-1">
                                                                <div className={app.stage0.isEnrolled ? 'text-green-600 font-bold' : 'text-red-500'}>
                                                                    {app.stage0.isEnrolled ? '✓ FUTA' : '✗ Not FUTA'}
                                                                </div>
                                                                <div className={app.stage0.agreesToProcess ? 'text-green-600 font-bold' : 'text-red-500'}>
                                                                    {app.stage0.agreesToProcess ? '✓ Process' : '✗ Process'}
                                                                </div>
                                                                <div className={app.stage0.consentCommunication ? 'text-blue-600' : 'text-gray-400'}>
                                                                    {app.stage0.consentCommunication ? '✓ Email' : '✗ Email'}
                                                                </div>
                                                                <div className={app.stage0.consentInstructions ? 'text-blue-600' : 'text-gray-400'}>
                                                                    {app.stage0.consentInstructions ? '✓ Instr.' : '✗ Instr.'}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="mt-1 text-gray-400 italic text-[9px]">Migrated record (missing detail)</div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 max-w-xs">
                                                {app.stage1 ? (
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{app.stage1.school}</div>
                                                        <div className="text-gray-600">{app.stage1.department} ({app.stage1.level}L)</div>
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
                                                {app.emailStatus === 'SENT' ? (
                                                    <span className="text-green-600 font-bold text-xs" title="Enrollment notification sent to applicant and admin">SENT</span>
                                                ) : app.emailStatus === 'FAILED' ? (
                                                    <span className="text-red-500 font-bold text-xs">FAILED</span>
                                                ) : app.emailStatus === 'PENDING' ? (
                                                    <span className="text-yellow-600 font-bold text-xs animate-pulse">PENDING</span>
                                                ) : <span className="text-gray-400 text-xs">-</span>}
                                            </td>
                                            <td className="p-4">
                                                {app.stage1?.emailStatus === 'SENT' ? (
                                                    <span className="text-green-600 font-bold text-xs">SENT</span>
                                                ) : app.stage1?.emailStatus === 'FAILED' ? (
                                                    <span className="text-red-500 font-bold text-xs">FAILED</span>
                                                ) : app.stage1?.emailStatus === 'PENDING' ? (
                                                    <span className="text-yellow-600 font-bold text-xs">PENDING</span>
                                                ) : <span className="text-gray-400 text-xs">-</span>}
                                            </td>
                                            <td className="p-4">
                                                {app.stage2?.emailStatus === 'SENT' ? (
                                                    <span className="text-green-600 flex items-center gap-1 text-xs font-bold">SENT</span>
                                                ) : app.stage2?.emailStatus === 'FAILED' ? (
                                                    <span className="text-red-500 flex items-center gap-1 text-xs font-bold">FAILED</span>
                                                ) : app.stage2?.emailStatus === 'PENDING' ? (
                                                    <span className="text-yellow-600 flex items-center gap-1 text-xs font-bold">PENDING</span>
                                                ) : <span className="text-gray-400 text-xs">-</span>}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col space-y-2">
                                                    {(app.status === 'ENROLLED' || app.status === 'STAGE_1_INVITED') && (
                                                        <button
                                                            onClick={() => handleInviteStage1(app.applicationId)}
                                                            className="bg-blue-600 text-white px-3 py-2 rounded text-xs font-bold hover:bg-blue-700"
                                                        >
                                                            {app.status === 'STAGE_1_INVITED' ? 'Resend Invite S1' : 'Invite Stage 1'}
                                                        </button>
                                                    )}

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
