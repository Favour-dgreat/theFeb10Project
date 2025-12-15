'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ScholarshipInfo = () => {
    const [openSection, setOpenSection] = useState<string | null>('ELIGIBILITY');

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const sections = [
        {
            id: 'ELIGIBILITY',
            title: 'ELIGIBILITY',
            content: (
                <div className="space-y-4 text-gray-700">
                    <p className="font-semibold">Applicants must:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Be currently enrolled in The Federal University of Technology, Akure.</li>
                        <li>Be an undergraduate student with strong academic performance.</li>
                        <li>Demonstrate a clear trajectory toward graduating with a first-class or high-distinction result.</li>
                        <li>Face genuine financial challenges that may affect academic stability.</li>
                        <li>Be willing to participate fully in all stages of the scholarship process, including video-based orientation and documentation verification.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'SELECTION',
            title: 'SELECTION PROCESS',
            content: (
                <div className="space-y-6 text-gray-700">
                    <p>
                        The FEB10 Project Scholarship uses a transparent, multi-stage process designed to evaluate academic excellence, authenticity, and financial need.
                    </p>
                    <div className="pl-4 border-l-4 border-blue-900/20">
                        <h4 className="font-bold text-blue-900">Stage 1 – Initial Application & Orientation Video</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Applicant signs up with the online form.</li>
                            <li>An automatic email is sent with a link to the website.</li>
                            <li>Applicants must complete orientation video 1.</li>
                            <li>After watching, they proceed to complete and submit the first-stage form.</li>
                            <li>A confirmation message appears informing them that their application is under review.</li>
                        </ul>
                    </div>
                    <div className="pl-4 border-l-4 border-blue-900/20">
                        <h4 className="font-bold text-blue-900">Stage 2 – Shortlisting, Verification & Video 2</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Shortlisted applicants receive an email confirming they made it to the next stage.</li>
                            <li>The email instructs them to prepare and upload required documents.</li>
                            <li>They return to the website, where they must complete orientation video 2.</li>
                            <li>After the video, they complete the second-stage form and upload all verification documents.</li>
                        </ul>
                    </div>
                    <div className="pl-4 border-l-4 border-blue-900/20">
                        <h4 className="font-bold text-blue-900">Stage 3 – Final Selection & Live Announcement</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Successful applicants receive a final notification email.</li>
                            <li>Email includes details for the live announcement of scholarship winners.</li>
                            <li>Winners are unveiled during the FEB 10 Live Stream Event.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: 'APPLICATION',
            title: 'APPLICATION',
            content: (
                <div className="space-y-4 text-gray-700">
                    <div>
                        <p className="font-bold mb-2">To apply:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Sign up with the online application form on the website.</li>
                            <li>Check your email for the auto-generated message containing the link to proceed.</li>
                            <li>Watch Video 1 (compulsory) and complete the first-stage form.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold mb-2">If shortlisted, follow the instructions in your notification email to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Watch Video 2 (compulsory)</li>
                            <li>Submit all required documents</li>
                            <li>Complete the second-stage verification form</li>
                        </ul>
                    </div>
                    <p className="italic mt-4 text-sm">Await final notification and live announcement details.</p>
                </div>
            )
        },
        {
            id: 'DOCUMENTS',
            title: 'SUPPORTING DOCUMENTS',
            content: (
                <div className="space-y-4 text-gray-700">
                    <p className="font-semibold">Applicants shortlisted to Stage 2 will be required to upload all of the following documents:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Valid Student ID Card</li>
                        <li>Most Recent Semester Result or Transcript</li>
                        <li>Admission Letter (JAMB or School-issued)</li>
                        <li>A Valid Government ID (e.g., NIN Slip, Voter’s Card, Driver’s License, or International Passport)</li>
                        <li>
                            Proof of Current School Fees Status
                            <span className="block text-sm text-gray-500 italic">
                                Receipt, invoice, or official statement showing paid or outstanding fees
                            </span>
                        </li>
                        <li>Passport Photograph (clear and recent)</li>
                        <li>
                            Additional Supporting Documents (If Applicable)
                            <span className="block text-sm text-gray-500 italic">
                                Evidence of Financial Need e.g., parent/guardian ID, a brief statement of situation, or supporting documentation
                            </span>
                        </li>
                        <li>Any Other Document Requested in Email Instructions</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'DEADLINE',
            title: 'DEADLINE',
            content: (
                <div className="space-y-4 text-gray-700">
                    <p>
                        The application deadline for the FEB10 Project 2026 Scholarship will be announced on the official website and all social platforms.
                    </p>
                    <p>
                        Shortlisted candidates and finalists will receive all timing details directly via email throughout the selection process.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="w-full bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-10">
                <h2 className="text-[#1a237e] text-sm font-bold tracking-widest uppercase mb-2">Scholarship Page</h2>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a237e] mb-4 leading-tight">
                    THE FEB10 PROJECT 2026 SCHOLARSHIP
                </h1>
                <h3 className="text-xl md:text-2xl text-gray-600 font-serif italic mb-8 border-l-4 border-[#FFD700] pl-4">
                    A Bridge from Struggle to Possibility
                </h3>

                <div className="prose prose-lg text-gray-700 leading-relaxed mb-8">
                    <p className="mb-4">
                        The FEB10 Project Scholarship was born from a place of empathy. It originated from lived experiences, personal battles, and the quiet understanding that brilliance should never be buried under financial hardship. Our founder, <span className="font-semibold text-[#1a237e]">Sunny Willz</span>, walked the same road many young Nigerians walk today: a journey defined by resilience, survival, and a relentless commitment to rise above limitation.
                    </p>
                    <p className="mb-4">
                        Growing up, he watched his father, a man who never had the privilege of school, yet worked with dignity and strength, sacrifice everything to ensure he had a chance at education. Entering university was a miracle. Staying in university was the battle. School fees, rent, feeding, books, and basic needs were never guaranteed. Balancing survival with academic excellence felt impossible, yet through God’s help, sacrifice, and unwavering determination, he graduated with a first-class degree.
                    </p>
                    <p className="font-medium text-gray-900 italic">
                        Behind that first class was a story of struggle. A story many brilliant students are still living. The FEB10 Project Scholarship exists to rewrite that story.
                    </p>
                </div>

                <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100 mb-8">
                    <h4 className="text-lg font-bold text-[#1a237e] mb-3">About the Scholarship</h4>
                    <p className="text-gray-700 mb-4">
                        The FEB10 Project 2026 Scholarship is a transformative support initiative designed for exceptional undergraduate students in The Federal University of Technology, Akure, Ondo State, who demonstrate outstanding academic performance but lack the financial resources to sustain their education. It is also our founder’s way of giving back to his Alma Matter.
                    </p>
                    <p className="font-semibold text-gray-800 mb-2">We are committed to supporting students who are:</p>
                    <ul className="list-none space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFD700]">★</span> Academically excellent and on a clear path toward a first-class degree
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFD700]">★</span> Committed, disciplined, and driven
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFD700]">★</span> Facing genuine financial challenges
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#FFD700]">★</span> Ready to grow, learn, and impact their communities
                        </li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                {sections.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 md:p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                        >
                            <span className="font-bold text-[#1a237e] text-lg">{section.title}</span>
                            {openSection === section.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                        <AnimatePresence>
                            {openSection === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="bg-gray-50 border-t border-gray-200"
                                >
                                    <div className="p-5">
                                        {section.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScholarshipInfo;
