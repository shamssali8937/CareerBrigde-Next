import { Container, Typography } from "@mui/material";

export default function Layout({ children, rightImage }) {
  return (
     <div className="flex flex-col bg-gradient-to-b from-[#faf8ff] via-[#eee7ff] to-[#dcd0ff]  md:flex-row min-h-screen">
      
      <div className="w-full md:w-1/2 flex flex-col min-h-screen md:min-h-0 md:h-screen">
        <div className="flex items-center mt-4 ml-4 mb-2">
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
        className="!bg-gradient-to-b !from-[#faf8ff] !via-[#eee7ff] !to-[#dcd0ff] !rounded-3xl flex-grow flex flex-col justify-center items-center w-full px-4 py-6 md:px-6 overflow-y-auto"
         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </Container>
      </div>

      <div className="hidden md:block md:w-1/2 md:h-screen sticky top-0">
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
