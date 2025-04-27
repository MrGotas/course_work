"use client";

import { logout } from "../lib/auth";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
      onClick={async () => await logout()}
    >
      Выйти из ПУ
    </button>
  );
}
