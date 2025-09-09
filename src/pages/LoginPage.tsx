"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, Video, Shield, Users,  } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import Operator from "../../app/operator/page";

interface LoginPageProps {
  onLogin: (userType: "admin" | "operator" | "member", userData: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const pathname = usePathname();

 const [uRole, setUserType] = useState<"admin" | "operator" | "member">(
  pathname?.startsWith("/operator")
    ? "operator"
    : pathname?.startsWith("/admin")
    ? "admin"
    : "member"
);

  

useEffect(() => {
  if (pathname?.startsWith("/admin")) setUserType("admin");
  else if (pathname?.startsWith("/operator")) setUserType("operator");
  else setUserType("member");
}, [pathname]);



  const [formData, setFormData] = useState({
    userId: "",
    operatorId: "",
    memberId:"",
    password: "",
  });

  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Auto check localStorage when component loads
  useEffect(() => {
    const savedId = localStorage.getItem("asan_user_id");
    const userRole = localStorage.getItem("asan_user_role");

    if (!savedId || uRole !=userRole) {
      console.log("No user logged in"); // <-- handle logged-out state
      return;
    }
    setIsLoading(true);
    fetch(`/api/user/${savedId}`)
      .then((res) => res.json())
      .then((user) => {
        if (user.error || !["admin", "operator" ,"member"].includes(user.role)) {
          localStorage.removeItem("asan_user_id");
          console.log("Invalid session, cleared storage");
        } else {
          onLogin(user.role, user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Auto-login failed:", err);
        localStorage.removeItem("asan_user_id");
        localStorage.removeItem("asan_user_role");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    uType: "admin" | "operator" | "member",
    creds: { userId: string; operatorId: string; password: string }
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
        setError(data.error || "Login failed");
        localStorage.removeItem("asan_user_id"); // cleanup on failed login
        setIsLoading(false);
        return;
      }

      // ✅ Save credentials in localStorage
      localStorage.setItem("asan_user_id", data.id);
      localStorage.setItem("asan_user_role", data.role);

      // ✅ Notify parent
      onLogin(uType, data);

      // Optional: reset form after login
      setFormData({ userId: "", operatorId: "",memberId:"", password: "" });

      setShowForm(false);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, try again.");
      localStorage.removeItem("asan_user_id");
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(uRole, formData);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-24 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <ThemeToggle
            showLabel={false}
            theme="system"
            setTheme={(theme) => {
              // Handle theme change locally if context is not available
              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              } else if (theme === "light") {
                document.documentElement.classList.remove("dark");
              }
            }}
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Video className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80"></div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AsanCapture
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Professional Video Production Platform
            </p>
          </div>

          {/* Login Form */}
          {showForm && (
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              {/* User Type Selection */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 mb-8">
                <button
                  type="button"
                  disabled={uRole !== "admin"}
                  onClick={() => setUserType("admin")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    uRole === "admin"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  <span>Admin</span>
                </button>
                <button
                  type="button"
                  disabled={uRole !== "operator"}
                  onClick={() => setUserType("operator")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    uRole === "operator"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Operator</span>
                </button>
                <button
                  type="button"
                  disabled={uRole !== "member"}
                  onClick={() => setUserType("member")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    uRole === "member"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Member</span>
                </button>
              </div>
            
                <form onSubmit={handleSubmit} className="space-y-6">
                  {uRole === "admin" && (
                    <div>
                      <label
                        htmlFor="userId"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Admin User ID
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="userId"
                          name="userId"
                          value={formData.userId}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          placeholder="Enter admin user ID"
                        />
                      </div>
                    </div>
                  ) 
                  }

                  {
                    uRole === "operator" && (
                        <div>
                      <label
                        htmlFor="operatorId"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Operator ID
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="operatorId"
                          name="operatorId"
                          value={formData.operatorId}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          placeholder="Enter operator ID"
                        />
                      </div>
                    </div>

                    )
                  }

                  {
                    uRole === "member" && (
                        <div>
                      <label
                        htmlFor="operatorId"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Member ID
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="memberId"
                          name="memberId"
                          value={formData.memberId}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                          placeholder="Enter Member ID"
                        />
                      </div>
                    </div>

                    )
                  }

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
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
{/*             
              {isLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
