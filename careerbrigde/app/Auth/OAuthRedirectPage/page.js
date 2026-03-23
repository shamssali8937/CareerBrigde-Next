"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/Auth/Signin");
      return;
    }

    const role = session.user.role;

    if (role === "jobseeker" || "seeker") {
      router.replace("/Seeker/HomePage");
    } else if (role === "jobprovider" || "seeker") {
      router.replace("/Provider/HomePage");
    } else {
      router.replace("/Home");
    }
  }, [session, status, router]);

  return <p className="text-center mt-10">Signing you in...</p>;
}