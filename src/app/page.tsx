import HomePage from "@/mainComponents/HomePage";
import { AppProvider } from "@/contexts/AppContext";

export default function Home() {
  return (
    <AppProvider>
      <HomePage/>      
    </AppProvider>
  );
}
