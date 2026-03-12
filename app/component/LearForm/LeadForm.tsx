"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StatusModal from "../StatusModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/leads/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.mobile,
          countryCode: formData.countryCode,
          city: formData.city,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setModal({
          show: true,
          type: "success",
          message:
            "Your request has been submitted successfully. Our team will contact you shortly.",
        });

        setFormData({
          name: "",
          countryCode: "+91",
          mobile: "",
          email: "",
          city: "",
          message: "",
        });
      } else {
        setModal({
          show: true,
          type: "error",
          message: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="leadform" className="px-6 bg-[var(--cft-bg-dark)] py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          // className="hidden md:block"
        >
          <img
            src="/lead-image.png"
            alt="Trading"
            className="rounded-[var(--radius-lg)] border border-[var(--cft-border)]"
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[var(--cft-bg-card)] border border-[var(--cft-border)] rounded-[var(--radius-lg)] p-8 space-y-5"
        >
          <h2 className="text-3xl font-display font-bold">
            Get Started With{" "}
            <span className="text-[var(--cft-primary)]">Smart Trading</span>
          </h2>

          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--cft-bg-surface)] border border-[var(--cft-border)]"
          />

          {/* Phone */}
          <div className="flex gap-3">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="p-3 rounded-md bg-[var(--cft-bg-surface)] border border-[var(--cft-border)]"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="flex-1 p-3 rounded-md bg-[var(--cft-bg-surface)] border border-[var(--cft-border)]"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--cft-bg-surface)] border border-[var(--cft-border)]"
          />

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--cft-bg-surface)] border border-[var(--cft-border)]"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[var(--cft-bg-surface)] border border-[var(--cft-border)]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full cursor-pointer bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] transition"
          >
            {loading ? "Submitting..." : "Submit →"}
          </button>
        </motion.form>
      </div>

      {modal.show && (
        <StatusModal
          type={modal.type as "success" | "error"}
          message={modal.message}
          close={() => setModal({ ...modal, show: false })}
        />
      )}
    </section>
  );
}
