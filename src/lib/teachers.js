"use server";

import { eq } from "drizzle-orm";

import { db } from "./db";
import { teachers } from "./db/schema";

export async function addTeacher(prevState, formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const middleName = formData.get("middleName");

  if (
    !firstName ||
    firstName === "" ||
    !lastName ||
    lastName === "" ||
    !middleName ||
    middleName === ""
  ) {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  await db.insert(teachers).values({
    firstName,
    lastName,
    middleName,
  });

  return { success: true, error: "" };
}

export async function deleteTeacher(teacherId) {
  await db.delete(teachers).where(eq(teachers.id, parseInt(teacherId)));
}
