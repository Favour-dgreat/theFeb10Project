'use client';

import { useState } from 'react';
import { Mail, Check, Loader2, AlertCircle } from 'lucide-react';

interface SendInviteButtonProps {
    member: {
        id: string;
        name: string;
        email: string;
        inviteSent?: boolean;
        inviteSentAt?: string | null;
    };
}

export default function SendInviteButton({ member }: SendInviteButtonProps) {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(Boolean(member.inviteSent));
    const [sentAt, setSentAt] = useState<string | null>(member.inviteSentAt || null);
    const [error, setError] = useState<string | null>(null);

    const handleSendInvite = async () => {
        if (!member.email) {
            alert('This member has no email address.');
            return;
        }

        const confirmMessage = sent
            ? `An invite was already sent on ${sentAt ? new Date(sentAt).toLocaleDateString() : 'a previous date'}. Resend Growth Community invitation to ${member.name || 'this member'} (${member.email})?`
            : `Send Growth Community invitation email to ${member.name || 'this member'} (${member.email})?`;

        if (!window.confirm(confirmMessage)) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/growth-community', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'send_invite',
                    memberId: member.id,
                    name: member.name,
                    email: member.email,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send invitation email');
            }

            const now = new Date().toISOString();
            setSent(true);
            setSentAt(now);
            alert(`Invitation email successfully sent to ${member.name || member.email}!`);
        } catch (err: any) {
            console.error('Error sending invite:', err);
            const msg = err.message || 'Error sending invitation';
            setError(msg);
            alert(`Failed to send email: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={handleSendInvite}
                disabled={loading}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer ${
                    sent
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-[#2e3b86] text-white hover:bg-[#1a237e]'
                }`}
                title={sent && sentAt ? `Sent on ${new Date(sentAt).toLocaleString()}` : 'Send WhatsApp community invitation'}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : sent ? (
                    <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Resend Invite</span>
                    </>
                ) : (
                    <>
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Invite</span>
                    </>
                )}
            </button>

            {sent && (
                <span className="text-[11px] text-gray-400 whitespace-nowrap">
                    {sentAt ? new Date(sentAt).toLocaleDateString() : 'Sent'}
                </span>
            )}

            {error && (
                <span title={error} className="text-red-500">
                    <AlertCircle className="w-4 h-4" />
                </span>
            )}
        </div>
    );
}
