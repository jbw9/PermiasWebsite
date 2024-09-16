import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 bg-white">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
