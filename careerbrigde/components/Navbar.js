"use client";
import { FaHome, FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ onProfileClick }) {
  const role = useSelector((state) => state.signup.role);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isProvider = role === "jobprovider" || role === "provider";
  const homeHref = isProvider ? "/Provider/HomePage" : "/Seeker/HomePage";
  const jobsHref = isProvider ? "/Provider/JobApplications" : "/Seeker/AppliedJobs";
  const jobsLabel = isProvider ? "Job Applicants" : "Applied Jobs";

  const isHomeActive = pathname?.includes("HomePage");
  const isJobsActive = pathname?.includes("JobApplications") || pathname?.includes("AppliedJobs");

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Brand Logo */}
          <Link href={homeHref} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/iconpeople.svg"
                alt="CareerBridge Logo"
                className="w-5 h-5 brightness-0 invert"
              />
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
              Career<span className="text-indigo-600">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href={homeHref}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isHomeActive
                  ? "bg-indigo-50 text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <FaHome className={`text-base ${isHomeActive ? "text-indigo-600" : "text-slate-400"}`} />
              <span>Dashboard</span>
            </Link>

            <Link
              href={jobsHref}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isJobsActive
                  ? "bg-indigo-50 text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <FaBriefcase className={`text-base ${isJobsActive ? "text-indigo-600" : "text-slate-400"}`} />
              <span>{jobsLabel}</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 mx-2" />

            <AccountMenu onProfileClick={onProfileClick} />
          </nav>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <AccountMenu onProfileClick={onProfileClick} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-2 pb-4 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              <Link
                href={homeHref}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isHomeActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FaHome className={isHomeActive ? "text-indigo-600" : "text-slate-400"} />
                Dashboard
              </Link>

              <Link
                href={jobsHref}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isJobsActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FaBriefcase className={isJobsActive ? "text-indigo-600" : "text-slate-400"} />
                {jobsLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
