'use client';

import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const spotlightVideos = [
    { src: '/videos/media/AwardeesVideo1_mp4.mp4', title: 'Awardee Spotlight 1', poster: '/videos/media/awardee1.png' },
    { src: '/videos/media/AwardeesVideo2_mp4.mp4', title: 'Awardee Spotlight 2', poster: '/videos/media/awardee2.png' },
];

const mediaVideos = [
    { src: '/videos/media/Video1.mp4', title: 'Community Outreach 1', poster: '/videos/media/1.jpg' },
    { src: '/videos/media/Video2.mp4', title: 'Community Outreach 2', poster: '/videos/media/2.jpg' },
    { src: '/videos/media/Video3.mp4', title: 'Community Outreach 3', poster: '/videos/media/3.jpg' },
    { src: '/videos/media/Video4.mp4', title: 'Community Outreach 4', poster: '/videos/media/4.jpg' },
];

export default function MediaPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header / Hero Section for the page */}
            <section className="relative py-20 px-4 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-50" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            Media <span className="text-[#f06436]">Gallery</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600">
                            Explore our collection of moments, stories, and impact.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Video Sections */}
            <section id="videos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-20">
                {/* Vertical Awardee Spotlights (9:16) */}
                <div>
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold tracking-widest text-[#f06436] uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100">
                            Awardee Spotlights
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
                            Voices of Tomorrow&apos;s Leaders
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-8xl mx-auto justify-center">
                        {spotlightVideos.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group flex flex-col items-center w-full"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-[9/16] w-full max-w-[540px] ring-1 ring-black/10">
                                    <video
                                        controls
                                        playsInline
                                        className="w-full h-full object-cover"
                                        preload="metadata"
                                        poster={video.poster}
                                    >
                                        <source src={video.src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none group-hover:ring-[#f06436]/50 transition-all duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Horizontal Media Highlights (16:9) */}
                <div>
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold tracking-widest text-[#2e3b86] uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            Outreach &amp; Moments
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
                            Initiatives in Action
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {mediaVideos.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 aspect-video ring-1 ring-black/5">
                                    <video
                                        controls
                                        playsInline
                                        className="w-full h-full object-cover"
                                        preload="metadata"
                                        poster={video.poster}
                                    >
                                        <source src={video.src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none group-hover:ring-[#f06436]/50 transition-all duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    );
}
