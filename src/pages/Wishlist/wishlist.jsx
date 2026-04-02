import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../../app/theme/theme-context";
import { removeProductFromWishlist } from "../../providers/reducer/Likes/like";
import {addToCart} from "../../providers/reducer/Cart/cart"

export default function Wishlist() {
    const wishList=useSelector((store) => store.wishlist.wishlist);
    const dispatch=useDispatch();
    const { theme }=useTheme();

    return (
        <div className="px-4 md:px-20 py-20 max-w-[1248px] mx-auto">
            <header className="flex justify-between gap-3">
                <Typography variant="h6">Wishlist ({wishList.length})</Typography>
                <Button
                  variant="outlined"
                  disabled={wishList.length==0}
                  onClick={() => {
                    localStorage.removeItem("wishlist")
                    window.location = "/"
                    toast.success("Wishlist cleared");
                  }}
                >
                  Clear Wishlist
                </Button>
            </header>
            <Box className="flex justify-center flex-col md:flex-row items-center md:items-start gap-6 pt-10">
                {wishList.length > 0?(
                    wishList.map(elem => (
                        <Box key={elem.productId}>
                            <Box className={`${theme ? " bg-gray-800" : "bg-[#F5F5F5]"} w-[200px] h-[200px] px-2 flex justify-center items-center transition-transform duration-300 hover:scale-105 relative`}>
                                <Box className="flex justify-between gap-1">
                                    <img className="object-center w-[125px] h-35" src={`http://localhost:3000/images/${elem.images?.[0]?.image}`} />
                                    <Box className="flex flex-col absolute top-2 right-2 gap-2">
                                        <button
                                            className={`cursor-pointer ${theme ? "bg-gray-800" : "bg-white"} p-1 rounded-full`}
                                            onClick={() => {
                                                dispatch(removeProductFromWishlist({productId:elem.productId}));
                                                toast.success(`${elem.productName} removed from wishlist`,);
                                            }}
                                        >
                                          <DeleteOutlinedIcon />
                                        </button>
                                    </Box>
                                </Box>
                            </Box>
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={()=>dispatch(addToCart({productId:elem.productId}))}
                              sx={{
                                backgroundColor: theme ? "#d1d5dc" : "black",
                                color: theme ? "black" : "white",
                                display:"flex",
                                gap:1
                              }}
                            >
                                <ShoppingCartOutlinedIcon /> Add To Cart
                            </Button>
                            <Box className="flex flex-col gap-1 pt-2 pl-2">
                                <Typography className="font-bold " variant="h">{elem.productName}</Typography>
                                <Box>
                                    {elem.hasDisCount ? (
                                        <Box className="flex gap-4">
                                            <Typography>
                                                <b className="text-[#DB4444]">${elem.disCount}</b>
                                            </Typography>
                                            <Typography>
                                                <del className="text-gray-700">${elem.price}</del>
                                            </Typography>
                                        </Box>
                                    ) :(
                                        <Typography className="text-[#DB4444]">${elem.price}</Typography>
                                    )}
                               </Box>
                            </Box>
                        </Box>
                    ))
                ):(
                    <Typography>Your wishlist is empty.</Typography>
                )}
            </Box>
        </div>
    )
}
