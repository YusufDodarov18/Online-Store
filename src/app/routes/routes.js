import { lazy } from "react";

export const About=lazy(()=>import("../../pages/About/about"))
export const Contact=lazy(()=>import("../../pages/Contact/contact.jsx"))
export const Login=lazy(()=>import("../../pages/Login/login"))
export const Register=lazy(()=>import("../../pages/Registration/registration"))
export const Cart=lazy(()=>import("../../pages/Cart/cart"))
export const Order=lazy(()=>import("../../pages/Order/order"))
export const Wishlist=lazy(()=>import("../../pages/Wishlist/wishlist.jsx"))
export const GetProduct=lazy(()=>import("../../pages/GetProductById/productById"))
export const Account=lazy(()=>import("../../pages/Account/account.jsx"))