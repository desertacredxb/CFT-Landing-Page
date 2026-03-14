"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { scrollToLeadForm } from "../utils/scrollToLeadForm";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 text-center noise-overlay">
      {/* Background Glow Layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: "var(--cft-glow-blue)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--cft-glow-center)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-28 pb-8 md:py-14">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--cft-border)] bg-[var(--cft-bg-surface)] text-xs text-[var(--cft-text-muted)] mb-8"
        >
          <span className="px-2 py-0.5 rounded-full bg-[var(--cft-primary)] text-white text-[10px] font-semibold">
            Prime
          </span>

          <span>Close Friend Traders — Get 5% Bonus Now!</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
        >
          India’s Most Powerful Leverage
          <span className="text-gradient-blue glow-text">
            Trading Platform
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 text-lg md:text-xl text-[var(--cft-text-muted)] max-w-2xl mx-auto leading-relaxed"
        >
          Trade multiple markets with small capital and experience smooth
          trading with Tradedost.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToLeadForm}
            className="px-8 py-3 rounded-full bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] text-white font-medium transition glow-blue cursor-pointer"
          >
            Open Trading Account →
          </button>

          <Link
            href="#features"
            className="px-8 py-3 rounded-full border border-[var(--cft-border-bright)] text-white hover:bg-[var(--cft-bg-surface)] transition"
          >
            Explore Features
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {[
            "500X Margin Trading",
            "Fast Withdrawal System",
            "Best Client Support",
            "Smooth Trading Experience",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--cft-bg-surface)] border border-[var(--cft-border)] backdrop-blur-md hover:border-[var(--cft-primary)] transition duration-300"
            >
              <span className="text-xl text-[var(--cft-primary)]">⚡</span>

              <span className="text-sm md:text-base text-white font-medium">
                {feature}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={scrollToLeadForm}
            className="px-8 py-3 rounded-full bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] text-white font-medium transition glow-blue cursor-pointer"
          >
            Open Trading Account →
          </button>
        </motion.div>

      </div>
    </section>
  );
}