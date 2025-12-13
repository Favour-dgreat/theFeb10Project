'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        image: '/images/ScrollBanner1_jpg.jpg',
        text: "| We Don't Just Give - We Equip.",
    },
    {
        id: 2,
        image: '/images/ScrollBanner2_jpg.jpg',
        text: '| Inspiring Hope. Unlocking Potential. Transforming Students.',
    },
    {
        id: 3,
        image: '/images/ScrollBanner3_jpg.jpg',
        text: '| 2023: Over 3000 Students Empowered through our Career Talk Initiative in Ondo State',
    },
    {
        id: 4,
        image: '/images/ScrollBanner4_jpg.jpg',
        text: '| Shaping Young Minds Through Our School Outreach Initiative',
    },
    {
        id: 5,
        image: '/images/ScrollBanner5_jpg.jpg',
        text: "|2017: Our First Step of Love - Reaching Motherless Babies' Homes and Orphanages in Oyo State",
    },
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    // Handle slide transition
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
            setDisplayedText(''); // Reset text when changing slides
            setIsTyping(true);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    // Typing effect
    useEffect(() => {
        const currentText = slides[currentIndex].text;

        if (displayedText.length < currentText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentText.slice(0, displayedText.length + 1));
            }, 50); // Speed of typing (50ms per character)

            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false);
        }
    }, [displayedText, currentIndex]);

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[currentIndex].image}
                        alt="Slide Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text readability */}
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-center px-4 text-center z-10">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold max-w-5xl leading-tight drop-shadow-lg">
                    {displayedText}
                    <span className={`inline-block w-1 h-[1em] bg-white ml-1 align-middle ${isTyping ? 'animate-blink' : 'animate-blink-slow'}`} />
                </h1>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setDisplayedText('');
                            setIsTyping(true);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 49% {
                        opacity: 1;
                    }
                    50%, 100% {
                        opacity: 0;
                    }
                }
                
                @keyframes blink-slow {
                    0%, 70% {
                        opacity: 1;
                    }
                    71%, 100% {
                        opacity: 0;
                    }
                }
                
                .animate-blink {
                    animation: blink 0.8s infinite;
                }
                
                .animate-blink-slow {
                    animation: blink-slow 1.2s infinite;
                }
            `}</style>
        </div>
    );
};

export default HeroSlider;
