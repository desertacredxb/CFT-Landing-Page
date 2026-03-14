"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {

  const scrollToLeadForm = () => {
    const section = document.getElementById("leadform");

    if (section) {
      const yOffset = -100; // adjust for fixed navbar height
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // update url hash so users can share link
      window.history.replaceState(null, "", "#leadform");
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-28 py-6"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo-cft.png"
          alt="Close Friend Traders Logo"
          width={180}
          height={80}
          priority
          className="h-12 w-auto md:h-16 lg:h-20 object-contain"
        />
      </Link>

      {/* Desktop CTA */}
      <div className="md:flex items-center gap-4">
        <button
          onClick={scrollToLeadForm}
          className="px-6 py-2.5 rounded-full bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] text-white text-sm font-semibold transition shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          Open Account
        </button>
      </div>
    </motion.header>
  );
}