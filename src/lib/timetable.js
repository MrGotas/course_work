"use server";

import { and, eq } from "drizzle-orm";

import { db } from "./db";
import { timetable } from "./db/schema";

export async function createTimetableEntry(prevState, formData) {
  const groupId = formData.get("groupId");
  const day = formData.get("day");
  const time = formData.get("time");
  const subjectId = formData.get("subjectId");
  const teacherId = formData.get("teacherId");
  const lessonType = formData.get("lessonType");
  const classroom = formData.get("classroom");

  if (
    !groupId ||
    !day ||
    day == "" ||
    !time ||
    time == "" ||
    !subjectId ||
    subjectId == "" ||
    !teacherId ||
    teacherId == "" ||
    !lessonType ||
    lessonType == "" ||
    !classroom ||
    classroom == ""
  ) {
    return { success: false, error: "Пожалуйста, заполните все поля" };
  }

  const existingEntry = await db
    .select()
    .from(timetable)
    .where(
      and(
        eq(timetable.name, groupId),
        eq(timetable.day, day),
        eq(timetable.time, time),
      ),
    );

  if (existingEntry.length > 0) {
    return {
      success: false,
      error: "Расписание на это время уже существует",
    };
  }

  await db.insert(timetable).values({
    groupId: parseInt(groupId),
    day,
    time,
    subjectId: parseInt(subjectId),
    teacherId: parseInt(teacherId),
    lessonType,
    classroom,
  });

  return { success: true, error: "" };
}

export async function deleteTimetableEntry(entryId) {
  await db.delete(timetable).where(eq(timetable.id, parseInt(entryId)));
  return { success: true, error: "" };
}
