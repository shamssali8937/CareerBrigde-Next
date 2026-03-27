"use client"
import Navbar from "@/components/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Drawer, FormControlLabel, IconButton, MenuItem, Modal, Skeleton, Stack, Switch, TextField, Typography } from "@mui/material";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaChevronRight, FaClock, FaEdit, FaGlobe, FaInfoCircle, FaListUl, FaMapMarkedAlt, FaMoneyBillAlt, FaPhoneAlt, FaUsers, FaUserTie } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import { ExpandMore } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import UpdateUserInfoForm from "@/components/UpdateUserInfoForm";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProviderForm from "@/components/ProviderForm";
import { setProviderDetail, setUser } from "@/redux/slices/userDetailSlice";
import { setDetails, setProviderInfo, setRole } from "@/redux/slices/signupSlice";

export default function HomePage() {

  const stateData = useSelector((state)=>state.signup);
  const stateUserdata = useSelector((state) => state.userDetail.user);
  const stateProviderData = useSelector((state) => state.userDetail.provider);
  const dispatch = useDispatch();
  
  const imagePath = stateData.photo?.url || stateUserdata.photo?.url;
  const [ jobDetail, setJobDetail] = useState({
    title: "",
    jobType: "Remote",
    location: "",
    salary: "",
    postDate: "",
    lastDate: "",
    description: "",
  });
  const [ userimg, setuserimg ] = useState(null);
  const [ showUserUpdateFields, setShowUserUpdateFields ] = useState(true);
  const [ screeningQuestions, setScreeningQuestions ] = useState([]);
  const [ newRequirement, setNewRequirement ] = useState("");
  const [ requirements, setRequirements ] = useState([]);
  const [ newScreeningQues, setNewScreeningQues ] = useState("");
  const [ jobToEdit, setJobToEdit ] = useState(null);
  const [ clicked, setClicked ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ jobs, setJobs ] = useState([]);
  const [ expanded, setExpanded ] = useState(false);
  const [ openPostJobPopUp, setOpenPostJobPopUp] = useState(false);
  const [ openRightDrawer, setOpenRightDrawer] = useState(false);
  const [ openLeftDrawer, setOpenLeftDrawer] = useState(false);

  


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");



  const handlesAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
    setJobDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileEditButton=() => setOpenLeftDrawer(true);

  const handleImageChange = (file) => {
    setuserimg({ file, url: URL.createObjectURL(file) });
  };


  const addRequirements = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const addScreeningQues = () => {
    if (newScreeningQues.trim()) {
      setScreeningQuestions([...screeningQuestions, newScreeningQues.trim()]);
      setNewScreeningQues("");
    }
  };

  const removeScreeningQues = (question) => {
    setScreeningQuestions(screeningQuestions.filter((q) => q !== question));
  };

  const removeRequirements = (req) => {
    setRequirements(requirements.filter((r) => r !== req));
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const deleteJob = (job) => {
    setJobs((prev) => prev.filter((j) => j._id !== job._id));
    setSnackbarMessage("Job deleted");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };
  
  const handleUserInfoUpdate = async (formData) => {
    console.log("Update user info:", formData);
    setSnackbarMessage("User info updated (mock)");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setopendrawerleft(false);
  };
  
  const handleJobPostPopup = (job = null) => {
    if (job) {
      setJobToEdit(job);
      setJobDetail(job);
      setRequirements(job.requirements || []);
      setScreeningQuestions(job.screeningQuestions || []);
    } else {
      setJobToEdit(null);
      setJobDetail({
        title: "",
        jobType: "Remote",
        location: "",
        salary: "",
        postDate: "",
        lastDate: "",
        description: "",
      });
      setRequirements([]);
      setScreeningQuestions([]);
      setClicked({});
    }
    setOpenPostJobPopUp(true);
  };

  const handleJobPosting = () => {
    setClicked({
      title: true,
      location: true,
      postDate: true,
      lastDate: true,
      description: true,
      requirements: true,
    });
    if (
      jobDetail.title &&
      jobDetail.location &&
      jobDetail.postDate &&
      jobDetail.lastDate &&
      jobDetail.description &&
      requirements.length >= 3
    ) {
      if (jobToEdit) {
        // editJobInDb(editingjob);
        setJobs((prev) =>
          prev.map((j) => (j._id === jobToEdit._id ? { ...j,...jobDetail, requirements, screeningQuestions } : j))
        );
        setSnackbarMessage("Job edited");
      } else {
        const newJob = {
          _id: Date.now().toString(),
          ...jobDetail,
          requirements,
          screeningQuestions,
          provider: { companyname: stateProviderData.companyname, user: { name: stateUserdata.name, photo: null } },
        };
        setJobs((prev) => [...prev, newJob]);
        setSnackbarMessage("Job posted");
      }
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenPostJobPopUp(false)
    }
  };
  

     const updateProviderProfile =async (data) => {
         try {
             const provider={
             contact: data.companycontact,
             companyName:data.comapnyname,
             goalOfCompany:data.goalofcompany,
             address: data.addressofcompany,
             positionInCompany: data.position,
             tenureInTimePeriod:data.tenuretimeperiod,
             aboutCompany:data.aboutcompany
             }
             console.log("before post",provider);
             const token=localStorage.getItem("token");

             const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateProvider`,{
                 method:"POST",
                 headers:{
                  "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`,
                 },
                 body:JSON.stringify(provider)
                }
              );
             if (response.ok) {
               const result= await response.json();
              //  console.log("Profile updated", response.data);
               dispatch(setProviderInfo(data));
              if(userimg!==null){
                const User = new FormData();
                User.append("photo", userimg.file);
                const userUpdateResponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateUser`,{
                 method:"PUT",
                 headers:{
                   Authorization: `Bearer ${token}`,
                 },
                 body:User
                });
                  if(userUpdateResponse.ok){
                     console.log("photo is also updated");
                  }
                }
                 dispatch(setDetails({
                    ...stateData.details,
                    img: userimg.url || stateData.details.img,
                  }));
                setSnackbarMessage("Profile updated successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setOpenLeftDrawer(false);
             } else {
               console.log("Error in profile updation");
               setSnackbarMessage("Profile updation Unsuccessfull!");
               setSnackbarSeverity("error");
               setSnackbarOpen(true);
               setOpenLeftDrawer(false);
             }
           } catch (err) {
             console.log("error in fetching:", err);
           }
      };


  const fetchJobsFromDb=async(e)=>{  ///fetching the jobs of specific user and set jobs object
     try{

          setLoading(true);
 
          const token=localStorage.getItem("token");

          const response=await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetJobsOfSpecificProvider`,{
             method:"GET",
             headers:{
               Authorization: `Bearer ${token}`,
             }
            }
          );
          const result= await response.json();
          if(response.ok)
          {
            //  console.log("job",response.data.jobsOfSpecificProvider)
            setJobs(result.data.jobs);
          }else{
            console.log("error",response.status);
          }

      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    };

    const fetchProviderDetailFromDb=async()=>{
      try{
          const token=localStorage.getItem("token");

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetProviderProfile`,{
             method:"GET",
             headers:{
               Authorization: `Bearer ${token}`,
             }
            }
          );
          const providerData= await response.json();
          if(response.ok)
          {
            console.log("provider",providerData.data.provider);
             dispatch(setProviderDetail(providerData.data.provider));
             dispatch(setRole(providerData.data.provider.user.role))
             dispatch(setUser(providerData.data.provider.user))

          }else{
            console.log("error",providerData.message);
          }

      }catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{
      fetchProviderDetailFromDb();
      if(!stateProviderData){
          return;
      }
      else{
           fetchJobsFromDb();
      }
    },[])

    useEffect(()=>{
       fetchProviderDetailFromDb();
    },[openLeftDrawer])

  return (
    <>
    <Navbar/>

    <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] backdrop-blur-sm pt-20 pb-10 px-4 sm:px-6 lg:px-8 font-[Open_sans]">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 mt-2 gap-6">
              <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                 <Card className="!rounded-3xl !shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
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
                        {stateProviderData?.tenureInTimePeriod || "2020 - Present"}
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
                        onClick={handleProfileEditButton}
                        className="bg-indigo-600 hover:bg-indigo text-white text-xs rounded-full px-6 py-2 transition-all hover:scale-105 shadow-md"
                        >  
                        Edit Profile
                        </Button>
                    </CardActions> 
                 </Card> 
                 <Card className="!rounded-3xl !shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md">
                   <CardContent className="!p-4">
                     <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-indigo-100 rounded-xl">
                         <FaBuilding className="text-indigo-600 text-xl" />
                       </div>
                       <Typography
                         variant="h6"
                         className="!font-bold !font-[Open_sans] text-gray-800"
                       >
                         {stateProviderData?.companyName || "TechCorp Solutions"}
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
                        onClick={handleProfileEditButton}
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
                    onClick={()=>handleJobPostPopup()}
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
                              onClick={()=>{
                                  setJobToEdit(job);
                                  setOpenRightDrawer(true);    
                              }}
                              className="!font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                              >
                              Details
                              </Button>
                              <Button 
                                variant="contained" 
                                color="error"
                                size="small"
                                startIcon={<Delete />} 
                                onClick={() => deleteJob(job)}
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
              <div className="lg:col-span-3 hidden lg:block space-y-6 sticky top-24 self-start">
                  <Card className="!rounded-3xl shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md p-6 sticky top-24">
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

                  <Card variant="h6" className="!rounded-3xl !shadow-xl border-0 overflow-hidden bg-white/70 backdrop-blur-md !p-6 sticky">
                    <Typography className="!text-gray-800 !font-bold !font-[Open_sans] text-lg !mb-3 flex items-center !gap-2">
                      <FaUsers className="text-[#a78cdd]" />
                      Quick Stats
                    </Typography>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active jobs:</span>
                        <span className="font-semibold">{jobs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total applicants:</span>
                        <span className="font-[Open_sans]">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profile views:</span>
                        <span className="font-[Open_sans]">142</span>
                      </div>
                    </div>
                  </Card>
              </div>
           </div>
        </div>
    </div>

    <Modal open={openPostJobPopUp} onClose={()=>setOpenPostJobPopUp(false)}>
       <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[95%] max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl !shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
           <div className="flex justify-between items-center mb-5">
                    <Typography variant="h6" className="!font-bold !font-sans text-gray-800">
                    {jobToEdit ? "Edit Job" : "Post a New Job"}
                  </Typography>
                  <IconButton onClick={() => setOpenPostJobPopUp(false)} className="text-gray-500">
                    <CloseIcon />
                  </IconButton>
             </div>
             <div className="space-y-4">
                <TextField
                  name="title"
                  label="Job Title"
                  size="small"
                  onChange={handleChange}
                  value={jobDetail.title}
                  fullWidth
                  error={clicked.title && !jobDetail.title}
                  helperText={clicked.title && !jobDetail.title ? "Title is required" : ""}
                  className="!mb-2"
                />
                <TextField
                  name="jobType"
                  label="Job Type"
                  select
                  size="small"
                  onChange={handleChange}
                  value={jobDetail.jobType}
                  fullWidth
                  className="!mb-2"
                >
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </TextField>
                <TextField
                  name="location"
                  label="Location"
                  size="small"
                  onChange={handleChange}
                  value={jobDetail.location}
                  fullWidth
                  error={clicked.location && !jobDetail.location}
                  helperText={clicked.location && !jobDetail.location ? "Location is required" : ""}
                  className="!mb-2"
                />
                <TextField
                  name="salary"
                  label="Salary (e.g., $80k - $100k)"
                  size="small"
                  onChange={handleChange}
                  value={jobDetail.salary}
                  fullWidth
                  className="!mb-2"
                />
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  size="small"
                  onChange={handleChange}
                  value={jobDetail.description}
                  fullWidth
                  error={clicked.description && !jobDetail.description}
                  helperText={clicked.description && !jobDetail.description ? "Description is required" : ""}
                  className="!mb-2"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <TextField
                    name="postDate"
                    label="Post Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    value={formatDateForInput(jobDetail.postDate)}
                    fullWidth
                    error={clicked.postDate && !jobDetail.postDate}
                    helperText={clicked.postDate && !jobDetail.postDate ? "Post date required" : ""}
                  />
                  <TextField
                    name="lastDate"
                    label="Last Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    value={formatDateForInput(jobDetail.lastDate)}
                    fullWidth
                    error={clicked.lastDate && !jobDetail.lastDate}
                    helperText={clicked.lastDate && !jobDetail.lastDate ? "Last date required" : ""}
                  />
                </div>
                {/* Requirements */}
                <div>
                  <Typography className="text-sm font-medium !mb-2 text-gray-700">
                    Requirements <span className="text-gray-400">(min 3)</span>
                  </Typography>
                  <div className="flex gap-2 mb-2">
                    <TextField
                      size="small"
                      fullWidth
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="e.g., 5+ years React"
                    />
                    <IconButton onClick={addRequirements} className="bg-indigo-100 text-indigo-700">
                      <AddIcon />
                    </IconButton>
                  </div>
                  {clicked.requirements && requirements.length < 3 && (
                    <p className="text-rose-500 text-sm mb-2">Please add at least 3 requirements</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {requirements.map((req, idx) => (
                      <Chip
                        key={idx}
                        label={req}
                        onDelete={() => removeRequirements(req)}
                        deleteIcon={<DeleteIcon />}
                        className="bg-indigo-50 text-indigo-700 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                {/* Screening Questions */}
                <div>
                  <Typography className="text-sm font-medium mb-2 text-gray-700">
                    Screening Questions (optional)
                  </Typography>
                  <div className="flex gap-2 mb-2">
                    <TextField
                      size="small"
                      fullWidth
                      value={newScreeningQues}
                      onChange={(e) => setNewScreeningQues(e.target.value)}
                      placeholder="e.g., Why do you want to work here?"
                    />
                    <IconButton onClick={addScreeningQues} className="bg-purple-100 text-purple-700">
                      <AddIcon />
                    </IconButton>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {screeningQuestions.map((q, idx) => (
                      <Chip
                        key={idx}
                        label={q}
                        onDelete={() => removeScreeningQues(q)}
                        deleteIcon={<DeleteIcon />}
                        className="bg-purple-50 text-purple-700 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <Button
                  variant="contained"
                  onClick={handleJobPosting}
                  className="w-full !font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
                >
                  {jobToEdit ? "Save Changes" : "Post Job"}
                </Button>
           </div>
       </Box>
    </Modal>

    <Drawer 
      anchor="right"
      open={openRightDrawer}
      onClose={()=>setOpenRightDrawer(false)}
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
      {
        jobToEdit && (
          <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200/50 flex justify-between items center">
                <Typography variant="h6" className="!font-bold !font-[Open_sans] text-gray-800">Job Details</Typography>
                <IconButton onClick={()=>setOpenRightDrawer(false)} className="text-gray-500">
                   <CloseIcon/>
                </IconButton>
              </div>  
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="flex items-center gap-4">
                   <img
                   src={imagePath || "/iconbridge.jpg"}
                   alt="Job Provider Image"
                   className="w-16 h-16 rounded-full object-cover-border-2 border-white shadow-lg"
                   />
                   <div>
                     <Typography className="!font-bold !font-[Open_sans]  !text-gray-800">{jobToEdit.provider?.companyName}</Typography>
                     <Typography variant="body2" className="text-gray-600 flex items-center gap-1 !font-[Open_sans]">
                       <FaUserTie className="text-[#a78cdd]"/>
                       {jobToEdit.provider?.user.name}
                     </Typography>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm font-[Open_sans]">
                {jobToEdit.salary && (
                  <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
                    <FaMoneyBillAlt className="text-emerald-500" />
                    <span className="font-medium ">Salary:</span> {jobToEdit.salary}
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
                  <FaCalendarAlt className="text-amber-500" />
                  <span className="font-medium">Posted:</span>{" "}
                  {formatDateForInput(jobToEdit.postDate)}
                </div>
                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
                  <FaCalendarAlt className="text-rose-500" />
                  <span className="font-medium">Last Date:</span>{" "}
                  {formatDateForInput(jobToEdit.lastDate)}
                </div>
                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
                  <FaMapMarkedAlt className="text-indigo-500" />
                  <span className="font-medium">Location:</span> {jobToEdit.location}
                </div>
                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
                  <FaClock className="text-emerald-500" />
                  <span className="font-medium">Type:</span> {jobToEdit.jobType}
                </div>
              </div>

              <div>
                <Typography className="!font-[Open_sans] !font-bold text-gray-800 !mb-3 flex items-center gap-2">
                  <FaListUl className="text-purple-600" /> Requirements
                </Typography>
                <ul className="font-[Open_sans] list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                  {jobToEdit.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {jobToEdit.screeningQuestions?.length > 0 && (
                <div>
                  <Typography className="!font-[Open_sans] !font-bold text-gray-800 !mb-3 flex items-center gap-2">
                    <FaListUl className="text-purple-600" />
                    Screening Questions
                  </Typography>
                  <ul className="font-[Open_sans] list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                    {jobToEdit.screeningQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <Typography className="!font-[Open_sans] !font-bold text-gray-800 !mb-3 flex items-center gap-2">
                  <MdDescription size={22} className="text-purple-600"/>
                  Job Description
                </Typography>
                <Typography className="!font-[Open_sans] text-sm text-gray-700 leading-relaxed">
                  {jobToEdit.description}
                </Typography>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200/50">
              <Button
                variant="outlined"
                startIcon={<FaEdit />}
                onClick={() => {
                  setOpenRightDrawer(false);
                  handleJobPostPopup(jobToEdit);
                }}
                className="w-full !font-[Open_Sans] !bg-[#a78cdd] hover:!bg-[#8e6fc5] !text-white !rounded-full !px-6 !py-2 !text-sm  !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
              >
                Edit This Job
              </Button>
              </div>
          </div>
        )
      }
    </Drawer>

    <Drawer
        anchor="left"
        open={openLeftDrawer}
        onClose={() => setOpenLeftDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 500 },
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
            <Typography variant="h6" className="!font-bold !font-sans text-gray-800">
              Edit Profile
            </Typography>
            <IconButton onClick={() => setOpenLeftDrawer(false)} className="text-gray-500">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center mb-8">
              <ProfileAvatar
                file={imagePath || userimg?.url}
                onChange={handleImageChange}
                className="w-28 h-28 rounded-full border-4 border-white shadow-xl"
              />
              <Typography variant="body2" className="!font-[Open_sans] text-gray-500 mt-2">
                Click to change photo
              </Typography>
            </div>

            <div className="bg-white/60 rounded-2xl p-4 mb-4 shadow-sm flex items-center justify-between">
              <Typography className="!font-[Open_sans] text-gray-700">
                Update Account Info?
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={showUserUpdateFields}
                    onChange={(e) => setShowUserUpdateFields(e.target.checked)}
                    color="secondary"
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
              <ProviderForm
                finishLabel="Update Profile"
                finishPath="/Provider/HomePage"
                onFinish={updateProviderProfile}
              />
            )}
          </div>
        </div>
      </Drawer>


      <CustomizedSnackbars
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />

    </>
  );
}