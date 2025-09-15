"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, Video, Shield, Users } from "lucide-react";
import { usePathname } from "next/navigation";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const pathname = usePathname();
  const [userType, setUserType] = useState<"admin" | "operator" | "member">(
    pathname?.startsWith("/operator")
      ? "operator"
      : pathname?.startsWith("/admin")
      ? "admin"
      : "member"
  );


useEffect(() => {
  const currentUserType =
    pathname?.startsWith("/admin")
      ? "admin"
      : pathname?.startsWith("/operator")
      ? "operator"
      : "member";

  setUserType(currentUserType);

  const storedUser = localStorage.getItem("userData");
  if (!storedUser) return; // ✅ avoid JSON.parse(null) crash

  try {
    const { uType, creds } = JSON.parse(storedUser);

    if (uType === currentUserType) {
      // Only re-validate if creds exist
      if (creds?.userId || creds?.operatorId || creds?.memberId) {
        onLogin(); // ✅ call parent callback instead of undefined handleLogin
      }
    }
  } catch (err) {
    console.error("Failed to parse userData:", err);
    localStorage.removeItem("userData"); // cleanup if data corrupted
  }
}, [pathname, onLogin]); // ✅ dependencies are clean now


  const [formData, setFormData] = useState({
    userId: "",
    operatorId: "",
    memberId: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const handleLogin = async (
    uType: "admin" | "operator" | "member",
    creds: { userId: string; operatorId: string; memberId: string; password: string }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType: uType, ...creds }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) setError("Invalid credentials");
        else if (res.status === 403) setError("Account inactive");
        else setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }


      // ✅ Save user data to localStorage
      localStorage.setItem("userData", JSON.stringify({ uType, creds, data }));

      // Notify parent
      onLogin();

      setFormData({ userId: "", operatorId: "", memberId: "", password: "" });
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, try again.");
    }

    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(userType, formData);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Video className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AsanCapture
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Professional Video Production Platform
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            {/* Role selector (enabled now) */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 mb-8">
              {["admin", "operator", "member"].map((role) => (
                <span
                  key={role}
                  // type="button"
                  onClick={() => setUserType(userType)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    userType === role
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hidden dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {role === "admin" ? (
                    <Shield className="h-5 w-5" />
                  ) : (
                    <Users className="h-5 w-5" />
                  )}
                  <span className="capitalize">{role}</span>
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {userType === "admin" && (
                <InputField
                  label="Admin User ID"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="Enter admin user ID"
                />
              )}

              {userType === "operator" && (
                <InputField
                  label="Operator ID"
                  id="operatorId"
                  name="operatorId"
                  value={formData.operatorId}
                  onChange={handleInputChange}
                  placeholder="Enter operator ID"
                />
              )}

              {userType === "member" && (
                <InputField
                  label="Member ID"
                  id="memberId"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleInputChange}
                  placeholder="Enter member ID"
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable input field
const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default LoginPage;
