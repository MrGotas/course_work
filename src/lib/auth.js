"use server";

import { redirect } from "next/navigation";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";

import { db } from "./db";
import { users } from "./db/schema";
import { deleteSession, setSession } from "./sessions";

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || email === "" || !password || password === "") {
    return { error: "Пожалуйста, заполните все поля" };
  }

  const user = await db.select().from(users).where(eq(users.email, email));

  if (!user[0]) {
    return { error: "Неверный email или пароль" };
  }

  const isPasswordValid = await argon2.verify(user[0].hashedPassword, password);

  if (!isPasswordValid) {
    return { error: "Неверный email или пароль" };
  }

  await setSession(user[0].id);

  if (user[0].role === "admin") {
    redirect("/admin");
  }

  if (user[0].role === "manager") {
    redirect("/dashboard");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
