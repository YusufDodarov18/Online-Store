import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let initialState={
    wishlist:JSON.parse(localStorage.getItem("wishlist"))||[]
}


export const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:initialState,
    reducers:{
        toggleWishlist:(state,action)=>{
            const isExistProduct=state.wishlist.find(elem=> 
                elem.productId==action.payload.productId
            )
            if(isExistProduct)
                {
                    state.wishlist= state.wishlist.filter(item=>
                         item.productId!=action.payload.productId
                    )
                    toast.success("Removed from wishlist")
                    localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
                }else {
                    state.wishlist.push(action.payload)
                    localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
                    toast.success("Added to wishlist")
                }
        },
        removeProductFromWishlist:(state,action)=>{
            let {productId}=action.payload
            state.wishlist=state.wishlist.filter((item)=>item.productId!==productId)
            localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
        }
    }
})

export const { toggleWishlist, removeProductFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;