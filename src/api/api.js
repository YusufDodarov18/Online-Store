import { jwtDecode } from "jwt-decode";

export default function getInfo() {
  try {
    return jwtDecode(localStorage.getItem("token") || "");
  } catch (error) {
    console.error(error);
    throw new Error("Пользователь не зарегистрирован!");
  }
}
