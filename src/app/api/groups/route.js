import { and, eq } from "drizzle-orm";

import { db } from "../../../lib/db";
import { groups } from "../../../lib/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json();
  const { facultyId, course, directionId, type, level } = body;

  const conditions = [];

  if (facultyId) {
    conditions.push(eq(groups.facultyId, parseInt(facultyId)));
  }

  if (course) {
    conditions.push(eq(groups.grade, course));
  }

  if (directionId) {
    conditions.push(eq(groups.directionId, parseInt(directionId)));
  }

  if (type) {
    conditions.push(eq(groups.type, type));
  }

  if (level) {
    conditions.push(eq(groups.level, level));
  }

  const groupsData = await db
    .select()
    .from(groups)
    .where(and(...conditions));

  return Response.json(groupsData);
}
