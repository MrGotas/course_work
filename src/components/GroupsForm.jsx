"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { eduLevel, eduTypes } from "../lib/db/schema";
import { addGroup, deleteGroup } from "../lib/groups";

const typeLabels = {
  bachelor: "Бакалавриат",
  specialist: "Специалитет",
  magister: "Магистратура",
};
const levelLabels = {
  full_time: "Очное",
  part_time: "Заочное",
  full_part_time: "Очно-заочное",
};

export function AddGroupForm({ faculties, directions, setIsCreating }) {
  const router = useRouter();

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");

  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const [state, formAction] = useActionState(addGroup, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state && state.success) {
      setIsCreating(false);
      router.refresh();
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="facultyId" value={selectedFaculty.id} />
      <input type="hidden" name="directionId" value={selectedDirection.id} />
      <input type="hidden" name="type" value={selectedType} />
      <input type="hidden" name="level" value={selectedLevel} />
      
      <div className="space-y-4 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold text-gray-900">
              Добавить группу
            </h3>
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Название
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Факультет
          </label>
          <div className="relative mt-2">
            <Listbox value={selectedFaculty} onChange={setSelectedFaculty}>
              <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  <span className="block truncate">
                    {selectedFaculty?.name}
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
                {faculties.map((faculty) => (
                  <ListboxOption
                    key={faculty.id}
                    value={faculty}
                    className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                        {faculty.name}
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
            Направление
          </label>
          <div className="relative mt-2">
            <Listbox value={selectedDirection} onChange={setSelectedDirection}>
              <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  <span className="block truncate">
                    {selectedDirection?.name}
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
                {directions.map((direction) => (
                  <ListboxOption
                    key={direction.id}
                    value={direction}
                    className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                        {direction.name}
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
            Курс
          </label>
          <div className="mt-2">
            <input
              id="grade"
              name="grade"
              type="number"
              min={1}
              max={5}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Уровень обучения
            </label>
            <div className="relative mt-2">
              <Listbox value={selectedType} onChange={setSelectedType}>
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
                  {eduTypes.map((type) => (
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
              </Listbox>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Тип обучения
            </label>
            <div className="relative mt-2">
              <Listbox value={selectedLevel} onChange={setSelectedLevel}>
                <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    <span className="block truncate">
                      {levelLabels[selectedLevel]}
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
                  {eduLevel.map((level) => (
                    <ListboxOption
                      key={level}
                      value={level}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <div className="flex items-center">
                        <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                          {levelLabels[level]}
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
          onClick={() => setIsCreating(false)}
        >
          Назад
        </button>
      </div>
    </form>
  );
}

export const GroupsList = ({ groups, setIsCreating }) => {
  const router = useRouter();

  return (
    <div className="space-y-4 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="mt-3 flex items-center justify-between text-center sm:mt-0 sm:text-left">
        <h3 className="text-base font-semibold text-gray-900">Группы</h3>

        <button
          type="submit"
          className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setIsCreating(true)}
        >
          Добавить
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {groups.map((group) => (
          <li
            key={group.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {group.name}
              </p>
            </div>

            <button
              type="submit"
              className="flex h-fit w-fit justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={async () => {
                await deleteGroup(group.id);
                router.refresh();
              }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function GroupsForm({ faculties, directions, groups }) {
  const [isCreating, setIsCreating] = useState(false);

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="submit"
        className="mr-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-300 shadow-xs sm:mt-0 sm:w-auto"
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
              {isCreating ? (
                <AddGroupForm
                  faculties={faculties}
                  directions={directions}
                  setIsCreating={setIsCreating}
                />
              ) : (
                <GroupsList groups={groups} setIsCreating={setIsCreating} />
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
