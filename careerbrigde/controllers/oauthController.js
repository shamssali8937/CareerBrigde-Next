import { cookies } from "next/headers";
import { findUserByEmail, createUser } from "@/services/oauth";

export const handleSignIn = async ({ user, account, profile }) => {
  try {
    console.log("--- GOOGLE SIGN IN TRIGGERED ---");
    console.log("1. Google User Email:", user.email);

    // Safely await cookies (fixes Next.js 15+ crashes)
    const cookieStore = await cookies(); 
    const type = cookieStore.get("oauth_type")?.value;
    const role = cookieStore.get("oauth_role")?.value;

    console.log("2. Read Cookies -> Type:", type, "| Role:", role);

    const existingUser = await findUserByEmail(user.email);
    console.log("3. User found in MongoDB?:", !!existingUser);
    if (existingUser && (!existingUser.googleId || existingUser.googleId === null)) {
      console.log("❌ BLOCKED: User registered with Email/Password.");
      return "/Auth/Signin?error=UseEmail"; 
    }

    // LOGIN FLOW
    if (type === "login") {
      if (!existingUser) {
        console.log("❌ LOGIN FAILED: User not found in DB.");
        return false; 
      }
      console.log("✅ LOGIN SUCCESS: User exists.");
      return true; 
    }

    // SIGNUP FLOW
    if (type === "signup") {
      if (existingUser) {
        console.log("✅ SIGNUP SUCCESS: User already exists, letting them in.");
        return true;
      }

      if (!["jobseeker", "jobprovider"].includes(role)) {
        console.log("❌ SIGNUP FAILED: Role is invalid or missing:", role);
        return false;
      }

      console.log("4. Attempting to save new user to MongoDB...");
      await createUser({
        name: user.name,
        email: user.email,
        photo:{
          url:user.image,
          publicId:""  
        }, 
        role: role, 
        googleId: profile.sub,
      });

      console.log("✅ SIGNUP SUCCESS: User created in DB!");
      return true; 
    }

    console.log("❌ FALLBACK FAILED: Cookies were missing. Defaulting to block.");
    // Default Fallback
    if (existingUser) return true;
    return false;

  } catch (error) {
    console.error("🚨 CRITICAL ERROR DURING SIGN-IN:", error);
    return false;
  }
};