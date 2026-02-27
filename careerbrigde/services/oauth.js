import connect from "@/Lib/dbConfig/dbConfig";
import user from "@/models/user";

export const findUserByEmail = async (email) => {
  await connect();
  return await user.findOne({ email });
};

export const createUser = async ({ name, email, photo, role, googleId }) => {
  await connect();

  const newUser = new user({
    name,
    email,
    photo,
    role,
    googleId,
  });

  await newUser.save();
  return newUser;
};