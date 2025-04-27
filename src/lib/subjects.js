"use server";

import { eq } from "drizzle-orm";

import { db } from "./db";
import { subjects } from "./db/schema";

export async function addSubject(prevState, formData) {
  const name = formData.get("name");

  if (!name || name === "") {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  const existingSubject = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, name));

  if (existingSubject.length > 0) {
    return {
      success: false,
      error: "Предмет с таким названием уже существует",
    };
  }

  await db.insert(subjects).values({
    name,
  });

  return { success: true, error: "" };
}

export async function deleteSubjects(subjectId) {
  await db.delete(subjects).where(eq(subjects.id, parseInt(subjectId)));
}
