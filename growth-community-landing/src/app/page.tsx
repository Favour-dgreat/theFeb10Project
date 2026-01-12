'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2, Target, Globe, Sparkles, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function GrowthCommunityLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
    interests: [] as string[],
    consent: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInterestChange = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage('You must agree to the terms to proceed.');
      return;
    }

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
              <h2 className="text-3xl font-black text-[#4a4a4a]">Welcome to the Growth Community!</h2>
              <p className="text-gray-500 text-lg">
                Thank you for signing up! We have received your application.
              </p>
              <p className="text-gray-500 text-lg">
                Please check your email for more information and next steps. We’re excited to have you with us!
              </p>
            </div>
            <button
              onClick={() => window.location.href = 'https://growthcommunity.thefeb10project.org/'}
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

      {/* Hero Section */}
      <section className="relative h-[100vh] bg-url('/images/GC_jpg1.jpg') md:bg-url('/images/long_jpg.jpg') bg-cover md:min-h-screen flex items-center overflow-hidden bg-white">
        {/* Mobile Image */}
        <div className="absolute inset-0 md:hidden block">
          <Image
            src="/images/long_jpg.jpg"
            alt="Growth Community Leadership"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Desktop Image */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/GC_jpg1.jpg"
            alt="Growth Community Leadership"
            fill
            className="object-cover object-[50%_5%]"
            priority
          />
        </div>


        <div className="relative z-10 w-full min-h-[50vh] md:h-screen flex flex-col justify-center items-center md:items-end text-center md:text-right mt-72 md:pb-20 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-12 max-w-lg md:max-w-4xl mx-auto md:mx-0 md:mr-auto px-4 md:px-0"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold md:ml-[40px] leading-[1.2] md:leading-[1.1] text-[#696969]">
                Discover Your <span className="text-primary">Purpose.</span> <br />
                Unlock Your <span className="text-primary">Potential.</span> <br />
                Connect <span className="text-primary">Globally.</span>
              </h1>
            </div>

            <div className="pt-4">
              <Link
                href="#membership-form"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 md:px-10 md:py-6 rounded-xl font-bold text-2xl md:text-4xl lg:text-5xl tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 h-auto"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-[#4a4a4a] tracking-tight">The Growth Community</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-[1.8]">
            The Growth Community is more than a network - it’s a launchpad for young leaders, aspiring entrepreneurs, and future change-makers. Created as an initiative of TheFEB10Project, the community empowers members to discover their purpose, maximize their potential, and cultivate a mindset that positions them for long-term success.
          </p>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-[1.8]">
            Whether you’re a student searching for direction, a leader wanting to level up, or a start-up founder seeking guidance, Growth Community is your space to grow, connect, and thrive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-12">
            <div className="p-10 bg-gray-light/50 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all">
              <h3 className="text-2xl font-black text-[#4a4a4a] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed font-medium">To build a generation of young leaders who are purpose-driven, globally minded, and equipped to make meaningful impact in their communities and the world.</p>
            </div>
            <div className="p-10 bg-gray-light/50 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all">
              <h3 className="text-2xl font-black text-[#4a4a4a] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed font-medium">To provide resources, mentorship, and opportunities that guide members in discovering their strengths, building their skills, and achieving personal and professional goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#4a4a4a]">Who Should Join?</h2>
            <p className="text-gray-500 text-xl">Is this community for you?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 text-center space-y-4 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <User className="w-8 h-8" />
              </div>
              <p className="font-bold text-gray-700 text-lg">Young people seeking direction, purpose, and personal growth.</p>
            </div>
            <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 text-center space-y-4 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto text-purple-600">
                <Target className="w-8 h-8" />
              </div>
              <p className="font-bold text-gray-700 text-lg">Aspiring leaders aiming to develop confidence, skills, and influence.</p>
            </div>
            <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 text-center space-y-4 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
                <RocketIcon />
              </div>
              <p className="font-bold text-gray-700 text-lg">Start-up founders & entrepreneurs looking for mentorship, resources, and networking opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-[#4a4a4a]">What You’ll <span className="text-primary italic">Gain</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all group">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all text-primary group-hover:text-white">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-[#4a4a4a] mb-3">1. Personal Growth & Leadership Development</h4>
                <ul className="text-gray-500 font-medium leading-relaxed list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Workshops, webinars, and seminars on leadership.</li>
                  <li>Mentorship programs connecting members with experienced leaders.</li>
                  <li>Personalized development plans.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all group">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all text-primary group-hover:text-white">
                <RocketIcon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-[#4a4a4a] mb-3">2. Entrepreneurship & Start-Up Support</h4>
                <ul className="text-gray-500 font-medium leading-relaxed list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Guidance on business idea validation and execution.</li>
                  <li>Access to a network of experts, investors, and mentors.</li>
                  <li>Skill-building sessions on strategy and finance.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all group">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all text-primary group-hover:text-white">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-[#4a4a4a] mb-3">3. Purpose Discovery & Mindset Coaching</h4>
                <ul className="text-gray-500 font-medium leading-relaxed list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Resources to uncover unique strengths and purpose.</li>
                  <li>Mindset coaching to build resilience and perspective.</li>
                  <li>Encouragement to think beyond borders.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all group">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all text-primary group-hover:text-white">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-black text-[#4a4a4a] mb-3">4. Networking & Community Engagement</h4>
                <ul className="text-gray-500 font-medium leading-relaxed list-disc list-inside space-y-2 text-sm md:text-base">
                  <li>Connect with peers, mentors, and industry leaders.</li>
                  <li>Participate in events, forums, and projects.</li>
                  <li>Showcase your ideas, initiatives, and achievements.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-24 px-4 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-black">Why Join?</h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            Because your potential shouldn’t be limited by your environment. Growth Community gives you tools, guidance, and connections to help you think bigger, act bolder, and achieve more.
          </p>
          <p className="text-2xl font-black italic">Turn your ideas into impact. Your growth journey starts here.</p>
        </div>
      </section>

      {/* Form Section */}
      {/* Form Section */}
      <section id="membership-form" className={`py-32 px-4 relative transition-all duration-500 bg-cover bg-center ${!showForm ? "bg-[url('/images/END%20Image_blank4.jpg')] md:bg-[url('/images/END%20Image_blank.jpg')] min-h-[600px] flex items-center justify-end" : "bg-white min-h-auto"
        }`}>
        {!showForm ? (
          <div className="w-full max-w-7xl mx-auto flex flex-col md:items-end md:justify-center h-full px-4 md:px-12">
            <div className="md:w-1/2 md:text-left space-y-8 mt-[380px] md:mt-0">
              <h2 className="text-4xl md:text-7xl font-black text-[#4a4a4a] leading-tight">
                Join the <br />
                <span className="text-primary text-4xl md:text-8xl block my-2">GROWTH <br /> COMMUNITY</span>
                <span className="text-primary">Today</span>
              </h2>
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-primary text-white text-2xl md:text-4xl font-black py-4 px-12 rounded-xl shadow-xl hover:bg-primary-dark transition-all transform hover:scale-105"
                >
                  Click Here
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl font-black text-[#4a4a4a]">Join the <span className="text-primary">Growth Community Today!</span></h2>
              <p className="text-gray-500 font-bold tracking-tight text-lg">Fill in your details below</p>
            </div>

            <div className="bg-gray-light/30 p-10 md:p-16 rounded-[3rem] border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="First & Last Name"
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
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="We’ll send updates and opportunities here"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[#4a4a4a] placeholder-gray-300 focus:outline-none focus:border-primary transition-all font-bold"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp-enabled preferred"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[#4a4a4a] placeholder-gray-300 focus:outline-none focus:border-primary transition-all font-bold"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Area of Interest (Select all that apply)</label>
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {[
                      "Undergraduate Scholarships",
                      "Academic & Career Growth",
                      "Leadership & Personal Development",
                      "Entrepreneurship & Start-ups",
                      "Digital & Creative Skills"
                    ].map((interest) => (
                      <label key={interest} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:border-primary/50 transition-all">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-primary"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                        />
                        <span className="font-bold text-gray-600">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-5 h-5 accent-primary flex-shrink-0"
                    />
                    <span className="text-gray-500 text-sm font-medium">I agree to receive emails, messages, and updates from the Growth Community.</span>
                  </label>
                </div>

                {errorMessage && (
                  <div className="p-5 bg-red-50 text-red-500 rounded-2xl text-sm font-bold border border-red-100 italic">
                    Critical Error: {errorMessage}
                  </div>
                )}

                <button
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white py-5 md:py-6 px-4 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-xl md:shadow-2xl shadow-primary/20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 group disabled:opacity-50 h-auto min-h-[64px]"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                  ) : (
                    <>
                      <span className="text-center">Click Here to Become a Member</span>
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform rotate-90 md:rotate-0" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
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

// Icon helper since lucide-react Rocket might be named differently in some versions or I want a custom one
function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-8 h-8"}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}
