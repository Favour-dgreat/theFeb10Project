'use client';

import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Stage1Page() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative py-20 bg-[#2e3b86] text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6"
                    >
                        STAGE 1: ORIENTATION
                    </motion.h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Welcome to the first official stage of your scholarship journey.
                    </p>
                </div>
            </div>

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Video Section (Placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-video bg-black rounded-3xl shadow-2xl overflow-hidden mb-12 group border-4 border-[#f06436]/20"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center group-hover:scale-110 transition-transform duration-300">
                                <div className="w-20 h-20 bg-[#f06436] rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer shadow-lg shadow-orange-500/40">
                                    <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <p className="text-white font-bold tracking-widest uppercase text-sm">Play Orientation Video 1</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 mb-12">
                        <h2 className="text-3xl font-black text-[#2e3b86] mb-8">What To Do After Watching Video 1</h2>

                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2e3b86] font-bold rounded-full flex items-center justify-center">1</div>
                                <p className="pt-1">Watch the <b>full orientation video</b> above to understand the heart and expectations of the FEB10 Project.</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2e3b86] font-bold rounded-full flex items-center justify-center">2</div>
                                <p className="pt-1">Once completed, you will gain access to the <b>Stage 1 Application Form</b> below.</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2e3b86] font-bold rounded-full flex items-center justify-center">3</div>
                                <p className="pt-1">Fill in all required information thoughtfully. Your commitment starts now.</p>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border-l-8 border-[#2e3b86]">
                            <h4 className="font-black text-[#2e3b86] mb-2 uppercase tracking-tight">Why This Step Matters</h4>
                            <p className="text-sm text-gray-600 italic">
                                "The FEB10 Project is not just about financial support; it is about vision, discipline, and mindset. The orientation videos help you understand the heart of the project and the values that guide our scholarship decisions."
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <button className="px-12 py-5 bg-[#f06436] text-white font-black rounded-full hover:bg-[#d95328] transition-all transform hover:scale-105 shadow-xl shadow-orange-500/20 tracking-widest">
                            PROCEED TO STAGE 1 FORM
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
