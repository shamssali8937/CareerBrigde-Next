"use client"
import { useState, useEffect } from "react";
import { Button, Typography, IconButton, TextField, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import TextInput from "./TextInput";

function SeekerForm({
  initialData,
  onFinish,
  backButtonPath,
  backButtonLabel = "Back",
  finishButtonPath,
  finishButtonLabel = "Finish",
}) {
  const [skillinput, setskillinput] = useState("");
  const [newexperience, setnewexperience] = useState(null);
  const [neweducation, setneweducation] = useState(null);
  const [skills, setskills] = useState([]);
  const [experiences, setexperiences] = useState([]);
  const [educations, seteducations] = useState([]);
  const [fileName, setFileName] = useState("");
  const [data, setdata] = useState({
    name: "",
    headline: "",
    city: "",
    address: "",
    about: "",
    phone:"",
    country:""
  });

  const [newSocial, setNewSocial] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  // track clicks for validation
  const [clicked, setClicked] = useState({});

  // form handlers
  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    function getFileName(cv) {
     if (!cv) return "";
   
     // If cv is a string (from backend)
     if (typeof cv === "string") {
       return cv.split("/").pop();
     }
   
     // If cv is an object (new upload)
     if (cv?.name) return cv.name;
     if (cv?.file?.name) return cv.file.name;
   
     return "";
   }

  const addskill = () => {
    const skill = skillinput.trim();
    if (!skill || skills.includes(skill) || skills.length >= 7) return;
    setskills((s) => [...s, skill]);
    setskillinput("");
  };
  const removeskill = (skill) =>
    setskills((s) => s.filter((x) => x !== skill));

  const addnewexperience = () => {
    setnewexperience({ title: "", company: "", description: "" });
  };
  const saveexperience = () => {
    if (!newexperience.title.trim()) return;
    setexperiences((exper) => [
      ...exper,
      { id: Date.now(), ...newexperience },
    ]);
    setnewexperience(null);
  };
  const addSocial = () => {
    setNewSocial({ label: "", link: "" });
  };
  const saveSocial = () => {
    if (!newSocial.label.trim() || !newSocial.link.trim()) return;
    setSocialLinks((prev) => [
      ...prev,
      { id: Date.now(), ...newSocial },
    ]);
    setNewSocial(null);
  };


  const removeSocial = (id) =>
    setSocialLinks((prev) => prev.filter((s) => s.id !== id));


  const removeexperience = (id) =>
    setexperiences((ex) => ex.filter((e) => e.id !== id));

  const addeducation = () => {
    setneweducation({
      degree: "",
      institute: "",
      year: "",
      description: "",
    });
  };
  const saveeducation = () => {
    if (!neweducation.degree.trim() || !neweducation.institute.trim()) return;
    seteducations((edu) => [
      ...edu,
      { id: Date.now(), ...neweducation },
    ]);
    setneweducation(null);
  };
  const removeeducation = (id) =>
    seteducations((ed) => ed.filter((e) => e.id !== id));

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFileName(file.name);
    setdata((prev) => ({
      ...prev,
      cv: {
        file,   // original File object
        name: file.name, 
        url: URL.createObjectURL(file), // preview/download link
      },
    }));
  }
};
  // load initial values
  useEffect(() => {
  if (initialData) {
    const { s = {}, d = {} } = initialData;
    setdata({
      name: d.name || "",
      headline: s.headline || "",
      city: s.city || "",
      address: s.address || "",
      about: s.about || "",
      phone : s.phone || " ",
      country: s.country || " ",
      cv: s.cv || null,   // ✅ restore CV into state
    });

    setskills(s.skills || []);
    seteducations(s.education || []);
    setexperiences(s.experience || []);
    setSocialLinks(s.socialLinks || []);

    if (s.cv?.file instanceof File) {
      setFileName(s.cv.file.name);
    } else if (s.cv?.name) {
      setFileName(s.cv.name);
    } else if (typeof s.cv === "string" && s.cv.length > 0) {
      setFileName(s.cv.split("/").pop());
    } else {
      setFileName("");
    }
  }
}, [initialData]);


  // finish click
  const handleFinishClick = (e) => {
    
    setClicked({
      name: true,
      headline: true,
      city: true,
      address: true,
      about: true,
      phone:true,
      country:true,
      skills: true,
      cv: true,
      experiences: true,
      educations: true,
      socialLinks: true,
    });

    if (
      data.name &&
      data.headline &&
      data.city &&
      data.address &&
      data.phone &&
      data.about &&
      data.country &&
      skills.length > 0 &&
      data.cv &&
      experiences.length > 0 &&
      educations.length > 0 &&
      socialLinks.length > 0
    ) {
      onFinish({
        ...data,
        skills,
        education:  educations.map(e => ({
         id: e.id,
         degree: e.degree,
         institute: e.institute || e.institution,  
         year: e.year,
         description: e.description,
       })),
        experience: experiences,
        socialLinks,
        cv: data.cv,
      });
    }
    else
    {
      e.preventDefault();
      return;
    }
  };
    
const handleBackClick = () => {
  onFinish({
    ...data,
    skills,
    education: educations,
    experience: experiences,
    socialLinks,
    cv: data.cv,
  });
};

  return (
    <form className="flex flex-col flex-grow">
      {/* Basic Info */}
      <div className="grid grid-cols-1 bg-white p-6 rounded-4xl shadow-lg md:grid-cols-2 ">
        <TextInput
          name="name"
          label="Name"
          type="text"
          value={data.name}
          onChange={handlechange}
          error={clicked.name && !data.name}
          helperText={clicked.name && !data.name ? "Name is required" : ""}
          className="!w-[80%]"
        />
        <TextInput
          name="headline"
          label="Headline"
          type="text"
          value={data.headline}
          onChange={handlechange}
          error={clicked.headline && !data.headline}
          helperText={clicked.headline && !data.headline ? "Headline is required" : ""}
          className="!w-[80%]"
        />
        <TextInput
          name="phone"
          label="Phone"
          type="text"
          value={data.phone}
          onChange={handlechange}
          error={clicked.phone && !data.phone}
          helperText={clicked.phone && !data.phone ? "Contact is required" : ""}
          className="!w-[80%]"
        />
        <TextInput
          name="city"
          label="City"
          type="text"
          value={data.city}
          onChange={handlechange}
          error={clicked.city && !data.city}
          helperText={clicked.city && !data.city ? "City is required" : ""}
          className="!w-[80%]"
        />
        <TextInput
          name="address"
          label="Address"
          type="text"
          value={data.address}
          onChange={handlechange}
          error={clicked.address && !data.address}
          helperText={clicked.address && !data.address ? "Address is required" : ""}
          className="!w-[80%]"
        />
        <TextInput
          name="country"
          label="Country"
          type="text"
          value={data.country}
          onChange={handlechange}
          error={clicked.country && !data.country}
          helperText={clicked.country && !data.country ? "Country is required" : ""}
          className="!w-[80%]"
        />
        <div className="mt-4 md:col-span-2">
          <Typography className="mb-2 !text-black !font-[Open_sans]">About</Typography>
          <TextField
            name="about"
            multiline
            rows={5}
            value={data.about}
            onChange={handlechange}
            placeholder="Write details about yourself"
            fullWidth
            error={clicked.about && !data.about}
            helperText={clicked.about && !data.about ? "About is required" : ""}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8 bg-white p-6 rounded-4xl shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-3 ">
          <Typography variant="h6" className="!font-[Open_sans] !text-black">Skills</Typography>
          <div>
            <TextField
              name="skills"
              placeholder="React, SQL"
              size="small"
              value={skillinput}
              onChange={(e) => setskillinput(e.target.value)}
              className="!w-[80%]"
            />
            <IconButton
              onClick={addskill}
              aria-label="add skill"
              disabled={!skillinput.trim() || skills.length >= 7}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 !font-[Open_sans] !text-black">
          {skills.map((s) => (
            <Chip key={s} label={s} onDelete={() => removeskill(s)} />
          ))}
        </div>
        {clicked.skills && skills.length === 0 && (
          <Typography color="error">At least one skill is required</Typography>
        )}
      </div>

      {/* Experience */}
      <div className="mt-8 bg-white p-6 rounded-4xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <Typography className="font-medium !font-[Open_sans] text-black">Experience</Typography>
          {!newexperience && (
            <Button
              size="small"
              onClick={addnewexperience}
              className="!border-2 border-dashed !rounded-4xl !font-[Open_sans] "
            >
              + Add Experience
            </Button>
          )}
        </div>
        {newexperience && (
          <div className="bg-white  mb-4">
            <TextField
              label="Title"
              value={newexperience.title}
              onChange={(e) =>
                setnewexperience({ ...newexperience, title: e.target.value })
              }
              fullWidth
              className="!mb-4"
            />
            <TextField
              label="Company"
              value={newexperience.company}
              onChange={(e) =>
                setnewexperience({ ...newexperience, company: e.target.value })
              }
              fullWidth
              className="!mb-3"
            />
            <TextField
              label="Description"
              value={newexperience.description}
              onChange={(e) =>
                setnewexperience({
                  ...newexperience,
                  description: e.target.value,
                })
              }
              fullWidth
              multiline
              className="mb-3"
            />
            <div className="flex justify-end gap-2 mt-3">
              <Button onClick={() => setnewexperience(null)}>Cancel</Button>
              <Button variant="contained" onClick={saveexperience}>
                Save
              </Button>
            </div>
          </div>
        )}
        {experiences.map((exper) => (
          <div
            key={exper.id}
            className="border p-3 rounded bg-white shadow-sm mb-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <Typography className="font-medium !font-[Open_sans] !text-black">{exper.title}</Typography>
                <Typography variant="body2" color="text.secondary" className="!ont-[Open_sans] !text-black">
                  {exper.company}
                </Typography>
                <Typography variant="body2" className="!font-[Open_sans] !text-black">{exper.description}</Typography>
              </div>
              <IconButton onClick={() => removeexperience(exper.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        ))}
        {clicked.experiences && experiences.length === 0 && (
          <Typography color="error">At least one experience is required</Typography>
        )}
      </div>

      {/* Education */}
      <div className="mt-8 bg-white p-6 rounded-4xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <Typography className="font-medium !font-[Open_sans] !text-black">Education</Typography>
          {!neweducation && (
            <Button
              size="small"
              onClick={addeducation}
              className="!border-2 border-dashed !rounded-4xl !font-[Open_sans]"
            >
              + Add Education
            </Button>
          )}
        </div>
        {neweducation && (
          <div className="rounded bg-white  mb-4">
            <TextField
              label="Degree"
              value={neweducation.degree}
              onChange={(e) =>
                setneweducation({ ...neweducation, degree: e.target.value })
              }
              fullWidth
              className="!mb-3"
            />
            <TextField
              label="Institution"
              value={neweducation.institute}
              onChange={(e) =>
                setneweducation({
                  ...neweducation,
                  institute: e.target.value,
                })
              }
              fullWidth
              className="!mb-3"
            />
            <TextField
              label="Year"
              value={neweducation.year}
              onChange={(e) =>
                setneweducation({ ...neweducation, year: e.target.value })
              }
              fullWidth
              className="!mb-3"
            />
            <TextField
              label="Description"
              value={neweducation.description}
              onChange={(e) =>
                setneweducation({
                  ...neweducation,
                  description: e.target.value,
                })
              }
              fullWidth
              multiline
              className="mb-3"
            />
            <div className="flex justify-end gap-2 mt-3">
              <Button onClick={() => setneweducation(null)}>Cancel</Button>
              <Button variant="contained" onClick={saveeducation}>
                Save
              </Button>
            </div>
          </div>
        )}
        {educations.map((ed) => (
          <div
            key={ed.id}
            className="border p-3 rounded bg-white shadow-sm mb-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <Typography className="font-medium !font-[Open_sans] !text-black">{ed.degree}</Typography>
                <Typography variant="body2" color="text.secondary" className="!font-[Open_sans] !text-black">
                  {ed.institute} — {ed.year}
                </Typography>
                <Typography variant="body2"className="!font-[Open_sans] !text-black" >{ed.description}</Typography>
              </div>
              <IconButton onClick={() => removeeducation(ed.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        ))}
        {clicked.educations && educations.length === 0 && (
          <Typography color="error">At least one education is required</Typography>
        )}
      </div>

       <div className="mt-8 bg-white p-6 rounded-4xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <Typography className="font-medium !font-[Open_sans] text-black">Social Links</Typography>
          {!newSocial && (
            <Button
              size="small"
              onClick={addSocial}
              className="!border-2 border-dashed !rounded-4xl !font-[Open_sans]"
            >
              + Add Link
            </Button>
          )}
        </div>

        {newSocial && (
          <div className="bg-white mb-4 ">
            <TextField
              label="Label (e.g., GitHub, LinkedIn)"
              value={newSocial.label}
              onChange={(e) =>
                setNewSocial({ ...newSocial, label: e.target.value })
              }
              fullWidth
              className="!mb-3"
            />
            <TextField
              label="URL"
              value={newSocial.link}
              onChange={(e) =>
                setNewSocial({ ...newSocial, link: e.target.value })
              }
              fullWidth
              className="!mb-3"
            />
            <div className="flex justify-end gap-2 mt-3">
              <Button onClick={() => setNewSocial(null)}>Cancel</Button>
              <Button variant="contained" onClick={saveSocial}>
                Save
              </Button>
            </div>
          </div>
        )}

        {socialLinks.map((link) => (
          <div
            key={link.id}
            className="border p-3 rounded bg-white shadow-sm mb-3 flex justify-between items-center !font-[Open_sans]"
          >
            <div>
              <Typography className="font-medium !font-[Open_sans] !text-black">{link.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                <a href={link.link} target="_blank" className="text-blue-600 underline">{link.link}</a>
              </Typography>
            </div>
            <IconButton onClick={() => removeSocial(link.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ))}

        {clicked.socialLinks && socialLinks.length === 0 && (
          <Typography color="error">
            At least one social link is required
          </Typography>
        )} 
      </div>
       
      {/* Upload CV */}
      <div className="mt-8 bg-white p-6 rounded-4xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <Typography className="font-medium !font-[Open_sans] !text-black">Upload CV</Typography>
          <Button
            size="small"
            component="label"
            className="!border-2 border-dashed !rounded-4xl !font-[Open_sans]"
          >
            + Add CV
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </div>
        {fileName && (
          <Typography
            variant="body2"
            color="text.secondary"
            className="mt-2 break-words !font-[Open_sans] !text-black"
          >
            Selected file: {getFileName(fileName)}
          </Typography>
        )}
        {clicked.cv && !data.cv && (
          <Typography color="error">CV is required</Typography>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 mb-8 flex justify-end ">
        {backButtonPath && (
          <Button
            variant="contained"
            component={Link}
            href={backButtonPath}
            onClick={handleBackClick}
            className="!mr-6 !mt-3 !font-[Open_Sans] !w-[25%] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
          >
            {backButtonLabel}
          </Button>   
        )}

        {finishButtonPath ? (
          <Button
            variant="contained"
            component={Link}
            href={finishButtonPath}
            onClick={handleFinishClick}
            className="!mt-3 !font-[Open_Sans] !w-[25%] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
          >
            {finishButtonLabel}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleFinishClick}
            className="!mt-3 !font-[Open_Sans] !w-[25%] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
          >
            {finishButtonLabel}
          </Button>
        )}
      </div>
    </form>
  );
}

export default SeekerForm;

