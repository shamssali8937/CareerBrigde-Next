"use client";
export const dynamic = "force-dynamic";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/layouts/Layout";
import TextInput from "@/components/TextInput";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { Button } from "@mui/material";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetails, setEmail, setRole, setSeekerInfo } from "@/redux/slices/signupSlice";
import { setProviderDetail, setUser } from "@/redux/slices/userDetailSlice";

function SigninContent() {
  const searchParams = useSearchParams();
  const [opensnackbar, setopensackbar] = useState(false);
  const [snackbarmessage, setsnackbarmessage] = useState("");
  const [snackbarseverity, setsnackbarseverity] = useState("success");

  const dispatch = useDispatch();
  const router = useRouter();
  const reduxSignupData = useSelector((state) => state.signup);

  const [data, setData] = useState({
    email: reduxSignupData.email || "",
    password: "",
  });

  const handleFieldDataChange = (e) => {
    const { name, value } = e.target;
    setData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const [clicked, setClicked] = useState({
    email: false,
    password: false,
  });

  const handlesignin = async (e) => {
    e.preventDefault();

    setClicked({
      email: true,
      password: true,
    });

    if (!data.email || !data.password) {
      setsnackbarmessage("Please fill all required fields");
      setsnackbarseverity("error");
      setopensackbar(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setsnackbarmessage(result.message || "Login failed");
        setsnackbarseverity("error");
        setopensackbar(true);
        return;
      }

      if (!result.AccessToken || !result.User) {
        setsnackbarmessage(result.message || "Invalid response from server");
        setsnackbarseverity("error");
        setopensackbar(true);
        return;
      }

      localStorage.setItem("token", result.AccessToken);
      dispatch(setEmail(data.email));
      dispatch(setRole(result.User.role));
      dispatch(setUser(result.User));
      dispatch(setDetails(result.User));
      setsnackbarmessage(`Welcome back!`);
      setsnackbarseverity("success");
      setopensackbar(true);

      const token = result.AccessToken;
      if (result.User.role === "jobseeker") {
        try {
          const providerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetSeekerProfile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const seekerData = await providerRes.json();
          if (providerRes.ok && seekerData?.data?.seeker) {
            dispatch(setSeekerInfo(seekerData.data.seeker));
          }
        } catch (err) {
          console.log("Seeker profile fetch error:", err);
        }

        router.push("/Seeker/HomePage");
      } else {
        try {
          const providerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetProviderProfile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const providerData = await providerRes.json();
          if (providerRes.ok && providerData?.data?.provider) {
            dispatch(setProviderDetail(providerData.data.provider));
          }
        } catch (err) {
          console.log("Provider fetch error:", err);
        }

        router.push("/Provider/HomePage");
      }
    } catch (err) {
      console.log(err);
      setsnackbarmessage(err.message || "An error occurred while signing in");
      setsnackbarseverity("error");
      setopensackbar(true);
    }
  };

  const sendOtpToEmail = async () => {
    try {
      const email = data.email;
      if (!email) {
        setsnackbarmessage("Please enter your email first");
        setsnackbarseverity("error");
        setopensackbar(true);
        return;
      }

      dispatch(setEmail(email));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        let result = await response.json();
        const { forgotToken, message } = result;
        const otp = message;

        localStorage.setItem("forgetToken", forgotToken);

        const mailMessage = {
          to: email,
          subject: "Password Reset OTP – Action Required",
          message: `Dear User,\n\nWe received a request to reset the password for your account.\n\nPlease use the following One-Time Password (OTP) to proceed with resetting your password:\n\nOTP: ${otp}\n\nThis OTP is valid for the next 5 minutes.\nDo not share this code with anyone for security reasons.\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nCareerBridge Support Team`,
        };

        const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SendMail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailMessage),
        });

        if (mailResponse.ok) {
          let token = localStorage.getItem("forgetToken");
          setsnackbarmessage("OTP sent to your email");
          setsnackbarseverity("success");
          setopensackbar(true);
          router.push(`/Auth/ForgotPassword?${token}`);
        } else {
          setsnackbarmessage("Error sending OTP email");
          setsnackbarseverity("error");
          setopensackbar(true);
        }
      } else {
        throw new Error("Failed to generate OTP");
      }
    } catch (err) {
      console.log("OTP mail error:", err);
      setsnackbarmessage("Failed to send OTP. Please try again.");
      setsnackbarseverity("error");
      setopensackbar(true);
    }
  };

  const handlegooglelogin = () => {
    document.cookie = `oauth_type=login; path=/; max-age=300`;
    signIn("google", {
      callbackUrl: "/Auth/OAuthRedirectPage",
    });
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "AccessDenied") {
      setsnackbarmessage("Account not found. Please sign up first!");
      setsnackbarseverity("error");
      setopensackbar(true);
    }

    if (error === "UseEmail") {
      setsnackbarmessage("This email is already registered. Please sign in with your email and password.");
      setsnackbarseverity("warning");
      setopensackbar(true);
    }
  }, [searchParams]);

  return (
    <Layout rightImage="/login.svg">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to your CareerBridge account
          </p>
        </div>

        <form onSubmit={handlesignin} className="w-full flex flex-col gap-2">
          <TextInput
            label="Email Address"
            type="email"
            name="email"
            value={data.email}
            onChange={handleFieldDataChange}
            required
            error={clicked.email && !data.email}
            helperText={clicked.email && !data.email ? "Please enter email" : ""}
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            value={data.password}
            required
            onChange={handleFieldDataChange}
            error={clicked.password && !data.password}
            helperText={clicked.password && !data.password ? "Password is required" : ""}
          />

          <div className="flex justify-end mt-1 mb-2">
            <button
              type="button"
              onClick={sendOtpToEmail}
              className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={handlesignin}
            sx={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                boxShadow: "0 6px 20px 0 rgba(79, 70, 229, 0.4)",
              },
            }}
          >
            Sign In
          </Button>
        </form>

        <div className="w-full flex items-center my-4">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium uppercase tracking-wider">or</span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <Button
          variant="outlined"
          fullWidth
          startIcon={
            <img
              src="/google.svg"
              alt="Google Logo"
              style={{ width: 18, height: 18 }}
            />
          }
          onClick={handlegooglelogin}
          sx={{
            textTransform: "none",
            borderColor: "#e2e8f0",
            color: "#334155",
            borderRadius: "12px",
            py: 1.2,
            fontSize: "14px",
            fontWeight: 500,
            "&:hover": {
              borderColor: "#cbd5e1",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Continue with Google
        </Button>

        <p className="text-center mt-6 text-sm text-slate-600 font-medium">
          Don't have an account?{" "}
          <Link href="/Auth/Signup" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
            Sign up
          </Link>
        </p>

        <CustomizedSnackbars
          open={opensnackbar}
          message={snackbarmessage}
          severity={snackbarseverity}
          onClose={() => setopensackbar(false)}
        />
      </div>
    </Layout>
  );
}

export default function Signin() {
  return (
    <Suspense fallback={null}>
      <SigninContent />
    </Suspense>
  );
}