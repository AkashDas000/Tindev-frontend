import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        feed: feedReducer,
        connection: connectionReducer,
        request: requestReducer,
    }
})

export default store;