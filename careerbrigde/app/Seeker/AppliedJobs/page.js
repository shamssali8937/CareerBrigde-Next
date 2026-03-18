"use client"
import Navbar from "@/components/Navbar";
import { FaCalendarAlt, FaFileAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaListUl, FaUserTie, FaBuilding, FaTools, FaGraduationCap, FaTasks, FaQuestionCircle,} from "react-icons/fa";
import { Card, CardContent, Typography, Button, Chip, Avatar, IconButton, SwipeableDrawer} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";


const dummyApplications = [
  {
    _id: "app1",
    apId: "ap1",
    job: {
      _id: "job1",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      jobType: "Remote",
      salary: "$120k - $150k",
      description:
        "We are looking for an experienced frontend developer proficient in React and TypeScript to lead our UI team.",
      requirements: ["5+ years React", "TypeScript expertise", "Team leadership"],
      screeningQuestions: ["Describe a challenging UI problem you solved."],
      provider: {
        companyname: "TechCorp Solutions",
        user: {
          name: "Alex Morgan",
          photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      },
    },
    seeker: {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      headline: "Senior React Developer | 8+ years experience",
      about:
        "Passionate about building scalable web applications with React and Node.js.",
      education: [
        {
          _id: "edu1",
          degree: "B.Sc. Computer Science",
          institute: "University of Technology",
          year: "2015-2019",
          description: "Graduated with honors.",
        },
      ],
      experience: [
        {
          _id: "exp1",
          title: "Frontend Developer",
          company: "WebSolutions Inc.",
          duration: "2020-2023",
          description: "Developed and maintained React-based applications.",
        },
      ],
      skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
      cv: "/uploads/cv-johndoe.pdf",
    },
    applyDate: "2025-03-10T10:00:00Z",
    status: "Pending",
    isViewed: false,
    screeningAnswers: ["I once optimized a component that reduced render time by 40%."],
    cv: "/uploads/cv-johndoe.pdf",
  },
  {
    _id: "app2",
    apId: "ap2",
    job: {
      _id: "job2",
      title: "Product Manager",
      location: "New York, NY",
      jobType: "Hybrid",
      salary: "$130k - $160k",
      description:
        "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
      requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
      screeningQuestions: ["How do you prioritize features?"],
      provider: {
        companyname: "TechCorp Solutions",
        user: {
          name: "Alex Morgan",
          photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      },
    },
    seeker: {
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        photo: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      headline: "Product Manager | 5+ years in SaaS",
      about:
        "Experienced in leading cross-functional teams and launching successful products.",
      education: [
        {
          _id: "edu2",
          degree: "MBA",
          institute: "Business School",
          year: "2016-2018",
          description: "Marketing and strategy.",
        },
      ],
      experience: [
        {
          _id: "exp2",
          title: "Product Manager",
          company: "SaaS Corp",
          duration: "2019-2024",
          description: "Managed product roadmap and collaborated with engineering.",
        },
      ],
      skills: ["Product Strategy", "Agile", "User Research"],
      cv: "/uploads/cv-janesmith.pdf",
    },
    applyDate: "2025-03-12T14:30:00Z",
    status: "Shortlisted",
    isViewed: true,
    screeningAnswers: ["I use a combination of user feedback and business goals to prioritize."],
    cv: "/uploads/cv-janesmith.pdf",
  },
  {
    _id: "app3",
    apId: "ap3",
    job: {
      _id: "job3",
      title: "Backend Engineer",
      location: "Remote",
      jobType: "Remote",
      salary: "$90k - $110k",
      description:
        "Join our backend team to build scalable APIs and microservices. Experience with Node.js and databases is required.",
      requirements: ["Node.js", "Express", "MongoDB", "Python"],
      screeningQuestions: ["How do you handle database transactions?"],
      provider: {
        companyname: "DataWorks",
        user: {
          name: "Michael Brown",
          photo: "https://randomuser.me/api/portraits/men/4.jpg",
        },
      },
    },
    seeker: {
      user: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      headline: "Backend Developer | Node.js Specialist",
      about: "Experienced in building RESTful APIs and microservices.",
      education: [
        {
          _id: "edu3",
          degree: "B.E. Computer Science",
          institute: "Engineering College",
          year: "2017-2021",
          description: "Focus on backend technologies.",
        },
      ],
      experience: [
        {
          _id: "exp3",
          title: "Backend Developer",
          company: "AppWorks",
          duration: "2021-present",
          description: "Developed and maintained Node.js APIs.",
        },
      ],
      skills: ["Node.js", "Express", "MongoDB", "Docker"],
      cv: "/uploads/cv-alice.pdf",
    },
    applyDate: "2025-03-15T09:00:00Z",
    status: "Rejected",
    isViewed: true,
    screeningAnswers: ["I use transactions and error handling."],
    cv: "/uploads/cv-alice.pdf",
  },
];


export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [selectedapplication, setseleectedapplication] = useState(null);
  const [opendrawer, setopendrawer] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired":
        return "#10b981"; // green
      case "Rejected":
        return "#ef4444"; // red
      case "Shortlisted":
        return "#EF7C34"; // orange
      default:
        return "#3b82f6"; // blue
    }
  };

  const handleviewdetails = (application) => {
    setseleectedapplication(application);
    setopendrawer(true);
  };

  const handleHideApplication = (applicationId) => {
    setApplications((prev) => prev.filter((app) => app._id !== applicationId));
    if (selectedapplication?._id === applicationId) {
      setopendrawer(false);
      setseleectedapplication(null);
    }
  };

  function getFileName(cv) {
    if (!cv) return "";
    const fullFileName = cv.split("/").pop();
    const nameOnly = fullFileName.replace(/-\d+(?=\.\w+$)/, "");
    return nameOnly;
  }

   useEffect(() => {
    setApplications(dummyApplications);
  }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] pt-20 pb-10 px-4 sm:px-6 lg:px-8 font-[Open_sans]">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12 flex flex-col items-center text-center">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-24 h-24 bg-indigo-200/30 rounded-full blur-3xl"></div>
            </div>
            <Typography variant="h3" component="h1" className="!font-semibold !mt-2 !mb-2 relative !w-full !font-[Open_sans]">
              <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Applied Jobs
              </span>
            </Typography>
            <Typography className="!font-[Open_sans] text-gray-600 !text-lg !max-w-2xl !mx-auto !mt-2">
              Track and review your job applications
            </Typography>
            <div className="flex justify-center mt-4 w-full">
              <div className="h-1 w-50 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-16 bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl">
              <Typography variant="h6" className="!font-[Open_sans] text-gray-600">
                You haven't applied to any jobs yet.
              </Typography>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((application) => (
                <Card
                  key={application._id}
                  className="cursor-pointer !group !rounded-3xl !shadow-xl !border-0 bg-white/80 backdrop-blur-md hover:!shadow-2xl !transition-all !duration-300 hover:!-translate-y-2 flex flex-col overflow-hidden relative"
                  sx={{ minHeight: "360px" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                  <CardContent className="flex flex-col flex-1 !p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar
                        src={application.job.provider.user.photo}
                        alt={application.job.provider.companyname}
                        className="w-12 h-12 !rounded-xl border-2 !border-white !shadow-md"
                        variant="rounded"
                      >
                        <FaBuilding className="text-[#a78cdd]" />
                      </Avatar>
                      <div className="flex-1">
                        <Typography
                          variant="h6"
                          className="!font-[Open_sans] !font-bold text-gray-800 group-hover:text-indigo-700 transition-colors line-clamp-2"
                        >
                          {application.job.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 flex items-center gap-1 !mt-1">
                          <FaBuilding className="text-[#a78cdd]" size={12} />
                          {application.job.provider.companyname}
                        </Typography>
                      </div>
                    </div>

                    <Typography
                      variant="body1"
                      className="!font-[Open_sans] text-gray-700 leading-relaxed !mb-4 line-clamp-3"
                    >
                      {application.job.description}
                    </Typography>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Chip
                        icon={<FaMapMarkerAlt className="!text-indigo-500" />}
                        label={application.job.location}
                        size="small"
                        className="!font-[Open_sans] !bg-indigo-100 text-indigo-700 rounded-full text-xs"
                      />
                      <Chip
                        icon={<FaClock className="text-emerald-500" />}
                        label={application.job.jobType}
                        size="small"
                        className="!font-[Open_sans] !bg-emerald-100 text-emerald-700 rounded-full text-xs"
                      />
                      {application.job.salary && (
                        <Chip
                          icon={<FaMoneyBillWave className="!text-amber-500" />}
                          label={application.job.salary}
                          size="small"
                          className="!font-[Open_sans] !bg-amber-100 text-amber-700 rounded-full text-xs"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/50">
                      <Chip
                        label={application.status || "Pending"}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(application.status),
                          color: "white",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 24,
                        }}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleviewdetails(application)}
                          className="!font-[Open_sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] !text-white !rounded-full !px-4 !py-1 !text-xs !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                        >
                          Details
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleHideApplication(application._id)}
                          className="!font-[Open_sans] !border-red-500 !text-red-500 hover:!bg-red-50 !rounded-full !px-4 !py-1 !text-xs !transition-all duration-300 hover:!scale-105"
                        >
                          Hide
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
}
