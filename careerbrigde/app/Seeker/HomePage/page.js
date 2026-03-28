"use client"
import Navbar from "@/components/Navbar";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaClock, FaEdit, FaFileAlt, FaFileUpload, FaGraduationCap, FaInfoCircle, FaListUl, FaLocationArrow, FaMapMarkedAlt, FaMoneyBillWave, FaSchool, FaUserAlt, FaUserTie } from "react-icons/fa";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, FormControlLabel, IconButton, InputAdornment, MenuItem, Modal, Skeleton, Stack, SwipeableDrawer, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDetails, setRole, setSeekerInfo } from "@/redux/slices/signupSlice";
import { setUser } from "@/redux/slices/userDetailSlice";
import SeekerForm from "@/components/SeekerForm";
import UpdateUserInfoForm from "@/components/UpdateUserInfoForm";
import ProfileAvatar from "@/components/ProfileAvatar";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { addAppliedJobs } from "@/redux/slices/appliedJobSlice";

export default function Homepage(){



      const dispatch = useDispatch();
      const stateData = useSelector((state) => state.signup);
      const stateUserdata = useSelector((state) => state.userDetail.user);
    
      const [ openSnackbar, setOpenSackbar ] = useState(false);
      const [ snackbarMssage, setSnackbarMessage ] = useState("");
      const [ snackbarSeverity, setSnackbarSeverity ] = useState("success");
      const [ loading, setLoading ] = useState(true);
      const [ expanded, setExpanded ] = useState(false);
      const [ openRightDrawer, setOpenRightDrawer ] = useState(false);
      const [ openLeftDrawer, setOpenLeftDrawer ] = useState(false);
      const [ apply, setApply ] = useState(false);
      const [ showUserUpdateFields, setShowUserUpdateFields ] = useState(false);
      const [ Filename, setFilename ] = useState("");
    
      const [ jobs, setJobs ] = useState([]);
      const [ companies, setCompanies ] = useState([]);
      const [ allJobs, setAllJobs ] = useState([]);
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
    
      const profileImagePath = stateUserdata?.photo?.url || stateData.details.img ;
    
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
        try {
          // Optimistic update (optional)
          dispatch(setSeekerInfo(formdata));
      
          const data = new FormData();
          data.append("headline", formdata.headline);
          data.append("about", formdata.about);
          data.append("city", formdata.city);
          data.append("phone", formdata.phone);
          data.append("address", formdata.address);
          data.append("country", formdata.country);
          data.append("skills", JSON.stringify(formdata.skills));
          data.append("education", JSON.stringify(formdata.education));
          data.append("experience", JSON.stringify(formdata.experience));
          data.append("socialLinks", JSON.stringify(formdata.socialLinks));
      
          // Append CV if it's a new file
          if (formdata.cv && formdata.cv.file instanceof File) {
            data.append("cv", formdata.cv.file);
          }
      
          const token = localStorage.getItem("token");
      
          // Update seeker profile
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateSeeker`,
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: data,
            }
          );
          const seekerData = await response.json();
      
          if (response.ok) {
            const updatedSeeker = seekerData.data.seeker;
            console.log("Profile updated", updatedSeeker);
      
            // Update Redux with the fresh data from server
            dispatch(setSeekerInfo(updatedSeeker));
            dispatch(
              setDetails({
                ...stateData.details,
                name: updatedSeeker.user.name,
                img: updatedSeeker.user.photo?.url || stateData.details.img,
              })
            );
            console.log("image",img);
            // Upload profile picture if a new one was selected
            if (img !== null && img.file) {
              const userPhotoData = new FormData();
              userPhotoData.append("photo", img.file);
      
              const photoResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateUser`,
                {
                  method: "PUT",
                  headers: { Authorization: `Bearer ${token}` },
                  body: userPhotoData,
                }
              );
      
              if (photoResponse.ok) {
                console.log("Profile picture updated");
              } else {
                console.error("Photo upload failed");
              }
            }
            dispatch(
                  setDetails({
                    ...stateData.details,
                    img: img?.url,
                  })
                );
            setSnackbarMessage("Profile Updated Successfully");
            setSnackbarSeverity("success");
            setOpenSackbar(true);
            setOpenLeftDrawer(false);
            setImg(null);
          } else {
            console.error("Seeker update failed", seekerData);
            setSnackbarMessage("Failed to update profile");
            setSnackbarSeverity("error");
            setOpenSackbar(true);
            // Keep drawer open to allow retry
          }
        } catch (err) {
          console.error("Error in updating:", err);
          setSnackbarMessage("An error occurred while updating");
          setSnackbarSeverity("error");
          setOpenSackbar(true);
          // Do not close drawer on error so user can retry
        }
      };
      
      const handleUserInfoUpdate = async (formData) => {
        try{
           const token=localStorage.getItem("token");
           const userUpdateResponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateUser`,{
           method:"PUT",
           headers:{
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
           body:JSON.stringify(formData)
          });
            if(userUpdateResponse.ok){
              let result=userUpdateResponse.json()
               console.log("user",result);
                  dispatch(setUser(result.data))  
            }        
          setSnackbarMessage("User info updated");
          setSnackbarSeverity("success");
          setOpenSackbar(true);
          setOpenLeftDrawer(false);
        }catch(err){
          setSnackbarMessage(`${err}`);
          setSnackbarSeverity("error");
          setOpenSackbar(true);
          setOpenLeftDrawer(false);
        }
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
        setOpenSackbar(true);
        setOpenRightDrawer(false);
        setScreeningAnswers([]);
      };
    
      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
      const handleDetailBtn = (job) => {
        setSelectedjob(job);
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
        setSelectedjob(fullJob);
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
        let filtered = allJobs;
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

      const fetchSeekerDetails=async()=>{
          try{
            const token=localStorage.getItem("token");
            const response=await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetSeekerProfile`,{
               method:"GET",
               headers:{
                 Authorization: `Bearer ${token}`,
               }
              }
            );

            if(response.ok){
                let result=await response.json();
                console.log("seeker",result.data.seeker);
                dispatch(setRole(result.data.seeker.user.role))
                dispatch(setUser(result.data.seeker.user));
                dispatch(setDetails({...result.data.seeker.user,img:result.data.seeker.user.photo?.url}));
                dispatch(setSeekerInfo(result.data.seeker))
            }
          }catch(err){
            console.log("error in fectging seeker",err)
          }
        }

      const fetchJobsForSeeker=async()=>{
          try{
              const token = localStorage.getItem("token");
               const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/GetAllJobsForSeekerProfile`,
                 {
                   method: "GET",
                   headers: { Authorization: `Bearer ${token}` },
                 }
               );
               if(response.ok){
                 let result=await response.json();
                 console.log("jobs of seeker",result.data.jobs);
                 setJobs(result.data.jobs);
               }
               const allJobsResponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/GetAllJobs`,
                 {
                   method: "GET",
                   headers: { Authorization: `Bearer ${token}` },
                 }
               );
                if(allJobsResponse.ok){
                 let result=await allJobsResponse.json();
                 console.log("jobs for seeker to search",result.data.jobs);
                 setAllJobs(result.data.jobs);
               }
          }catch(err){
            console.log(err);
          }
        }  

      const fetchCompanies=async()=>{
          try{
               const token = localStorage.getItem("token");
               const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/GetAllCompanies`,
                 {
                   method: "GET",
                   headers: { Authorization: `Bearer ${token}` },
                 }
               );
               if(response.ok){
                 let result=await response.json();
                 console.log("jobs of seeker",result.data.companies);
                 setCompanies(result.data.companies);
               }
          }catch(err){
            console.log(err);
          }
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
              // console.log("applied jobs",response.data.applications);
              dispatch(addAppliedJobs(response.data.applications))
             }
          }catch(error){
            console.log("eror in fetching already applied jobs",error);
          }
        }  

      useEffect(()=>{
            fetchSeekerDetails();
      },[openLeftDrawer]) ;

      useEffect(() => {
             const loadData=async()=>{
               try{
                 setLoading(true);
                 await Promise.all([
                   fetchSeekerDetails(),
                   fetchJobsForSeeker(),
                   fetchCompanies(),
                   fetchAlreadyAppliedJobs()
                 ]);
               }catch(err){
                 console.log(err);
               }finally {
                 setLoading(false);
               }
             };
             loadData();
           }, []);
    
    
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
                   <Typography variant="h6" className="!font-bold !font-[Open_sans] flex items-center gap-3 text-center !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-3 !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50">
                     <FaBriefcase className="text-white" />
                     Find Your Dream Job
                   </Typography>
                 </motion.div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 mt-2 gap-6">
                    <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                        <Card className="!rounded-3xl !shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
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
                        <Card className="!rounded-3xl !shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
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
                    <div className="lg:col-span-6 space-y-4">
                        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-5 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                              <TextField
                                placeholder="Search by job title, company or location"
                                variant="outlined"
                                size="small"
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                                className="flex-1 bg-white/50 rounded-lg"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <SearchIcon className="text-gray-400" />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                select
                                size="small"
                                value={jobTypeFilter}
                                onChange={(e) => setJobTypeFilter(e.target.value)}
                                className="!bg-[#a78cdd] hover:!bg-[#8e6fc5] !rounded-full !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                                 sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' },'& .MuiSelect-select': { 
                                       color: 'white !important',
                                       fontFamily: '"Open Sans" !important',
                                       fontWeight: 600,
                                       paddingLeft: '24px'
                                     }, }}
                              >
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="Full-Time">Full-Time</MenuItem>
                                <MenuItem value="On-site">On-Site</MenuItem>
                                <MenuItem value="Contract">Contract</MenuItem>
                                <MenuItem value="Remote">Remote</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                              </TextField>
                            </div>
                        </div>
                        <div className="space-y-3">
                               {loading ? (
                                  <Stack spacing={2}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                      <Skeleton
                                        key={n}
                                        variant="rectangular"
                                        height={80}
                                        sx={{ borderRadius: "24px" }}
                                      />
                                    ))}
                                  </Stack>
                                ) : (
                                  <>
                                    {/* Search Results Section */}
                                    {searchWord && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mb-8"
                                      >
                                        <Typography
                                          variant="h6"
                                          className="!font-bold !font-[Open_sans] text-gray-800 !mb-4 flex items-center gap-2"
                                        >
                                          <SearchIcon className="!text-[#a78cdd]" /> Search Results
                                        </Typography>
                                        <div className="space-y-3">
                                          {jobsToDisplay.length > 0 ? (
                                            jobsToDisplay.map((job, index) => {
                                              const company = companies.find(
                                                (c) => c._id === job.provider._id
                                              );
                                              return (
                                                <motion.div
                                                  key={job._id}
                                                  initial={{ opacity: 0, y: 20 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: index * 0.05 }}
                                                >
                                                  <Accordion
                                                    expanded={expanded === job._id}
                                                    onChange={handleChange(job._id)}
                                                    className={`!rounded-3xl !shadow-xl border-0 !overflow-hidden bg-white/70 !backdrop-blur-md !transition-all duration-300 
                                                    ${expanded === job._id ? "hover:scale-[1.4] hover:!shadow-2xl z-10" : "hover:bg-white/90"}`}
                                                     sx={{
                                                       "&:before": { display: "none" },
                                                       borderRadius: "24px !important",
                                                       marginBottom: "12px",
                                                       transition: "transform 0.3s ease-in-out", 
                                                     }}

                                                  >
                                                    <AccordionSummary
                                                      expandIcon={
                                                        <ExpandMoreIcon className="!text-[#a78cdd]" />
                                                      }
                                                      className="bg-transparent hover:bg-white/30 transition-colors rounded-t-3xl"
                                                    >
                                                      <div className="flex flex-col sm:flex-row w-full sm:items-center justify-between gap-2 py-2">
                                                        <Typography className="!font-[Open_sans] text-gray-800">
                                                          {job.title}
                                                        </Typography>
                                                        <div className="flex flex-wrap gap-2 text-xs">
                                                          <span className="font-[Open_sans] bg-[#a78cdd]/20 text-[#7b5fb0] px-3 py-1 rounded-full">
                                                            {job.location}
                                                          </span>
                                                          <span className="font-[Open_sans] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                                                            {job.jobType}
                                                          </span>
                                                          <span className="font-[Open_sans] bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                                                            Apply by: {formatDate(job.lastDate)}
                                                          </span>
                                                        </div>
                                                      </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails className="bg-white/40 backdrop-blur-sm p-5">
                                                      <Typography spacing={4} variant="body1" className="!font-[Open_sans] text-gray-700 !mb-4 leading-relaxed">
                                                        {job.description}
                                                      </Typography>
                                                      <div className="flex gap-2 flex-wrap mt-4">
                                                        {isJobClosed(job.lastDate) ? (
                                                          <Button
                                                            variant="contained"
                                                            disabled
                                                            className="!font-['Open_Sans'] !bg-[#ff6b6b] hover:!bg-[#ee5253] !text-white !rounded-full !px-6 !py-2 !text-sm !font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(255,107,107,0.39)] hover:!shadow-[#ff6b6b]/50 !normal-case !border-none"
                                                          >
                                                            Closed
                                                          </Button>
                                                        ) : (
                                                          <Button
                                                            variant="contained"
                                                            startIcon={<FaInfoCircle />}
                                                            onClick={() => handleDetailBtn(job)}
                                                            className="!font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white text-xs !rounded-full px-5 py-1.5 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                                                          >
                                                            Details
                                                          </Button>
                                                        )}
                                                        {appliedJobs.some(
                                                          (app) => app.job._id === job._id
                                                        ) && (
                                                          <Button
                                                            variant="contained"
                                                            disabled
                                                            className="!font-['Open_Sans'] !bg-emerald-600 hover:!bg-emerald-700 !text-white !rounded-full !px-6 !py-2 !text-sm !font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:!shadow-emerald-600/50 !normal-case !border-none"
                                                          >
                                                            Applied
                                                          </Button>
                                                        )}
                                                      </div>
                                                    </AccordionDetails>
                                                  </Accordion>
                                                </motion.div>
                                              );
                                            })
                                          ) : (
                                            <Typography className="!font-[Open_sans] text-sm text-gray-500 text-center py-8">
                                              No jobs found
                                            </Typography>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                  
                                    {/* Regular Job Feed */}
                                    {!searchWord && (
                                      <div className="space-y-3">
                                        {jobsToDisplay.length > 0 ? (
                                          jobsToDisplay.map((job, index) => {
                                            const company = companies.find(
                                              (c) => c._id === job.provider._id
                                            );
                                            return (
                                              <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                              >
                                                <Accordion
                                                  expanded={expanded === job._id}
                                                  onChange={handleChange(job._id)}
                                                  className={`!rounded-3xl !shadow-xl border-0 !overflow-hidden bg-white/70 !backdrop-blur-md !transition-all duration-300 
                                                  ${expanded === job._id ? "hover:scale-[1.4] hover:!shadow-2xl z-10" : "hover:bg-white/90"}`}
                                                   sx={{
                                                     "&:before": { display: "none" },
                                                     borderRadius: "24px !important",
                                                     marginBottom: "12px",
                                                     transition: "transform 0.3s ease-in-out", 
                                                   }}
                                                >
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon className="text-[#a78cdd]" />
                                                    }
                                                    className="bg-transparent hover:bg-white/30 transition-colors rounded-t-3xl"
                                                  >
                                                    <div className="flex flex-col sm:flex-row w-full sm:items-center justify-between gap-2 py-2">
                                                      <Typography className="font-semibold text-gray-800 text-base">
                                                        {job.title}
                                                      </Typography>
                                                      <div className="flex flex-wrap gap-2 text-xs">
                                                        <span className="bg-[#a78cdd]/20 text-[#7b5fb0] px-3 py-1 rounded-full">
                                                          {job.location}
                                                        </span>
                                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                                                          {job.jobType}
                                                        </span>
                                                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                                                          Apply by: {formatDate(job.lastDate)}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </AccordionSummary>
                                                  <AccordionDetails className="bg-white/40 backdrop-blur-sm p-5">
                                                    <Typography className="text-sm text-gray-700 mb-4 leading-relaxed">
                                                      {job.description}
                                                    </Typography>
                                                    <div className="flex gap-2 flex-wrap mt-4">
                                                      {isJobClosed(job.lastDate) ? (
                                                        <Button
                                                          variant="contained"
                                                          disabled
                                                          className="!font-['Open_Sans'] !bg-[#ff6b6b] hover:!bg-[#ee5253] !text-white !rounded-full !px-6 !py-2 !text-sm !font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(255,107,107,0.39)] hover:!shadow-[#ff6b6b]/50 !normal-case !border-none"
                                                        >
                                                          Closed
                                                        </Button>
                                                      ) : (
                                                        <Button
                                                          variant="contained"
                                                          startIcon={<FaInfoCircle />}
                                                          onClick={() => handleDetailBtn(job)}
                                                          className="!font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                                                        >
                                                          Details
                                                        </Button>
                                                      )}
                                                      {appliedJobs.some(
                                                        (app) => app.job._id === job._id
                                                      ) && (
                                                        <Button
                                                          variant="contained"
                                                          disabled
                                                          className="!font-['Open_Sans'] !bg-emerald-600 hover:!bg-emerald-700 !text-white !rounded-full !px-6 !py-2 !text-sm !font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:!shadow-emerald-600/50 !normal-case !border-none"
                                                        >
                                                          Applied
                                                        </Button>
                                                      )}
                                                    </div>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </motion.div>
                                            );
                                          })
                                        ) : (
                                          <Typography variant="body1" className="!font-[Open_sans] text-gray-500 text-center py-8">
                                            No jobs available
                                          </Typography>
                                        )}
                                      </div>
                                    )}
                                  </>
                                )}
                        </div>
                    </div>
                    <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                        <Card className="!rounded-3xl !shadow-xl border-0 bg-white/70 backdrop-blur-md overflow-hidden p-5">
                          <Typography variant="h5" className="text-gray-800 !font-[Open_sans] text-lg !mb-4 flex items-center gap-2">
                            <FaBuilding className="text-[#a78cdd]" />
                            Available Companies
                          </Typography>
                          <div className="space-y-3">
                            {loading ? (
                              <Stack spacing={2}>
                                {[1, 2, 3].map((n) => (
                                  <div key={n} className="flex items-center gap-2">
                                      <Skeleton variant="circular" width={40} height={40} />
                                    <div className="flex-1">
                                      <Skeleton variant="text" width="80%" height={20} />
                                      <Skeleton variant="text" width="60%" height={15} />
                                    </div>
                                  </div>
                                ))}
                              </Stack>
                            ) : (
                              companies.map((company) => (
                                <motion.div
                                  key={company._id}
                                  whileHover={{ scale: 1.02 }}
                                  onClick={() => handleCompany(company)}
                                  className="p-3 bg-white/60 backdrop-blur-sm rounded-xl cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-[#a78cdd] flex items-center gap-3"
                                >
                                  <img
                                    src={company.user.photo?.url}
                                    alt={company.companyName}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                                  />
                                  <div>
                                    <Typography variant="body1" className="!font-[Open_sans] text-gray-800 text-sm">
                                      {company.companyName}
                                    </Typography>
                                    <Typography variant="body2" className="!font-[Open_sans] text-gray-500 flex items-center gap-1">
                                      <FaUserTie className="text-[#a78cdd]" />
                                      {company.user.name}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-500 flex items-center gap-1">
                                      {company.positionInCompany}
                                    </Typography>
                                  </div>
                                </motion.div>
                              ))
                            )}
                          </div>
                        </Card>
                    </div>
                 </div>
             </div>
          </div>
           
              <SwipeableDrawer
                anchor="right"
                open={openRightDrawer}
                onClose={() => setOpenRightDrawer(false)}
                disableBackdropTransition
                disableDiscovery
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
                {selectedjob && (
                  <div className="h-full flex flex-col">
                    <div className="p-6 bg-gradient-to-r from-[#faf8ff] to-[#dcd0ff] border-b border-gray-200/50">
                      <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">
                        {selectedjob.title}
                      </Typography>
                      {(() => {
                        const company = companies.find(
                          (c) => c._id === selectedjob.provider._id
                        );
                        return company ? (
                          <div className="flex items-center gap-3 mt-3">
                            <img
                              src={company.user.photo?.url}
                              alt={company.companyName}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                            />
                            <div>
                              <Typography variant="body1" className="!font-bold !font-[Open_sans] text-gray-800">
                                {company.companyName}
                              </Typography>
                              <Typography variant="body2" className="!font-[Open_sans] text-gray-600 flex items-center gap-1">
                                <FaUserTie className="text-[#a78cdd]" />
                                {company.user.name}
                              </Typography>
                            </div>
                          </div>
                        ) : null;
                      })()}
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
                        <span className="flex font-[Open_sans] items-center gap-1 bg-white/60 px-2 py-1 rounded-full">
                          <FaMapMarkedAlt className="text-[#a78cdd]" />
                          {selectedjob.location}
                        </span>
                        <span className="flex font-[Open_sans] items-center gap-1 bg-white/60 px-2 py-1 rounded-full">
                          <FaClock className="text-emerald-500" />
                          {selectedjob.jobType}
                        </span>
                      </div>
                    </div>
        
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedjob.salary && (
                          <div className="flex text-sm font-[Open_sans] items-center gap-2 bg-white/60 p-2 rounded-xl">
                            <FaMoneyBillWave className="text-emerald-500" />
                            <span className="font-medium">Salary:</span> {selectedjob.salary}
                          </div>
                        )}
                        <div className="flex text-sm font-[Open_sans] items-center gap-2 bg-white/60 p-2 rounded-xl">
                          <FaCalendarAlt className="text-amber-500" />
                          <span className="font-medium">Posted:</span>{" "}
                          {formatDate(selectedjob.postDate)}
                        </div>
                        <div className="flex text-sm font-[Open_sans] items-center gap-2 bg-white/60 p-2 rounded-xl">
                          <FaCalendarAlt className="text-rose-500" />
                          <span className="font-medium">Last Date:</span>{" "}
                          {formatDate(selectedjob.lastDate)}
                        </div>
                      </div>
        
                      <div>
                        <Typography variant="body1" className="!font-bold !font-[Open_sans] text-gray-800 !mb-2 flex items-center gap-2">
                          <FaListUl className="text-[#a78cdd]" /> Requirements
                        </Typography>
                        <ul className="list-disc list-inside text-lg font-[Open_sans] text-gray-700 space-y-1 pl-2">
                          {selectedjob.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
        
                      {selectedjob.screeningQuestions &&
                        selectedjob.screeningQuestions.length > 0 && (
                          <div>
                            <Typography className="!font-bold !font-[Open_sans] text-gray-800 !mb-2 flex items-center gap-2">
                              <FaListUl className="text-[#a78cdd]" /> Screening Questions
                            </Typography>
                            <ul className="list-disc list-inside text-lg font-[Open_sans] text-gray-700 space-y-1 pl-2">
                              {selectedjob.screeningQuestions.map((scq, i) => (
                                <li key={i}>{scq}</li>
                              ))}
                            </ul>
                          </div>
                        )}
        
                      <div>
                        <Typography className="!font-bold !font-[Open_sans] text-gray-800 !mb-2 flex items-center gap-2">
                              <FaFileAlt className="text-[#a78cdd]" />Job Description
                        </Typography>
                        <Typography variant="body1" className="!mt-2 !font-[Open_sans] text-gray-700 leading-relaxed bg-white/60 !p-4 !rounded-xl">
                          {selectedjob.description}
                        </Typography>
                      </div>
                    </div>
        
                    <div className="p-6 border-t border-gray-200/50">
                      {alreadyapplied ? (
                        <Button
                          variant="contained"
                          disabled
                          className="!bg-emerald-600 text-white rounded-full py-3 w-full"
                        >
                          Applied
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleApply}
                          className="!font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !py-3 w-full !transition-all hover:scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                        >
                          Easy Apply
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </SwipeableDrawer>
               

              <Modal open={apply} onClose={() => setApply(false)}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">
                      Apply for {selectedjob?.title}
                    </Typography>
                    <IconButton onClick={() => setApply(false)} className="text-gray-500">
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <TextField
                    label="Full Name"
                    value={stateData.details?.name}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="!mb-3"
                  />
                  <TextField
                    label="Email"
                    value={stateData?.details.email}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="!mb-3"
                  />
                  {selectedjob?.screeningQuestions &&
                    selectedjob.screeningQuestions.length > 0 && (
                      <>
                        <Typography variant="body1" className="!font-bold !font-[Open_sans] text-gray-800 !mb-2">
                          Screening Questions
                        </Typography>
                        {selectedjob.screeningQuestions.map((q, index) => (
                          <TextField
                            key={index}
                            label={q}
                            value={screeningAnswers[index] || ""}
                            onChange={(e) =>
                              handleScreeningQuestionAnswerchange(index, e.target.value)
                            }
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="mb-3"
                          />
                        ))}
                      </>
                    )}
                  <div className="flex items-center gap-2 border p-3 rounded-xl mt-4 mb-4 cursor-pointer hover:bg-gray-50">
                    <FaFileUpload className="text-[#a78cdd]" />
                    <a
                      href={stateData.seekerInfo?.cv || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-800 font-[Open_sans] hover:underline truncate"
                    >
                      CV: {getFileName(stateData.seekerInfo?.cv) || "No CV uploaded"}
                    </a>
                  </div>
                  <Button
                    variant="contained"
                    onClick={handleApplySubmit}
                    className="!w-full !font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !py-3 !transition-all hover:scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                  >
                    Submit Application
                  </Button>
                </Box>
              </Modal>

              <Modal open={!!selectedCompany} onClose={() => setSelectedCompany(null)}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 max-h-[60vh] flex flex-col">
                  {selectedCompany && (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">
                          {selectedCompany.companyName}
                        </Typography>
                        <IconButton
                          onClick={() => setSelectedCompany(null)}
                          className="text-gray-500"
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div className="flex font-[Open_sans] items-center gap-3 pb-4 border-b border-gray-200/50">
                        <img
                          src={selectedCompany.user.photo?.url}
                          alt={selectedCompany.companyName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                        />
                        <div>
                          <Typography variant="body1" className="!font-[Open_sans] text-gray-800">
                            {selectedCompany.user.name}
                          </Typography>
                          <Typography variant="body1" className="!font-[Open_sans] text-gray-600 flex items-center !gap-1">
                            <FaUserTie className="text-[#a78cdd]" />
                            {selectedCompany.positionInCompany}
                          </Typography>
                        </div>
                      </div>
                      <Typography className="!font-semibold !font-[Open_sans] text-gray-800 !mt-4 !mb-2">
                        Jobs from this company
                      </Typography>
                      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                         <div className="space-y-2">

                        {selectedCompany.providerJobs.map((job) => (
                            <div
                            key={job._id}
                            onClick={() => handleToSelectJob(job)}
                            className="p-3 bg-white/60 rounded-xl cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-[#a78cdd] flex justify-between items-center"
                            >
                            <span className="text-sm font-[Open_sans] font-medium text-gray-800">
                              {job.title}
                            </span>
                            <span className="text-xs font-[Open_sans] text-gray-500">{job.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    </>
                  )}
                </Box>
              </Modal>
              
              <SwipeableDrawer
                anchor="left"
                open={openLeftDrawer}
                onClose={() => setOpenLeftDrawer(false)}
                disableBackdropTransition
                disableDiscovery
                PaperProps={{
                  sx: {
                    width: { xs: "100%", sm: 400, md: 500 },
                    borderRadius: "0 24px 24px 0",
                    background: "linear-gradient(to bottom, #faf8ff, #eee7ff, #dcd0ff)",
                    backdropFilter: "blur(16px)",
                    backgroundColor: "rgba(250, 248, 255, 0.8)",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "-10px 0 30px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b border-gray-200/50 flex justify-between items-center">
                    <Typography variant="h6" className="!font-bold !font-[Open_sans]  text-gray-800">
                      Edit Profile
                    </Typography>
                    <IconButton
                      onClick={() => setOpenLeftDrawer(false)}
                      className="text-gray-500"
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
          
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col items-center mb-6">
                      <ProfileAvatar
                        file={img?.url || profileImagePath}
                        onChange={handleImageChange}
                        className="w-28 h-28 !rounded-full border-4 border-white !shadow-xl"
                      />
                      <Typography variant="body1" className="!font-[Open_sans] text-gray-500 mt-2">
                        Click to change photo
                      </Typography>
                    </div>
          
                    <div className="bg-white/60 rounded-2xl p-4 mb-4 shadow-sm flex items-center justify-between">
                      <Typography className="!font-medium !font-[Open_sans] text-gray-700">
                        Update Account Info?
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showUserUpdateFields}
                            onChange={(e) => setShowUserUpdateFields(e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#a78cdd',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#a78cdd',
                              },
                            }}
                          />
                        }
                        label=""
                        className="!m-0"
                      />
                    </div>
                    {showUserUpdateFields ? (
                      <UpdateUserInfoForm
                        userData={stateUserdata}
                        onSubmit={handleUserInfoUpdate}
                      />
                    ) : (
                      <SeekerForm
                        initialData={{ s: stateData.seekerInfo, d: stateData.details }}
                        onFinish={handleUpdateSeekerProfile}
                        finishButtonLabel="Update Profile"
                      />
                    )}
                  </div>
                </div>
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