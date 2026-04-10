"use client"
import Layout from "@/layouts/Layout";
import ProviderForm from "@/components/ProviderForm";
import { useDispatch } from "react-redux";
import { setProviderInfo } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";
import { fetchData } from "next-auth/client/_utils";
import { setProviderDetail } from "@/redux/slices/userDetailSlice";

function SignUpProvider() {
  const dispatch = useDispatch();
  const router=useRouter();

  const handleFinish = async (data) => {
   const token = localStorage.getItem("accessToken");
    console.log(token);

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/UpdateProvider`,{
      method:"POST",
      headers:{
         Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(provider),
    });

    const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Update failed");
        }
    
        console.log("✅ Provider Updated:", result.data);
        dispatch(setProviderDetail(result.data));
        dispatch(setProviderInfo(result.data));
        if(response.status===200)
          {
             router.push("/Auth/Signin");
          }else
            {
              throw new Error(result.message || "Update failed");
            }    
        
   
  } catch (err) {
    console.log("error in fetching:", err);
  }
    console.log("Final provider data:", data);
  };

  return (
    <Layout rightImage="/login.svg">
      <div className="w-full min-h-screen bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff] flex items-center justify-center bg-[#faf4ff] p-4 md:p-8">
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
