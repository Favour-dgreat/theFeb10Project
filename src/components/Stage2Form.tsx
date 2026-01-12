'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function Stage2FormContent() {
    const searchParams = useSearchParams();

    // Identity State
    const [identity, setIdentity] = useState({
        applicationId: '',
        firstName: '',
        surname: '',
        email: ''
    });

    useEffect(() => {
        const appId = searchParams.get('applicationId');
        const fname = searchParams.get('firstName');
        const sname = searchParams.get('surname');
        const mail = searchParams.get('email');

        if (appId) {
            setIdentity({
                applicationId: appId,
                firstName: fname || '',
                surname: sname || '',
                email: mail || ''
            });
        }
    }, [searchParams]);

    // We'll store file objects or just placeholders for now
    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        studentId: null,
        transcript: null,
        admissionLetter: null,
        govtId: null,
        feesProof: null,
        passport: null,
        financialNeed: null,
        otherDocs: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            // 4MB Limit (Reduced to prevent server payload issues)
            if (file.size > 4 * 1024 * 1024) {
                setError(`File "${file.name}" exceeds the 4MB size limit. Please upload a smaller file.`);
                e.target.value = ''; // Reset input
                return;
            }

            setFiles(prev => ({
                ...prev,
                [fieldName]: file
            }));
            setError(''); // Clear error on successful selection
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Identity Validation
        if (!identity.applicationId || !identity.firstName || !identity.surname || !identity.email) {
            setError('Please fill in all Applicant Details (Name, Email, and ID) before submitting.');
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Validation for required files
        const requiredFields = ['studentId', 'transcript', 'admissionLetter', 'govtId', 'feesProof', 'passport'];
        const missing = requiredFields.filter(field => !files[field]);

        if (missing.length > 0) {
            setError(`Please upload all required documents. Missing: ${missing.join(', ')}`);
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        // Append Identity
        formData.append('applicationId', identity.applicationId);
        formData.append('firstName', identity.firstName);
        formData.append('surname', identity.surname);
        formData.append('email', identity.email);

        // Append Files
        Object.keys(files).forEach(key => {
            const file = files[key];
            if (file) {
                formData.append(key, file);
            }
        });

        try {
            const response = await fetch('/api/application/stage2', {
                method: 'POST',
                body: formData, // fetch automatically sets Content-Type to multipart/form-data
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            setIsSubmitted(true);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Upload failed. Please check your internet connection or try smaller files.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-green-100 text-center"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-3xl font-black text-[#2e3b86] mb-4">Verification Completed!</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    You have successfully completed Stage 2. Your documents are now under review.<br />
                    Final selection results will be announced via email and live stream.
                </p>
                <div className="p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500 text-left">
                    <h5 className="font-bold text-orange-800 mb-2">What Happens Next?</h5>
                    <ul className="list-disc list-inside text-sm text-orange-900 space-y-2">
                        <li>Successful applicants receive a final notification email.</li>
                        <li>Winners are unveiled during the FEB 10 Live Stream Event.</li>
                        <li>Keep your phone lines open and check your email regularly.</li>
                    </ul>
                </div>
            </motion.div>
        );
    }

    const FileInput = ({ label, name, required = true, description }: { label: string, name: string, required?: boolean, description?: string }) => (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
            <label className="block text-sm font-bold text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {description && <p className="text-xs text-gray-500 mb-3">{description}</p>}
            <div className="flex flex-col gap-2">
                <input
                    type="file"
                    onChange={(e) => handleFileChange(e, name)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-xs file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                    "
                />
                {files[name] && (
                    <div className="flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 p-2 rounded-md border border-green-100">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="truncate max-w-[200px]">{files[name]?.name}</span>
                        <span className="text-gray-400 font-normal ml-auto">
                            ({(files[name]!.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div id="stage2-form" className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="border-b pb-4 mb-8">
                <h3 className="text-2xl font-black text-[#2e3b86]">STAGE 2: DOCUMENT VERIFICATION</h3>

                {/* Identity Section: Auto-filled or Manual Input */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-blue-900 font-bold mb-1">Applicant Details:</p>
                            <p className="text-xs text-blue-700 mb-4">
                                These details connect your documents to your application.
                            </p>
                        </div>
                        {identity.applicationId && (
                            <span className="bg-blue-200 text-blue-800 text-[10px] px-2 py-1 rounded-full font-bold">
                                AUTO-FILLED
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">First Name</label>
                            <input
                                type="text"
                                value={identity.firstName}
                                onChange={(e) => setIdentity(prev => ({ ...prev, firstName: e.target.value }))}
                                className="w-full p-2 text-sm border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Surname</label>
                            <input
                                type="text"
                                value={identity.surname}
                                onChange={(e) => setIdentity(prev => ({ ...prev, surname: e.target.value }))}
                                className="w-full p-2 text-sm border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter Surname"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={identity.email}
                                onChange={(e) => setIdentity(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full p-2 text-sm border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Application ID</label>
                            <input
                                type="text"
                                value={identity.applicationId}
                                onChange={(e) => setIdentity(prev => ({ ...prev, applicationId: e.target.value }))}
                                className="w-full p-2 text-sm border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. FEB10-..."
                            />
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 mt-4 text-sm">Upload clear, legible copies of the required documents. Supported formats: PDF, JPG, PNG (Max 4MB each).</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileInput
                        label="Valid Student ID Card"
                        name="studentId"
                        description="Front and back if applicable."
                    />
                    <FileInput
                        label="Most Recent Result / Transcript"
                        name="transcript"
                        description="Official or unofficial semester result."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileInput
                        label="Admission Letter"
                        name="admissionLetter"
                        description="JAMB or School-issued admission letter."
                    />
                    <FileInput
                        label="Valid Government ID"
                        name="govtId"
                        description="NIN Slip, Voter’s Card, Driver’s License, or Passport."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileInput
                        label="Proof of School Fees"
                        name="feesProof"
                        description="Receipt, invoice, or statement showing status."
                    />
                    <FileInput
                        label="Passport Photograph"
                        name="passport"
                        description="Recent, clear, color photograph."
                    />
                </div>

                <div className="border-t pt-6 bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 mt-8">
                    <h4 className="font-bold text-gray-800 mb-4">Additional Documents (If Applicable)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FileInput
                            label="Evidence of Financial Need"
                            name="financialNeed"
                            required={false}
                            description="Parent ID, medical reports, or written statement."
                        />
                        <FileInput
                            label="Other Supporting Documents"
                            name="otherDocs"
                            required={false}
                            description="Any other file requested via email."
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium text-center">
                        {error}
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#f06436] text-white font-black rounded-xl hover:bg-[#d95328] transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isSubmitting ? 'UPLOADING DOCUMENTS...' : 'SUBMIT VERIFICATION DOCUMENTS'}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        By submitting, you confirm that all provided documents are authentic. False claims will lead to disqualification.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default function Stage2Form() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
            <Stage2FormContent />
        </Suspense>
    );
}
