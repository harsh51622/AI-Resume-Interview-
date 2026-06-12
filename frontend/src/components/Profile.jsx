import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await api.get("/users/profile/");
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl p-8">
        
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-2xl font-bold text-white mt-4">
            {user?.username}
          </h2>

          <p className="text-gray-400">
            AI Interview Platform User
          </p>
        </div>

        {/* User Details */}
        <div className="mt-8 space-y-4">
          <div className="bg-zinc-800 rounded-xl p-4">
            <p className="text-sm text-gray-400">User ID</p>
            <p className="text-white font-medium">{user?.id}</p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-white font-medium">{user?.username}</p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-medium">{user?.email}</p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;