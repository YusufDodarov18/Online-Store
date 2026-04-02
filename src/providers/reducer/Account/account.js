import toast from "react-hot-toast";
import axiosRequest from "../../../api/axiosRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyProfile=createAsyncThunk("/UserProfile/getMyProfile", async()=>{
    try {
        const {data}=await axiosRequest.get(
            `/UserProfile/get-my-profile`
        )
        return data.data
    } catch (error) {
        console.error(error)
        throw new Error("У пользователя нет токена.");
    }
})

export const changeProfile=createAsyncThunk("/UserProfile/changeUserProfile",async(data,{dispatch})=>{
    try {
        await axiosRequest.put(`/UserProfile/update-user-profile`,data)
        toast.success("Profile updated successfully!")
        await dispatch(getMyProfile())
    } catch (error) {
        console.error(error)
        toast.error("Error updated profile")
    }
})

export const addImageToProfile=createAsyncThunk("/UserProfile/addImage", async (file,{dispatch})=>{
    try {
        const formData = new FormData();
        formData.append("image",file);
        
        await axiosRequest.post(
            `/UserProfile/add-image-to-profile`,formData
        )
        toast.success("image added to profile!")
        await dispatch(getMyProfile());
    } catch (error) {
        console.error(error)
    }
})

export const deleteImageFromProfile=createAsyncThunk("/UserProfile/delete", async(_,{dispatch}) => {
    try {
        await axiosRequest.delete(`/UserProfile/delete-image-from-profile`)
        toast.success("Avatar deleted!");
        await dispatch(getMyProfile());
    } catch (error) {
        console.error(error)
    }
})

export const userProfileSlice= createSlice({
    name:"profile", 
    initialState:{
        profile:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getMyProfile.pending,(state)=>{
            state.loading=true
        }).addCase(getMyProfile.fulfilled,(state,action)=>{
            state.loading=false
            state.profile=action.payload
        }).addCase(getMyProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(addImageToProfile.pending,(state)=>{
            state.loading=true
        }).addCase(addImageToProfile.fulfilled,(state)=>{
            state.loading=false
        }).addCase(addImageToProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(deleteImageFromProfile.pending,(state)=>{
            state.loading=true
        }).addCase(deleteImageFromProfile.fulfilled,(state)=>{
            state.loading=false
        }).addCase(deleteImageFromProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        })
    }
})

export default userProfileSlice.reducer