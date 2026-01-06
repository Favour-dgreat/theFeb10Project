'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function Stage1FormContent() {
    const searchParams = useSearchParams();

    const [identity, setIdentity] = useState({
        applicationId: '',
        firstName: '',
        surname: '',
        email: ''
    });

    const [formData, setFormData] = useState({
        matricNumber: '',
        department: '',
        school:'',
        level: '',
        cgpa: '',
        essay: ''
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Basic Validation
        if (!formData.matricNumber || !formData.department || !formData.level || !formData.cgpa || !formData.essay) {
            setError('Please fill in all fields.');
            setIsSubmitting(false);
            return;
        }

        const payload = {
            ...formData,
            ...identity
        };

        try {
            const response = await fetch('/api/application/stage1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Submission failed');
            }

            // Success
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            setError('Failed to submit application. Please try again.');
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-black text-[#2e3b86] mb-4">Stage 1 Completed!</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Your Stage 1 application has been successfully submitted. <br />
                    Our team will review your application. If shortlisted, you will receive an email instruction for Stage 2.
                </p>
                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                    <strong>Note:</strong> Please keep an eye on your email inbox (and spam folder) for the next updates.
                </div>
            </motion.div>
        );
    }

    return (
        <div id="stage1-form" className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="border-b pb-4 mb-8">
                <h3 className="text-2xl font-black text-[#2e3b86]">STAGE 1: APPLICATION FORM</h3>
                <p className="text-gray-500 mt-2">Please provide your academic details accurately.</p>

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
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Matriculation Number</label>
                        <input
                            type="text"
                            name="matricNumber"
                            value={formData.matricNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f06436] focus:border-transparent outline-none"
                            placeholder="e.g. AAA/00/0000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">School/Faculty</label>
                        <input
                            type="text"
                            name="school"
                            value={formData.school}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f06436] focus:border-transparent outline-none"
                            placeholder="Your School/Faculty"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f06436] focus:border-transparent outline-none"
                            placeholder="Your Department"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Level</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f06436] focus:border-transparent outline-none bg-white"
                        >
                            <option value="">Select Level</option>
                            <option value="100">100 Level</option>
                            <option value="200">200 Level</option>
                            <option value="300">300 Level</option>
                            <option value="400">400 Level</option>
                            <option value="500">500 Level</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current CGPA</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="5"
                            name="cgpa"
                            value={formData.cgpa}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f06436] focus:border-transparent outline-none"
                            placeholder="e.g. 3.50"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Why do you need this scholarship?</label>
                    <p className="text-xs text-gray-500 mb-2">Briefly explain your financial situation and how this scholarship will assist you (Max 200 words).</p>
                    <textarea
                        name="essay"
                        value={formData.essay}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f06436] focus:border-transparent outline-none resize-none"
                        placeholder="Start typing here..."
                    ></textarea>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium text-center">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#f06436] text-white font-black rounded-xl hover:bg-[#d95328] transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:hover:scale-100"
                >
                    {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT STAGE 1 APPLICATION'}
                </button>
            </form>
        </div>
    );
}

export default function Stage1Form() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
            <Stage1FormContent />
        </Suspense>
    );
}
