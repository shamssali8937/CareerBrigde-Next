import { Container, Typography } from "@mui/material";

export default function Layout({ children, rightImage }) {
  return (
     <div className="flex flex-col md:flex-row h-screen">
      
      <div className="w-full md:w-1/2 flex flex-col bg-[#faf4ff] ">
        <div className="flex items-center mt-4 ml-4">
          <img
            src="/iconpeople.svg"
            alt="CareerBridge Logo"
            className="w-10 h-10 mr-2 background-white"
          />
          {/* <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#666568]">
            The<span className="text-[#020202]">Career</span>Bridge
          </span> */}
          <Typography variant="h5" fontWeight="bold" className="text-[#666568] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
             The<span className="text-[#020202]">Career</span>Bridge
           </Typography>

        </div>

        <Container
          maxWidth="lg"
        //   className="m-6 md:w-[70%] lg:w-[50%] h-auto p-4 bg-[#faf4ff] rounded-lg flex flex-col items-center justify-center"
        className="flex-grow m-4 p-6 bg-[#faf4ff] rounded-lg flex flex-col justify-center items-center overflow-y-hidden"
        >
          {children}
        </Container>
      </div>

      <div className="hidden md:block md:w-1/2 h-full">
        {rightImage && (
          <img
            src={rightImage}
            alt="RightSideImage"
            className="w-full h-full object-cover"
          />
        )}
      </div>

    </div>
  );
}
