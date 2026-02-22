import { Container, Typography } from "@mui/material";

export default function Layout({ children, rightImage }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh]">

      {/* LEFT */}
      <div className="flex flex-col w-full md:w-1/2 bg-[#faf4ff] min-h-[100dvh]">

        {/* LOGO */}
        <div className="flex items-center p-4">
          <img
            src="/iconpeople.svg"
            alt="CareerBridge Logo"
            className="w-10 h-10 mr-2"
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ fontFamily: "Montserrat, sans-serif" }}
            className="!font-[Open_Sans] text-[#666568] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            The<span className="text-[#020202]">Career</span>Bridge
          </Typography>
        </div>

        {/* CONTENT */}
        <Container
          maxWidth="lg"
          className="flex flex-1 flex-col justify-center items-center px-6 py-4"
        >
          {children}
        </Container>

      </div>

      {/* RIGHT IMAGE */}
      {rightImage && (
        <div className="hidden md:flex md:w-1/2 h-[100dvh]">
          <img
            src={rightImage}
            alt="Right Visual"
            className="w-full h-full object-cover"
          />
        </div>
      )}

    </div>
  );
}
