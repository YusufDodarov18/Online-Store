

import { Link, useNavigate, useParams } from "react-router-dom"
import useTheme from "../../app/theme/theme-context"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getProductById, getProducts } from "../../providers/reducer/Products/products"
import Loading from "../../app/components/Layout/Loading/Loading"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { addToCart, decreaseProductInCart, getCart } from "../../providers/reducer/Cart/cart"
import { toggleWishlist } from "../../providers/reducer/Likes/like"
import Product from "../../app/components/ui/products"
import { API } from "../../api/axiosRequest"


const GetProductById = () => {
  const {theme}=useTheme()
  const {id}=useParams()

  const {products,product,loading}=useSelector(store=>store.products)
  const wishlist = useSelector((store) => store.wishlist.wishlist);
  const {cart}=useSelector(store=>store.cart)
  const dispatch=useDispatch()

  useEffect(()=> {
    if(id){
      dispatch(getProductById(id))
    }
  },[dispatch, id])

  useEffect(()=>{
     dispatch(getCart())
     dispatch(getProducts())
  },[dispatch])


  const [ratings, setRatings] = useState({});
  const [ratingById, setRatingsById] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const [activeImages,setActiveImages]=useState(null)

  let navigate=useNavigate()

  useEffect(()=> {
    if(product){
      setRatingsById({[product.productId]: Math.floor(Math.random()*5) + 1});
    }
  }, [product]);

    useEffect(() => {
      if (products.length) {
        const obj = {};
        products.forEach((p) => {
          obj[p.productId] = Math.floor(Math.random() * 5) + 1;
        });
        setRatings(obj);
      }
    }, [products]);

  useEffect(()=>{
    if(product?.images.length>0){
      setActiveImages(product.images[0])
    }
  },[product])


  if(!product){
    return <Loading/>
  }

  if(loading){
    return <Loading/>
  } 

  let findProduct=cart.find((elem)=>elem.product.productId===id) ||{quantity: 0, id: null };

  let {quantity, id:cartId}=findProduct

  const style = {
    cursor: "default",
    pointerEvents: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
    "&:focus": {
      backgroundColor: "transparent",
    },
    color: theme ? "white" : "black",
    fontSize: "18px",
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
  };

    return (
        <div className="px-6 md:px-20 py-14 max-w-[1248px] mx-auto">
            <Box className="flex justify-between">
                <Button onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                    Back
                </Button>
                <Typography variant="h6" className="font-semibold mb-8">More Detail</Typography>
            </Box>

            <Box className="flex justify-center pt-10">
                {product?.images?.length > 1 && activeImages ?(
                    <Box className={`flex flex-col lg:flex-row gap-10 ${theme ? "bg-gray-900" : "bg-white"}  p-6 rounded-2xl shadow-lg w-full max-w-6xl`}>
                        <Box className="flex flex-col-reverse md:flex-row gap-6">
                            <Box className="flex md:flex-col gap-3">
                                {
                                    product.images
                                    .filter((img)=>img.id!==activeImages.id)
                                    .map((img,index)=>(
                                        <Box key={index} className={`${theme ? "bg-gray-800" : "bg-[#F5F5F5]"} p-2 rounded-xl cursor-pointer hover:ring-2 hover:ring-red-400 transition`}>
                                            <img 
                                               src={"https://online-store-api-f0io.onrender.com/images/"+img.image} 
                                               alt={img.id} 
                                               className="w-[90px] h-[100px] object-contain"
                                               onClick={()=>setActiveImages(img)}
                                            />
                                        </Box>
                                    ))
                                }
                            </Box>
                            <Box className={`${theme ? "bg-gray-800" : "bg-[#F5F5F5]"} rounded-2xl p-4 flex justify-center items-center`}>
                                <img src={`${API}/images/${activeImages.image}`} className="w-[360px] object-contain" alt={product?.productName} />
                            </Box>
                        </Box>

                        <Box className="flex flex-col gap-4">
                            <Typography variant="h5" className="font-bold">{product.productName}</Typography>
                            <Box className="flex items-center gap-2">
                                <Rating
                                   value={ratingById[product.productId] || 0}
                                   size="small"
                                   readOnly
                                />
                                <Typography className="text-green-500 text-sm">In Stock</Typography>
                            </Box>
                            <Typography variant="h6" className="text-red-500 font-semibold">${product.price}</Typography>
                            <p className={`${theme ? "text-gray-300" : "text-gray-600"}`}>{product.description || "No description"}</p>
                            
                            {
                                product.colors.length>0&& (
                                    <Box className="flex items-center gap-3">
                                        <Typography className="font-medium">Colours:</Typography>
                                        <Box className="flex gap-2">
                                           {
                                             product.colors.map(elem=>(
                                                <Box
                                                  sx={{backgroundColor: elem.color,}}
                                                  key={elem.colorId}
                                                  className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition shadow"
                                                />
                                             )
                                            )
                                    }
                                </Box>
                            </Box>
                                )
                            }
                            <Box>
                                <Typography variant="h" sx={{ fontWeight: "bold" }}>View: {product.viewCount}</Typography>
                            </Box>

                            <Box className="flex flex-wrap items-center gap-4 pt-3">
                                 <Box className="flex">
                                      <Button
                                          sx={{ backgroundColor: "#DB4444" }}
                                          variant="contained"
                                          onClick={() =>dispatch(decreaseProductInCart(cartId))}
                                          >
                                            <RemoveIcon />
                                        </Button>
                                        <Button style={style}>{quantity}</Button>
                                        <Button
                                            sx={{ backgroundColor: "#DB4444" }}
                                            variant="contained"
                                            onClick={() =>dispatch(addToCart(product.productId))}
                                          >
                                            <AddIcon />
                                        </Button>
                                 </Box>

                                        <Button
                                           variant="contained"
                                           sx={{ bgcolor: "#DB4444" }}
                                           className="px-8"
                                           onClick={() => {
                                             dispatch(addToCart(product.productId));
                                           }}
                                         >
                                           Buy Now
                                        </Button>
                                        <Button variant="outlined" onClick={(e) =>dispatch(toggleWishlist(product))}>
                                            {
                                              wishlist.find((item) => item.productId == id) ? (
                                                <FavoriteIcon sx={{ color: "red" }} />
                                              ) : (
                                                  <FavoriteBorderIcon />
                                              )}
                                        </Button>
                            </Box>
                            <Box className="mt-6 space-y-3">
                                <Box className={`flex gap-4 items-center border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}>
                                     <LocalShippingIcon sx={{width:30,height:30}} />
                                     <Box>
                                          <Typography className="font-medium" variant="h6">Free Delivery</Typography>
                                          <p className="text-sm text-gray-500">
                                            Enter your postal code for Delivery Availability
                                          </p>
                                     </Box>
                                </Box>
                                <Box className={`flex gap-3 items-center border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}>
                                     <LoopIcon sx={{
                                                width:30,
                                                height:30    
                                                  }} />
                                     <Box>
                                        <Typography className="font-medium" variant="h6">Return Delivery</Typography>
                                        <p className="text-sm text-gray-500">
                                          Free 30 Days Delivery Returns
                                        </p>
                                     </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ):(
                    <Box>
                        <Box className={`flex flex-col lg:flex-row gap-10 ${theme ? "bg-gray-900" : "bg-white"}  p-6 rounded-2xl shadow-lg w-full max-w-6xl`}>
                            <Box className={`${theme ? "bg-gray-800" : "bg-[#F5F5F5]"} rounded-2xl p-4 flex justify-center items-center`}>
                                <img
                                   src={`${API}/images/${product?.images?.[0]?.image}`}
                                   className="w-[360px] object-contain"
                                   alt="product"
                                />
                            </Box>
                            <Box className="flex flex-col gap-4">
                              <Typography variant="h5" className="font-bold">{product.productName}</Typography>
                              <Box className="flex items-center gap-2">
                                  <Rating
                                    value={ratingById[product.productId] || 0}
                                    size="small"
                                    readOnly
                                  />
                                  <Typography className="text-green-500 text-sm">In Stock</Typography>
                              </Box>
                              {product.disCount?(
                                <Typography className="text-red-500 font-semibold" variant="h6">
                                  ${product.disCount}
                                </Typography>
                              ): (
                                <Typography className="text-red-500 font-semibold" variant="h6">
                                  ${product.price}
                                </Typography>
                              )}
                              <p className={`${theme ? "text-gray-300" : "text-gray-600"}`}>{product.description || "No description"}</p>

                                {
                                product.colors.length>0&& (
                                    <Box className="flex items-center gap-3">
                                        <Typography className="font-medium">Colours:</Typography>
                                        <Box className="flex gap-2">
                                           {
                                             product.colors.map(elem=>(
                                                <Box
                                                  sx={{backgroundColor: elem.color,}}
                                                  key={elem.colorId}
                                                  className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition shadow"
                                                />
                                             )
                                            )
                                    }
                                </Box>
                            </Box>
                                )
                            }
                                <Box>
                                  <Typography variant="h" sx={{ fontWeight: "bold" }}>
                                    View: {product.viewCount}
                                  </Typography>
                                </Box>
                                
                                <Box className="flex flex-wrap items-center gap-4 pt-3">
                                    <Box className="flex">
                                        <Button
                                            sx={{ backgroundColor: "#DB4444" }}
                                            variant="contained"
                                            onClick={() => dispatch(decreaseProductInCart(cartId))}
                                          >
                                            <RemoveIcon />
                                          </Button>
                                        <Button style={style}>{quantity}</Button>
                                        <Button
                                          sx={{ backgroundColor: "#DB4444" }}
                                          variant="contained"
                                          onClick={() => dispatch(addToCart(product.productId))}
                                        >
                                           <AddIcon />
                                        </Button>
                                </Box>
                                <Button
                                  variant="contained"
                                  sx={{ bgcolor: "#DB4444" }}
                                  className="px-8"
                                  onClick={() => dispatch(addToCart(product.productId))}
                                >
                                    Buy Now
                                </Button>
                                <Button variant="outlined" onClick={(e) =>dispatch(toggleWishlist(product))}>
                                  {
                                   wishlist.find((item) => item.productId === id) ? (
                                     <FavoriteIcon sx={{ color: "red" }} />
                                   ) : (
                                     <FavoriteBorderIcon />
                                   )}
                                </Button>
                            </Box>

                            <Box className="mt-6 space-y-3">
                                <Box className={`flex gap-4 items-center border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}>
                                     <LocalShippingIcon sx={{width:30,height:30}} />
                                     <Box>
                                          <Typography className="font-medium" variant="h6">Free Delivery</Typography>
                                          <p className="text-sm text-gray-500">
                                            Enter your postal code for Delivery Availability
                                          </p>
                                     </Box>
                                </Box>
                                <Box className={`flex gap-3 items-center border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}>
                                     <LoopIcon sx={{
                                                width:30,
                                                height:30    
                                                  }} />
                                     <Box>
                                        <Typography className="font-medium" variant="h6">Return Delivery</Typography>
                                        <p className="text-sm text-gray-500">
                                          Free 30 Days Delivery Returns
                                        </p>
                                     </Box>
                                </Box>
                            </Box>
              </Box>
            </Box>
          </Box>
                )}
            </Box>

            <Box className="pt-[58px]">
                <Box className="flex md:flex-row gap-[10px] items-center mb-6">
                    <Box className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
                    <Typography variant="h6" className="text-[#DB4444] font-semibold">Related Item</Typography>
                </Box>
                <div className="flex justify-between flex-col md:flex-row"></div>
            </Box>

            <Box>
                <Box className="flex gap-6 flex-wrap justify-center">
                    {
                        products.filter((el)=>el.productId !== id).map((el) =>{
                           const isHovered = hoveredId === el.productId;
                           return (
                              <Link to={`/product/get-product-by-id/${el.productId}`}>
                                  <Product
                                    el={el}
                                    setHoveredId={setHoveredId}
                                    isHovered={isHovered}
                                    ratings={ratings}
                                  />
                              </Link>
                           )
                        })
                    }
                </Box>
            </Box>
        </div>
    )
}

export default GetProductById