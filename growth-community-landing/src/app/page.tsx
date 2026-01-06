'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Mail, Phone, Users, ArrowRight, Loader2, Target, Globe, Zap, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function GrowthCommunityLanding() {
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
      const res = await fetch('/api/growth-community', {
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
      setErrorMessage('Connection error. Please check your internet.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-[#fdfdfd] text-[#4a4a4a] font-montserrat">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-8 p-12 bg-white rounded-[3rem] shadow-xl border border-gray-100">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-[#4a4a4a]">Application Received!</h2>
              <p className="text-gray-500 text-lg">
                Welcome to the community. We've sent a transmission to your email with the next steps.
              </p>
            </div>
            <button
              onClick={() => window.location.href = 'https://thefeb10project.org'}
              className="w-full bg-[#4a4a4a] text-white py-5 rounded-2xl font-black tracking-widest uppercase hover:bg-primary transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfdfd] text-[#4a4a4a] font-montserrat selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section with Composite Background */}
      <section className="relative h-[100vh] md:min-h-screen flex items-center overflow-hidden bg-white">
        <Image
          src="/images/GC_jpg1.jpg"
          alt="Growth Community Leadership"
          fill
          className="object-contain  md:object-cover "
          priority
        />

       

        {/* Branding & Interaction Overlay */}
        <div className="relative z-10 max-w-12xl mx-auto px-4 sm:px-8 lg:px-4 w-full h-[25vh] md:h-[100vh] flex flex-col justify-center text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-12 lg:max-w-4xl"
          >
          
            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl lg:text-7xl font-semibold text-align-right leading-[1.1] text-[#696969]">
                Discover Your <span className="text-primary">Purpose.</span> <br />
                Unlock Your <span className="text-primary">Potential.</span> <br />
                Connect <span className="text-primary">Globally.</span>
              </h1>
            </div>

            {/* Primary CTA */}
            <div className="pt-4">
              <Link
                href="#membership-form"
                className="inline-flex items-center justify-center bg-primary text-white px-6 md:px-6 py-4 rounded-xl font-bold text-5xl tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 h-auto"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Narrative Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-[#4a4a4a] tracking-tight">Our Ecosystem</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <p className="text-2xl md:text-3xl text-gray-500 font-medium leading-[1.6] italic">
            "More than a network - it’s a launchpad for young leaders, aspiring entrepreneurs, and future change-makers."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-12">
            <div className="p-10 bg-gray-light/50 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all">
              <h3 className="text-2xl font-black text-[#4a4a4a] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed font-medium">To build a generation of young leaders who are purpose-driven, globally minded, and equipped to make meaningful impact.</p>
            </div>
            <div className="p-10 bg-gray-light/50 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all">
              <h3 className="text-2xl font-black text-[#4a4a4a] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed font-medium">To provide resources, mentorship, and opportunities that guide members in achieving personal and professional goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Benefits */}
      <section className="py-32 px-4 bg-gray-light/30">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-[#4a4a4a]">What You’ll <span className="text-primary italic">Gain</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { icon: <Target className="w-8 h-8 text-primary" />, title: "Leadership Development", desc: "Workshops and seminars focused on peak performance and goal alignment." },
              { icon: <Sparkles className="w-8 h-8 text-primary" />, title: "Elite Mentorship", desc: "Direct guidance from seasoned architects of industry and impact." },
              { icon: <Zap className="w-8 h-8 text-primary" />, title: "Venture Architecture", desc: "Support for validating business ideas and building scalable operations." },
              { icon: <Globe className="w-8 h-8 text-primary" />, title: "Global Network", desc: "Connections with a diverse community of high-impact individuals." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all group">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary  transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#4a4a4a] mb-3">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Membership Form */}
      <section id="membership-form" className="py-32 px-4 bg-white overflow-hidden relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-[#4a4a4a]">Join the <span className="text-primary">Society.</span></h2>
            <p className="text-gray-500 font-bold tracking-tight text-lg">Your application starts here.</p>
          </div>

          <div className="bg-gray-light/30 p-10 md:p-16 rounded-[3rem] border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[#4a4a4a] placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Gender</label>
                  <select
                    required
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[#4a4a4a] focus:outline-none focus:border-primary transition-all font-bold appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjNDQ0NDQ0IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==')] bg-[length:24px] bg-[right_1.5rem_center] bg-no-repeat"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Email Identity</label>
                <input
                  required
                  type="email"
                  placeholder="name@email.com"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[#4a4a4a] placeholder-gray-300 focus:outline-none focus:border-primary transition-all font-bold"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Phone Frequency</label>
                <input
                  required
                  type="tel"
                  placeholder="+234 ..."
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[#4a4a4a] placeholder-gray-300 focus:outline-none focus:border-primary transition-all font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {errorMessage && (
                <div className="p-5 bg-red-50 text-red-500 rounded-2xl text-sm font-bold border border-red-100 italic">
                  Critical Error: {errorMessage}
                </div>
              )}

              <button
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-xl tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Complete Application
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-gray-light/50 py-20 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-4">
            <Image
              src="/images/GC_Logo_Green_PNG.png"
              alt="Logo"
              width={160}
              height={50}
              className="opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="text-gray-400 text-xs font-medium">© {new Date().getFullYear()} Growth Community Initiative. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
