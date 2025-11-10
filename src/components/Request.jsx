import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addrequest } from "../utils/requestSlice";
import { motion } from "framer-motion";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addrequest(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return null;
  if (request.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-semibold text-gray-300 mb-4">
          No Connection Requests 🥲
        </h1>
        <p className="text-gray-400">
          Try connecting with some users to see them here!
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-12 px-6">
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-10">
        Connection Requests 💫
      </h1>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {request.map((req, idx) => {
          const { _id, firstName, lastName, about, photoURL } = req.formUserId;

          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-gray-800/80 backdrop-blur-md border border-gray-700 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20 rounded-2xl p-4 transition-all duration-300"
            >
              {/* Left: Profile Photo */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-600"
                />
                {/* User Info */}
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {about || "This is a default about of the user!"}
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className=" cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
                >
                  Reject
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className=" cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition"
                >
                  Accept
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
