import axiosRequest from "../../../api/axiosRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers=createAsyncThunk("Users/getUsers",async()=> {
    try {
        const {data}= await axiosRequest.get(`/Users/get-users?PageSize=${50}`)
        return data.data
    } catch (error) {
        console.error(error)
        throw new Error("У пользователя нет токена.")
    }
})

export const getSearchUsers=createAsyncThunk("Users/SearchUsers",async({name})=> {
    try {
        const {data}= await axiosRequest.get(
            `/Users/get-users?userName=${name}`
        )
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const getRolesUsers=createAsyncThunk("Users/getUserRoles",async()=> {
    try {
        const {data}=await axiosRequest.get(
            `/Users/get-users-roles?PageSize=${100}`
        ) 
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const userGetRoleUserById=createAsyncThunk("Users/getUserRoleById",async(id, {dispatch,rejectWithValue})=> {
    try {
        const {data}=await axiosRequest.get(
            `/Users/get-user-role?userId=${id}`
        ) 
        return data.data
    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const addRole=createAsyncThunk("Users/addRoleToUser",async(id, {dispatch,rejectWithValue})=> {
    try {
        const {data}=await axiosRequest.post(
            `/Roles/add-role-admin-to-user?userId=${id}`
        ) 
        await dispatch(getRolesUsers())
        return data.data
    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const removeRole=createAsyncThunk("Users/deleteRoleFromUser",async(id, {dispatch,rejectWithValue})=> {
    try {
        const {data}=await axiosRequest.delete(
            `/Roles/delete-role-admin-from-user?userId=${id}`
        ) 
        await dispatch(getRolesUsers())
        return data.data
    } catch (error) {
        console.error(error)
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const usersSlice= createSlice({
    name:"users",
    initialState:{
        users:[],
        loading:false,
        error:null,
        searchUsers:[],
        userRoles:[],
        userRole:null,
    },
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.loading=true
        }).addCase(getUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload
        }).addCase(getUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(getSearchUsers.pending,(state)=>{
            state.loading=true
        }).addCase(getSearchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.searchUsers=action.payload
        }).addCase(getSearchUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(getRolesUsers.pending,(state)=>{
            state.loading=true
        }).addCase(getRolesUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.userRoles=action.payload
        }).addCase(getRolesUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(userGetRoleUserById.pending,(state)=>{
            state.loading=true
        }).addCase(userGetRoleUserById.fulfilled,(state,action)=>{
            state.loading=false
            state.userRole=action.payload
        }).addCase(userGetRoleUserById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(addRole.pending,(state)=>{
            state.loading=true
        }).addCase(addRole.fulfilled,(state,action)=>{
            state.loading=false
            state.userRoles=action.payload
        }).addCase(addRole.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(removeRole.pending,(state)=>{
            state.loading=true
        }).addCase(removeRole.fulfilled,(state,action)=>{
            state.loading=false
            state.userRoles=action.payload
        }).addCase(removeRole.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        })
    }
})