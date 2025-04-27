import { redirect } from "next/navigation";

import { GroupProvider } from "../../components/GroupContext";
import { GroupFilterProvider } from "../../components/GroupFilterContext";
import { GroupsList } from "../../components/GroupsList";
import Sidebar from "../../components/Sidebar";
import { TimeTable } from "../../components/TimeTable";
import { db } from "../../lib/db";
import {
  directions,
  faculties,
  groups,
  subjects,
  teachers,
} from "../../lib/db/schema";
import { isManagerAuthorized } from "../../lib/sessions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const auth = await isManagerAuthorized();

  if (!auth) {
    redirect("/login");
  }

  const subjectsList = await db.select().from(subjects);
  const teachersList = await db.select().from(teachers);

  const groupsList = await db.select().from(groups);
  const facultiesList = await db.select().from(faculties);
  const directionsList = await db.select().from(directions);

  return (
    <GroupProvider>
      <GroupFilterProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            subjects={subjectsList}
            teachers={teachersList}
            faculties={facultiesList}
            directions={directionsList}
          />
          <main className="flex flex-1 flex-col gap-4 overflow-auto p-6 transition-all duration-300 md:ml-64">
            <GroupsList
              faculties={facultiesList}
              directions={directionsList}
              groups={groupsList}
            />
            <TimeTable
              subjects={subjectsList}
              teachers={teachersList}
              isManager={true}
            />
          </main>
        </div>
      </GroupFilterProvider>
    </GroupProvider>
  );
}
