"use client";

import { useGroupFilterContext } from "../GroupFilterContext";

export function GradeInput() {
  const { grade, setGrade } = useGroupFilterContext();

  return (
    <div className="space-y-4">
      <p className="block text-sm/6 font-medium text-white">Курс</p>
      <input
        type="number"
        min={1}
        max={5}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        onChange={(e) => setGrade(parseInt(e.target.value))}
        value={grade}
      />
    </div>
  );
}
