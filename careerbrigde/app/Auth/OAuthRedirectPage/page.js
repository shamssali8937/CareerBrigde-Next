"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setRole } from "@/redux/slices/signupSlice";

export default function OAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch=useDispatch();

  useEffect(() => {
     console.log("Status:", status);
  console.log("Session:", session);
  console.log("Role:", session?.user?.role);
    if (status === "loading") return;

    if (!session) {
      router.push("/Auth/Signin");
      return;
    }

    const role = session.user.role;
    console.log("seesion",role);
    dispatch(setRole(role));
    if (role === "jobseeker" || role=== "seeker") {
        
      router.replace("/Seeker/HomePage");
    } else if (role === "jobprovider" || role=== "provider") {
      router.replace("/Provider/HomePage");
    } else {
      router.replace("/Home");
    }
  }, [session, status, router]);

  return <p className="text-center mt-10">Signing you in...</p>;
}