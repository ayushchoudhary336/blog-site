import { LucideUserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface userType {
  profile: {
    name: string;
    email: string;
    bio: string;
    id: string;
  };
}

export default function Profile() {
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("token not found");
        return;
      }
      async function fetchUser() {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/my-profile`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        setUser(result);

        console.log(result);
      }

      fetchUser();
    } catch {
      //
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="flex flex-col gap-6 justify-center items-center bg-white shadow-xl rounded-2xl p-10 w-full max-w-md transition-all hover:shadow-2xl">
        <LucideUserCircle2 className="rounded-full h-28 w-28 text-gray-700" />

        <div className="flex flex-col items-center text-center">
          <h1 className="text-gray-900 text-2xl font-semibold tracking-tight">
            {user ? user.profile.name : "NA"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Joined 2025</p>
          <span className="mt-2 text-gray-600 italic text-base">
            {user ? user.profile.bio : "NA"}
          </span>
        </div>

        <button className="w-full rounded-lg py-2.5 text-white font-medium text-sm bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
