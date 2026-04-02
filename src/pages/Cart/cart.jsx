import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../../app/theme/theme-context";
import {
  addToCart,
  clearCart,
  decreaseProductInCart,
  deleteProductFromCart,
  getCart,
} from "../../providers/reducer/Cart/cart";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { BrushCleaning, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { API } from "../../api/axiosRequest";

const Cart = () => {
  const { theme } = useTheme();
  const { cart, loading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const naviage = useNavigate();

  useEffect(() => {
    if (!token) {
      naviage("/");
    }
  }, [naviage, token]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const subTotal =
    cart?.length > 0
      ? cart.reduce((acc, cur) => {
          return (
            acc +
            (cur?.product?.disCount
              ? Number(cur?.product?.disCount) * cur.quantity
              : Number(cur?.product?.price) * cur.quantity)
          );
        }, 0)
      : 0;

  return (
    <Box sx={{ padding: 4, maxWidth: "1248px", marginX: "auto" }}>
      <Box className="flex items-start justify-start gap-3">
        <ShoppingCartIcon className="font-black text-red-500" />
        <Typography variant="h" sx={{ mb: 3, fontWeight: "900", fontSize: 17 }}>
          My Cart
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme ? "#1e2939" : "",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: theme ? "#364153" : "#f5f5f5" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: theme ? "white" : "",
                }}
              >
                Product
              </TableCell>
              <TableCell
                sx={{
                  color: theme ? "white" : "",
                }}
              >
                Category
              </TableCell>
              <TableCell
                sx={{
                  color: theme ? "white" : "",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  color: theme ? "white" : "",
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && cart.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : cart?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box
                    className={`flex flex-col items-center justify-center gap-2 py-4 ${theme ? "text-white" : ""}`}
                  >
                    <BrushCleaning size={40} />
                    <Typography variant="h6" align="center">
                      Your cart is currently empty.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              cart?.map((product) => (
                <TableRow key={product.product.productId}>
                  <TableCell
                    sx={{
                      color: theme ? "white" : "",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <img
                        src={`${API}/images/${product?.product.image}`}
                        alt={product.product?.productName}
                        width={50}
                        style={{ borderRadius: 5 }}
                      />
                      <Typography>{product.product?.productName}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      color: theme ? "white" : "",
                      textIndent: "8px",
                    }}
                  >
                    {product.product.category}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: theme ? "white" : "",
                    }}
                  >
                    <Box className="flex gap-2 items-center w-fit px-5 justify-between border-1 rounded-lg border-gray-400">
                      <Typography>{product.quantity}</Typography>
                      <Box className="flex flex-col ">
                        <KeyboardArrowUpIcon
                          onClick={() => {
                            dispatch(addToCart(product.product.productId));
                          }}
                          className="cursor-pointer"
                        />
                        <KeyboardArrowDownIcon
                          onClick={() =>
                            dispatch(decreaseProductInCart(product.id))
                          }
                          className="cursor-pointer"
                        />
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      textIndent: "6px",
                      color: theme ? "white" : "",
                    }}
                  >
                    <Box
                      className="flex items-center gap-3"
                      onClick={() =>
                        dispatch(
                          deleteProductFromCart(product.product?.productId),
                        )
                      }
                    >
                      $
                      {product.product.disCount
                        ? Number(product.product.disCount) * product.quantity
                        : Number(product.product.price) * product.quantity}
                      <IconButton
                        sx={{
                          bgcolor: "#fc034a",
                          color: "white",
                          width: "25px",
                          height: "24px",
                          "&:hover": {
                            bgcolor: "#DB4444",
                          },
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex justify-between pt-5 pb-20 flex-col md:flex-row gap-3">
        <Link to={`/`}>
          <Button variant="outlined" fullWidth>
            Return To Shop
          </Button>
        </Link>
        <Button
          color="error"
          className="flex justify-center items-center gap-2"
          variant="outlined"
          onClick={() => {
            dispatch(clearCart());
          }}
          disabled={cart?.length === 0}
        >
          <BrushCleaning />
          Clear Cart
        </Button>
      </Box>
      {cart?.length !== 0 && (
        <Box className="flex items-center  md:justify-end pt-10 pr-20 pb-20 r">
          <Box
            className={`border-[1px] rounded-xl shadow-lg ${theme ? "border-white bg-gray-800" : "border-gray-800"} px-10 pt-6 pb-8`}
          >
            <Typography variant="h6" className="mb-4 font-semibold text-lg">
              Cart Total
            </Typography>

            <Box className="space-y-3 mb-4 ">
              <Box className="flex justify-between pt-3">
                <Typography className="">Subtotal:</Typography>
                <Typography className="font-medium ">${subTotal}</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography className="">Shipping:</Typography>
                <Typography className="font-medium">Free</Typography>
              </Box>
            </Box>

            <hr className="border-gray-300 dark:border-gray-700 mb-4" />

            <Box className="space-y-4">
              <Box className="flex justify-between items-center">
                <Typography variant="h6" className="font-semibold text-lg">
                  Total:
                </Typography>
                <Typography
                  className="font-bold text-xl"
                  sx={{ fontWeight: "bold" }}
                >
                  ${subTotal}
                </Typography>
              </Box>

              <Link to={`/order`}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#DB4444",
                    "&:hover": { backgroundColor: "#c23333" },
                    borderRadius: "8px",
                    paddingY: 1.5,
                    fontWeight: "bold",
                    mt: 3,
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
