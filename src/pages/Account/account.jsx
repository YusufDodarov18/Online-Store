import { Typography, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImageToProfile,
  changeProfile,
  deleteImageFromProfile,
  getMyProfile,
} from "../../providers/reducer/Account/account";
import { useNavigate } from "react-router-dom";
import useTheme from "../../app/theme/theme-context";
import Loading from "../../app/components/Layout/Loading/Loading";
import { API } from "../../api/axiosRequest";

const Account = () => {
  const { profile, error, loading } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setUserName(profile.userName || "");
      setPhoneNumber(profile.phoneNumber || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  function editProfile() {
    const profile = {
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
    };
    dispatch(changeProfile(profile));
  }

  let inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.3s ease",
      color: theme ? "#ffffff" : "#000000",
      "&:hover fieldset": {
        borderColor: theme ? "#60a5fa" : "#1976d2",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme ? "#475569" : "#d1d5db",
    },
    "& .MuiInputLabel-root": {
      color: theme ? "#cbd5e1" : "#6b7280",
    },
    "& .MuiInputBase-input::placeholder": {
      color: theme ? "#94a3b8" : "#9ca3af",
      opacity: 1,
    },
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-[1248px] mx-auto my-auto py-10 px-10">
      <header className="py-3">
        <h2 className="flex gap-2">
          <span className="text-gray-500 hover:underline">Home</span> /{" "}
          <p>My Account</p>
        </h2>
      </header>

      <main className="flex gap-14 flex-col md:flex-row my-10 pb-4 min-h-screen">
        <section className="flex flex-col shadow-none md:shadow-md w-full min-h-full max-w-[340px] md:w-[340px] rounded-lg py-4 px-5">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Manage My Account
          </Typography>
          <div className="w-full">
            <ul className="flex flex-col justify-center px-10 gap-2 pt-3 pb-7">
              <li className="text-red-400">My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </div>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            My Orders
          </Typography>
          <div className="w-full">
            <ul className="flex flex-col justify-center px-10 gap-2 pt-3 pb-7">
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            My WishList
          </Typography>
        </section>
        <section className="flex-1">
          <main className="w-full md:w-[500px] lg:w-[800px]  max-w-[1248px] shadow-none md:shadow-md h-full px-10 py-10">
            <Typography
              color="error"
              variant="body1"
              sx={{ fontWeight: "bold" }}
            >
              Profile
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-3 py-6 items-stretch">
              <Box className="md:col-span-2 grid grid-cols-2 gap-3">
                <TextField
                  label="UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  sx={inputStyle}
                />
                <TextField
                  label="Phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  sx={inputStyle}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={inputStyle}
                  className="col-span-2"
                />
              </Box>

              <Box className="flex flex-col justify-between items-center border rounded-lg p-3 h-full">
                {profile?.avatar ? (
                  <img
                    src={`${API}/images/${profile?.avatar}`}
                    alt="avatar"
                    className="w-[80px] h-[80px] rounded-full object-cover"
                  />
                ) : (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#E6F1FB" />
                    <circle cx="40" cy="32" r="14" fill="#85B7EB" />
                    <ellipse cx="40" cy="68" rx="22" ry="16" fill="#85B7EB" />
                    <circle
                      cx="40"
                      cy="40"
                      r="39.5"
                      stroke="#B5D4F4"
                      strokeWidth="1"
                    />
                  </svg>
                )}

                <Box className="flex flex-col gap-2 w-full mt-2">
                  <Button
                    size="small"
                    variant="outlined"
                    component="label"
                    fullWidth
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          dispatch(addImageToProfile(file));
                        }
                      }}
                    />
                  </Button>

                  {profile?.avatar && (
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => dispatch(deleteImageFromProfile())}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="mt-3">
              <Typography variant="body1">Password Changes</Typography>
              <Box className="grid grid-cols-1 gap-3 py-6">
                <TextField
                  label="Current passwod"
                  variant="outlined"
                  fullWidth
                  sx={inputStyle}
                />
                <Box className="grid grid-cols-2 gap-2">
                  <TextField
                    label="New passwod"
                    sx={inputStyle}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Confirm new passwsod"
                    variant="outlined"
                    fullWidth
                    sx={inputStyle}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="mt-3 flex justify-end flex-col-reverse md:flex-row items-center gap-5">
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                sx={{ width: { xs: "100%", md: "120px" } }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: { xs: "100%", md: "220px" } }}
                onClick={editProfile}
              >
                Save Changes
              </Button>
            </Box>
          </main>
        </section>
      </main>
    </div>
  );
};

export default Account;
