"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { addFaculty, deleteFaculty } from "../lib/faculties";

export function AddFacultiesForm({ setIsCreating }) {
  const router = useRouter();

  const [state, formAction] = useActionState(addFaculty, {
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
      <div className="space-y-4 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold text-gray-900">
              Добавить факультет
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

export const FacultiesList = ({ faculties, setIsCreating }) => {
  const router = useRouter();

  return (
    <div className="space-y-4 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="mt-3 flex items-center justify-between text-center sm:mt-0 sm:text-left">
        <h3 className="text-base font-semibold text-gray-900">Факультеты</h3>

        <button
          type="submit"
          className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setIsCreating(true)}
        >
          Добавить
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {faculties.map((faculty) => (
          <li
            key={faculty.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {faculty.name}
              </p>
            </div>

            <button
              type="submit"
              className="flex h-fit w-fit justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={async () => {
                await deleteFaculty(faculty.id);
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

export function FacultiesForm({ faculties }) {
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
                <AddFacultiesForm setIsCreating={setIsCreating} />
              ) : (
                <FacultiesList
                  faculties={faculties}
                  setIsCreating={setIsCreating}
                />
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
