import argon2 from "argon2";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const registerUser = async (email: string, password: string) => {
  try {
    if (email === "" || password === "") {
      return Error("Email and password are required");
    }

    const [checkEmail] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (checkEmail) {
      return Error("Email already exists");
    }

    const hashPassword: string = await argon2.hash(password);
    const [insertUser] = await db.insert(users).values({
      id: uuid().toString(),
      email,
      password: hashPassword,
    });

    if (!insertUser) {
      return Error("Failed to create user");
    }

    return "User created";
  } catch (error) {
    return error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    if (email === "" || password === "") {
      return Error("Email and password are required");
    }

    const [checkUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!checkUser) {
      return Error("Email does not exist");
    }

    const verifyPassword = await argon2.verify(checkUser.password!, password);

    if (!verifyPassword) {
      return Error("Invalid password");
    }

    return checkUser.id;
  } catch (error) {
    return error;
  }
};
