import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretkey = process.env.SECRET_KEY;

const createSecretToken = (id) => {
  return jwt.sign({ id }, secretkey, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;
