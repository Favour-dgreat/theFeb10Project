'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Section05 = () => {
    return (
        <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-white bg-[url('/images/H5_jpg.jpg')] bg-cover bg-center bg-no-repeat">
            {/* Full-width Orange Overlay for the bottom section */}
            <div className="absolute inset-x-0 bottom-0 h-1/2"></div>
            <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text readability */}

            <div className="max-w-7xl mx-auto relative z-10"> {/* z-10 ensures content sits on top of the overlay */}

                {/* We add padding to push the content below the image and onto the orange overlay area */}
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10 pt-16 sm:pt-24 md:pt-32 items-stretch">
                    {/* Left Side - Our Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/15 transition-all duration-300"
                    >
                        {/* Glassy Glow Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />

                        <div className="relative z-10">
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 bg-[#f06436] text-white text-[10px] font-bold tracking-widest uppercase rounded mb-4">
                                    Our Purpose
                                </span>
                                <h2 className="text-4xl md:text-5xl text-white font-black mb-4 tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-300">
                                    Our Mission
                                </h2>
                                <div className="w-12 h-1.5 bg-[#f06436] rounded-full" />
                            </div>

                            <p className="text-lg md:text-xl text-gray-100 font-medium leading-relaxed mb-8">
                                To transform lives by bridging the gap between potential and opportunity through scholarships, grants, youth empowerment, mentorship, and development programs that provide resources, direction, and hope.
                            </p>

                            <a href="#" className="inline-flex items-center gap-2 font-bold text-white hover:text-[#f06436] transition duration-300 text-sm group/btn">
                                <span>LEARN MORE</span>
                                <svg
                                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side - Our Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/15 transition-all duration-300"
                    >
                        {/* Glassy Glow Effect */}
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#f06436]/20 rounded-full blur-3xl group-hover:bg-[#f06436]/30 transition-all duration-500" />

                        <div className="relative z-10">
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 bg-[#2e3b86] text-white text-[10px] font-bold tracking-widest uppercase rounded mb-4">
                                    Our Future
                                </span>
                                <h2 className="text-4xl md:text-5xl text-white font-black mb-4 tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-300">
                                    Our Vision
                                </h2>
                                <div className="w-12 h-1.5 bg-[#2e3b86] rounded-full" />
                            </div>

                            <p className="text-lg md:text-xl text-gray-100 font-medium leading-relaxed mb-8">
                                A world where no potential is wasted, where people across Africa and beyond are equipped, funded, and empowered to live a meaningful life, rise into their fullest capacity and impact their world.
                            </p>

                            <a href="#" className="inline-flex items-center gap-2 font-bold text-white hover:text-[#2e3b86] transition duration-300 text-sm group/btn">
                                <span>LEARN MORE</span>
                                <svg
                                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Section05;