"use client"
import Navbar from "@/components/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardMedia, Skeleton, Stack, Typography } from "@mui/material";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaChevronRight, FaEdit, FaGlobe, FaInfoCircle, FaPhoneAlt, FaUsers } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { ExpandMore } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

export default function HomePage() {

  const stateData = useSelector((state)=>state.signup);
  const stateUserdata = useSelector((state) => state.userDetail.user);
  const stateProviderData = useSelector((state) => state.userDetail.provider);
  const dispatch = useDispatch();
  
  const imagePath = stateData.photo?.url || "https://res.cloudinary.com/dj0mkrv8f/image/upload/v1770986917/user_uploads/nilvruogrdogvzk5zlof.jpg";

  const [ loading, setLoading ] = useState(true);
  const [ jobs, setJobs ] = useState([]);
  const [ expanded, setExpanded ] = useState(false);



  const handlesAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEditButton=()=>{
    console.log("editbutton open")
  }

  const fetchJobsFromDb=async(e)=>{  ///fetching the jobs of specific user and set jobs object
     setLoading(true);
      setTimeout(()=>{
        setJobs([
          {
        _id: "1",
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        jobType: "Remote",
        salary: "$120k - $150k",
        postDate: "2025-03-01",
        lastDate: "2025-04-01",
        description:
          "We are looking for an experienced frontend developer proficient in React and TypeScript to lead our UI team.",
        requirements: ["5+ years React", "TypeScript expertise", "Team leadership"],
        screeningQuestions: ["Describe a challenging UI problem you solved."],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      },
      {
        _id: "2",
        title: "Product Manager",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        postDate: "2025-02-15",
        lastDate: "2025-03-30",
        description:
          "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
        requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
        screeningQuestions: ["How do you prioritize features?"],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      },
      {
        _id: "3",
        title: "Product Manager",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        postDate: "2025-02-15",
        lastDate: "2025-03-30",
        description:
          "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
        requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
        screeningQuestions: ["How do you prioritize features?"],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      },
      {
        _id: "4",
        title: "Product Manager",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        postDate: "2025-02-15",
        lastDate: "2025-03-30",
        description:
          "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
        requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
        screeningQuestions: ["How do you prioritize features?"],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      },
      {
        _id: "5",
        title: "Product Manager",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        postDate: "2025-02-15",
        lastDate: "2025-03-30",
        description:
          "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
        requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
        screeningQuestions: ["How do you prioritize features?"],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      },
      {
        _id: "6",
        title: "Product Manager",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        postDate: "2025-02-15",
        lastDate: "2025-03-30",
        description:
          "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
        requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
        screeningQuestions: ["How do you prioritize features?"],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      },
      {
        _id: "7",
        title: "Product Manager",
        location: "New York, NY",
        jobType: "Hybrid",
        salary: "$130k - $160k",
        postDate: "2025-02-15",
        lastDate: "2025-03-30",
        description:
          "Seeking a product manager to drive our flagship product roadmap and collaborate with engineering and design.",
        requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
        screeningQuestions: ["How do you prioritize features?"],
        provider: {
          companyname: "TechCorp Solutions",
          user: { name: "Alex Morgan", photo: null },
        },
      }
        ]);
        setLoading(false);
      },1000);
    };

    useEffect(()=>{
      fetchJobsFromDb();
    },[])

  return (
    <>
    <Navbar/>

    <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] backdrop-blur-sm pt-20 pb-10 px-4 sm:px-6 lg:px-8 font-[Open_sans]">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 mt-2 gap-6">
              <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                 <Card className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
                    <CardMedia component="img"
                      image="/cardback.png"
                      alt="cover"
                      className="h-28 object-cover"
                    />
                   <CardContent className="text-center -mt-25">
                       <div className="flex justify-center">
                          <div className="w-29 h-28 rounded-full border-white shadow-xl overflow-hidden bg-white">
                              <img
                                src={imagePath || "https://via.placeholder.com/150"}
                                alt="profile"
                                className="w-full h-full object-cover"
                              />
                          </div>
                       </div>
                       <Typography variant="h5" className="!font-bold !font-[Open_sans] text-gray-800 !mt-4">{stateUserdata?.name || "Shams Ali Mehdi"}</Typography>
                       <Typography variant="body1" className=" !font-[Open_sans] text-gray-600 flex items-center justify-center gap-2 !mt-4">
                        <FaBriefcase className="text-indigo-500"/>
                        {stateProviderData?.postionInCompany || "Senior HR Manager"}
                      </Typography>
                       <Typography variant="body2" className="!font-[Open_sans] text-gray-600 flex items-center justify-center gap-2 !mt-3 !mb-3">
                        <FaCalendarAlt className="text-indigo-400"/>
                        {stateProviderData?.tenureTimePeriod || "2020 - Present"}
                      </Typography>
                      <Typography variant="body3" className="!font-[Open_sans] text-gray-700 !mt-4 text-justify px-2 leading-relaxed">
                        {stateProviderData?.goalOfCompany ||
                          "Empowering businesses through innovative technology"}
                      </Typography>
                    </CardContent> 
                    <CardActions className="justify-center !pb-4">
                        <Button
                        size="small"
                        startIcon={<FaEdit/>}
                        onClick={handleEditButton}
                        className="bg-indigo-600 hover:bg-indigo text-white text-xs rounded-full px-6 py-2 transition-all hover:scale-105 shadow-md"
                        >  
                        Edit Profile
                        </Button>
                    </CardActions> 
                 </Card> 
                 <Card className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
                   <CardContent className="!p-4">
                     <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-indigo-100 rounded-xl">
                         <FaBuilding className="text-indigo-600 text-xl" />
                       </div>
                       <Typography
                         variant="h6"
                         className="!font-bold !font-[Open_sans] text-gray-800"
                       >
                         {stateProviderData?.companyname || "TechCorp Solutions"}
                       </Typography>
                     </div>
                     <div className="ml-2 space-y-3 text-sm text-gray-700">
                       <div className="flex font-[Open_sans] items-center gap-2">
                         <FaPhoneAlt className="text-indigo-500" />
                         <Typography variant="body2" className="!font-[Open_sans] text-gray-600 flex items-center justify-center gap-2 !ml-2">{stateProviderData?.contact || "+1 (555) 123-4567"}</Typography>
                       </div>
                       <div className="flex items-start gap-2">
                         <FaGlobe className="text-indigo-600 mt-1" />
                         <Typography variant="body2" className="!font-[Open_sans] text-gray-600 flex items-center justify-center gap-2 !ml-2">
                           {stateProviderData?.aboutCompany ||
                             "TechCorp is a leading provider of enterprise software solutions."}
                         </Typography>
                       </div>
                     </div>
                   </CardContent>
                   <CardActions className="justify-center !pb-6">
                     <Button
                        size="small"
                        startIcon={<FaEdit/>}
                        onClick={handleEditButton}
                        className="bg-indigo-600 hover:bg-indigo text-white text-xs rounded-full px-6 py-2 transition-all hover:scale-105 shadow-md"
                        >  
                        Edit Profile
                        </Button>
                   </CardActions>
                </Card>
              </div>
              <div className="lg:col-span-6 space-y-4">
                 <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Typography variant="h5" className="!font-bold !font-[Open_sans] text-gray-800 flex items-center gap-2">
                      <FaBriefcase className="text-[#a78cdd]"/>
                      Job Feed
                    </Typography>
                    <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
//                    onClick={()=>hanleJobPostPopup()}
                    className="!font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                    >
                    Post New Job
                    </Button>
                 </div>
                 <div className="space-y-3">
                   {
                    loading?(
                      <Stack spacing={2}>
                       {[1,2,3].map((n)=>(
                        <Skeleton
                        key={n}
                        variant="rectangular"
                        height={100}
                        sx={{borderRadius:"24px"}}
                        />
                       ))}
                      </Stack>
                    ): jobs.length===0?(
                       <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-12 text-center">
                          <FaUsers className="text-gxl text-gray-300 mx-auto !mb-4"/>
                          <Typography className="text-gray-500 text-lg">No jobs posted yet. Start by posting a new job!</Typography>
                       </div>
                    ):(
                       jobs.map((job)=>(
                        <Accordion
                        key={job._id}
                        expanded={expanded==job._id}
                        onChange={handlesAccordionChange(job._id)}
                        className={`!rounded-3xl !shadow-xl border-0 !overflow-hidden bg-white/70 !backdrop-blur-md !transition-all duration-300 
                            ${expanded === job._id ? "hover:scale-[1.4] hover:!shadow-2xl z-10" : "hover:bg-white/90"}`}
                          sx={{
                            "&:before": { display: "none" },
                            borderRadius: "24px !important",
                            marginBottom: "12px",
                            // Ensure the transform doesn't get clipped by parent containers
                            transition: "transform 0.3s ease-in-out", 
                          }}
                        >
                         <AccordionSummary expandIcon={<ExpandMore className="text-indigo-600"/>} className="!bg-transparent hover:!bg-white/30 !transition-colors">
                           <div className="flex flex-col sm:flex-row w-full sm:items-center justify-between gap-2 py-2">
                              <Typography className="!font-[Open_sans] text-gray-800 text-base">
                                 {job.title}
                              </Typography>
                           <div className="flex flex-wrap gap-2 !font-[Open_sans] text-xs">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                              {job.location}
                            </span>
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                              {job.jobType}
                            </span>
                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                              Apply by: {new Date(job.lastDate).toLocaleDateString("en-GB")}
                            </span>
                          </div>
                          </div>
                         </AccordionSummary>
                         <AccordionDetails className="bg-white/40 !backdrop-blur-sm p-5">
                            <Typography className="!text-sm !font-[Open_sans] text-gray-700 !mb-4 leading-relaxed">{job.description}</Typography>
                            <div className="flex gap-2">
                              <Button
                              variant="contained"
                              size="small"
                              startIcon={<FaInfoCircle/>}
                              // onClick={()=>{
                              //     setJobToEdit(job);
                              //     setOpenRightDrawer(true);    
                              // }}
                              className="!font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                              >
                              Details
                              </Button>
                              <Button 
                                variant="contained" 
                                color="error"
                                size="small"
                                startIcon={<Delete />} 
                                // onClick={() => deletejob(job)}
                                className="!font-['Open_Sans'] !bg-[#ff6b6b] hover:!bg-[#ee5253] !text-white !rounded-full !px-6 !py-2 !text-sm !font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(255,107,107,0.39)] hover:!shadow-[#ff6b6b]/50 !normal-case !border-none"
                              >
                                Delete Job
                              </Button>
                            </div>
                         </AccordionDetails>
                        </Accordion>
                       ))
                    )}
                 </div>
              </div>
              <div className="lg:col-span-3 hidden lg:block space-y-6">
                  <Card className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md p-6 sticky top-24">
                    <Typography className="text-gray-800 !font-bold !text-lg !mb-4 flex items-center !gap-2">
                      <FaChevronRight className="text-[#a78cdd]" />
                      Hiring Tips
                    </Typography>
                    <ul className="text-sm text-gray-700 space-y-3 list-disc pl-5">
                      <li>Write clear and concise job descriptions</li>
                      <li>Highlight your company culture and values</li>
                      <li>Include a salary range to attract more candidates</li>
                      <li>Use screening questions to filter early</li>
                      <li>Respond to applicants within 48 hours</li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-200/50">
                      <Typography className="!text-xs !font-[Open_sans] text-gray-500">
                        💡 Jobs with at least 3 requirements get 2x more applications.
                      </Typography>
                    </div>
                  </Card>
              </div>
           </div>
        </div>
    </div>
    </>
  );
}