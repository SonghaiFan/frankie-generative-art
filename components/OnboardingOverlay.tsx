
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MousePointer2, Search } from 'lucide-react';

interface OnboardingOverlayProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: <Sparkles size={32} />,
    title: "灵感档案室",
    desc: "这里是潜意识的星图。每一颗星尘都封存着一个艺术概念。",
    action: "下一步"
  },
  {
    icon: <MousePointer2 size={32} />,
    title: "探索连接",
    desc: "拖动星空以漫游。点击闪烁的节点，打开记忆的抽屉。",
    action: "下一步"
  },
  {
    icon: <Search size={32} />,
    title: "构建星座",
    desc: "你的每一次选择都将连成线，最终绘制出属于你的审美图谱。",
    action: "进入档案室"
  }
];

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-md p-8 relative">
        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-black shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="text-white/80">
                {steps[step].icon}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-serif text-white tracking-widest">{steps[step].title}</h2>
              <div className="w-8 h-[1px] bg-white/30 mx-auto" />
              <p className="font-ui text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
                {steps[step].desc}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="mt-8 px-8 py-3 border border-white/30 rounded-full text-xs font-ui tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              {steps[step].action}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center gap-3">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === step ? 'bg-white scale-125' : 'bg-white/20'}`} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingOverlay;
