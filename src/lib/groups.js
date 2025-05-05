"use server";

import { eq } from "drizzle-orm";

import { db } from "./db";
import { groups } from "./db/schema";

export async function addGroup(prevState, formData) {
  const name = formData.get("name");
  const facultyId = formData.get("facultyId");
  const grade = formData.get("grade");
  const directionId = formData.get("directionId");
  const type = formData.get("type");
  const level = formData.get("level");

  if (
    !name ||
    name === "" ||
    !facultyId ||
    facultyId === "" ||
    !grade ||
    grade === "" ||
    !directionId ||
    directionId === "" ||
    !type ||
    type === "" ||
    !level ||
    level === ""
  ) {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  const existignGroup = await db
    .select()
    .from(groups)
    .where(eq(groups.name, name));

  if (existignGroup.length > 0) {
    return {
      success: false,
      error: "Группа с таким названием уже существует",
    };
  }

  await db.insert(groups).values({
    name,
    facultyId: parseInt(facultyId),
    grade: parseInt(grade),
    directionId: parseInt(directionId),
    type,
    level,
  });

  return { success: true, error: "" };
}

export async function deleteGroup(groupId) {
  await db.delete(groups).where(eq(groups.id, parseInt(groupId)));
}
