import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
let secretKey = "thisIsClicksSecretKey";
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.log(err)
    if(err.name == "TokenExpiredError"){
      localStorage.removeItem("ClickAppUser");
      localStorage.removeItem("ClickAppToken");
      location.reload();
    }
  }
};
