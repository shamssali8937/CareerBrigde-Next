"use client";

import Layout from "@/layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setDetails,setSeekerInfo } from "@/redux/slices/signupSlice";
import SeekerForm from "@/components/SeekerForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setSeekerDetail } from "@/redux/slices/userDetailSlice";
// import { setSeekerDetail } from "../../../Redux/Slice/userDetailSlice";
// import axios from "axios";

function SignUpSeeker() {
  const dispatch = useDispatch();
  const statedata = useSelector((state) => state.signup);
  const [data, setData] = useState({});
  const router = useRouter();

  const handleFinish = async (formData) => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      console.log("token", token);
      const formPayload = new FormData();

      formPayload.append("headline", formData.headline || "");
      formPayload.append("about", formData.about || "");
      formPayload.append("address", formData.address || "");
      formPayload.append("city", formData.city || "");
      formPayload.append("phone", formData.phone || "");
      formPayload.append("country", formData.country || "");
      formPayload.append("skills", JSON.stringify(formData.skills || []));
      formPayload.append("education", JSON.stringify(formData.education || []));
      formPayload.append("experience", JSON.stringify(formData.experience || []));
      formPayload.append("SocialLinks", JSON.stringify(formData.socialLinks || []));
      if (formData.cv?.file instanceof File) {
        formPayload.append("cv", formData.cv.file);
      } else if (formData.cv instanceof File) {
        formPayload.append("cv", formData.cv);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateSeeker`,{
        method:"POST",
        headers:{
          Authorization: `Bearer ${token}`,
        },
        body:formPayload
      });

      const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Update failed");
        }
    
        console.log("✅ Seeker Updated:", result.data);
        dispatch(setSeekerDetail(result.data));
        dispatch(setSeekerInfo(result.data));
    
        router.push("/Auth/Signin");
    } catch (err) {
      console.log(err);
    }

    dispatch(setDetails({ ...statedata.details }));

    dispatch(
      setSeekerInfo({
        headline: formData.headline,
        city: formData.city,
        address: formData.address,
        about: formData.about,
        phone: formData.phone,
        country: formData.country,
        skills: formData.skills,
        education: formData.education,
        experience: formData.experience,
        socialLinks: formData.socialLinks,
        cv: formData.cv.url,
      })
    );
  };

  return (
    <Layout rightImage="/login.svg" wide={true}>
      <div className="w-full flex flex-col">
        <SeekerForm
          initialData={{
            s: statedata.seekerInfo,
            d: statedata.details,
          }}
          onFinish={handleFinish}
          backButtonPath="/Auth/SignupDetail"
          backButtonLabel="Back"
          finishButtonLabel="Finish"
        />
      </div>
    </Layout>
  );
}

export default SignUpSeeker;