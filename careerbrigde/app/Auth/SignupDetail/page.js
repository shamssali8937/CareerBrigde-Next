"use client";
import { Button } from "@mui/material";
import TextInput from "@/components/TextInput";
import ProfileAvatar from "@/components/ProfileAvatar";
import Layout from "@/layouts/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "@/redux/slices/signupSlice";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { useRouter } from "next/navigation";

function SignUpDetail() {
  const [opensnackbar, setopensackbar] = useState(false);
  const [snackbarmessage, setsnackbarmessage] = useState("");
  const [snackbarseverity, setsnackbarseverity] = useState("success");
  const router = useRouter();
  const [clicked, setclicked] = useState({});
  const dispatch = useDispatch();
  const statedata = useSelector((state) => state.signup);
  const role = statedata.role;

  const [data, setdata] = useState({
    name: statedata.details.name || "",
    phone: statedata.details.phone || "",
    password: "",
    password2: "",
    img: statedata.details.img || "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setdata((prev) => ({
      ...prev,
      img: url,
      file: file,
    }));
  };

  const handleback = () => {
    dispatch(setDetails({ name: data.name, img: data.img }));
    router.push("/Auth/Signup");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setclicked({
      name: true,
      password: true,
      password2: true,
      img: true,
    });

    if (!data.name || !data.password || !data.password2 || !data.img) {
      setsnackbarmessage("Please fill all required fields and upload a photo");
      setsnackbarseverity("error");
      setopensackbar(true);
      return;
    }

    if (data.password !== data.password2) {
      setsnackbarmessage("Passwords do not match");
      setsnackbarseverity("error");
      setopensackbar(true);
      return;
    }

    try {
      const User = new FormData();
      User.append("name", data.name);
      User.append("email", statedata.email);
      User.append("role", statedata.role);
      User.append("password", data.password);
      User.append("photo", data.file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/Signup`, {
        method: "POST",
        body: User,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create account");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("accessToken", result.token);

      dispatch(setDetails({ name: result.User?.name, img: result.User?.photo?.url }));
      setsnackbarmessage("Account created successfully!");
      setsnackbarseverity("success");
      setopensackbar(true);

      if (role === "jobseeker") {
        router.push("/Seeker/SignupSeeker");
      } else {
        router.push("/Provider/SignupProvider");
      }
    } catch (err) {
      console.log(err);
      setsnackbarmessage(err.message || "Error creating account. Please try again.");
      setsnackbarseverity("error");
      setopensackbar(true);
    }
  };

  return (
    <Layout rightImage="/login.svg">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Profile
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Add your name and profile picture
          </p>
        </div>

        <form onSubmit={handlesubmit} className="flex flex-col items-center w-full gap-2">
          <div className="flex flex-col items-center mb-2">
            <ProfileAvatar file={data.img} onChange={handleImageChange} size={100} />
            {clicked.img && !data.img && (
              <p className="text-red-500 text-xs mt-1">Please upload a profile photo</p>
            )}
          </div>

          <TextInput
            label="Full Name"
            id="name"
            name="name"
            type="text"
            value={data.name}
            required
            onChange={handlechange}
            error={clicked.name && !data.name}
            helperText={clicked.name && !data.name ? "Full name is required" : ""}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            value={data.password}
            required
            onChange={handlechange}
            error={clicked.password && !data.password}
            helperText={clicked.password && !data.password ? "Password is required" : ""}
          />

          <TextInput
            label="Confirm Password"
            name="password2"
            type="password"
            value={data.password2}
            required
            onChange={handlechange}
            error={
              (clicked.password2 && !data.password2) ||
              (clicked.password2 && data.password2 !== data.password)
            }
            helperText={
              clicked.password2 && !data.password2
                ? "Please confirm your password"
                : clicked.password2 && data.password2 !== data.password
                ? "Passwords do not match"
                : ""
            }
          />

          <div className="flex justify-between items-center w-full mt-6 gap-3">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleback}
              sx={{
                borderRadius: "12px",
                borderColor: "#e2e8f0",
                color: "#475569",
                py: 1.2,
                px: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  backgroundColor: "#f8fafc",
                },
              }}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                borderRadius: "12px",
                py: 1.2,
                px: 4,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                  boxShadow: "0 6px 20px 0 rgba(79, 70, 229, 0.4)",
                },
              }}
            >
              Finish Setup
            </Button>
          </div>

          <CustomizedSnackbars
            open={opensnackbar}
            message={snackbarmessage}
            severity={snackbarseverity}
            onClose={() => setopensackbar(false)}
          />
        </form>
      </div>
    </Layout>
  );
}

export default SignUpDetail;