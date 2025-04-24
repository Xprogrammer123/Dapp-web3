import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Crypto Investor",
    content: "This platform's wallet validation system is incredibly robust. The encryption checks gave me peace of mind about my digital assets' security.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    name: "Sarah Chen",
    role: "DeFi Developer",
    content: "The key derivation verification process is thorough and professional. It's exactly what we needed for our institutional clients.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    name: "Michael Rodriguez",
    role: "Blockchain Consultant",
    content: "I've tested many wallet validation services, but this one stands out for its comprehensive security checks and user-friendly interface.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  },
  {
    name: "Emma Wilson",
    role: "Crypto Enthusiast",
    content: "The encryption validation feature helped me identify and fix potential vulnerabilities in my wallet setup. Highly recommended!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
  }
];

const Testimonials = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold mb-8 text-gradient text-center">What Our Users Say</h2>
      <div className="relative overflow-hidden">
        <div className="flex gap-6 py-4">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <Card key={index} className="min-w-[300px] sm:min-w-[400px] glass-card border-web3-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-web3-primary">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;