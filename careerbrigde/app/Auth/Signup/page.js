"use client";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import TextInput from "@/components/TextInput";
import Layout from "@/layouts/Layout";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setRole } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";
import { FaUserGraduate, FaBuilding, FaCheckCircle } from "react-icons/fa";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const reduxSignupData = useSelector((state) => state.signup);

  const [data, setData] = useState({
    email: reduxSignupData.email || "",
    role: reduxSignupData.role || "jobseeker",
  });

  const [clicked, setClicked] = useState({});
  const [opensnackbar, setopensackbar] = useState(false);
  const [snackbarmessage, setsnackbarmessage] = useState("");
  const [snackbarseverity, setsnackbarseverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (selectedRole) => {
    setData((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setClicked({ email: true, role: true });

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

    if (!data.email || !data.role || !emailValid) {
      setsnackbarmessage("Please enter a valid email address and select your role");
      setsnackbarseverity("error");
      setopensackbar(true);
      return;
    }
    dispatch(setEmail(data.email));
    dispatch(setRole(data.role));
    router.push("/Auth/SignupDetail");
  };

  const handleGoogleSignup = (e) => {
    e.preventDefault();
    if (!data.role) {
      setsnackbarmessage("Please select your role first");
      setsnackbarseverity("error");
      setopensackbar(true);
      return;
    }
    document.cookie = `oauth_type=signup; path=/; max-age=300`;
    document.cookie = `oauth_role=${data.role}; path=/; max-age=300`;

    signIn("google", {
      callbackUrl: "/Auth/Signin",
    });

    dispatch(setRole(data.role));
    setsnackbarmessage("Redirecting to Google...");
    setsnackbarseverity("success");
    setopensackbar(true);
  };

  return (
    <Layout rightImage="/login.svg">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Join CareerBridge and take the next step
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            value={data.email}
            required
            onChange={handleChange}
            error={clicked.email && !data.email}
            helperText={clicked.email && !data.email ? "Please enter a valid email" : ""}
          />

          {/* Modern Interactive Role Selection Cards */}
          <div className="w-full my-2">
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Job Seeker Card */}
              <div
                onClick={() => handleRoleSelect("jobseeker")}
                className={`relative p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                  data.role === "jobseeker"
                    ? "border-indigo-600 bg-indigo-50/60 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {data.role === "jobseeker" && (
                  <FaCheckCircle className="absolute top-2.5 right-2.5 text-indigo-600 text-xs" />
                )}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                  data.role === "jobseeker" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  <FaUserGraduate className="text-sm" />
                </div>
                <span className="font-semibold text-xs text-slate-800">Find a Job</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Job Seeker</span>
              </div>

              {/* Job Provider Card */}
              <div
                onClick={() => handleRoleSelect("jobprovider")}
                className={`relative p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                  data.role === "jobprovider"
                    ? "border-indigo-600 bg-indigo-50/60 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {data.role === "jobprovider" && (
                  <FaCheckCircle className="absolute top-2.5 right-2.5 text-indigo-600 text-xs" />
                )}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                  data.role === "jobprovider" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  <FaBuilding className="text-sm" />
                </div>
                <span className="font-semibold text-xs text-slate-800">Hire Talent</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Job Provider</span>
              </div>
            </div>
            {clicked.role && !data.role && (
              <p className="text-red-500 text-xs mt-1">Please select an account type</p>
            )}
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
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
            Continue
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
          onClick={handleGoogleSignup}
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
          Sign up with Google
        </Button>

        <p className="text-center mt-6 text-sm text-slate-600 font-medium">
          Already have an account?{" "}
          <Link href="/Auth/Signin" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
            Sign in
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