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
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({
                ...prev,
                [fieldName]: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error(err);
            setError('Upload failed. Please check your internet connection or try smaller files.');
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
            <div className="flex items-center gap-3">
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
                    <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Uploaded
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div id="stage2-form" className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="border-b pb-4 mb-8">
                <h3 className="text-2xl font-black text-[#2e3b86]">STAGE 2: DOCUMENT VERIFICATION</h3>

                {identity.applicationId ? (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-900 font-bold">Authenticated Applicant:</p>
                        <p className="text-lg text-[#2e3b86]">{identity.firstName} {identity.surname}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">ID: {identity.applicationId}</p>
                    </div>
                ) : (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <p className="text-sm text-yellow-800">
                            <strong>Warning:</strong> No Application ID detected. Please ensure you clicked the link from your email.
                        </p>
                    </div>
                )}

                <p className="text-gray-500 mt-2">Upload clear, legible copies of the required documents. Supported formats: PDF, JPG, PNG.</p>
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
