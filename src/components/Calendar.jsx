import React, { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek)) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div className="bg-slate-300 rounded-lg shadow p-6 z-100">
      <div className="flex items-center justify-between mb-4 z-100">
        <button
          onClick={handlePrevMonth}
          className="text-gray-500 hover:text-gray-800"
        >
          &lt;
        </button>
        <span className="text-lg font-semibold">
          {currentDate.format("MMMM YYYY")}
        </span>
        <button
          onClick={handleNextMonth}
          className="text-gray-500 hover:text-gray-800"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`text-center p-2 cursor-pointer rounded-lg ${
              day.month() === currentDate.month()
                ? "text-black"
                : "text-gray-400"
            } ${day.isSame(dayjs(), "day") ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setCurrentDate(day)}
          >
            {day.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
