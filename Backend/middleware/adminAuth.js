import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
export default adminAuth;
// not used yet.
//the middleware convert the token in to userId.
// when we are sending the token it will check the token and if the token is valid then continue the process of add,update and delete the foods.
