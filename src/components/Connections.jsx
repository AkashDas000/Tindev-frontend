import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { motion } from "framer-motion";

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return null;
  if (connection.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-semibold text-gray-300 mb-4">
          No Connection Found 🥲
        </h1>
        <p className="text-gray-400">
          Try connecting with some users to see them here!
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-10 px-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-10">
        Your Connections 💫
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {connection.map((conn, id) => {
          const { firstName, lastName, age, gender, photoURL, about } = conn;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-blue-500/30 w-80 overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-white mb-1">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-400 text-sm mb-2">
                    {age} • {gender}
                  </p>
                )}
                <p className="text-gray-300 text-sm italic line-clamp-3">
                  {about || "No bio available."}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
