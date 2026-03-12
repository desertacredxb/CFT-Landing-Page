"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const linkClass = (href: string) =>
    `block px-4 py-3 rounded-lg transition ${
      path === href
        ? "bg-[var(--cft-primary)] text-white"
        : "text-[var(--cft-text-muted)] hover:bg-[var(--cft-bg-surface)]"
    }`;

  const logout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/login-admin";
  };

  return (
    <aside className="w-64 border-r border-[var(--cft-border)] p-6 sticky top-0 h-screen">
      <h2 className="text-xl font-bold mb-10">CFT Admin</h2>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          Dashboard
        </Link>

        <Link href="/admin/leads" className={linkClass("/admin/leads")}>
          Leads
        </Link>

        <button
          onClick={logout}
          className="mt-10 text-red-400 border border-red-500 px-3 py-2 cursor-pointer hover:bg-red-500 hover:text-white"
        >
          Logout →
        </button>
      </nav>
    </aside>
  );
}
