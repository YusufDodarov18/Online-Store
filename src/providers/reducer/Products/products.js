import axiosRequest from "../../../api/axiosRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getCart} from "../Cart/cart"

const initialState={
    loading:false,
    products:[],
    product:null,
    error:null,
}

export const getProducts=createAsyncThunk("/Product/getProducts",async(_,{dispatch})=>{
    try {
        const {data}= await axiosRequest.get(
            `/Products/get-products?PageSize=${100}`
        )
        await dispatch(getCart())
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const getProductById=createAsyncThunk("/Product/getProductById", async(productId)=>{
    try {
        const {data}=await axiosRequest.get(
            `/Products/get-products-by-id?productId=${productId}`
        )
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const productSlice=createSlice({
    name:"products",
    initialState:initialState,
    reducers:{},
    extraReducers:builder=>[
        builder.addCase(getProducts.pending,(state)=>{
            state.loading=true
        }).addCase(getProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(getProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.products=action.payload
        }).addCase(getProductById.pending,(state)=>{
            state.loading=true
        }).addCase(getProductById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(getProductById.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.product=action.payload
        })
    ]
})

export default productSlice.reducer