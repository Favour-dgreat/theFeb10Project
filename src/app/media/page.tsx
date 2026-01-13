'use client';

import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const videos = [
    { src: '/videos/media/Video1.mp4', title: 'Video 1', poster: '/videos/media/1.jpg' },
    { src: '/videos/media/Video2.mp4', title: 'Video 2', poster: '/videos/media/2.jpg' },
    { src: '/videos/media/Video3.mp4', title: 'Video 3', poster: '/videos/media/3.jpg' },
    { src: '/videos/media/Video4.mp4', title: 'Video 4', poster: '/videos/media/4.jpg' },
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

            {/* Video Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {videos.map((video, index) => (
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
                                    className="w-full h-full object-cover"
                                    preload="metadata"
                                    poster={video.poster}
                                >
                                    <source src={video.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Optional overlay before play - standard browser controls usually handle this well enough, 
                    but we can add a subtle border/glow on hover */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none group-hover:ring-[#f06436]/50 transition-all duration-300" />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                {/* <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#f06436] transition-colors">
                                    {video.title}
                                </h3> */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
                    <Footer/>

        </div>
    );
}
