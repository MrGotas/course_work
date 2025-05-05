"use client";

import { useEffect, useState } from "react";

import { useGroupContext } from "./GroupContext";
import { useGroupFilterContext } from "./GroupFilterContext";
import { GroupsForm } from "./GroupsForm";

export function GroupsList({ groups, faculties, directions }) {
  const { faculty, grade, direction, type, level } = useGroupFilterContext();
  const { selectedGroup, setSelectedGroup } = useGroupContext();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            facultyId: faculty?.id,
            course: grade,
            directionId: direction?.id,
            type,
            level,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [faculty?.id, grade, direction?.id, type, level]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <GroupsForm
          groups={groups}
          faculties={faculties}
          directions={directions}
        />
        <h3 className="text-2xl font-medium">Список групп:</h3>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {data && data.length > 0 ? (
        <div className="flex gap-2">
          {data.map((group) => (
            <button
              key={group.id}
              className={`${selectedGroup == group.id ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-white text-gray-900 hover:bg-gray-50"} inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs sm:mt-0 sm:w-auto`}
              onClick={() => setSelectedGroup(group.id)}
            >
              {group.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Нет доступных групп.</p>
      )}
    </div>
  );
}
