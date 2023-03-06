import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = (state.mode === "light" ? "dark" : "light");
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFollowees: (state, action) => {
            if(state.user) {
                state.user.followees = action.payload.followees;
            }
            else {
                console.error("user doesn't follow any profiles");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post_id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        }
    }  
});

export const { setMode, setLogin, setLogout, setFollowees, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;