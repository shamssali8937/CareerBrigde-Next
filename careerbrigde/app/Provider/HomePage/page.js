"use client"
import Navbar from "@/components/Navbar";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaEdit, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function HomePage() {

  const stateData = useSelector((state)=>state.signup);
  const stateUserdata = useSelector((state) => state.userDetail.user);
  const stateProviderData = useSelector((state) => state.userDetail.provider);
  const dispatch = useDispatch();
  
  const imagePath = stateData.photo?.url || "https://res.cloudinary.com/dj0mkrv8f/image/upload/v1770986917/user_uploads/nilvruogrdogvzk5zlof.jpg"


  const handleEditButton=()=>{
    console.log("editbutton open")
  }

  return (
    <>
    <Navbar/>

    <div className="min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] backdrop-blur-sm pt-20 pb-10 px-4 sm:px-6 lg:px-8 font-[Open_sans]">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 mt-2 gap-6">
              <div className="lg:col-span-3 space-y-6">
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
           </div>
        </div>
    </div>
    </>
  );
}