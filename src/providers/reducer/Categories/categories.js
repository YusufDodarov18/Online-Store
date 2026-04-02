import axiosRequest from "../../../api/axiosRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories=createAsyncThunk("/Category/addCategory", async()=>{
    try {
        const {data} = await axiosRequest.get(`/Category/get-categories`)
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const categorySlice=createSlice({
    name:"category",
    initialState:{
        categories:[],
        loading:false
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getCategories.pending,(state)=>{
            state.loading=true
        }).addCase(getCategories.fulfilled,(state,action)=>{
            state.loading=false
            state.categories=action.payload
        })
    }
})

export default categorySlice.reducer