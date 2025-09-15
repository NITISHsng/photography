
import React from "react";
import { AppProvider } from "@/contexts/AppContext";

const page = () => {
  return (
    <AppProvider>
      <div>client page</div>
    </AppProvider>
  );
};

export default page;
