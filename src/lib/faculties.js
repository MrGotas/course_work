"use server";

import { eq } from "drizzle-orm";

import { db } from "./db";
import { faculties } from "./db/schema";

export async function addFaculty(prevState, formData) {
  const name = formData.get("name");

  if (!name || name === "") {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  const existingFaculty = await db
    .select()
    .from(faculties)
    .where(eq(faculties.name, name));

  if (existingFaculty.length > 0) {
    return {
      success: false,
      error: "Факультет с таким названием уже существует",
    };
  }

  await db.insert(faculties).values({
    name,
  });

  return { success: true, error: "" };
}

export async function deleteFaculty(facultyId) {
  await db.delete(faculties).where(eq(faculties.id, parseInt(facultyId)));
}
