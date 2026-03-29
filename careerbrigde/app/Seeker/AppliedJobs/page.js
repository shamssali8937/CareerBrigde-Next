"use client"
import Navbar from "@/components/Navbar";
import { FaCalendarAlt, FaFileAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaListUl, FaUserTie, FaBuilding, FaTools, FaGraduationCap, FaTasks, FaQuestionCircle,} from "react-icons/fa";
import { Card, CardContent, Typography, Button, Chip, Avatar, IconButton, SwipeableDrawer} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addAppliedJobs, hideJob } from "@/redux/slices/appliedJobSlice";
import { setRole } from "@/redux/slices/signupSlice";
import { useDispatch } from "react-redux";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { useSelector } from "react-redux";



export default function AppliedJobs() {
   const stateapplications=useSelector((state)=>state.appliedJobs);
  //  console.log(stateapplications);
  const [applications, setApplications] = useState(stateapplications.applications||[]);
  const [ishide,setIsHide]=useState(false);
  const [selectedapplication, setseleectedapplication] = useState(null);
  const [opendrawer, setopendrawer] = useState(false);
  const [ openSnackbar, setOpenSackbar ] = useState(false);
  const [ snackbarMssage, setSnackbarMessage ] = useState("");
  const [ snackbarSeverity, setSnackbarSeverity ] = useState("success");
  const dispatch=useDispatch();
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

  const setIsdeleteToHideJobApplication=async(applicationId)=>{
               try{
                console.log(applicationId);
                const token=localStorage.getItem("token");
               
                const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected//DeleteJobApplication/${applicationId}`,{
                  method:"DELETE",
                  headers:{
                     Authorization: `Bearer ${token}` 
                  }
                });
                if(response.ok){
                    dispatch(hideJob(applicationId)); 
                    setseleectedapplication(null);
                    setSnackbarMessage("Job Deleted");
                    setSnackbarSeverity("error");
                    setOpenSackbar(true);
                    setIsHide(true);
                    setopendrawer(false);
                }
               }catch(error){
                console.log("error",error)
               }
           }

  // function getFileName(cv) {
  //   if (!cv) return "";
  //   const fullFileName = cv.split("/").pop();
  //   const nameOnly = fullFileName.replace(/-\d+(?=\.\w+$)/, "");
  //   return nameOnly;
  // }

  function getFileName(cv) {
        if (!cv) return "";
        if (typeof cv === "string") return cv.split("/").pop();
        if (cv?.name) return cv.name;
        if (cv?.file?.name) return cv.file.name;
        return "";
      }

  const fetchAlreadyAppliedJobs=async()=>{
            try{
               const token=localStorage.getItem("token");
              
               const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/GetAllJobApplicationOfSeeker`,
                   {
                     method: "GET",
                     headers: { Authorization: `Bearer ${token}` },
                   }
                 );
               if(response.ok){
                let result=await response.json();
                console.log("applied jobs",result.data.applications);
                dispatch(addAppliedJobs(result.data.applications))
               if (result.data.applications && result.data.applications.length > 0) {
                 dispatch(setRole(result.data.applications[0].seeker.user.role));
               }
                setApplications(result.data.applications);
               }
            }catch(error){
              console.log("eror in fetching already applied jobs",error);
            }
          }
  

   useEffect(() => {
    fetchAlreadyAppliedJobs();
  }, []);

    useEffect(() => {
    fetchAlreadyAppliedJobs();
  }, [ishide]);

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
                        src={application.job.provider.user.photo?.url||""}
                        alt={application.job.provider.companyName}
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
                          {application.job.provider.companyName}
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
                          onClick={()=>setIsdeleteToHideJobApplication(application._id)}
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
       
      <SwipeableDrawer
        anchor="right"
        open={opendrawer}
        onClose={() => setopendrawer(false)}
        disableBackdropTransition={false}
        disableDiscovery={false}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 500 },
            borderRadius: "24px 0 0 24px",
            background: "linear-gradient(to bottom, #faf8ff, #eee7ff, #dcd0ff)",
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(250, 248, 255, 0.8)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "-10px 0 30px rgba(0,0,0,0.05)",
          },
        }}
      >
        {selectedapplication && (
          <div className="h-full flex flex-col">
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-200/50 flex justify-between items-center">
              <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">
                Application Details
              </Typography>
              <IconButton onClick={() => setopendrawer(false)} className="text-gray-500">
                <CloseIcon />
              </IconButton>
            </div>

            {/* Job Info */}
            <div className="p-6 border-b border-white/30">
              <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">
                {selectedapplication.job.title}
              </Typography>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src={selectedapplication.job.provider.user.photo?.url||""}
                  alt="company"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <Typography className="!font-medium !font-[Open_sans] text-gray-800">
                    {selectedapplication.job.provider.user.name}
                  </Typography>
                  <Typography variant="body2" className="!font-[Open_sans] text-gray-600 flex items-center gap-1">
                    <FaUserTie className="!text-indigo-500" />
                    at {selectedapplication.job.provider.companyName}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
                <span className="font-[Open_sans] flex items-center gap-1">
                  <FaMapMarkerAlt className="!text-indigo-500" />
                  {selectedapplication.job.location}
                </span>
                <span className="font-[Open_sans] flex items-center gap-1">
                  <FaClock className="!text-emerald-500" />
                  {selectedapplication.job.jobType}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedapplication.seeker.user.photo?.url||""}
                  alt="applicant"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-3"
                />
                <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">
                  {selectedapplication.seeker.user.name}
                </Typography>
                <Typography variant="body1" className="!font-[Open_sans] text-gray-600">
                  {selectedapplication.seeker.headline}
                </Typography>
                <div className="font-[Open_sans] flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <FaCalendarAlt className="!text-amber-500" />
                  Applied on {new Date(selectedapplication.applyDate).toLocaleDateString()}
                </div>
              </div>

              {/* About */}
              <div className="bg-white/60 p-4 rounded-2xl">
                <Typography variant="body1" className="!font-[Open_sans] text-gray-700 !leading-relaxed">
                  {selectedapplication.seeker.about}
                </Typography>
              </div>

              {/* Education */}
              {selectedapplication.seeker.education?.length > 0 && (
                <div>
                  <Typography className="!font-semibold !font-[Open_sans] text-gray-800 !mb-2 flex items-center !gap-2">
                    <FaGraduationCap className="!text-indigo-500" /> Education
                  </Typography>
                  <div className="space-y-3">
                    {selectedapplication.seeker.education.map((edu) => (
                      <div key={edu._id} className="bg-white/40 p-3 rounded-xl text-sm">
                        <Typography className="!font-medium !font-[Open_sans]">{edu.degree}</Typography>
                        <Typography className="!text-gray-600 !font-[Open_sans]">
                          {edu.institute} ({edu.year})
                        </Typography>
                        <Typography variant="body1" className="!font-[Open_sans] text-gray-500 mt-1">
                          {edu.description}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedapplication.seeker.experience?.length > 0 && (
                <div>
                  <Typography className="!font-semibold !font-[Open_sans] text-gray-800 !mb-2 flex items-center !gap-2">
                    <FaTasks className="!text-emerald-500" /> Experience
                  </Typography>
                  <div className="space-y-3">
                    {selectedapplication.seeker.experience.map((exp) => (
                      <div key={exp._id} className="bg-white/40 p-3 rounded-xl text-sm">
                        <Typography className="!font-medium !font-[Open_sans]">
                          {exp.title} - {exp.company}
                        </Typography>
                        <Typography className="!text-gray-600 !font-[Open_sans]">{exp.duration}</Typography>
                        <Typography variant="body1" className="!font-[Open_sans] text-gray-500 !mt-1">
                          {exp.description}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedapplication.seeker.skills?.length > 0 && (
                <div>
                  <Typography className="!font-semibold !font-[Open_sans] text-gray-800 !mb-2 flex items-center !gap-2">
                    <FaTools className="!text-amber-500" /> Skills
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {selectedapplication.seeker.skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        className="!bg-indigo-50 !text-indigo-700 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedapplication.job.screeningQuestions?.length > 0 &&
                selectedapplication.screeningAnswers?.length > 0 && (
                  <div>
                    <Typography className="!font-semibold !font-[Open_sans] text-gray-800 !mb-2 flex items-center !gap-2">
                      <FaQuestionCircle className="!text-purple-500" /> Screening Questions
                    </Typography>
                    <div className="space-y-3">
                      {selectedapplication.job.screeningQuestions.map((q, idx) => (
                        <div key={idx} className="bg-white/40 p-3 rounded-xl">
                          <Typography variant="body1" className="!font-medium !font-[Open_sans] text-gray-800">
                            Q: {q}
                          </Typography>
                          <Typography variant="body1" className="!font-[Open_sans] text-gray-600 !mt-1">
                            A: {selectedapplication.screeningAnswers[idx] || "No answer"}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="bg-white/60 p-4 rounded-2xl flex items-center gap-3">
                <FaFileAlt className="!text-indigo-500" />
                {selectedapplication.cv ? (
                  <a
                    href={selectedapplication.cv?.url||""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[Open_sans] text-sm text-indigo-600 hover:underline"
                  >
                    CV: {getFileName(selectedapplication.cv?.publicId)}
                  </a>
                ) : (
                  <span className="text-sm text-gray-700">CV: No CV uploaded</span>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/30">
              <Chip
                label={selectedapplication.status || "Pending"}
                className="!font-[Open_sans] w-full justify-center !rounded-full !py-5"
                sx={{
                  backgroundColor: getStatusColor(selectedapplication.status),
                  color: "white",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>
        )}
      </SwipeableDrawer>
      <CustomizedSnackbars
        open={openSnackbar}
        message={snackbarMssage}
        severity={snackbarSeverity}
        onClose={() => setOpenSackbar(false)}
      />
    </>
  );
}
