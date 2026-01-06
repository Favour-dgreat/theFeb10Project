'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, User, Mail, Users, ArrowRight, Loader2 } from 'lucide-react';

export default function VolunteerPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                const data = await res.json();
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
                setStatus('error');
            }
        } catch (err) {
            setErrorMessage('Connection error. Please check your internet and try again.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <main className="min-h-screen bg-white flex flex-col">
                <div className="flex-grow flex items-center justify-center px-4 py-20">
                    <div className="max-w-md w-full bg-[#f8f9ff] p-10 rounded-3xl border border-blue-100 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-black text-[#2e3b86]">Thank You!</h2>
                        <p className="text-gray-600 text-lg">
                            Your volunteer application has been received successfully. Our team will review your details and get back to you shortly.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-[#2e3b86] text-white py-4 rounded-xl font-bold hover:bg-[#f06436] transition-all duration-300"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white flex flex-col">

            <div className="flex-grow bg-gradient-to-br from-[#2e3b86] to-[#1a237e] relative overflow-hidden flex items-center">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f06436]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side: Content */}
                        <div className="text-white space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase">
                                <span className="w-2 h-2 bg-[#f06436] rounded-full animate-pulse" />
                                Join the Movement
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight">
                                Become a <span className="text-[#f06436]">Volunteer</span> and Change Lives.
                            </h1>
                            <p className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-lg">
                                Your time and skills can make a monumental difference. 
                                </p>
                            <p>Join the FEB10 Project in our mission to transform lives by bridging the gap between potential and opportunity through scholarships, grants, youth empowerment, mentorship, and development programs that provide resources, direction, and hope.</p>
                            
                        </div>

                        {/* Right Side: Form */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-[#2e3b86] mb-2">Volunteer Application</h2>
                                <p className="text-gray-500">Fill in your details below to get started.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#f06436] transition-colors" />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f06436]/20 focus:border-[#f06436] focus:bg-white transition-all outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#f06436] transition-colors" />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            placeholder="example@email.com"
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f06436]/20 focus:border-[#f06436] focus:bg-white transition-all outline-none"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Gender Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Gender</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Users className="h-5 w-5 text-gray-400 group-focus-within:text-[#f06436] transition-colors" />
                                        </div>
                                        <select
                                            required
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f06436]/20 focus:border-[#f06436] focus:bg-white transition-all outline-none appearance-none"
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        >
                                            <option value="" disabled>Select your gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {errorMessage && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                                        {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-[#2e3b86] text-white py-5 rounded-xl font-black text-lg tracking-widest uppercase hover:bg-[#f06436] hover:shadow-2xl hover:shadow-[#f06436]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Submit Application
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

// Re-using ChevronDown since I added it to the imports
function ChevronDown({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );
}
