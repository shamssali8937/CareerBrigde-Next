import Layout from "@/layouts/Layout";
import { Typography, Button} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <Layout rightImage="/landpagephoto.svg">
       <div className="w-full flex flex-col items-start">
        {/* Left side content */}
        <div className="mb-2">
             <Typography variant="h3" fontWeight="bold" className="!font-[Open_sans] text-[#020202] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2">Discover Your</Typography>
        </div>
         
         <div className="mb-2">
            <Typography variant="h3" fontWeight="bold" className="!font-[Open_sans] text-[#956fe2] animate-bounce text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4">Dream Career.</Typography>
         </div>
        
         <div className="mb-2">
        <Typography variant="h5" className="!font-[Open_sans] text-black text-sm sm:text-base md:text-lg lg:text-xl mb-6">
          Get started on your path to ensure success. To get your dream job
          on our platform, this is where dreams come true.
        </Typography>
         </div>
         <div className="mt-4"> 
        <Link href="/Auth/Signin" className="w-40">
          <Button
            variant="contained"
            sx={{
              background: "#956fe2",
              borderRadius: "40px",
              py: 1.5,
              fontSize: "14px",
              width: "100%",
            }}
            className="animate-bounce !mt-3 !font-[Open_Sans]  !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full  !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
          >
            Get Started
          </Button>
        </Link>
        </div>
      </div>
      </Layout>
  );
}
