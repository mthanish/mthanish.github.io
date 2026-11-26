"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>(
    "Enter your email and message above to get in touch."
  );

  const isValid = name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    setStatus(
      `Thanks, ${name.trim()}. Opening your mail client to send to mohammedthaneesh97@gmail.com.`
    );
    window.location.href = `mailto:mohammedthaneesh97@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-light)] border-t border-[var(--border)]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            HAVE A PROBLEM WORTH SOLVING?
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            Let&apos;s build something meaningful.
          </p>
        </div>

        <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
          {/* Name field */}
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--muted)] mb-2">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
              required
              suppressHydrationWarning
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--muted)] mb-2">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
              required
              suppressHydrationWarning
            />
          </div>

          {/* Message field */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--muted)] mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your problem or project..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              required
              suppressHydrationWarning
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!isValid}
            suppressHydrationWarning
            className="w-full px-8 py-4 rounded-2xl bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            Send Message
          </button>

          {/* Status message */}
          <div className="text-center text-sm" aria-live="polite">
            <p className="text-[var(--muted)]">{status}</p>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
