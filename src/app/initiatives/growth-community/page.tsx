'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Mail, Phone, Users, ArrowRight, Loader2 } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function GrowthCommunityPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        phone: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // Reusing a generic recruitment/member API or I can create a new one.
            // For now, I'll aim for /api/growth-community
            const res = await fetch('/api/growth-community', {
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
            setErrorMessage('Connection error. Please check your internet.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <main className="min-h-screen bg-white font-montserrat">
                <Navbar />
                <div className="min-h-[80vh] flex items-center justify-center px-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-black text-[#2e3b86]">Welcome to the Community!</h2>
                        <p className="text-gray-600 text-lg">
                            Your application to join the Growth Community has been received. Look out for a welcome email from us soon.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-[#2e3b86] text-white py-4 rounded-xl font-bold hover:bg-[#a3cc39] transition-all duration-300"
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
        <main className="min-h-screen bg-white font-montserrat overflow-x-hidden">
            <Navbar />
            {/* Hero Section */}
            <section className="relative h-[80vh] md:h-[90vh] flex items-center overflow-hidden">
                <Image
                    src="/images/growth-community-hero.jpg"
                    alt="Growth Community Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2e3b86]/90 to-transparent" />
                <div className="relative z-10 mx-auto text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl space-y-6"
                    >
                        <div className="inline-block">
                            <Image
                                src="/images/GC_Logo_Green_PNG.png"
                                alt="Growth Community Logo"
                                width={180}
                                height={60}
                                className="mb-4 rounded-lg"
                            />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black leading-tight">
                            Join the <br />
                            <span className="text-[#a3cc39]">Growth Community</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-blue-50">
                            Discover Your Purpose. Unlock Your Potential. Connect Globally.
                        </p>
                        <div className="pt-4">
                            <a
                                href="#membership-form"
                                className="inline-flex items-center gap-2 bg-[#a3cc39] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#2e3b86] transition-all duration-300"
                            >
                                Become a Member <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-4 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#2e3b86] rounded-full text-xs font-black tracking-widest uppercase">
                                <span className="w-2 h-2 bg-[#a3cc39] rounded-full" />
                                Our Narrative
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#2e3b86] leading-tight">
                                More than a network — <br />
                                <span className="text-[#a3cc39]">it's a launchpad.</span>
                            </h2>
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    The Growth Community is more than a network - it’s a launchpad for young leaders, aspiring entrepreneurs, and future change-makers.
                                </p>
                                <p>
                                    Created as an initiative of <span className="font-bold text-[#2e3b86]">The FEB10 Project</span>, the community empowers members to discover their purpose, maximize their potential, and cultivate a mindset that positions them for long-term success.
                                </p>
                                <p>
                                    Whether you’re a student searching for direction, a leader wanting to level up, or a start-up founder seeking guidance, Growth Community is your space to grow, connect, and thrive.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                <div className="p-6 bg-[#f8f9ff] rounded-2xl border-l-4 border-[#a3cc39]">
                                    <h3 className="text-xl font-bold text-[#2e3b86] mb-3">Our Vision</h3>
                                    <p className="text-gray-600">To build a generation of young leaders who are purpose-driven, globally minded, and equipped to make meaningful impact.</p>
                                </div>
                                <div className="p-6 bg-[#f8f9ff] rounded-2xl border-l-4 border-[#2e3b86]">
                                    <h3 className="text-xl font-bold text-[#2e3b86] mb-3">Our Mission</h3>
                                    <p className="text-gray-600">To provide resources, mentorship, and opportunities that guide members in achieving personal and professional goals.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                            <Image
                                src="/images/growth-community-students.jpg"
                                alt="Students working together"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Join */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[#2e3b86]">Who Should <span className="text-[#a3cc39]">Join?</span></h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Seekers", desc: "Young people seeking direction, purpose, and personal growth." },
                        { title: "Leaders", desc: "Aspiring leaders aiming to develop confidence, skills, and influence." },
                        { title: "Founders", desc: "Start-up founders & entrepreneurs looking for mentorship and networking." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-[#a3cc39] rounded-xl flex items-center justify-center mb-6">
                                <Users className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2e3b86] mb-4">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What You'll Gain */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-[#2e3b86] text-center mb-20 underline decoration-[#a3cc39] decoration-8 underline-offset-8">
                        What You’ll Gain
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {[
                            {
                                num: "1",
                                title: "Personal Growth & Leadership",
                                points: [
                                    "Workshops, webinars, and seminars on leadership and goal-setting.",
                                    "Mentorship programs connecting members with experienced leaders.",
                                    "Personalized development plans to help you achieve your goals."
                                ]
                            },
                            {
                                num: "2",
                                title: "Entrepreneurship & Support",
                                points: [
                                    "Guidance on business idea validation and execution.",
                                    "Access to a network of experts, investors, and mentors.",
                                    "Skill-building sessions on marketing, finance, and operations."
                                ]
                            },
                            {
                                num: "3",
                                title: "Purpose & Mindset Coaching",
                                points: [
                                    "Resources to uncover your unique strengths and life purpose.",
                                    "Mindset coaching to build resilience and a global perspective.",
                                    "Encouragement to think beyond borders and embrace opportunities."
                                ]
                            },
                            {
                                num: "4",
                                title: "Networking & Engagement",
                                points: [
                                    "Connect with peers, mentors, and industry leaders.",
                                    "Participate in high-impact events and forum projects.",
                                    "Showcase your ideas, initiatives, and achievements."
                                ]
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="flex-shrink-0 w-16 h-16 bg-[#2e3b86] text-white rounded-full flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-200">
                                    {item.num}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-[#2e3b86]">{item.title}</h3>
                                    <ul className="space-y-3">
                                        {item.points.map((p, j) => (
                                            <li key={j} className="flex gap-3 text-gray-600 italic">
                                                <CheckCircle2 className="w-5 h-5 text-[#a3cc39] flex-shrink-0" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Join */}
            <section className="py-24 px-4 bg-[#2e3b86] text-white text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black">Why <span className="text-[#a3cc39]">Join?</span></h2>
                    <p className="text-xl md:text-2xl font-light italic leading-relaxed text-blue-100">
                        "Because your potential shouldn’t be limited by your environment. Growth Community gives you tools, guidance, and connections to help you think bigger, act bolder, and achieve more."
                    </p>
                    <p className="text-2xl font-bold text-[#a3cc39]">
                        Turn your ideas into impact. Your growth journey starts here.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section id="membership-form" className="py-24 px-4 bg-gray-50 flex items-center justify-center">
                <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-blue-50">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-[#2e3b86] mb-2">Join the Community Today!</h2>
                        <p className="text-gray-500">Become a member and start growing with us.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-300 group-focus-within:text-[#a3cc39] transition-colors" />
                                </div>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your Name"
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#a3cc39]/10 focus:border-[#a3cc39] focus:bg-white transition-all outline-none font-medium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-gray-300 group-focus-within:text-[#a3cc39] transition-colors" />
                                    </div>
                                    <select
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#a3cc39]/10 focus:border-[#a3cc39] focus:bg-white transition-all outline-none font-medium appearance-none"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-300 group-focus-within:text-[#a3cc39] transition-colors" />
                                    </div>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+234..."
                                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#a3cc39]/10 focus:border-[#a3cc39] focus:bg-white transition-all outline-none font-medium"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-300 group-focus-within:text-[#a3cc39] transition-colors" />
                                </div>
                                <input
                                    required
                                    type="email"
                                    placeholder="email@example.com"
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#a3cc39]/10 focus:border-[#a3cc39] focus:bg-white transition-all outline-none font-medium"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
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
                            className="w-full bg-[#2e3b86] text-white py-5 rounded-2xl font-black text-lg tracking-widest uppercase hover:bg-[#a3cc39] hover:shadow-2xl hover:shadow-[#a3cc39]/40 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Click Here to Become a Member →"
                            )}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
