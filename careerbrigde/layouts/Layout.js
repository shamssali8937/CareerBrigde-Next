"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Layout({ children, rightImage, wide = false }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40 text-slate-800">
      {/* Left side content */}
      <div className={`w-full ${wide ? "md:w-3/5 lg:w-7/12" : "md:w-1/2"} flex flex-col min-h-screen md:min-h-0 md:h-screen`}>
        {/* Brand Header */}
        <div className="flex items-center px-6 py-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/iconpeople.svg"
                alt="CareerBridge Logo"
                className="w-6 h-6 brightness-0 invert"
              />
            </div>
            <div className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
              Career<span className="text-indigo-600">Bridge</span>
            </div>
          </Link>
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow flex flex-col justify-center items-center w-full px-4 py-4 md:px-8 overflow-y-auto"
        >
          <div className={`w-full ${wide ? "max-w-2xl sm:max-w-3xl" : "max-w-md"} bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8`}>
            {children}
          </div>
        </motion.div>
      </div>

      {/* Right side decorative hero banner */}
      <div className={`hidden md:flex ${wide ? "md:w-2/5 lg:w-5/12" : "md:w-1/2"} md:h-screen sticky top-0 p-4`}>
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-tr from-indigo-900 via-indigo-800 to-violet-900 shadow-2xl flex flex-col justify-between p-10 text-white">
          {rightImage && (
            <img
              src={rightImage}
              alt="CareerBridge Platform"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
          )}
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 -right-12 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100">
              Trusted by 10,000+ professionals & teams
            </span>
          </div>

          {/* Bottom Testimonial / Value Prop */}
          <div className="relative z-10 max-w-lg">
            <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed text-white/95">
              “The most seamless way to find roles that match your ambition and connect with innovative teams.”
            </blockquote>
            <p className="mt-3 text-sm text-indigo-200 font-medium">
              CareerBridge Talent Network • Modern Career Opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
