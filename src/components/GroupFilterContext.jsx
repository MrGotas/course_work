"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useGroupContext } from "./GroupContext";

export const GroupFilterContext = createContext();

export const useGroupFilterContext = () => useContext(GroupFilterContext);

export const GroupFilterProvider = ({ children }) => {
  const { setSelectedGroup } = useGroupContext();

  const [faculty, setFaculty] = useState(null);
  const [grade, setGrade] = useState(1);
  const [direction, setDirection] = useState(null);
  const [type, setType] = useState(null);
  const [level, setLevel] = useState(null);

  const value = {
    faculty,
    setFaculty,
    grade,
    setGrade,
    direction,
    setDirection,
    type,
    setType,
    level,
    setLevel,
  };

  useEffect(() => {
    setSelectedGroup(null);
  }, [faculty, grade, direction, type, level]);

  return (
    <GroupFilterContext.Provider value={value}>
      {children}
    </GroupFilterContext.Provider>
  );
};
