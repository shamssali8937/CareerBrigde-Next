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
             <Typography variant="h3" fontWeight="bold" className="text-[#020202] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2">Discover Your</Typography>
        </div>
         
         <div className="mb-2">
            <Typography variant="h3" fontWeight="bold" className="text-[#956fe2] animate-bounce text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4">Dream Career.</Typography>
         </div>
        
         <div className="mb-2">
        <Typography variant="h5" className="text-black text-center text-sm sm:text-base md:text-lg lg:text-xl mb-6">
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
            className="animate-bounce"
          >
            Get Started
          </Button>
        </Link>
        </div>
      </div>
      </Layout>
  );
}
