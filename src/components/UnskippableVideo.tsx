'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnskippableVideoProps {
    src: string;
    onComplete: () => void;
    poster?: string;
}

export default function UnskippableVideo({ src, onComplete, poster }: UnskippableVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (video.duration) {
                const prog = (video.currentTime / video.duration) * 100;
                setProgress(prog);
                setCurrentTime(video.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setIsCompleted(true);
            onComplete();
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);


        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover aspect-video"
                playsInline
                disablePictureInPicture
                // Disable default controls completely
                controls={false}
                // Prevent context menu to hide "Show controls"
                onContextMenu={(e) => e.preventDefault()}
                onClick={togglePlay}
            />

            {/* Custom Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end px-4 pb-0 transition-opacity duration-300">

                {/* Play/Pause Button in Center (visible when paused) */}
                <AnimatePresence>
                    {!isPlaying && !isCompleted && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                        >
                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 bg-[#f06436] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 hover:scale-110 transition-transform"
                            >
                                <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Bar */}
                <div className="pointer-events-auto flex items-center gap-4">
                    <button onClick={togglePlay} className="text-white hover:text-orange-400 transition-colors">
                        {isPlaying ? (
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Progress Bar (Visual Only - Non-interactive/Unskippable) */}
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#f06436]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="text-white font-mono text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </div>

            {/* Completed State Overlay */}
            {isCompleted && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold">Orientation Completed</h3>
                        <p className="text-sm opacity-80 mt-2">You may now proceed.</p>
                        <button
                            onClick={() => {
                                videoRef.current?.play();
                                setIsCompleted(false);
                                setIsPlaying(true);
                            }}
                            className="mt-4 text-xs underline hover:text-orange-400"
                        >
                            Watch Again
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
