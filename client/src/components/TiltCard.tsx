import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", glowColor = "rgba(14, 165, 233, 0.3)" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative transform-gpu ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full">
                {children}
            </div>
            {/* Glow effect that moves with mouse */}
            <motion.div
                style={{
                    background: `radial-gradient(400px circle at ${mouseXSpring.get() * 100 + 50}% ${mouseYSpring.get() * 100 + 50}%, ${glowColor}, transparent 40%)`,
                    opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0.6, 0.6]) // Always visible slightly on hover logic if we wanted
                }}
                className="absolute inset-0 pointer-events-none rounded-xl z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            />
        </motion.div>
    );
};

export default TiltCard;
