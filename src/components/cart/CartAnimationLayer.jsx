"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getPath = (animation) => {
  const { start, end } = animation;
  const horizontalDistance = end.x - start.x;
  const verticalDistance = end.y - start.y;
  const arcLift = clamp(Math.abs(horizontalDistance) * 0.2 + Math.abs(verticalDistance) * 0.18, 70, 180);
  const sidePull = clamp(Math.abs(horizontalDistance) * 0.18, 38, 130) * (horizontalDistance > 0 ? 1 : -1);

  return {
    x: [start.x, start.x + sidePull, start.x + horizontalDistance * 0.72, end.x],
    y: [start.y, start.y - arcLift, start.y + verticalDistance * 0.58, end.y],
  };
};

function CartParticle({ animation, onAnimationComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const size = clamp(Math.min(animation.start.width, animation.start.height) * 0.44, 58, 104);
  const path = getPath(animation);

  if (shouldReduceMotion) {
    return (
      <motion.div
        className="fixed left-0 top-0 z-[70] pointer-events-none"
        style={{
          width: size,
          height: size,
          x: animation.end.x - size / 2,
          y: animation.end.y - size / 2,
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: [0.7, 1, 0.55], opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onAnimationComplete={() => onAnimationComplete(animation.id)}
      >
        <ParticleVisual image={animation.image} name={animation.name} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] pointer-events-none"
      style={{
        width: size,
        height: size,
        x: animation.start.x - size / 2,
        y: animation.start.y - size / 2,
      }}
      animate={{
        x: path.x.map((x) => x - size / 2),
        y: path.y.map((y) => y - size / 2),
        scale: [1, 0.95, 0.78, 0.2],
        opacity: [1, 1, 1, 0],
        rotate: [0, -5, 6, 0],
      }}
      transition={{
        duration: 1.7,
        ease: [0.2, 0.82, 0.18, 1],
        times: [0, 0.38, 0.82, 1],
      }}
      onAnimationComplete={() => onAnimationComplete(animation.id)}
    >
      <ParticleVisual image={animation.image} name={animation.name} />
    </motion.div>
  );
}

function ParticleVisual({ image, name }) {
  return (
    <motion.div
      className="relative h-full w-full overflow-visible rounded-full"
      aria-label={name || undefined}
      animate={{
        scaleX: [1, 1.04, 0.94, 0.76],
        scaleY: [1, 0.96, 1.08, 1.2],
      }}
      transition={{ duration: 1.7, ease: "easeOut" }}
    >
      <span className="absolute -inset-2 rounded-full bg-[#FCAB35]/25 blur-lg" />
      <span className="absolute inset-0 overflow-hidden rounded-full border-2 border-[#FCAB35] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.2),0_10px_30px_rgba(252,171,53,0.5)]">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="86px"
            className="rounded-full object-contain p-1.5"
            aria-hidden="true"
          />
        ) : (
          <span className="block h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_28%,#fff7e8_0%,#FCAB35_48%,#e58e16_100%)]" />
        )}
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.08)_25%,rgba(252,171,53,0.08)_68%,rgba(252,171,53,0.22)_100%)]" />
        <span className="absolute right-3 top-2 h-3 w-3 rounded-full bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
      </span>

      <motion.span
        className="absolute inset-0 rounded-full border-2 border-[#FCAB35]/70"
        animate={{ opacity: [0, 0.5, 0], scale: [0.85, 1.35, 1.75] }}
        transition={{ duration: 1.7, ease: "easeOut" }}
      />

      {[0, 1, 2].map((bubble) => (
        <motion.span
          key={bubble}
          className="absolute rounded-full border border-[#FCAB35]/60 bg-white/75 shadow-sm"
          style={{
            width: 8 + bubble * 3,
            height: 8 + bubble * 3,
            left: -4 - bubble * 8,
            bottom: 6 + bubble * 10,
          }}
          animate={{
            x: [-2, -18 - bubble * 6],
            y: [0, -12 + bubble * 3],
            opacity: [0, 0.75, 0],
            scale: [0.35, 1, 0.45],
          }}
          transition={{ duration: 1.7, ease: "easeOut", delay: bubble * 0.08 }}
        />
      ))}
    </motion.div>
  );
}

export default function CartAnimationLayer({ animations, onAnimationComplete }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {animations.map((animation) => (
          <CartParticle
            key={animation.id}
            animation={animation}
            onAnimationComplete={onAnimationComplete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
