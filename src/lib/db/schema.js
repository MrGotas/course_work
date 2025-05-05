import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const userRoles = ["admin", "manager"];

export const eduTypes = ["bachelor", "specialist", "magister"];
export const eduLevel = ["full_time", "part_time", "full_part_time"];

export const lessonType = ["lecture", "practice", "lab"];
export const day = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const time = [
  "8:30-10:00",
  "10:15-11:45",
  "12:00-13:30",
  "14:00-15:30",
  "15:45-17:15",
  "17:30-19:00",
  "19:15-20:45",
  "21:00-22:30",
];

export const userRolePgEnum = pgEnum("user_roles", userRoles);

export const eduTypePgEnum = pgEnum("edu_types", eduTypes);
export const eduLevelPgEnum = pgEnum("edu_levels", eduLevel);

export const lessonTypePgEnum = pgEnum("lesson_types", lessonType);

export const dayPgEnum = pgEnum("days", day);

export const users = pgTable("users", (t) => ({
  id: t.serial().primaryKey(),
  email: t.text().notNull().unique(),
  hashedPassword: t.text("hashed_password").notNull(),
  role: userRolePgEnum().default("manager").notNull(),
}));

export const sessions = pgTable("sessions", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  userId: t
    .integer("user_id")
    .notNull()
    .references(() => users.id),
}));

export const faculties = pgTable("faculties", (t) => ({
  id: t.serial().primaryKey(),
  name: t.text().notNull(),
}));

export const directions = pgTable("directions", (t) => ({
  id: t.serial().primaryKey(),
  name: t.text().notNull(),
}));

export const groups = pgTable("groups", (t) => ({
  id: t.serial().primaryKey(),
  name: t.text().notNull(),
  facultyId: t
    .integer("faculty_id")
    .notNull()
    .references(() => faculties.id),
  grade: t.integer().notNull(),
  directionId: t
    .integer("direction_id")
    .notNull()
    .references(() => directions.id),
  type: eduTypePgEnum().notNull(),
  level: eduLevelPgEnum().notNull(),
}));

export const groupsRelations = relations(groups, ({ one }) => ({
  faculty: one(faculties, {
    fields: [groups.facultyId],
    references: [faculties.id],
  }),
  direction: one(directions, {
    fields: [groups.directionId],
    references: [directions.id],
  }),
}));

export const subjects = pgTable("subjects", (t) => ({
  id: t.serial().primaryKey(),
  name: t.text().notNull(),
}));

export const teachers = pgTable("teachers", (t) => ({
  id: t.serial().primaryKey(),
  firstName: t.text("first_name").notNull(),
  lastName: t.text("last_name").notNull(),
  middleName: t.text("middle_name").notNull(),
}));

export const timetable = pgTable("timetable", (t) => ({
  id: t.serial().primaryKey(),
  groupId: t
    .integer("group_id")
    .notNull()
    .references(() => groups.id),
  day: dayPgEnum().notNull(),
  time: t.text().notNull(),
  subjectId: t
    .integer("subject_id")
    .notNull()
    .references(() => subjects.id),
  teacherId: t
    .integer("teacher_id")
    .notNull()
    .references(() => teachers.id),
  lessonType: lessonTypePgEnum().notNull(),
  classroom: t.text().notNull(),
}));

export const timetableRelations = relations(timetable, ({ one }) => ({
  group: one(groups, {
    fields: [timetable.groupId],
    references: [groups.id],
  }),
  subject: one(subjects, {
    fields: [timetable.subjectId],
    references: [subjects.id],
  }),
  teacher: one(teachers, {
    fields: [timetable.teacherId],
    references: [teachers.id],
  }),
}));
