"use client"
import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import TextInput from "./TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setProviderInfo } from "@/redux/slices/signupSlice";
import Link from "next/link";

function ProviderForm({
  backPath,
  finishPath,
  backLabel = "Back",
  finishLabel = "Finish",
  onFinish, // 🔹 added onFinish prop
}) {
  const dispatch = useDispatch();
  const statedata = useSelector((state) => state.signup);
//    const stateProviderData=useSelector((state)=>state.userDetail.provider);

  const [clicked, setClicked] = useState({});
//   const [data, setData] = useState({
//     comapnyname: statedata.providerInfo.comapnyname||stateProviderData.companyname||"",
//     companycontact: statedata.providerInfo.companycontact||stateProviderData.contact||"",
//     goalofcompany: statedata.providerInfo.goalofcompany||stateProviderData.goalOfCompany||"",
//     aboutcompany: statedata.providerInfo.aboutcompany||stateProviderData.aboutCompany||"",
//     addressofcompany: statedata.providerInfo.addressofcompany||stateProviderData.address||"",
//     position:statedata.providerInfo.position||stateProviderData.positionInCompany||"",
//     tenuretimeperiod:statedata.providerInfo.tenuretimeperiod||stateProviderData.tenureTimePeriod||""
//   });
const [data, setData] = useState({
    comapnyname: statedata.providerInfo.comapnyname||"",
    companycontact: statedata.providerInfo.companycontact||"",
    goalofcompany: statedata.providerInfo.goalofcompany||"",
    aboutcompany: statedata.providerInfo.aboutcompany||"",
    addressofcompany: statedata.providerInfo.addressofcompany||"",
    position:statedata.providerInfo.position||"",
    tenuretimeperiod:statedata.providerInfo.tenuretimeperiod||""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    dispatch(setProviderInfo({ ...data }));
    if (onFinish) {
      onFinish(data); // 🔹 notify parent
    }
  };

  const handleFinish = (e) => {
    // e.preventDefault();
    setClicked({
      comapnyname: true,
      companycontact: true,
      goalofcompany: true,
      aboutcompany: true,
      addressofcompany: true,
      position:true,
      tenuretimeperiod:true,
    });

    if (
      !data.comapnyname ||
      !data.aboutcompany ||
      !data.goalofcompany ||
      !data.companycontact ||
      !data.addressofcompany||
      !data.position||
      !data.tenuretimeperiod
    ) {
      e.preventDefault();
      return;
    }

    if (onFinish) {
      onFinish(data); // 🔹 notify parent
    }
     dispatch(setProviderInfo({ ...data }));
  };

  return (
    <form className="flex flex-col flex-grow">
      <div className="grid grid-cols-1 bg-white p-6 rounded-4xl shadow-lg md:grid-cols-2 ">
        <TextInput
          name="comapnyname"
          label="Company Name"
          type="text"
          value={data.comapnyname}
          onChange={handleChange}
          className="!w-full md:!w-[80%] !font-[Open_sans] !text-black"
          error={clicked.comapnyname && !data.comapnyname}
          helperText={clicked.comapnyname && !data.comapnyname ? "Please Enter Company Name" : ""}
        />

        <TextInput
          name="companycontact"
          label="Contact Info"
          type="text"
          value={data.companycontact}
          onChange={handleChange}
          className="!w-full md:!w-[80%] !font-[Open_sans] !text-black"
          error={clicked.companycontact && !data.companycontact}
          helperText={clicked.companycontact && !data.companycontact ? "Please Enter Contact" : ""}
        />

        <TextInput
          name="goalofcompany"
          label="Goal Of Company"
          type="text"
          value={data.goalofcompany}
          onChange={handleChange}
          className="!w-full md:!w-[80%] !font-[Open_sans] !text-black"
          error={clicked.goalofcompany && !data.goalofcompany}
          helperText={clicked.goalofcompany && !data.goalofcompany ? "Please Enter Goal" : ""}
        />

        <TextInput
          name="addressofcompany"
          label="Address"
          type="text"
          value={data.addressofcompany}
          onChange={handleChange}
          className="!w-full md:!w-[80%] !font-[Open_sans] !text-black"
          error={clicked.addressofcompany && !data.addressofcompany}
          helperText={clicked.addressofcompany && !data.addressofcompany ? "Please Enter Address" : ""}
        />

        <TextInput
          name="position"
          label="Postion in company"
          type="text"
          value={data.position}
          onChange={handleChange}
          className="!w-full md:!w-[80%] !font-[Open_sans] !text-black"
          error={clicked.position && !data.position}
          helperText={clicked.position && !data.position ? "Please Enter Position" : ""}
        />

         <TextInput
          name="tenuretimeperiod"
          label="Tenure Time Period"
          type="text"
          value={data.tenuretimeperiod}
          onChange={handleChange}
          className="!w-full md:!w-[80%]"
          error={clicked.tenuretimeperiod && !data.tenuretimeperiod}
          helperText={clicked.tenuretimeperiod && !data.tenuretimeperiod ? "Please Enter Position" : ""}
        />

        <div className="mt-4 md:col-span-2">
          <Typography className="mb-2 font-medium">About Company</Typography>
          <TextField
            name="aboutcompany"
            multiline
            rows={5}
            placeholder="Write details about your company"
            value={data.aboutcompany}
            onChange={handleChange}
            fullWidth
            error={clicked.aboutcompany && !data.aboutcompany}
            helperText={clicked.aboutcompany && !data.aboutcompany ? "Please Enter Detail" : ""}
          />
        </div>
      </div>

      <div className="mt-8 mb-8 flex flex-col sm:flex-row justify-center gap-2">
        {backPath && (
          <Button
            variant="contained"
            component={Link}
            href={backPath}
            onClick={handleBack}
            className="!mr-6 !bg-[#956fe2] !rounded-xl normal-case text-white w-80 !font-[Open_sans]"
          >
            {backLabel}
          </Button>
        )}

        
          <Button
            type="submit"           
            component={Link}
            href={finishPath}
            variant="contained"
            onClick={handleFinish}
            className="!bg-[#956fe2] !rounded-xl normal-case text-white !w-80 !font-[Open_sans]"
          >
            {finishLabel}
          </Button>
        
        {/* {finishPath && (
  <Link to={finishPath}>
    <Button
      type="submit"
      variant="contained"
      onClick={handleFinish}
      className="!bg-[#956fe2] !rounded-xl normal-case text-white"
    >
      {finishLabel}
    </Button>
  </Link>
)} */}
      </div>
    </form>
  );
}

export default ProviderForm;
