import cookie from "cookie"; // import cookie
import { getXataClient } from "../../src/xata"; // import XataClient func
import { promisify } from "util";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const compare = promisify(bcrypt.compare); // to compare password
const xata = getXataClient(); // initialize XataClient
const KEY = "i_love_xata_&_cloudinary"; // JWT secret

const login = async (req, res) => {
  const { email, password } = req.body; // destructure user input from req.body
  const user = await xata.db.users.filter({ email }).getFirst(); // fetch user from database using email address

  const passwordsMatch = compare(password, user.password); // compare if passwords match

  if (passwordsMatch) {
    const token = jwt.sign({ email, password }, KEY); // create token
    // save the token as a cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
    );
    res.json({ userId: user.id }); // return user ID
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};
export default login;