"use client";

import { logout } from "../lib/auth";

export function LogoutManButton() {
  return (
    <button
      type="button"
      className="absolute top-4 right-4 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      onClick={async () => await logout()}
    >
      Выйти
    </button>
  );
}