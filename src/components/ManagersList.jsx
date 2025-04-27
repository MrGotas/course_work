"use client";

import { useRouter } from "next/navigation";

import { deleteManager } from "../lib/managers";

export function ManagersList({ managers }) {
  const router = useRouter();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {managers.map((manager, key) => (
        <li
          key={manager.email}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">
              Составитель №{key + 1}
            </p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">
              {manager.email}
            </p>
          </div>

          <button
            type="submit"
            className="flex h-fit w-fit justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={async () => {
              await deleteManager(manager.id);
              router.refresh();
            }}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}
