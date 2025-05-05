"use server";

import { eq } from "drizzle-orm";

import { db } from "./db";
import { directions, subjects } from "./db/schema";

export async function addDirection(prevState, formData) {
  const name = formData.get("name");

  if (!name || name === "") {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  const existingDirection = await db
    .select()
    .from(directions)
    .where(eq(directions.name, name));

  if (existingDirection.length > 0) {
    return {
      success: false,
      error: "Направление с таким названием уже существует",
    };
  }

  await db.insert(directions).values({
    name,
  });

  return { success: true, error: "" };
}

export async function deleteDirection(directionId) {
  await db.delete(directions).where(eq(directions.id, parseInt(directionId)));
}
