"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
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
        <Link
          href="#leadform"
          className="px-6 py-2.5 rounded-full bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] text-white text-sm font-semibold transition shadow-lg shadow-blue-500/20"
        >
          Open Account
        </Link>
      </div>
    </motion.header>
  );
}
