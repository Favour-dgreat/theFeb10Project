'use client';

import { Download } from 'lucide-react';
import { useCallback } from 'react';

export default function ClientDownloadButton({ members }: { members: any[] }) {

    const handleExport = useCallback(() => {
        if (!members.length) return;

        // Define CSV headers
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Gender', 'Interests', 'Created At'];

        // Convert data to CSV rows
        const csvContent = [
            headers.join(','), // Header row
            ...members.map(row => [
                `"${row.id}"`,
                `"${row.name.replace(/"/g, '""')}"`,
                `"${row.email.replace(/"/g, '""')}"`,
                `"${row.phone.replace(/"/g, '""')}"`,
                `"${row.gender}"`,
                `"${row.interests.replace(/"/g, '""')}"`,
                `"${row.createdAt}"`
            ].join(','))
        ].join('\n');

        // Create a Blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `growth_community_members_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [members]);

    return (
        <button
            onClick={handleExport}
            disabled={members.length === 0}
            className={`flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 ${members.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            <Download className="w-5 h-5" />
            Export CSV
        </button>
    );
}
