import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "framer-motion";

const TESTIMONIALS = [
  {
    name: 'Alex Thompson',
    role: 'Crypto Investor',
    content: "This platform's wallet validation system is incredibly robust. The encryption checks gave me peace of mind about my digital assets' security.",
    avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  },
  {
    name: 'Sarah Chen',
    role: 'DeFi Developer',
    content: 'The key derivation verification process is thorough and professional. It’s exactly what we needed for our institutional clients.',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Blockchain Consultant',
    content: 'I’ve tested many wallet validation services, but this one stands out for its comprehensive security checks and user-friendly interface.',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  },
  {
    name: 'Emma Wilson',
    role: 'Crypto Enthusiast',
    content: 'The encryption validation feature helped me identify and fix potential vulnerabilities in my wallet setup. Highly recommended!',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  },
  {
    name: 'Alex Thompson',
    role: 'Crypto Investor',
    content: "This platform's wallet validation system is incredibly robust. The encryption checks gave me peace of mind about my digital assets' security.",
    avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  },
  {
    name: 'Sarah Chen',
    role: 'DeFi Developer',
    content: 'The key derivation verification process is thorough and professional. It’s exactly what we needed for our institutional clients.',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  },
 
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  testimonials?: typeof TESTIMONIALS;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  testimonials = [],
}) => {
  // Use default testimonials if none are provided
  const galleryTestimonials = testimonials.length > 0 ? testimonials : TESTIMONIALS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry calculations
  const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
  const faceCount: number = galleryTestimonials.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  // Framer Motion values and controls
  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[700px] w-full">
         <h2 className="text-3xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 text-center">
        What Our Users Say
      </h2>
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="pointer-events-none h-[300px] w-[300px] rounded-2xl border bg-transparent p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[350px] sm:w-[280px]">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover mb-4"
                />
                <p className="text-gray-500 text-sm mb-4">{testimonial.content}</p>
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;