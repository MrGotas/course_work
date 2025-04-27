"use client";

import { useEffect, useState } from "react";

import { day, time } from "../lib/db/schema";
import { deleteTimetableEntry } from "../lib/timetable";
import { FillTimeTableForm } from "./FillTimeTableForm";
import { useGroupContext } from "./GroupContext";

const dayLabels = {
  monday: "Пн",
  tuesday: "Вт",
  wednesday: "Ср",
  thursday: "Чт",
  friday: "Пт",
  saturday: "Сб",
};

const typeLabels = {
  lecture: "Лекция",
  practice: "Практика",
  lab: "Лабораторная",
};

export function TimeTable({ isManager, subjects, teachers }) {
  const [needToRefetch, setNeedToRefetch] = useState(false);
  const { selectedGroup } = useGroupContext();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [transformedData, setTransformedData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/timetable/${selectedGroup}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);

        // Transform the data into the required format
        const transformed = transformTimetableData(result);
        setTransformedData(transformed);
      } catch (err) {
        setError(err.message);
      }
    }

    if (selectedGroup) {
      fetchData();
      setNeedToRefetch(false);
    }
  }, [selectedGroup, needToRefetch]);

  function transformTimetableData(rawData) {
    const result = {};

    // Build lookup maps for subjects and teachers
    const subjectMap = {};
    subjects.forEach((s) => {
      subjectMap[s.id] = s.name;
    });

    const teacherMap = {};
    teachers.forEach((t) => {
      // Format: Lastname I. O.
      teacherMap[t.id] = `${t.lastName} ${t.firstName[0]}. ${t.middleName[0]}.`;
    });

    day.forEach((dayName) => {
      result[dayName] = time.map((timeSlot) => ({
        time: timeSlot,
        course: "",
        instructor: "",
        type: "",
        location: "",
        id: null,
      }));

      const dayLessons = rawData.filter((lesson) => lesson.day === dayName);

      console.log(dayLessons);

      dayLessons.forEach((lesson) => {
        const timeIndex = time.findIndex((t) => t === lesson.time);
        if (timeIndex !== -1) {
          result[dayName][timeIndex] = {
            time: lesson.time,
            course: subjectMap[lesson.subjectId] || "Unknown Subject",
            instructor: teacherMap[lesson.teacherId] || "Unknown Teacher",
            type: lesson.lessonType,
            location: lesson.classroom,
            id: lesson.id,
          };
        }
      });
    });

    return result;
  }

  if (!selectedGroup) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Пожалуйста, выберите группу.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">Ошибка: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {day.map((dayName) => (
        <div key={dayName} className="border-t border-b border-gray-800">
          <div className="flex">
            <div className="flex items-center gap-4 p-2">
              <p className="text-xl font-bold">{dayLabels[dayName]}</p>
            </div>
          </div>

          {transformedData[dayName]?.map((slot, index) => (
            <div key={index} className="flex border-t border-gray-300">
              {/* Time column */}
              <div className="w-28 p-2 text-sm font-medium">{slot.time}</div>

              {/* Course info */}
              <div className="flex-1 p-2">
                {slot.course ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{slot.course}</div>
                      <div className="text-sm text-gray-600">
                        {slot.instructor} • {typeLabels[slot.type]} •{" "}
                        {slot.location}
                      </div>
                    </div>
                    {isManager && (
                      <button
                        type="submit"
                        className="mr-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-600 shadow-xs sm:mt-0 sm:w-auto"
                        onClick={async () => {
                          await deleteTimetableEntry(slot.id);
                          setNeedToRefetch(true);
                        }}
                      >
                        🗑
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400">—</div>
                    {isManager && (
                      <FillTimeTableForm
                        setNeedToRefetch={setNeedToRefetch}
                        subjects={subjects}
                        teachers={teachers}
                        groupId={selectedGroup ?? ""}
                        dayName={dayName}
                        time={slot.time}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
