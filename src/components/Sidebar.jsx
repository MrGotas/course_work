"use client";

import { useState } from "react";

import { DirectionSelect } from "./dashboard/DirectionSelect";
import { FacultySelect } from "./dashboard/FacultySelect";
import { GradeInput } from "./dashboard/GradeInput";
import { LevelSelect } from "./dashboard/LevelSelect";
import { TypeSelect } from "./dashboard/TypeSelect";
import { SubjectsForm } from "./SubjectsForm";
import { TeachersForm } from "./TeachersForm";

export default function Sidebar({ subjects, teachers, faculties, directions }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="visible fixed top-4 left-4 z-50 rounded-md bg-gray-800 p-2 text-white md:hidden"
        >
          ☰
        </button>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
            <div className="text-xl font-bold">Расписание</div>
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1 hover:bg-gray-700 md:hidden"
            >
              x
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-2 py-4">
            <div className="space-y-6">
              <FacultySelect faculties={faculties} />
              <GradeInput />
              <DirectionSelect directions={directions} />
              <TypeSelect />
              <LevelSelect />
            </div>
            <div className="flex flex-col gap-2">
              <TeachersForm teachers={teachers} />
              <SubjectsForm subjects={subjects} />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
