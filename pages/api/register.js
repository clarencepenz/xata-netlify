// pages/api/register.js
import { getXataClient } from "../../src/xata"; // import XataClient func
import { promisify } from "util";
import bcrypt from "bcryptjs"; // bcrypt to hash user password

const hash = promisify(bcrypt.hash); // hash password
const xata = getXataClient(); // initialize XataClient

export default async function register(req, res) {
  const { firstname, lastname, email, password } = req.body; // destructure user input from req.body
  const userExist = await xata.db.users.filter({ email }).getFirst(); // fetch user from database using email address

  if (userExist) {
    res.status(400);
    throw new Error("User already exists"); // throw error if user with email already exists
  }

  // CREATE A NEW USER IF NO USER WITH THE EMAIL ADDRESS EXISTS
  const user = await xata.db.users.create({
    firstname,
    lastname,
    email,
    password: await hash(password, 10),
  });

  res.json({ message: "Success" });
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }
}