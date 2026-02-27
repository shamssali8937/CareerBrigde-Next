import { findUserByEmail, createUser } from "@/services/oauth";

export const handleSignIn = async ({ user, account, profile }) => {

  let state = {};

  try {
    state = JSON.parse(account?.state || "{}");
  } catch (err) {
    return false;
  }

  const { type, role } = state;

  const existingUser = await findUserByEmail(user.email);

  // LOGIN FLOW
  if (type === "login") {
    if (!existingUser) return false;
    return true;
  }

  // SIGNUP FLOW
  if (type === "signup") {

    if (existingUser) return true;

    if (!["jobseeker", "jobprovider"].includes(role))
      return false;

    await createUser({
      name: user.name,
      email: user.email,
      photo: user.image,
      role,
      googleId: profile.sub,
    });

    return true;
  }

  return false;
};