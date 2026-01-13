'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import { CheckCircle2, User, Mail, Phone, MapPin, ArrowRight, Loader2 } from 'lucide-react';

export default function VolunteerPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        areas: [] as string[],
        consent: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.consent) {
            setErrorMessage('You must agree to the consent term to proceed.');
            return;
        }

        if (formData.areas.length === 0) {
            setErrorMessage('Please select at least one area to volunteer in.');
            return;
        }

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
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        <h2 className="text-3xl font-black text-[#2e3b86]">Application Received!</h2>
                        <p className="text-gray-600 text-lg">
                            Thank you for your interest in volunteering with The FEB10 Project.<br />
                            We appreciate your willingness to support a mission focused on creating access, opportunity, and impact. Your submission has been received and added to our volunteer pool. Our team will reach out via email or phone with further details.
                        </p>
                        <p className="font-semibold text-[#f06436]">
                            📩 Please keep an eye on your inbox for updates.
                        </p>
                        <div className="pt-4">
                            <p className="text-sm text-gray-400 italic">Thank you for choosing to serve with purpose. Together, we make impact.</p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-[#2e3b86] text-white py-4 rounded-xl font-bold hover:bg-[#f06436] transition-all duration-300 mt-4"
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

            {/* Banner Section */}
            {/* Banner Section */}
            <section className="relative h-[50vh] min-h-[400px] w-full bg-[url('/images/Volunteer2_jpg.jpg')] md:bg-[url('/images/Volunteer_WIDE2_jpg.jpg')] bg-cover bg-center flex items-center justify-center">
                <div className="absolute inset-0 bg-white/20" />
                <div className="relative z-10 px-4 max-w-4xl mx-auto w-full">
                    <div className="flex justify-center md:justify-start pb-56 md:pb-8 md:-ml-56">
                        <div className="border-l-[6px] md:border-l-[8px] border-[#f06436] pl-6 md:pl-8 py-2">
                            <h1 className="text-[#2e3b86]  leading-none">
                                <span className="block text-4xl md:text-6xl mb-1 md:mb-2 font-weight-[100]"><b>Join</b> the</span>
                                <span className="block text-5xl md:text-8xl font-black tracking-tight uppercase">MOVEMENT</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12 space-y-4">
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            The FEB10 Project is driven by people who believe in impact, service, and growth. If you’re passionate about education, youth development, and creating real change, we’d love to have you on the team.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-6">
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

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Phone Number <span className="text-gray-400 text-xs normal-case tracking-normal">(WhatsApp preferred)</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#f06436] transition-colors" />
                                    </div>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f06436]/20 focus:border-[#f06436] focus:bg-white transition-all outline-none"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Location Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Location <span className="text-gray-400 text-xs normal-case tracking-normal">(City & Country)</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#f06436] transition-colors" />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Lagos, Nigeria"
                                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f06436]/20 focus:border-[#f06436] focus:bg-white transition-all outline-none"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Areas Checkboxes */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Area(s) You’d Like to Volunteer In <span className="text-gray-400 text-xs normal-case tracking-normal">(Select all that apply)</span></label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        "Community Outreach & Engagement",
                                        "Content Creation (Writing, Design, Video)",
                                        "Social Media & Communications",
                                        "Program Coordination & Support",
                                        "Research & Data",
                                        "Partnerships & Sponsorships",
                                        "Event Planning & Logistics",
                                        "Mentorship & Student Support"
                                    ].map((area) => (
                                        <label key={area} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                            <div className="relative flex items-center mt-1">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#f06436] checked:bg-[#f06436]"
                                                    checked={formData.areas.includes(area)}
                                                    onChange={(e) => {
                                                        const newAreas = e.target.checked
                                                            ? [...formData.areas, area]
                                                            : formData.areas.filter(a => a !== area);
                                                        setFormData({ ...formData, areas: newAreas });
                                                    }}
                                                />
                                                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-gray-700 font-medium text-sm leading-tight pt-1">{area}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="pt-2">
                                <label className="flex items-start space-x-3 cursor-pointer">
                                    <div className="relative flex items-center mt-1">
                                        <input
                                            type="checkbox"
                                            required
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#f06436] checked:bg-[#f06436]"
                                            checked={formData.consent}
                                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                        />
                                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 leading-tight pt-0.5">
                                        I agree to be contacted by The FEB10 Project regarding volunteer opportunities and related updates.
                                    </span>
                                </label>
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
            </section>

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
