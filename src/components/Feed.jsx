import axios from "axios";
import { BASE_URL } from "../utils/constant";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserFeed from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(res)
      dispatch(addFeed(res?.data));
    } catch (err) {
      //make Error page
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return  feed && (
    <div className=" flex justify-center my-10">
      <UserFeed user={feed[0]}/>
    </div>
  );
};

export default Feed;
