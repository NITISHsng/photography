"use client";

import { useEffect, useState } from "react";
import ProfilePage from "@/pages/ProfilePage";
import { AppProvider } from "@/contexts/AppContext";
import LoginPage from "@/pages/LoginPage";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
type UserType = "admin" | "operator" | "member";
const [userType, setUserType] = useState<UserType>("member");

  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("asan_user_data");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserType(parsed.userType);
      setUserId(parsed.userId);
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Save login info
  const handleLogin = (type: "admin" | "operator" | "member", id: string) => {
    setUserType(type);
    setUserId(id);
    setIsLoggedIn(true);

    localStorage.setItem(
      "asan_user_data",
      JSON.stringify({ userType: type, userId: id })
    );
  };

  // ✅ Logout clears everything
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("member");
    setUserId(null);
    localStorage.removeItem("asan_user_data");
  };

  if (!isLoggedIn) {
    return (
      <AppProvider>
        <LoginPage onLogin={handleLogin} />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      {/* ✅ Pass userId as a prop */}
      <ProfilePage userId={userId!} userType={userType} onLogout={handleLogout} />
    </AppProvider>
  );
}
