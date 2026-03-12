"use client"
import Navbar from "@/components/Navbar";
import { Avatar, AvatarGroup, Button, Card, CardContent, Chip, Skeleton, Typography } from "@mui/material";
import { MdOutlineWorkOutline, MdLocationOn } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react"
import { FaBuilding, FaClock, FaMoneyBillWave } from "react-icons/fa";

export default function jobApplications() {

    const [ openApplicantPopup, setOpenApplicantPopup ] = useState(false);
    const [ selectedJob, setSelectedJob ] = useState(null);
    const [ selectedApplicant, setSelectedApplicant ] = useState(null);
    const [ openRightDrawer, setOpenRightDrawer ] = useState(false);
    const [ anchorEl, setanchorEl ] = useState(null);
    const [ mailPopup, setMailPopup ] = useState(false);
    const [ mailMessage, setMailMessage ] = useState("");
    const [ searchTerm, setSearchTerm] = useState("");
    const [ filterStatus, setFilterStatus] = useState("All");
    const [ filterView, setfilterView] = useState("All");
    const [ filterdApplicants, setFilterApplicants] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const statuses = ["Pending", "Hired", "Shortlisted", "Rejected"];
  
    // const stateJobs = useSelector((state) => state.appliedJobs.jobs);
    // const dispatch = useDispatch();
  
    const Jobs = [
      {
        _id: "1",
        jobId: "job1",
        title: "Senior Frontend Developer",
        description:
          "We are looking for an experienced frontend developer proficient in React and TypeScript to lead our UI team.",
        location: "San Francisco, CA",
        jobType: "Remote",
        salary: "$120k - $150k",
        provider: {
          user: {
            name: "Alex Morgan",
            email: "alex@techcorp.com",
            photo: null,
          },
          companyname: "TechCorp Solutions",
          positionInCompany: "Senior HR Manager",
          logo: "https://via.placeholder.com/100", // placeholder for company logo
        },
        screeningQuestions: ["Describe a challenging UI problem you solved."],
        applications: [
          {
            _id: "app1",
            apId: "ap1",
            seeker: {
              user: {
                name: "John Doe",
                email: "john.doe@example.com",
                photo: null,
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
                  description:
                    "Developed and maintained React-based applications.",
                },
              ],
              skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
              cv: "/uploads/cv-johndoe.pdf",
            },
            applyDate: "2025-03-10T10:00:00Z",
            status: "Pending",
            isViewed: false,
            screeningAnswers: [
              "I once optimized a component that reduced render time by 40%.",
            ],
          },
          {
            _id: "app2",
            apId: "ap2",
            seeker: {
              user: {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                photo: null,
              },
              headline: "Full Stack Developer | MERN Stack",
              about:
                "Experienced in building full-stack applications with MERN.",
              education: [
                {
                  _id: "edu2",
                  degree: "M.Sc. Software Engineering",
                  institute: "State University",
                  year: "2018-2020",
                  description: "Focus on web technologies.",
                },
              ],
              experience: [
                {
                  _id: "exp2",
                  title: "Software Engineer",
                  company: "Innovatech",
                  duration: "2021-present",
                  description:
                    "Worked on both frontend and backend using React, Node.js, and MongoDB.",
                },
              ],
              skills: ["React", "Node.js", "MongoDB", "Express"],
              cv: "/uploads/cv-janesmith.pdf",
            },
            applyDate: "2025-03-12T14:30:00Z",
            status: "Shortlisted",
            isViewed: true,
            screeningAnswers: [
              "I led a migration from class components to functional components with hooks.",
            ],
          },
        ],
      },
      {
        _id: "2",
        jobId: "job2",
        title: "Product Manager",
        description:
          "Seeking a product manager to drive our flagship product roadmap.",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        provider: {
          user: {
            name: "Alex Morgan",
            email: "alex@techcorp.com",
            photo: null,
          },
          companyname: "TechCorp Solutions",
          positionInCompany: "Senior HR Manager",
          logo: "https://via.placeholder.com/100",
        },
        screeningQuestions: ["How do you prioritize features?"],
        applications: [
          {
            _id: "app3",
            apId: "ap3",
            seeker: {
              user: {
                name: "Michael Brown",
                email: "michael.brown@example.com",
                photo: null,
              },
              headline: "Product Manager | 5+ years in SaaS",
              about:
                "Experienced in leading cross-functional teams and launching successful products.",
              education: [
                {
                  _id: "edu3",
                  degree: "MBA",
                  institute: "Business School",
                  year: "2016-2018",
                  description: "Marketing and strategy.",
                },
              ],
              experience: [
                {
                  _id: "exp3",
                  title: "Product Manager",
                  company: "SaaS Corp",
                  duration: "2019-2024",
                  description:
                    "Managed product roadmap and collaborated with engineering.",
                },
              ],
              skills: ["Product Strategy", "Agile", "User Research"],
              cv: "/uploads/cv-michael.pdf",
            },
            applyDate: "2025-03-11T09:15:00Z",
            status: "Pending",
            isViewed: false,
            screeningAnswers: [
              "I use a combination of user feedback and business goals to prioritize.",
            ],
          },
        ],
      },
      {
        _id: "3",
        jobId: "job2",
        title: "Product Manager",
        description:
          "Seeking a product manager to drive our flagship product roadmap.",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        provider: {
          user: {
            name: "Alex Morgan",
            email: "alex@techcorp.com",
            photo: null,
          },
          companyname: "TechCorp Solutions",
          positionInCompany: "Senior HR Manager",
          logo: "https://via.placeholder.com/100",
        },
        screeningQuestions: ["How do you prioritize features?"],
        applications: [
          {
            _id: "app3",
            apId: "ap3",
            seeker: {
              user: {
                name: "Michael Brown",
                email: "michael.brown@example.com",
                photo: null,
              },
              headline: "Product Manager | 5+ years in SaaS",
              about:
                "Experienced in leading cross-functional teams and launching successful products.",
              education: [
                {
                  _id: "edu3",
                  degree: "MBA",
                  institute: "Business School",
                  year: "2016-2018",
                  description: "Marketing and strategy.",
                },
              ],
              experience: [
                {
                  _id: "exp3",
                  title: "Product Manager",
                  company: "SaaS Corp",
                  duration: "2019-2024",
                  description:
                    "Managed product roadmap and collaborated with engineering.",
                },
              ],
              skills: ["Product Strategy", "Agile", "User Research"],
              cv: "/uploads/cv-michael.pdf",
            },
            applyDate: "2025-03-11T09:15:00Z",
            status: "Pending",
            isViewed: false,
            screeningAnswers: [
              "I use a combination of user feedback and business goals to prioritize.",
            ],
          },
        ],
      },
      {
        _id: "4",
        jobId: "job2",
        title: "Product Manager",
        description:
          "Seeking a product manager to drive our flagship product roadmap.",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        provider: {
          user: {
            name: "Alex Morgan",
            email: "alex@techcorp.com",
            photo: null,
          },
          companyname: "TechCorp Solutions",
          positionInCompany: "Senior HR Manager",
          logo: "https://via.placeholder.com/100",
        },
        screeningQuestions: ["How do you prioritize features?"],
        applications: [
          {
            _id: "app3",
            apId: "ap3",
            seeker: {
              user: {
                name: "Michael Brown",
                email: "michael.brown@example.com",
                photo: null,
              },
              headline: "Product Manager | 5+ years in SaaS",
              about:
                "Experienced in leading cross-functional teams and launching successful products.",
              education: [
                {
                  _id: "edu3",
                  degree: "MBA",
                  institute: "Business School",
                  year: "2016-2018",
                  description: "Marketing and strategy.",
                },
              ],
              experience: [
                {
                  _id: "exp3",
                  title: "Product Manager",
                  company: "SaaS Corp",
                  duration: "2019-2024",
                  description:
                    "Managed product roadmap and collaborated with engineering.",
                },
              ],
              skills: ["Product Strategy", "Agile", "User Research"],
              cv: "/uploads/cv-michael.pdf",
            },
            applyDate: "2025-03-11T09:15:00Z",
            status: "Pending",
            isViewed: false,
            screeningAnswers: [
              "I use a combination of user feedback and business goals to prioritize.",
            ],
          },
        ],
      },
      {
        _id: "5",
        jobId: "job2",
        title: "Product Manager",
        description:
          "Seeking a product manager to drive our flagship product roadmap.",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        provider: {
          user: {
            name: "Alex Morgan",
            email: "alex@techcorp.com",
            photo: null,
          },
          companyname: "TechCorp Solutions",
          positionInCompany: "Senior HR Manager",
          logo: "https://via.placeholder.com/100",
        },
        screeningQuestions: ["How do you prioritize features?"],
        applications: [
          {
            _id: "app3",
            apId: "ap3",
            seeker: {
              user: {
                name: "Michael Brown",
                email: "michael.brown@example.com",
                photo: null,
              },
              headline: "Product Manager | 5+ years in SaaS",
              about:
                "Experienced in leading cross-functional teams and launching successful products.",
              education: [
                {
                  _id: "edu3",
                  degree: "MBA",
                  institute: "Business School",
                  year: "2016-2018",
                  description: "Marketing and strategy.",
                },
              ],
              experience: [
                {
                  _id: "exp3",
                  title: "Product Manager",
                  company: "SaaS Corp",
                  duration: "2019-2024",
                  description:
                    "Managed product roadmap and collaborated with engineering.",
                },
              ],
              skills: ["Product Strategy", "Agile", "User Research"],
              cv: "/uploads/cv-michael.pdf",
            },
            applyDate: "2025-03-11T09:15:00Z",
            status: "Pending",
            isViewed: false,
            screeningAnswers: [
              "I use a combination of user feedback and business goals to prioritize.",
            ],
          },
        ],
      }
    ];
  
    const [ jobs, setJobs ] = useState(Jobs);
  
    console.log(jobs);
  
    const handleViewApplicants = (job) => {
      setSelectedJob(job);
      setFilterStatus("All");
      setfilterView("All");
      setSearchTerm("");
      setOpenPopup(true);
    };
  
    const getFileName = (cv) => {
      if (!cv) return "";
      const fullFileName = cv.split("/").pop();
      const nameOnly = fullFileName.replace(/-\d+(?=\.\w+$)/, "");
      return nameOnly;
    };
  
    const handleOpenApplicant = (applicant) => {
      if (!applicant.isViewed) {
        // changeViewedAndStatusInDb(applicant);
        const updatedjobs = jobs.map((job) =>
          job._id === selectedJob._id
            ? {
                ...job,
                applications: job.applications.map((a) =>
                  a._id === applicant._id ? { ...a, isViewed: true } : a
                ),
              }
            : job
        );
        setJobs(updatedjobs);
        const updatedselectedjob = updatedjobs.find(
          (job) => job._id === selectedJob._id
        );
        setSelectedJob(updatedselectedjob);
        setSelectedApplicant({ ...applicant, isViewed: true });
      } else {
        setAelectedApplicant(applicant);
      }
      setOpenPopup(false);
      setOpenRightDrawer(true);
    };
  
    const handleStatus = (event) => {
      setanchorEl(event.currentTarget);
    };
  
    const handleStatusChange = (status) => {
      if (!selectedJob || !selectedApplicant) return;
      // changeViewedAndStatusInDb(selectedapplicant, status);
      const updatedjobs = jobs.map((job) =>
        job._id === selectedJob._id
          ? {
              ...job,
              applications: job.applications.map((a) =>
                a._id === selectedApplicant._id ? { ...a, status } : a
              ),
            }
          : job
      );
      setJobs(updatedjobs);
      const updatedapplicant = { ...selectedApplicant, status };
      setSelectedApplicant(updatedapplicant);
      const updatedCurrentJob = updatedjobs.find(
        (job) => job._id === selectedJob._id
      );
      setSelectedJob(updatedCurrentJob);
      setanchorEl(null);
  
      let mail = "";
      const providerIntro = `**${selectedJob.provider.user.name}, ${selectedJob.provider.positionInCompany} at ${selectedJob.provider.companyname}**`;
      if (status === "Rejected") {
        mail = `Subject: Update on Your Application for ${selectedJob.title}\n\n` +
          `Dear ${selectedApplicant.seeker.user.name},\n\n` +
          `From ${providerIntro}:\n\n` +
          `Thank you for applying for the position of ${selectedJob.title} at ${selectedJob.provider.companyname}. ` +
          `After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.\n\n` +
          `We appreciate your interest in ${selectedJob.provider.companyname} and encourage you to apply for future opportunities. ` +
          `We wish you all the best in your career journey.\n\n` +
          `Sincerely,\n${selectedJob.provider.user.name}\n${selectedJob.provider.positionInCompany}\n${selectedJob.provider.companyname}`;
      } else if (status === "Hired") {
        mail = `Subject: Job Offer for ${selectedJob.title} at ${selectedJob.provider.companyname}\n\n` +
          `Dear ${selectedApplicant.seeker.user.name},\n\n` +
          `From ${providerIntro}:\n\n` +
          `Congratulations! We are delighted to offer you the position of ${selectedJob.title} at ${selectedJob.provider.companyname}. ` +
          `Our HR team will reach out to you shortly with the onboarding process and further details.\n\n` +
          `For further procedure, you are contacted by ${selectedJob.provider.user.name}, ${selectedJob.provider.positionInCompany}, from ${selectedJob.provider.user.email}.\n\n` +
          `Welcome to ${selectedJob.provider.companyname}! We are excited to have you on board.\n\n` +
          `Best regards,\n${selectedJob.provider.user.name}\n${selectedJob.provider.positionInCompany}\n${selectedJob.provider.companyname}`;
      } else if (status === "Shortlisted") {
        mail = `Subject: Interview Invitation for ${selectedJob.title} at ${selectedJob.provider.companyname}\n\n` +
          `Dear ${selectedApplicant.seeker.user.name},\n\n` +
          `From ${providerIntro}:\n\n` +
          `We are pleased to inform you that you have been shortlisted for the position of ${selectedJob.title} at ${selectedJob.provider.companyname}.\n\n` +
          `Interview Details:\n` +
          `Date: 2025-10-05\n` +
          `Time: 11:00 AM\n` +
          `Venue: Google Meet (link will be shared) OR Head Office, ${selectedJob.location}\n\n` +
          `For further procedure, you are contacted by ${selectedJob.provider.user.name}, ${selectedJob.provider.positionInCompany}, from ${selectedJob.provider.user.email}.\n\n` +
          `We look forward to speaking with you.\n\n` +
          `Sincerely,\n${selectedJob.provider.user.name}\n${selectedJob.provider.positionInCompany}\n${selectedJob.provider.companyname}`;
      } else if (status === "Pending") {
        return;
      }
      setMailMessage(mail);
      setMailPopup(true);
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case "Shortlisted":
          return "#EF7C34";
        case "Hired":
          return "#10b981";
        case "Rejected":
          return "#ef4444";
        default:
          return "#3b82f6";
      }
    };
  
    const handleMailSend = async () => {
      console.log("Mail sent (mock):", mailmessage);
      setMailPopup(false);
    };
  
    const serachApplicantsForJob = async () => {
      if (!selectedJob) return;
      let filtered = selectedJob.applications.filter((applicant) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          applicant.seeker.user.name.toLowerCase().includes(term) ||
          applicant.seeker.headline.toLowerCase().includes(term) ||
          applicant.seeker.skills?.some((skill) =>
            skill.toLowerCase().includes(term)
          );
        const matchesStatus =
          filterStatus === "All" || applicant.status === filterStatus;
        const matchesView =
          filterView === "All"
            ? true
            : filterView === "Viewed"
            ? applicant.isViewed
            : !applicant.isViewed;
        return matchesSearch && matchesStatus && matchesView;
      });
      setFilterApplicants(filtered);
    };
  
    const fetchJobsFromDB = async () => {
      setLoading(true);
      setTimeout(() => {
        setJobs(Jobs);
        setLoading(false);
      }, 1000);
    };
  
    const changeViewedAndStatusInDb = async (applicant, newStatus) => {
      console.log("Mock update:", applicant, newStatus);
    };
  
    useEffect(() => {
      fetchJobsFromDB();
    }, []);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        serachApplicantsForJob();
      }, 300);
      return () => clearTimeout(timeout);
    }, [filterStatus, searchTerm, filterView, selectedJob]);


    return(
        <>
         <Navbar/>
         <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] backdrop-blur-sm pt-20 pb-10 px-4 sm:px-6 lg:px-8 font-[Open_sans]">
           <div className="max-w-7xl mx-auto">
              <div className="relative mb-12 flex flex-col items-center text-center">
                 <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="w-24 h-24 bg-indidgo-200/30 rounded-full blur-3xl">
                    </div>
                 </div>      
                  <Typography variant="h3" component="h1" className="!font-semibold !mt-2 !mb-2 relative !w-full !font-[Open_sans]">
                      <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                        Job Applicants
                      </span>
                  </Typography>
                  <Typography className="!font-[Open_sans] text-gray-600 !text-lg !max-wl-2xl !mx-auto !mt-2">
                      Manage and review applications for your job postings
                  </Typography>
                  <div className="flex justify-center mt-4 w-full">
                    <div className="h-1 w-50 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                  </div>
              </div>
              {
                loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1,2,3].map((i)=>(
                            <Card key={i} className="!rounded-3xl shadow-xl border-0 bg-white/70 backdrop-blur-md">
                               <CardContent>
                                  <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "60%" }} />
                                  <Skeleton variant="rectangular" height={80} className="!mt-4" />
                                  <Skeleton variant="rectangular" height={40} className="!mt-4" />
                               </CardContent> 
                            </Card>
                        ))}   
                    </div>
                ):(
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                       {
                         jobs && jobs.length>0 ? (
                             jobs.map((job)=>(
                                <Card
                                 key={job._id}
                                 className="cursor-pointer !group !rounded-3xl !shadow-xl !border-0 bg-white/80 backdrop-blur-md hover:!shadow-2xl !transition-all !duration-300 hover:!-translate-y-2 flex flex-col overflow-hidden relative"
                                 sx={{ minHeight: "360px" }}
                                >
                                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                                  <CardContent className="flex flex-col flex-1 !p-6">
                                     <div className="flex items-start gap-3 mb-4">
                                        <Avatar
                                        //  src={job.provider.Photo?.url || "/iconbridge.jpg"}
                                        //  src="/iconbridge.jpg"
                                         alt={job.provider.companyname}
                                         className="w-12 h-12 !rounded-xl border-2 !border-white !shadow-md"
                                         variant="rounded"
                                        >
                                         <FaBuilding className="text-[#a78cdd]"/>
                                        </Avatar>
                                        <div className="flex-1">
                                           <Typography variant="h6" className="!font-[Open_sans] !font-bold text-gray-800 group-hover:text-indigo-700 transition-colors line-clamp-2">
                                              {job.title}
                                           </Typography>
                                           <Typography variant="body2" className="text-gray-500 flex items-center gap-1 !mt-1">
                                             <FaBuilding className="text-[#a78cdd]" size={12} />
                                             {job.provider.companyname}
                                           </Typography>
                                        </div>
                                     </div>
                                     <Typography variant="body1" className="!font-[Open_sans] text-gray-700 leading-relaxed !mb-4 line-clamp-3">
                                       {job.description}
                                     </Typography>
                                     <div className="flex flex-wrap gap-2 mb-4">
                                       <Chip
                                         icon={<MdLocationOn className="!text-indigo-500" />}
                                         label={job.location}
                                         size="small"
                                         className="!font-[Open_sans] !bg-indigo-100 text-indigo-700 rounded-full text-xs"
                                       />
                                       <Chip
                                         icon={<FaClock className="text-emerald-500" />}
                                         label={job.jobType}
                                         size="small"
                                         className="!font-[Open_sans] !bg-emerald-100 text-emerald-700 rounded-full text-xs"
                                       />
                                       {job.salary && (
                                         <Chip
                                           icon={<FaMoneyBillWave className="!text-amber-500" />}
                                           label={job.salary}
                                           size="small"
                                           className="!font-[Open_sans] !bg-amber-100 text-amber-700 rounded-full text-xs"
                                         />
                                       )}
                                     </div>
                                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/50">
                                        <div className="flex items-center gap-2">
                                          <AvatarGroup max={3} className="applicant-avatars">
                                            {job.applications.slice(0, 3).map((app, idx) => (
                                              <Avatar
                                                key={idx}
                                                // src={app.seeker.user.photo || "https://via.placeholder.com/30"}
                                                src="https://via.placeholder.com/30"
                                                sx={{ width: 24, height: 24 }}
                                                className="border-2 border-white"
                                              />
                                            ))}
                                          </AvatarGroup>
                                          <Typography variant="body2" className="text-gray-600">
                                            {job.applications.length} applicant{job.applications.length !== 1 ? "s" : ""}
                                          </Typography>
                                        </div>
                                        <Button
                                          size="small"
                                          variant="contained"
                                          onClick={() => handleViewApplicants(job)}
                                          className="!font-[Open_sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] !text-white !rounded-full !px-6 !py-2 !text-sm  !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                                        >
                                          View
                                        </Button>
                                      </div>
                                  </CardContent>
                                </Card>
                             ))
                         ):(
                           <Typography className="!font-[Open_sans] !text-gray-500 text-center col-span-full !mt-4">
                             No jobs have applicants yet.
                           </Typography>
                         )
                       }   
                    </div>
                )
              }
           </div>
         </div>
        </> 
    );
}