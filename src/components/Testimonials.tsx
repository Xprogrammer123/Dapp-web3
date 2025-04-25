
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Alex Thompson',
    role: 'Crypto Investor',
    content: "This platform's wallet validation system is incredibly robust. The encryption checks gave me peace of mind about my digital assets' security.",
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    name: 'Sarah Chen',
    role: 'DeFi Developer',
    content: 'The key derivation verification process is thorough and professional. It’s exactly what we needed for our institutional clients.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Blockchain Consultant',
    content: 'I’ve tested many wallet validation services, but this one stands out for its comprehensive security checks and user-friendly interface.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    name: 'Emma Wilson',
    role: 'Crypto Enthusiast',
    content: 'The encryption validation feature helped me identify and fix potential vulnerabilities in my wallet setup. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
];

const Testimonials: React.FC = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the U-shaped curve transform
  const getCardTransform = (index: number, total: number, progress: number) => {
    const normalizedIndex = (index - progress * total) % total;
    const relativePos = normalizedIndex / total;
    const angle = relativePos * Math.PI * 2; // Full circle for positioning

    // U-shaped curve: adjust Y position with a parabolic curve
    const curveDepth = 100; // Depth of the U curve
    const yOffset = Math.abs(Math.sin(angle)) * curveDepth; // Parabolic effect
    const zOffset = Math.cos(angle) * 50; // Depth for 3D effect
    const scale = 0.7 + 0.3 * Math.cos(angle); // Scale cards in the front larger
    const rotateY = Math.sin(angle) * 30; // Tilt cards for 3D effect

    return {
      x: `${relativePos * 100}%`,
      y: yOffset,
      z: zOffset,
      scale,
      rotateY,
      opacity: 0.7 + 0.3 * Math.cos(angle), // Fade edges
    };
  };

  // Infinite loop animation
  useEffect(() => {
    controls.start({
      x: ['0%', '-100%'],
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="py-12 bg-gradient-to-b from-gray-900 to-black">
      <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center">
        What Our Users Say
      </h2>
      <div className="relative overflow-hidden perspective-1000">
        <motion.div
          className="flex gap-6"
          animate={controls}
          style={{ display: 'flex', width: `${testimonials.length * 200}%` }}
          ref={containerRef}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] sm:min-w-[360px]"
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
              animate={getCardTransform(index, testimonials.length, 0)}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="glass-card border border-blue-500/20 bg-white/5 backdrop-blur-lg shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/50"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-300">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
