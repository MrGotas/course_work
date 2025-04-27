"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { DirectionsForm } from "../DirectionsForm";
import { useGroupFilterContext } from "../GroupFilterContext";

export function DirectionSelect({ directions }) {
  const { direction, setDirection } = useGroupFilterContext();

  return (
    <Listbox value={direction} onChange={setDirection}>
      <div className="flex items-center justify-between">
        <Label className="block text-sm/6 font-medium text-white">
          Направление
        </Label>

        <DirectionsForm directions={directions} />
      </div>
      <div className="relative mt-2">
        <ListboxButton className="grid h-8 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{direction?.name}</span>
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
      </div>
    </Listbox>
  );
}
