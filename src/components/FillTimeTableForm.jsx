"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { lessonType } from "../lib/db/schema";
import { createTimetableEntry } from "../lib/timetable";

const typeLabels = {
  lecture: "Лекция",
  practice: "Практика",
  lab: "Лабораторная",
};

export function FillTimeTableForm({
  setNeedToRefetch,
  dayName,
  time,
  groupId,
  subjects,
  teachers,
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(createTimetableEntry, {
    success: false,
    error: "",
  });

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (state && state.success) {
      setOpen(false);
      setNeedToRefetch(true);
    }
  }, [state]);

  return (
    <>
      <button
        type="submit"
        className="mr-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-600 shadow-xs sm:mt-0 sm:w-auto"
        onClick={() => setOpen(true)}
      >
        ✎
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-20">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form action={formAction}>
                <div className="space-y-4 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold text-gray-900">
                        Добавить расписание
                      </h3>
                    </div>
                  </div>
                  <input
                    name="groupId"
                    defaultValue={groupId}
                    readOnly
                    hidden
                  />
                  <input name="day" defaultValue={dayName} readOnly hidden />
                  <input name="time" defaultValue={time} readOnly hidden />
                  <input
                    name="subjectId"
                    defaultValue={selectedSubject?.id ?? ""}
                    readOnly
                    hidden
                  />
                  <input
                    name="teacherId"
                    defaultValue={selectedTeacher?.id ?? ""}
                    readOnly
                    hidden
                  />
                  <input
                    name="lessonType"
                    defaultValue={selectedType ?? ""}
                    readOnly
                    hidden
                  />
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Предмет
                    </label>
                    <div className="relative mt-2">
                      <Listbox value={subjects} onChange={setSelectedSubject}>
                        <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                            <span className="block truncate">
                              {selectedSubject?.name}
                            </span>
                          </span>
                          <span className="col-start-1 row-start-1 -mt-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                            ↕
                          </span>
                        </ListboxButton>

                        <ListboxOptions
                          transition
                          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                        >
                          {subjects.map((subject) => (
                            <ListboxOption
                              key={subject.id}
                              value={subject}
                              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                            >
                              <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                  {subject.name}
                                </span>
                              </div>

                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                <span>✓</span>
                              </span>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Listbox>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Преподаватель
                    </label>
                    <div className="relative mt-2">
                      <Listbox
                        value={selectedTeacher}
                        onChange={setSelectedTeacher}
                      >
                        <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                            <span className="block truncate">
                              {selectedTeacher?.lastName}{" "}
                              {selectedTeacher?.firstName}{" "}
                              {selectedTeacher?.middleName}
                            </span>
                          </span>
                          <span className="col-start-1 row-start-1 -mt-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                            ↕
                          </span>
                        </ListboxButton>

                        <ListboxOptions
                          transition
                          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                        >
                          {teachers.map((teacher) => (
                            <ListboxOption
                              key={teacher.id}
                              value={teacher}
                              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                            >
                              <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                  {teacher.lastName} {teacher.firstName}{" "}
                                  {teacher.middleName}
                                </span>
                              </div>

                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                <span>✓</span>
                              </span>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Listbox>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Тип занятия
                    </label>
                    <div className="relative mt-2">
                      <Listbox value={selectedType} onChange={setSelectedType}>
                        <div className="relative mt-2">
                          <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                              <span className="block truncate">
                                {typeLabels[selectedType]}
                              </span>
                            </span>
                            <span className="col-start-1 row-start-1 -mt-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                              ↕
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                          >
                            {lessonType.map((type) => (
                              <ListboxOption
                                key={type}
                                value={type}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                              >
                                <div className="flex items-center">
                                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                    {typeLabels[type]}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                  <span>✓</span>
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Аудитория
                    </label>
                    <div className="mt-2">
                      <input
                        id="classroom"
                        name="classroom"
                        type="classroom"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <p className="text-red-500">
                    {state && state.error !== "" && state.error}
                  </p>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Создать
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Назад
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
