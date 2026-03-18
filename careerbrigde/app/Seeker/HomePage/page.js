"use client"
import Navbar from "@/components/Navbar";
import { FaBriefcase, FaCalendarAlt, FaEdit, FaGraduationCap, FaLocationArrow, FaSchool, FaUserAlt } from "react-icons/fa";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDetails, setRole, setSeekerInfo } from "@/redux/slices/signupSlice";
import { setUser } from "@/redux/slices/userDetailSlice";

export default function Homepage(){

    const dummyCompanies = [
      {
        _id: "comp1",
        companyname: "TechCorp",
        user: {
          _id: "user1",
          name: "John Smith",
          photo: "https://randomuser.me/api/portraits/men/1.jpg",
          role: "company",
        },
        positionInCompany: "HR Manager",
        jobs: ["job1", "job2"],
      },
      {
        _id: "comp2",
        companyname: "DesignStudio",
        user: {
          _id: "user2",
          name: "Emily Davis",
          photo: "https://randomuser.me/api/portraits/women/2.jpg",
          role: "company",
        },
        positionInCompany: "Creative Director",
        jobs: ["job3"],
      },
      {
        _id: "comp3",
        companyname: "DataWorks",
        user: {
          _id: "user3",
          name: "Michael Brown",
          photo: "https://randomuser.me/api/portraits/men/3.jpg",
          role: "company",
        },
        positionInCompany: "Tech Lead",
        jobs: ["job4", "job5"],
      },
    ];
    
    const dummyJobs = [
      {
        _id: "job1",
        title: "Frontend Developer",
        location: "New York, NY",
        lastDate: "2025-07-15T00:00:00.000Z",
        description:
          "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing designs.",
        requirements: ["React", "JavaScript", "CSS", "HTML"],
        screeningQuestions: ["Describe a challenging UI you built.", "How do you ensure accessibility?"],
        salary: "$80,000 - $100,000",
        postDate: "2025-06-01T00:00:00.000Z",
        jobType: "Full-Time",
        provider: { _id: "comp1" },
      },
      {
        _id: "job2",
        title: "Backend Engineer",
        location: "Remote",
        lastDate: "2025-07-20T00:00:00.000Z",
        description:
          "Join our backend team to build scalable APIs and microservices. Experience with Node.js and databases is required.",
        requirements: ["Node.js", "Express", "MongoDB", "Python"],
        screeningQuestions: ["How do you handle database transactions?", "Describe a RESTful API design."],
        salary: "$90,000 - $110,000",
        postDate: "2025-06-05T00:00:00.000Z",
        jobType: "Remote",
        provider: { _id: "comp1" },
      },
      {
        _id: "job3",
        title: "UI/UX Designer",
        location: "San Francisco, CA",
        lastDate: "2025-07-10T00:00:00.000Z",
        description:
          "We need a creative UI/UX Designer to craft beautiful and intuitive interfaces. Must have a strong portfolio.",
        requirements: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
        screeningQuestions: ["Walk us through your design process."],
        salary: "$70,000 - $90,000",
        postDate: "2025-06-10T00:00:00.000Z",
        jobType: "On-site",
        provider: { _id: "comp2" },
      },
      {
        _id: "job4",
        title: "Data Scientist",
        location: "Boston, MA",
        lastDate: "2025-07-25T00:00:00.000Z",
        description:
          "Analyze large datasets and build predictive models. Proficiency in Python and machine learning libraries is essential.",
        requirements: ["Python", "Pandas", "Scikit-learn", "SQL"],
        screeningQuestions: ["Explain a machine learning project you led."],
        salary: "$100,000 - $130,000",
        postDate: "2025-06-12T00:00:00.000Z",
        jobType: "Full-Time",
        provider: { _id: "comp3" },
      },
      {
        _id: "job5",
        title: "DevOps Engineer",
        location: "Austin, TX",
        lastDate: "2025-07-18T00:00:00.000Z",
        description:
          "Manage cloud infrastructure and CI/CD pipelines. Experience with AWS and Docker is required.",
        requirements: ["AWS", "Docker", "Kubernetes", "Terraform"],
        screeningQuestions: ["How do you handle infrastructure as code?"],
        salary: "$95,000 - $115,000",
        postDate: "2025-06-15T00:00:00.000Z",
        lastDate: "2026-06-15T00:00:00.000Z",
        jobType: "Hybrid",
        provider: { _id: "comp3" },
      },
    ];
    
    // Link jobs to companies (populate company.jobs with full job objects)
    dummyCompanies.forEach(company => {
      company.jobs = dummyJobs.filter(job => job.provider._id === company._id);
    });
    
    // Dummy seeker data (logged-in user)
    const dummySeeker = {
      user: {
        _id: "seeker1",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        photo: "https://randomuser.me/api/portraits/men/4.jpg",
        role: "seeker",
      },
      seekerInfo: {
        headline: "Frontend Developer | React Enthusiast",
        city: "New York",
        address: "123 Main St",
        phone: "+1 234 567 890",
        country: "USA",
        about: "Passionate frontend developer with 3 years of experience building responsive web apps.",
        skills: ["React", "JavaScript", "Tailwind CSS", "Redux"],
        education: [
          {
            degree: "B.Sc. in Computer Science",
            year: "2022",
            description: "University of Technology",
          },
        ],
        experience: [
          {
            title: "Frontend Developer",
            company: "WebSolutions",
            description: "Built UI components and integrated APIs.",
          },
        ],
        socialLinks: [
          {
            label: "linkedin",
            url: "https://linkedin.com/in/alexj",
          },
          {
            label: "github",
            url: "https://github.com/alexj",
          },
        ],
        cv: "https://example.com/cv.pdf",
      },
    };


      const dispatch = useDispatch();
      const stateData = useSelector((state) => state.signup);
      const stateUserdata = useSelector((state) => state.userDetail.user);
    
      const [ openSnackbar, setOpenSackbar ] = useState(false);
      const [ snackbarmMssage, setSnackbarMessage ] = useState("");
      const [ snackbarSeverity, setSnackbarSeverity ] = useState("success");
      const [ loading, setLoading ] = useState(true);
      const [ expanded, setExpanded ] = useState(false);
      const [ openRightDrawer, setOpenRightDrawer ] = useState(false);
      const [ openLeftDrawer, setOpenLeftDrawer ] = useState(false);
      const [ apply, setApply ] = useState(false);
      const [ showUserUpdateFields, setShowUserUpdateFields ] = useState(false);
      const [ Filename, setFilename ] = useState("");
    
      const [ jobs, setJobs ] = useState(dummyJobs);
      const [ companies, setCompanies ] = useState(dummyCompanies);
      const [ allJobs, setAllJobs ] = useState(dummyJobs);
      const [ selectedjob, setSelectedjob ] = useState(null);
      const [ selectedCompany, setSelectedCompany ] = useState(null);
      const [ screeningAnswers, setScreeningAnswers ] = useState([]);
      const [ jobTypeFilter, setJobTypeFilter ] = useState("all");
      const [ searchWord, setSearchWord ] = useState("");
      const [ img, setImg ] = useState(null);
    
      const appliedJobs = useSelector((state) => state.appliedJobs.applications);
      const alreadyapplied = appliedJobs.some(
        (application) => application.job._id === selectedjob?._id
      );
    
      const profileImagePath = stateUserdata?.photo || stateData.details.img || dummySeeker.user.photo;
    
      const jobsToDisplay = searchWord || jobTypeFilter !== "all" ? allJobs : jobs;
    
      const handleImageChange = (file) => {
        setImg({
          file: file,
          url: URL.createObjectURL(file),
        });
      };
    
      function getFileName(cv) {
        if (!cv) return "";
        if (typeof cv === "string") return cv.split("/").pop();
        if (cv?.name) return cv.name;
        if (cv?.file?.name) return cv.file.name;
        return "";
      }
    
      const handleScreeningQuestionAnswerchange = (index, value) => {
        setScreeningAnswers((prev) => ({
          ...prev,
          [index]: value,
        }));
      };
    
      const handleUpdateSeekerProfile = async (formdata) => {
        dispatch(
          setDetails({ ...stateData.details, name: formdata.name, img: img?.url || profileImagePath })
        );
        dispatch(
          setSeekerInfo({
            headline: formdata.headline,
            city: formdata.city,
            address: formdata.address,
            phone: formdata.phone,
            country: formdata.country,
            about: formdata.about,
            skills: formdata.skills,
            education: formdata.education,
            experience: formdata.experience,
            socialLinks: formdata.socialLinks,
            cv: formdata.cv,
          })
        );
        dispatch(setUser({ ...stateUserdata, name: formdata.name, photo: img?.url || profileImagePath }));
        setSnackbarMessage("Profile Updated Successfully");
        setSnackbarSeverity("success");
        setOpenSackbar(true);
        setOpenLeftDrawer(false);
      };
    
      // Dummy user info update – just updates Redux
      const handleUserInfoUpdate = async (formData) => {
        const updatedUser = { ...stateUserdata };
        if (formData.name) updatedUser.name = formData.name;
        if (formData.email) updatedUser.email = formData.email;
        dispatch(setUser(updatedUser));
        setSnackbarMessage("User info updated successfully");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setShowUserUpdateFields(false);
        setOpenLeftDrawer(false);
      };
    
      const handleApplySubmit = () => {
        if (!selectedjob) return;
        const application = {
          job: selectedjob,
          appliedDate: new Date().toISOString(),
          screeningAnswers: screeningAnswers,
        };
        dispatch(addAppliedJobs([application]));
        setApply(false);
        setSnackbarMessage("Application Submitted Successfully");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setOpenRightDrawer(false);
        setScreeningAnswers([]);
      };
    
      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
      const handleDetailBtn = (job) => {
        setSelectedJob(job);
        setOpenRightDrawer(true);
      };
    
      const handleEditBtn = () => {
        setOpenLeftDrawer(true);
      };
    
      const handleApply = () => {
        setApply(true);
      };
    
      const handleToSelectJob = (job) => {
        const fullJob = jobs.find((j) => j.id === job.id);
        setSelectedJob(fullJob);
        setOpenRightDrawer(true);
        setSelectedCompany(null);
      };
    
      const handleCompany = (company) => {
        setSelectedCompany(company);
      };
    
      const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
    
      const isJobClosed = (lastDate) => {
        if (!lastDate) return false;
        const today = new Date();
        const jobLastDate = new Date(lastDate);
        today.setHours(0, 0, 0, 0);
        jobLastDate.setHours(0, 0, 0, 0);
        return today > jobLastDate;
      };
    
      const searchJobsThroughSearchBar = () => {
        let filtered = dummyJobs;
        if (searchWord.trim()) {
          const lowerSearch = searchWord.toLowerCase();
          filtered = filtered.filter(
            (job) =>
              job.title.toLowerCase().includes(lowerSearch) ||
              job.location.toLowerCase().includes(lowerSearch) ||
              (job.provider._id &&
                companies.find((c) => c._id === job.provider._id)?.companyname
                  .toLowerCase()
                  .includes(lowerSearch))
          );
        }
        if (jobTypeFilter !== "all") {
          filtered = filtered.filter((job) => job.jobType === jobTypeFilter);
        }
        setAllJobs(filtered);
      };
    
      useEffect(() => {
        dispatch(setRole(dummySeeker.user.role));
        dispatch(setUser(dummySeeker.user));
        dispatch(setDetails({ ...dummySeeker.user, img: dummySeeker.user.photo }));
        dispatch(setSeekerInfo(dummySeeker.seekerInfo));
    
        setJobs(dummyJobs);
        setCompanies(dummyCompanies);
        setAllJobs(dummyJobs);
        setLoading(false);
      }, [dispatch]);
    
      // Trigger search when filters change
      useEffect(() => {
        const timeout = setTimeout(() => {
          searchJobsThroughSearchBar();
        }, 300);
        return () => clearTimeout(timeout);
      }, [jobTypeFilter, searchWord]);

    return(
        <>
          <Navbar/>
          <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] pt-20 pb-10 px-4 sm:px-6 lg:px-8 font-[Open_Sans]">
             <div className="max-w-7xl mx-auto">
                 <motion.div
                  initial={{opacity:0,y:-20}}
                  animate={{opacity:1,y:0}}
                  transition={{duration:0.5}}
                  className="flex justify-center mt-4 mb-8"
                 >
                   <Typography variant="h4" className="!font-bold !font-[Open_sans] flex items-center gap-3 text-center !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-3 !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50">
                     <FaBriefcase className="text-white" />
                     Find Your Dream Job
                   </Typography>
                 </motion.div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 mt-2 gap-6">
                    <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                        <Card className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
                           <CardMedia
                             component="img"
                             image="/cardback.png" 
                             alt="cover"
                             className="h-28 object-cover"
                           />
                           <CardContent className="text-center -mt-25">
                             <div className="flex justify-center">
                               <div className="w-29 h-28 rounded-full border-white shadow-xl overflow-hidden bg-white">
                                 <img
                                   src={img?.url || profileImagePath || "https://via.placeholder.com/100"}
                                   alt="profile"
                                   className="w-full h-full object-cover"
                                 />
                               </div>
                             </div>
                             {stateData?.details?.name ? (
                               <>
                                 <Typography
                                   variant="h6"
                                   className="!font-bold !font-[Open_sans] text-gray-800 !mt-3"
                                 >
                                   {stateData.details.name}
                                 </Typography>
                                 <Typography variant="body1" className="!font-[Open_sans] text-gray-600 !mt-3 flex items-center justify-center !gap-2">
                                   <FaBriefcase className="text-[#a78cdd]" />
                                   {stateData.seekerInfo.experience?.[0]?.title}
                                 </Typography>
                                 <Typography variant="body1" className="!font-[Open_sans] text-gray-600 !mt-3 flex items-center justify-center !gap-2">
                                   <FaLocationArrow className="text-[#a78cdd]" />
                                   {stateData.seekerInfo.experience?.[0]?.company}
                                 </Typography>
                                 <Typography variant="body2" className="!font-[Open_sans] text-gray-500 !mt-3">
                                   {stateData.seekerInfo.experience?.[0]?.description}
                                 </Typography>
                               </>
                             ) : (
                               <>
                                 <Typography
                                   variant="h6"
                                   className="!font-bold !font-[Open_sans] text-gray-800 !mt-3"
                                 >
                                   Shams ALi
                                 </Typography>
                                 <Typography variant="body1" className="!font-[Open_sans] text-gray-600 !mt-3 flex items-center justify-center !gap-2">
                                   <FaBriefcase className="text-[#a78cdd]" />
                                   Web Developer
                                 </Typography>
                                  <Typography variant="body1" className="!font-[Open_sans] text-gray-600 !mt-3 flex items-center justify-center !gap-2">
                                   <FaLocationArrow className="text-[#a78cdd]" />
                                    Manager at Evergreen Pvt Ltd.
                                 </Typography>
                               </>
                             )}
                           </CardContent>
                           <CardActions className="justify-center !pb-4">
                             <Button
                               size="small"
                               startIcon={<FaEdit />}
                               onClick={handleEditBtn}
                               className="!font-[Open_Sans] bg-indigo-600 hover:bg-indigo text-white text-xs !rounded-full px-6 py-2 !transition-all hover:scale-105 !shadow-md"
                             >
                               Edit Profile
                             </Button>
                           </CardActions>
                        </Card>
                        <Card className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
                          <CardContent className="p-5">
                            {stateData?.details?.name ? (
                              <>
                                 <div className="flex items-center gap-3 mb-4">
                                   <div className="p-2 bg-indigo-100 rounded-xl">
                                     <FaUserAlt className="text-indigo-600 text-xl" />
                                   </div>
                                   <Typography
                                     variant="h6"
                                     className="!font-bold !font-[Open_sans] text-gray-800"
                                   >
                                     {stateData.details.name|| "Shams Ali Mehdi"}
                                   </Typography>
                                 </div>
                                <Typography variant="body1" className="!font-[Open_sans] !ml-2 !text-gray-600 !mt-3 flex items-center justify-center !gap-2">
                                  <FaGraduationCap className="text-[#a78cdd]" />
                                  {stateData.seekerInfo.headline}
                                </Typography>
                                <Typography variant="body1" className="!font-[Open_sans] !text-gray-600 !mt-3 flex items-center justify-center !gap-2">
                                   <FaSchool className="text-[#a78cdd]" /> 
                                  {stateData.seekerInfo.education?.[0]?.degree} -{" "}
                                  {stateData.seekerInfo.education?.[0]?.year}
                                </Typography>
                                <Typography variant="body2" className="!font-[Open_sans] text-center text-gray-500 !mt-3">
                                  {stateData.seekerInfo.education?.[0]?.description}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography className="font-semibold text-gray-800 mb-2">
                                  Headline
                                </Typography>
                                <Typography className="text-sm text-gray-600">
                                  Currently studying
                                </Typography>
                              </>
                            )}
                          </CardContent>
                          <CardActions className="justify-center !pb-4">
                            <Button
                              size="small"
                              startIcon={<FaEdit />}
                              onClick={handleEditBtn}
                              className="!font-[Open_Sans] bg-indigo-600 hover:!bg-indigo text-white text-xs !rounded-full px-6 py-2 !transition-all hover:scale-105 !shadow-md"
                            >
                              Edit Profile
                            </Button>
                          </CardActions>
                        </Card>
                    </div>
                 </div>
             </div>
          </div>
        </>
    );
}