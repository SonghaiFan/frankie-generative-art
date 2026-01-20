
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POETIC_LOGS = [
    "Searching for aesthetic archetypes...",
    "正在检索审美原型...",
    "Synchronizing fragmented memories...",
    "Tracing golden ratios in the void...",
    "正在提取潜意识模式...",
    "Refining geometric logic...",
    "正在重构艺术史碎片...",
    "Awaiting the oracle's verdict...",
];

const LoadingTerminal: React.FC = () => {
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogIndex((prev) => (prev + 1) % POETIC_LOGS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-center px-6 md:px-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="max-w-7xl w-full mx-auto"
            >
                <div className="flex flex-col items-start space-y-12">
                    <div className="space-y-4">
                        <div className="h-[1px] w-12 bg-white/50 animate-pulse" />
                        <h2 className="text-4xl font-serif text-white/30 animate-pulse">
                            Synthesizing Final Form...
                        </h2>
                    </div>

                    <div className="h-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={logIndex}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 5 }}
                                transition={{ duration: 1 }}
                                className="font-serif italic text-sm text-white/20 tracking-[0.2em]"
                            >
                                — {POETIC_LOGS[logIndex]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingTerminal;
