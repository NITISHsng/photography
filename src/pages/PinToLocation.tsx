"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserRole() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const savedId = localStorage.getItem("asan_user_id");
      if (!savedId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/user/${savedId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error("User fetch failed:", data.error);
          localStorage.removeItem("asan_user_id"); // cleanup
        }
      } catch (err) {
        console.error("Fetch error:", err);
        localStorage.removeItem("asan_user_id");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>No user logged in</p>;

  return (
    <div className="p-4 rounded-lg bg-gray-100">
      <h2 className="text-lg font-semibold">Welcome, {user.name}</h2>
      <p className="text-sm text-gray-600">Role: {user.role}</p>
    </div>
  );
}
