"use server";

import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "./db";
import { sessions, users } from "./db/schema";

export async function isAdminAuthorized() {
  const c = await cookies();
  const session = c.get("session");

  if (!session) {
    return false;
  }

  const sessionData = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, session.value));

  if (sessionData.length === 0) {
    return false;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionData[0].userId));

  if (user.length === 0) {
    return false;
  }

  if (user[0].role !== "admin") {
    return false;
  }

  return true;
}

export async function isManagerAuthorized() {
  const c = await cookies();
  const session = c.get("session");

  if (!session) {
    return false;
  }

  const sessionData = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, session.value));

  if (sessionData.length === 0) {
    return false;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionData[0].userId));

  if (user.length === 0) {
    return false;
  }

  if (user[0].role !== "manager") {
    return false;
  }

  return true;
}

export async function setSession(userId) {
  const c = await cookies();

  const newSession = await db.insert(sessions).values({ userId }).returning();

  c.set("session", newSession[0].id, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
}

export async function deleteSession() {
  const c = await cookies();
  const session = c.get("session");

  if (!session) {
    return;
  }

  await db.delete(sessions).where(eq(sessions.id, session.value));

  c.delete("session");
}
