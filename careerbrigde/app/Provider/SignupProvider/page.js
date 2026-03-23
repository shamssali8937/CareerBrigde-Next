"use client"
import Layout from "@/layouts/Layout";
import ProviderForm from "@/components/ProviderForm";
import { useDispatch } from "react-redux";
import { setProviderInfo } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";
// import axios from "axios";

function SignUpProvider() {
  const dispatch = useDispatch();
  const router=useRouter();

  const handleFinish = async (data) => {
//    const token = localStorage.getItem("accessToken");
//     console.log(token);
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }

//   try {
//     const provider={
//     contact: data.companycontact,
//     companyname:data.comapnyname,
//     goalOfCompany:data.goalofcompany,
//     address: data.addressofcompany,
//     positionInCompany: data.position,
//     tenureTimePeriod:data.tenuretimeperiod,
//     aboutCompany:data.aboutcompany
//     }
//     console.log("before post",provider);
//     const response = await axios.post("http://localhost:4321/api/auth/updateProvider",provider);
//     if (response.status === 200) {
//       console.log("Profile updated", response.data);
//       dispatch(setProviderInfo(data));
//       navigate("/signin")
//     } else {
//       console.log("Error in profile updation");
//     }
//   } catch (err) {
//     console.log("Axios error:", err);
//   }
    dispatch(setProviderInfo(data));
    console.log("Final provider data:", data);
  };

  return (
    <Layout rightImage="/login.svg">
      <div className="w-full min-h-screen flex items-center justify-center bg-[#faf4ff] p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <ProviderForm
            backPath="/Auth/SignupDetail"
            finishPath="/Auth/Signin"
            backLabel="Back"
            finishLabel="Finish"
            onFinish={handleFinish}
          />
        </div>
      </div>
    </Layout>
  );
}

export default SignUpProvider;
