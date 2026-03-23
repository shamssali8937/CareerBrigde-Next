"use client"
import { FaHome, FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu"; // import AccountMenu
import { useState } from "react";

function Navbar({ onProfileClick }) {
  const role = useSelector((state) => state.signup.role);
  const [isOpen,setIsOpen]=useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg  z-100">
        <div className="hidden md:flex justify-between items-center px-4 py-3 md:py-4">
          <div>
          <Typography
            variant="h5"
            fontWeight="bold"
            className="!font-[Open_Sans] text-[#666568] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            The<span className="text-[#020202]">Career</span>Bridge
          </Typography>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {/* Home */}
          <Link
            href={role === "jobprovider" ? "/providerpage" : "/Provider/Homepage"}
            className="flex flex-col items-center text-gray-700 cursor-pointer hover:text-blue-600"
          >
            <FaHome className="text-xl" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Job Applicants / Applied Jobs */}
          {role === "jobprovider" ? (
            <Link
              href="/Provider/JobApplicants"
              className="flex flex-col items-center text-gray-700 cursor-pointer hover:text-blue-600"
            >
              <FaBriefcase className="text-xl" />
              <span className="text-xs">Job Applicants</span>
            </Link>
          ) : role === "jobseeker" ? (
            <Link
              href="/Seeker/AppliedJobs"
              className="flex flex-col items-center text-gray-700 cursor-pointer hover:text-blue-600"
            >
              <FaBriefcase className="text-xl" />
              <span className="text-xs">Applied Jobs</span>
            </Link>
          ) : null}
          
            <AccountMenu onProfileClick={onProfileClick} />
        </div>
      </div>
          <div className="md:hidden flex items-center justify-between px-4 py-3 relative">
              <button onClick={()=>setIsOpen(!isOpen)}>{isOpen?<FaTimes className="text-xl cursor-pointer"/>:<FaBars className="text-xl cursor-pointer"/>}</button>
              <Typography
                variant="h6"
                fontWeight="bold"
                className="absolute left-1/2 -translate-x-1/2 text-xl !font-[Open_Sans] text-[#666568]"
              >
                The<span className="text-[#020202]">Career</span>Bridge
              </Typography>
              <div>
                <AccountMenu onProfileClick={onProfileClick} />
              </div>
          </div>
      
      
        {isOpen && (
          <div className="md:hidden bg-white shadow-md px-4 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Left column: stacked links */}
              <div className="flex flex-col space-y-2">
                <Link
                  href={role === "jobprovider" ? "/providerpage" : "/Provider/Homepage"}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>

                {role === "jobprovider" ? (
                  <Link
                    href="/Provider/JobApplicants"
                    className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaBriefcase className="mr-2" />
                    Job Applicants
                  </Link>
                ) : role === "jobseeker" ? (
                  <Link
                    href="/Seeker/AppliedJobs"
                    className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaBriefcase className="mr-2" />
                    Applied Jobs
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
       )}
    </div>
  </>
  );
}

export default Navbar;
