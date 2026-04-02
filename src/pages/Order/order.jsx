import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "../../app/theme/theme-context";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../providers/reducer/Cart/cart";
import { pink } from "@mui/material/colors";
import cards from "../../app/assets/cards.png";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const Order = () => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (!token || cart?.length === 0) {
      navigate("/");
    }
  }, [dispatch, token, cart?.length, navigate]);

  let subtotal =
    cart.length > 0
      ? cart.reduce((acc, elem) => {
          return (
            acc +
            (elem.product.disCount
              ? Number(elem.product.disCount) * elem.quantity
              : Number(elem.product.price) * elem.quantity)
          );
        }, 0)
      : 0;

  const styleInput = {
    mt: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.3s ease",
      color: theme ? "#ffffff" : "#000000",
      "&:hover fieldset": {
        borderColor: theme ? "#60a5fa" : "#1976d2",
      },
      "& .MuiInputLabel-root": {
        color: theme ? "#cbd5e1" : "#6b7280",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme ? "#475569" : "#d1d5db",
    },
    "& .MuiInputBase-input::placeholder": {
      color: theme ? "#94a3b8" : "#9ca3af",
      opacity: 1,
    },
  };

  return (
    <Box className="p-10 max-w-[1248px] mx-auto">
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
        Order
      </Typography>
      <Box component="form" className="flex gap-10 flex-col md:flex-row">
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Billing Details
          </Typography>

          <Box className="flex flex-col gap-2">
            <TextField sx={styleInput} placeholder="First name" fullWidth />
            <TextField sx={styleInput} placeholder="Last name" fullWidth />
            <TextField sx={styleInput} placeholder="Address" fullWidth />
            <TextField sx={styleInput} placeholder="Phone number" fullWidth />
            <Box
              component="textarea"
              placeholder="Message"
              style={{
                height: "100px",
                padding: "12px",
                color: theme ? "white" : "black",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: theme ? "#475569" : "#ccc",
                backgroundColor: "transparent",
                fontFamily: "inherit",
                resize: "none",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Checkbox
              {...label}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
            <Typography variant="body1">
              Save this information for faster check-out next time
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          {cart?.map((product) => (
            <Box
              key={product.id}
              className="flex items-center justify-between mb-2"
            >
              <Box className="flex items-center gap-4">
                <img
                  src={`http://localhost:3000/images/${product.product.image}`}
                  alt="product"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <Typography>{product.product.productName}</Typography>
              </Box>
              <Typography>${product.product.price}</Typography>
            </Box>
          ))}

          <Box className="mt-4 flex flex-col gap-2">
            <Box className="flex justify-between mb-3">
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal}</Typography>
            </Box>
            <Box className="flex justify-between mb-3">
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>

            <Box sx={{ borderTop: "1px solid #ddd", pt: 2 }}>
              <Box className="flex justify-between mb-3">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${subtotal}
                </Typography>
              </Box>

              <Box className="flex mt-3 flex-col gap-3 mb-2">
                <Box>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="bank"
                    name="radio-buttons-group"
                  >
                    <Box className="flex w-full gap-1 justify-between">
                      <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label="Bank"
                      />
                      <img
                        src={cards}
                        className="w-[180px] h-[40px] object-contain md:w-[320px]"
                      />
                    </Box>
                    <FormControlLabel
                      value="Cash on delivery"
                      control={<Radio />}
                      label="Cash on delivery"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    borderRadius: 2,
                  }}
                >
                  <TextField
                    placeholder="Coupon Code"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "56px",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        color: theme ? "white" : "black",
                      },
                    }}
                  />

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      height: "56px",
                      px: 4,
                      fontWeight: 600,
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#DB4444",
                  py: 1.5,
                  "&:hover": { bgcolor: "#c73b3b" },
                }}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
