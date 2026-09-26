"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaCheck,
  FaArrowRight,
  FaBuilding,
  FaUserTie,
  FaClock,
  FaRegBookmark,
  FaChevronRight,
  FaGlobeAmericas,
  FaLayerGroup,
  FaFilter,
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [locationType, setLocationType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/Auth/Signin");
  };

  const categories = [
    "All",
    "Engineering",
    "Product",
    "Design",
    "Operations",
  ];

  const featuredJobs = [
    {
      id: "1",
      category: "Engineering",
      title: "Senior Full Stack Engineer",
      company: "Linear",
      stage: "Series B • Developer Tools",
      location: "Remote",
      type: "Full-Time",
      salary: "$145,000 – $180,000",
      equity: "0.1% – 0.25%",
      posted: "2d ago",
      tags: ["React", "TypeScript", "Node.js", "GraphQL"],
    },
    {
      id: "2",
      category: "Design",
      title: "Product Designer (Design Systems)",
      company: "Figma",
      stage: "Public • Design Platforms",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-Time",
      salary: "$150,000 – $185,000",
      equity: "Competitive RSU",
      posted: "1d ago",
      tags: ["Design Systems", "Figma", "Prototyping", "UI/UX"],
    },
    {
      id: "3",
      category: "Engineering",
      title: "Distributed Systems Backend Engineer",
      company: "Supabase",
      stage: "Series B • Open Source Data",
      location: "Remote",
      type: "Full-Time",
      salary: "$140,000 – $175,000",
      equity: "0.1% – 0.3%",
      posted: "3d ago",
      tags: ["Go", "PostgreSQL", "Elixir", "Kubernetes"],
    },
    {
      id: "4",
      category: "Product",
      title: "Senior Technical Product Manager",
      company: "Stripe",
      stage: "Late Stage • Financial Infrastructure",
      location: "New York, NY (Hybrid)",
      type: "Full-Time",
      salary: "$165,000 – $210,000",
      equity: "Competitive Equity",
      posted: "Just now",
      tags: ["API Platforms", "Payments", "Developer Experience"],
    },
    {
      id: "5",
      category: "Engineering",
      title: "Frontend Platform Engineer",
      company: "Vercel",
      stage: "Series D • Cloud Infrastructure",
      location: "Remote",
      type: "Full-Time",
      salary: "$155,000 – $190,000",
      equity: "Stock Options",
      posted: "4d ago",
      tags: ["Next.js", "React", "Rust", "Web Performance"],
    },
    {
      id: "6",
      category: "Operations",
      title: "Technical Operations & Security Lead",
      company: "Retool",
      stage: "Series C • Internal Software",
      location: "Remote",
      type: "Full-Time",
      salary: "$130,000 – $165,000",
      equity: "0.08% – 0.18%",
      posted: "5d ago",
      tags: ["SOC2", "Infra Security", "Cloud Architecture"],
    },
  ];

  const filteredJobs = featuredJobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;
    const matchesLocation =
      locationType === "all" ||
      (locationType === "remote" && job.location.toLowerCase().includes("remote")) ||
      (locationType === "hybrid" && job.location.toLowerCase().includes("hybrid"));
    const matchesKeyword =
      !keyword ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(keyword.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()));

    return matchesCategory && matchesLocation && matchesKeyword;
  });

  const popularTags = [
    "Remote",
    "React",
    "Full Stack",
    "Product Manager",
    "TypeScript",
    "Design Systems",
  ];

  const trustedCompanies = [
    "Stripe",
    "Linear",
    "Figma",
    "Supabase",
    "Vercel",
    "Retool",
    "Notion",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <img
                  src="/iconpeople.svg"
                  alt="CareerBridge Logo"
                  className="w-5 h-5 brightness-0 invert"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Career<span className="text-indigo-600">Bridge</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#browse-roles" className="hover:text-slate-900 transition-colors">
                Browse Roles
              </a>
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
                How It Works
              </a>
              <a href="#for-employers" className="hover:text-slate-900 transition-colors">
                For Employers
              </a>
              <a href="#pricing-values" className="hover:text-slate-900 transition-colors">
                Why CareerBridge
              </a>
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/Auth/Signin"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/Auth/Signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Authentic Wellfound-style Category Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-6">
            <span>Direct Talent Network</span>
            <span className="text-slate-400">•</span>
            <span>No Unsolicited Recruiter Inboxes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Where tech talent and modern companies connect directly.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transparent salaries, verified background profiles, and direct screening questions.
            Connect directly with founders and hiring leads.
          </p>

          {/* Real Search Utility Box */}
          <form
            onSubmit={handleSearch}
            className="mt-10 max-w-3xl mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex flex-col sm:flex-row items-center gap-2 text-left"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full">
              <FaSearch className="text-slate-400 text-sm flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword, or company..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto">
              <FaMapMarkerAlt className="text-slate-400 text-sm flex-shrink-0" />
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                className="text-sm text-slate-700 bg-transparent focus:outline-none cursor-pointer pr-3"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              Search Jobs
            </button>
          </form>

          {/* Keyword Quick Links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-600">Trending:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setKeyword(tag)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Company Social Proof Ticker */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">
            Hiring teams and candidates from innovative tech organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedCompanies.map((name) => (
              <span
                key={name}
                className="text-slate-500 font-bold text-base tracking-tight hover:text-slate-800 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Directory & Live Roles Section (Wellfound style) */}
      <section id="browse-roles" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Explore Active Tech Openings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Verified roles with upfront compensation, transparent requirements, and direct application
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Job Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <span className="text-xs font-semibold text-slate-500">
                        {job.company}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mt-0.5">
                        {job.title}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {job.posted}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-3.5">
                    {job.stage}
                  </p>

                  <div className="flex flex-col gap-1.5 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <FaDollarSign className="text-slate-400 text-xs flex-shrink-0" />
                      <span>{job.salary}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{job.equity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <FaMapMarkerAlt className="text-slate-400 text-xs flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {job.type}
                  </span>
                  <Link
                    href="/Auth/Signin"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    <span>View Role</span>
                    <FaChevronRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm font-medium text-slate-600">
                No matching opportunities found for this filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setLocationType("all");
                  setKeyword("");
                }}
                className="mt-3 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Two-Sided Platform Value (Wellfound / Remote style) */}
      <section id="for-employers" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              A transparent network for tech talent and hiring teams
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Direct connection without third-party recruitment agencies or hidden criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Candidates */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
                  <FaUserTie className="text-lg" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  For Job Candidates
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Apply directly to hiring leads with verified profile details and answer customized screening questions.
                </p>

                <div className="space-y-3.5 mb-8 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-indigo-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Upfront Compensation:</strong> See salary and equity details on every listing.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-indigo-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Direct Application:</strong> Your profile goes directly to the company’s hiring dashboard.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-indigo-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Live Status Tracking:</strong> Track if your submission is viewed, reviewed, or accepted.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-indigo-600 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Structured Profile:</strong> Education, work history, and portfolio links stored once.
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/Auth/Signup"
                className="w-full py-2.5 px-4 rounded-lg text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
              >
                Create Candidate Profile
              </Link>
            </div>

            {/* For Employers */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-6">
                  <FaBuilding className="text-lg" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  For Companies & Hiring Leads
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Find candidates with real signal. Add custom screening questions to pre-qualify applicants efficiently.
                </p>

                <div className="space-y-3.5 mb-8 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-slate-800 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Custom Screening Questions:</strong> Ask role-specific questions upfront to gauge depth.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-slate-800 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Comprehensive Applicant Dossiers:</strong> Review applicant CVs, degrees, and skills in one drawer.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-slate-800 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Direct Email Outreach:</strong> Send interview invites and updates straight from the dashboard.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-slate-800 text-sm mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">Clear Pipeline Stages:</strong> Filter applicants by Pending, Reviewed, and Shortlisted.
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/Auth/Signup"
                className="w-full py-2.5 px-4 rounded-lg text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
              >
                Post an Opening
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Platform Stats */}
      <section id="pricing-values" className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border-r border-slate-200 last:border-r-0">
            <div className="text-3xl font-extrabold text-slate-900">12,000+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Verified Tech Openings</div>
          </div>
          <div className="p-4 border-r border-slate-200 last:border-r-0">
            <div className="text-3xl font-extrabold text-slate-900">850+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Active Hiring Teams</div>
          </div>
          <div className="p-4 border-r border-slate-200 last:border-r-0">
            <div className="text-3xl font-extrabold text-slate-900">92%</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Application Review Rate</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-extrabold text-slate-900">$138,000</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Average Engineering Salary</div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to find your next opportunity or build your team?
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Create an account in two minutes. Start applying to verified openings or publish your first job listing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/Auth/Signup"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
            >
              Get Started as Candidate
            </Link>
            <Link
              href="/Auth/Signup"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              Start Hiring
            </Link>
          </div>
        </div>
      </section>

      {/* Real Platform Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">For Candidates</h4>
              <ul className="space-y-2">
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Browse Tech Jobs</Link></li>
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Remote Roles</Link></li>
                <li><Link href="/Auth/Signup" className="hover:text-slate-800">Create Seeker Profile</Link></li>
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Salary Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">For Employers</h4>
              <ul className="space-y-2">
                <li><Link href="/Auth/Signup" className="hover:text-slate-800">Post a Job</Link></li>
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Screening Questions</Link></li>
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Applicant Tracking</Link></li>
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Hiring Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-slate-800">How It Works</a></li>
                <li><a href="#browse-roles" className="hover:text-slate-800">Job Directory</a></li>
                <li><a href="#for-employers" className="hover:text-slate-800">Company Profiles</a></li>
                <li><Link href="/Auth/Signin" className="hover:text-slate-800">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">CareerBridge</h4>
              <p className="text-slate-500 leading-relaxed mb-3">
                A direct talent connection platform built for high-growth tech companies and candidates.
              </p>
              <span className="font-medium text-slate-700">careerbridge.platform</span>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
                <img
                  src="/iconpeople.svg"
                  alt="Logo"
                  className="w-3.5 h-3.5 brightness-0 invert"
                />
              </div>
              <span className="font-semibold text-slate-800">CareerBridge</span>
              <span>© {new Date().getFullYear()} CareerBridge Inc. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
