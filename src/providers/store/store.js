import { configureStore } from "@reduxjs/toolkit";
import products from "../reducer/Products/products"
import category from "../reducer/Categories/categories"
import wishlist from "../reducer/Likes/like"
import users from "../reducer/Categories/categories"
import cart from "../reducer/Cart/cart"
import account from "../reducer/Account/account"

export const store=configureStore({
    reducer:{
        products:products,
        category:category,
        users:users,
        cart:cart,
        account:account,
        wishlist:wishlist,
    }
})