import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { About, Account, Cart, Contact, GetProduct, Login, Order, Register, Wishlist } from "../routes/routes"
import { Suspense } from "react"
import Loading from "../components/Layout/Loading/Loading"
import Home from "../../pages/Home/home"
import HomeLayout from "../../pages/HomeLayout/home"
import NotFound from "../../pages/NotFound/not-found"
import Search from "../../pages/Search/search"

export const Layout=()=>{
    const router=createBrowserRouter([
        {
            path:"/",
            element:<HomeLayout/>,
            children:[
                {
                    index:true,
                    element: <Home/>
                },
                {
                    path:"/contact",
                    element:<Contact/>
                },
                {
                    path:"/about",
                    element:<About/>
                },
                {
                    path:"/sign-in", 
                    element:<Login/>
                },
                {
                    path:"/sign-up",
                    element:<Register/>
                },
                {
                    path:"/wishlist",
                    element:<Wishlist/>
                },
                {
                    path:"/product/get-product-by-id/:id",
                    element:<GetProduct/>
                },
                {
                    path:"/cart",
                    element:<Cart/>
                },
                {
                    path:"/order",
                    element:<Order/>
                },
                {
                    path:"/search/:query",
                    element:<Search/>
                },
                {
                    path: "/account/changeAccount",
                    element:<Account/>
                }
            ]
        },
        {
            path: "*",
            element:<NotFound />
        }
    ])
    return (
        <Suspense fallback={<Loading/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}