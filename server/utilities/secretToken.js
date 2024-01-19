import jwt from "jsonwebtoken";

const secretkey = "aWNhcnVzaGFzZmFsbGVu";

const createSecretToken = (id) => {
  return jwt.sign({ id }, secretkey, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;
