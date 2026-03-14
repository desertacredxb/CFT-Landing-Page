"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { scrollToLeadForm } from "../utils/scrollToLeadForm";

const features = [
  {
    icon: "/register.png",
    title: "Register in Under 5 Sec",
    desc: "Beginner-friendly registration straight under 5 seconds.",
  },
  {
    icon: "/support.png",
    title: "24×7 Customer Support",
    desc: "Markets don’t sleep. Neither do we. Expert help, 24x7.",
  },
  {
    icon: "/500x.png",
    title: "500x Margin",
    desc: "Entry-Level Capital. Pro-Level Power.",
  },
  {
    icon: "/zero.png",
    title: "0% Commission",
    desc: "Keep everything you earn. No cuts, we promise.",
  },
  {
    icon: "/withdrawl.png",
    title: "Quick Withdrawals",
    desc: "Seamless withdrawals. Because your time matters.",
  },
  {
    icon: "/security.png",
    title: "No Hidden Charges",
    desc: "What you see is what you get. Every rupee accounted for.",
  },
  {
    icon: "/Tax.png",
    title: "0% Tax on Profits",
    desc: "0% Tax on Profits. 100% Returns to You.",
  },
  {
    icon: "/HappyTraders.png",
    title: "5M+ Happy Traders",
    desc: "Home to a global network of 5 million+ traders.",
  },
];

export default function WhyTrade() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.offsetWidth;

    const newIndex = direction === "left" ? index - 1 : index + 1;
    setIndex(newIndex);

    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 bg-[var(--cft-bg-dark)] text-[var(--cft-text-main)]">
      {/* Section Title */}
      <div className="text-center mb-16 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Why <span className="text-gradient-blue">50,000+ Traders</span> Trust
          Us
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 md:w-5/6 mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            className="group perspective-[1200px]"
          >
            <motion.div
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.04,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 14 }}
              className="relative bg-[var(--cft-bg-card)] border border-[var(--cft-border)] rounded-[var(--radius-lg)] p-6 min-h-[260px] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_30px_var(--cft-primary-glow)]"
            >
              {/* Icon */}
              <Image
                src={feature.icon}
                alt={feature.title}
                width={70}
                height={70}
                className="mb-4 object-contain"
              />

              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>

              <p className="text-[var(--cft-text-muted)] text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden relative mt-12">
        <div
          ref={containerRef}
          className="flex overflow-x-scroll snap-x snap-mandatory no-scrollbar"
        >
          {features.map((feature, i) => (
            <div key={i} className="min-w-full px-6 snap-start">
              <div className="bg-[var(--cft-bg-card)] border border-[var(--cft-border)] rounded-[var(--radius-lg)] p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={70}
                    height={70}
                  />
                </div>

                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>

                <p className="text-[var(--cft-text-muted)]">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {index > 0 && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full"
          >
            ←
          </button>
        )}

        {index < features.length - 1 && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full"
          >
            →
          </button>
        )}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-16">
        <button
          onClick={scrollToLeadForm}
          className="px-8 py-3 rounded-full cursor-pointer bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] glow-blue transition font-medium"
        >
          Start Trading Now →
        </button>
      </div>
    </section>
  );
}
