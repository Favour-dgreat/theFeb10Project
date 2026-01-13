'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function SocialLinksPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Stay Connected With The FEB10 Project
                        </h1>
                        <div className="w-24 h-1 bg-[#f06436] mx-auto rounded-full" />
                    </div>

                    {/* Main Content */}
                    <div className="text-gray-700 text-lg leading-relaxed space-y-6 text-center max-w-3xl mx-auto">
                        <p>
                            To ensure you never miss an important update, we encourage all applicants and supporters to follow The FEB10 Project across our official social media platforms.
                        </p>
                        <p>
                            Key announcements — including application updates, shortlisted candidates, live event details, and final scholarship results — will be communicated through our social channels.
                        </p>
                        <p className="font-semibold text-[#2e3b86]">
                            Following us keeps you informed, connected, and part of the FEB10 journey.
                        </p>
                    </div>

                    {/* Social Links Section */}
                    <div className="py-8">
                        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Follow us on:</h2>
                        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/thefeb10project?igsh=amEydWsxemU4NHI%3D&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-pink-500 transition-all group"
                            >
                                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">Instagram</span>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/share/1ay9naqt35/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-600 transition-all group"
                            >
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Facebook</span>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/the-feb10-project/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-700 transition-all group"
                            >
                                <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">LinkedIn</span>
                            </a>

                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                        <div className="flex gap-4">
                            <span className="text-2xl">📢</span>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Important:</h3>
                                <p className="text-gray-700">
                                    Applicants are strongly advised to follow and regularly check our official pages to stay up to date with verified information and announcements.
                                </p>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
