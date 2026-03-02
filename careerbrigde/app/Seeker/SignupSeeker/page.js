"use client";

import Layout from "@/layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setDetails,setSeekerInfo } from "@/redux/slices/signupSlice";
import SeekerForm from "@/components/SeekerForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { setSeekerDetail } from "../../../Redux/Slice/userDetailSlice";
// import axios from "axios";

function SignUpSeeker() {
  const dispatch = useDispatch();
  const statedata = useSelector((state) => state.signup);
  const [data, setData] = useState({});
  const router = useRouter();

  const handleFinish = async (formData) => {
    // try {
    //   const token = localStorage.getItem("accessToken");

    //   axios.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer ${token}`;

    //   const formPayload = new FormData();

    //   formPayload.append("headline", formData.headline);
    //   formPayload.append("about", formData.about);
    //   formPayload.append("address", formData.address);
    //   formPayload.append("city", formData.city);
    //   formPayload.append("phone", formData.phone);
    //   formPayload.append("country", formData.country);
    //   formPayload.append("skills", JSON.stringify(formData.skills));
    //   formPayload.append("education", JSON.stringify(formData.education));
    //   formPayload.append("experience", JSON.stringify(formData.experience));
    //   formPayload.append("SocialLinks", JSON.stringify(formData.socialLinks));
    //   formPayload.append("cv", formData.cv.file);

    //   const response = await axios.post(
    //     "http://localhost:4321/api/auth/seekerUpdate",
    //     formPayload
    //   );

    //   if (response.status === 200) {
    //     dispatch(setSeekerDetail(response.data.seeker));
    //     setData(response.data.seeker);

    //     console.log("Seeker Updated", response.data.seeker);

    //     router.push("/signin"); // ✅ Next.js navigation
    //   } else {
    //     console.log("error", response.status);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

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
        cv: formData.cv.name,
      })
    );
  };

  return (
    <Layout rightImage="/login.svg">
      <div className="w-full h-screen flex flex-col bg-[#faf4ff] p-4 md:p-8 overflow-y-auto">
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