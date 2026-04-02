import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../../api/axiosRequest";
import toast from "react-hot-toast";

const initialState={
    cart:[],
    loading:false,
    error:null
}

export const getCart=createAsyncThunk("Cart/getCart", async(_, {rejectWithValue})=>{
    try {
        const {data}= await axiosRequest.get("/Cart/get-products-from-cart")
        return data.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "error")
    }
})

export const addToCart=createAsyncThunk("Cart/addToCart", async(productId,{dispatch, getState,rejectWithValue})=>{
    try {
        const { cart }=getState().cart
        const existProduct=cart.find(elem=> elem.product.productId==productId)
        
        const { data }=await axiosRequest.post(
            `/Cart/add-product-to-cart?productId=${productId}`
        )

        if(existProduct){
            toast.success("product increased!");
        }else{
            toast.success("product added successfully!")
        }
        dispatch(getCart())
        return { id: data.id, productId }
    } catch (error) {
        toast.error("User is not registered!")
    }
})

export const deleteProductFromCart=createAsyncThunk("Cart/deleteProductFromCart", async(id)=>{
    try {
        await axiosRequest.delete(`/Cart/delete-product-from-cart?productId=${id}`)
        toast.success("product deleted successfully!")
        return id
    } catch (error) {
        console.error(error)
    }
})

export const decreaseProductInCart=createAsyncThunk("Cart/decreaseProductInCart", async(id)=>{
    try {
        await axiosRequest.delete(`/Cart/decrease-product-in-cart?id=${id}`)
        return id
    } catch (error) {
        console.error(error)
    }
})

export const clearCart=createAsyncThunk("Cart/clearCart", async()=>{
    try {
        await axiosRequest.delete('/Cart/clear-cart')
        toast.success("cart cleared successfully");
    } catch (error) {
        console.error(error)
    }
})

export const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getCart.pending,(state)=>{
            state.loading=true
        }).addCase(getCart.fulfilled,(state,action)=>{
            state.loading=false
            state.cart=action.payload
        }).addCase(getCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(addToCart.pending,(state)=>{
            state.loading=true
        }).addCase(addToCart.fulfilled,(state)=>{
            state.loading=false
        }).addCase(addToCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(deleteProductFromCart.pending,(state)=>{
            state.loading=true
        }).addCase(deleteProductFromCart.fulfilled,(state,action)=>{
            state.loading=false
            state.cart=state.cart.filter(el=>el?.product.productId!==action.payload)
        }).addCase(deleteProductFromCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(decreaseProductInCart.pending,(state)=>{
            state.loading=true
        }).addCase(decreaseProductInCart.fulfilled,(state,action)=>{
            state.loading=false
            // state.cart=state.cart.map(el=> {
            //     if(el.id===action.payload){
            //         if(el.quantity===1){
            //             state.cart=state.cart.filter((elem,i)=>elem.product.productId!==action.payload)
            //             toast.success("product deleted from list!")
            //         }else{
            //             return {...el, quantity: el.quantity-1}
            //         }
            //     }
            //     return el
            // })
            const item=state.cart.find((item)=>item.id==action.payload)
            if(item){
                if(item.quantity===1){
                    state.cart=state.cart.filter((elem)=>elem.id!==action.payload)
                    toast.success("Product deleted from list!");
                }else {
                    item.quantity-=1
                    toast.success("product decreased!");        
                }
            }
        }).addCase(decreaseProductInCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(clearCart.pending,(state)=>{
            state.loading=true
        }).addCase(clearCart.fulfilled,(state)=>{
            state.loading=false
            state.cart=[]
        }).addCase(clearCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        })
    }
})

export default cartSlice.reducer