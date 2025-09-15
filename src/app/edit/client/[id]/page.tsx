import ClientPage from "@/mainComponents/ClientPage";
import { AppProvider } from "@/contexts/AppContext";

const page = () => {
  return (
    <AppProvider>
      <ClientPage />
    </AppProvider>
  );
};

export default page;
