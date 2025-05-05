import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { CreateManagerForm } from "../../components/CreateManagerForm";
import { LogoutButton } from "../../components/LogoutButton";
import { ManagersList } from "../../components/ManagersList";
import { db } from "../../lib/db";
import { users } from "../../lib/db/schema";
import { isAdminAuthorized } from "../../lib/sessions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const auth = await isAdminAuthorized();

  if (!auth) {
    redirect("/login");
  }

  const managers = await db
    .select()
    .from(users)
    .where(eq(users.role, "manager"));

  return (
    <div className="flex h-full flex-1 flex-col justify-center gap-4 px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <h3 className="text-2xl font-medium">Список составителей</h3>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <CreateManagerForm />
          <LogoutButton />
        </div>
      </div>

      <ManagersList managers={managers} />
    </div>
  );
}
