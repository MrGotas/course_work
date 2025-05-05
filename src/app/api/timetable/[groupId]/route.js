import { eq } from "drizzle-orm";

import { db } from "../../../../lib/db";
import { timetable } from "../../../../lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { groupId } = await params;

  const timeTable = await db
    .select()
    .from(timetable)
    .where(eq(timetable.groupId, parseInt(groupId)));

  return Response.json(timeTable);
}
