import { GroupProvider } from "../components/GroupContext";
import { GroupSelect } from "../components/GroupSelect";
import { TimeTable } from "../components/TimeTable";
import { db } from "../lib/db";
import { groups, subjects, teachers } from "../lib/db/schema";

export const dynamic = "force-dynamic";

export default async function Page() {
  const groupsResult = await db.select().from(groups);

  const subjectsResult = await db.select().from(subjects);
  const teachersResult = await db.select().from(teachers);

  return (
    <GroupProvider>
      <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4">
        <GroupSelect groups={groupsResult} />
        <TimeTable
          isManager={false}
          subjects={subjectsResult}
          teachers={teachersResult}
        />
      </div>
    </GroupProvider>
  );
}
