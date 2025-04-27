"use client";

import { createContext, useContext, useState } from "react";

export const GroupContext = createContext();

export const useGroupContext = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const value = {
    selectedGroup,
    setSelectedGroup,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};
