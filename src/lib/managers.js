"use server";

import * as argon2 from "argon2";
import { eq } from "drizzle-orm";

import { db } from "./db";
import { users } from "./db/schema";

export async function addManager(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || email === "" || !password || password === "") {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "Пользователь с таким email уже существует",
    };
  }

  await db.insert(users).values({
    email,
    hashedPassword: await argon2.hash(password),
    role: "manager",
  });

  return { success: true, error: "" };
}

export async function deleteManager(managerId) {
  await db.delete(users).where(eq(users.id, parseInt(managerId)));
}
