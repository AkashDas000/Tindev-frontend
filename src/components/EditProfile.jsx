import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false)

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, photoURL, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false)
      },3000
    )
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className=" flex justify-center my-10">
      <div className=" flex justify-center  mx-10">
        <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-3xl text-blue-400">
            Edit Profile
          </legend>

          <label className="label">First Name</label>
          <input
            value={firstName}
            type="email"
            className="input"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            value={lastName}
            type="text"
            className="input"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            value={age}
            type="text"
            className="input"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender</label>
          <input
            value={gender}
            type="text"
            className="input"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">PhotoURL</label>
          <input
            value={photoURL}
            type="text"
            className="input"
            placeholder="PhotURL"
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <label className="label">About</label>
          <input
            value={about}
            type="text"
            className="input"
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
          />

          <p className=" text-red-500">{error}</p>

          <button className="btn btn-neutral mt-4" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
        {/* <UserCard/> */}
      </div>
      <UserCard user={{ firstName, lastName, age, about, photoURL, gender }} />
      {showToast &&<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Update Completed !!</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
