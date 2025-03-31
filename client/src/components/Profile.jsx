
import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AUth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/e8/35/ed/e835ed89023c2a6d2d1933321d59efc4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      
    </div>
  );
};

export default ProfilePage;
