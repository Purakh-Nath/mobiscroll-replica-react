import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Side from "./components/Side";
import Resource from "./components/Resource";
import Calendar from "./components/Calendar";
import Header from './components/Header'
function App() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // handleButtonClick()
    updateCalendar();
  }, [currentMonth, currentYear]);

  const today = new Date();

  const updateCalendar = () => {
    const monthYearEl = document.getElementById("month-year");
    const calendarDays = document.getElementById("calendar-days");

    // const calendarDays = document.getElementById('calendar-days');
    if (monthYearEl && calendarDays) {
      calendarDays.innerHTML = ""; // Clear previous content
      monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
      const firstDay = new Date(currentYear, currentMonth, 1);
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const weekday = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

      // Display month and year
      document.getElementById(
        "month-year"
      ).textContent = `${monthNames[currentMonth]} ${currentYear}`;

      // Add empty cells before the first day of the month
      for (let i = 0; i < weekday; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("text-center", "py-2");
        // calendarDays.appendChild(emptyCell);
      }

      // Add date cells for the current month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement("th");
        // dateCell.classList.add('text-center', 'py-2' ,'text-black');
        dateCell.classList.add(
          "col-span-6",
          "text-black",
          "px-4",
          "py-1",
          "whitespace-nowrap",
          "border",
          "border-slate-600",
          "h-[1px]"
        );

        const date = new Date(currentYear, currentMonth, day);

        // Highlight the current date
        if (
          date.getDate() === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear()
        ) {
          dateCell.classList.add("bg-blue-500", "text-yellow", "rounded-full");
        }
        dateCell.textContent = `${day} ${weekdays[date.getDay()]}`;
        calendarDays.appendChild(dateCell);
        console.log(day);
        // dateCell.textContent = day;
        // calendarDays.appendChild(dateCell);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
  };
  console.log(currentMonth);

  const [resourceCount, setResourceCount] = useState(0);
  useEffect(() => {
    const storedCount = localStorage.getItem("resourceCount");
    if (storedCount) {
      setResourceCount(parseInt(storedCount)); // Parse stored string to number
    }
  }, []);

  const addResource = () => {
    setResourceCount(resourceCount + 1);
    localStorage.setItem("resourceCount", resourceCount + 1); // Update localStorage
  };

  const updateTimeRangeText = (resizerDiv, newWidth) => {
    const timeRangeText = resizerDiv.querySelector("span");
    const startTime = "12:00 AM";
    const endTime = getTimeFromWidth(newWidth);
    timeRangeText.textContent = `${startTime} - ${endTime}`;
  };

  const getTimeFromWidth = (width) => {
    const minutesPerPixel = 15; // adjust this value to change the time range
    const minutes = width / minutesPerPixel;
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutesRemainder
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  };

  return (
    <>
 <Header/>

      <div className="z-100">
        <div className="  bg-white fixed -ml-5 z-100">
          <table className="border border-gray-600 text-yellow z-100 ">
            <thead className="sticky mb-10">
              <tr className="text-left px-4 py-2 sticky top-1">
                <th
                  className="z-100 border-b border-gray-600 h-7 w-[227px] text-center text-yellow"
                  onClick={addResource}
                >
                  Add Resource
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap scroll-mx-96 overflow-x-auto ">
              {/* {newResourceName && ( */}
              {/* <tr>
              <td className="border border-gray-600">
              Resource
              </td>
            </tr> */}
              {/* )} */}
              <Side />
              <Side />
              <Side />
              <Side />
              <Side />
              <Side />
              <Side />

              {[...Array(resourceCount)].map((_, index) => (
                <Side key={index} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 h-screen w-full -z-100">
          <table id="" className=" ml-52  border-slate-600 bg-white -z-100">
            <thead className="sticky top-[60px]  ml-56 bg-slate-100 ">
              <tr
                id="calendar-days"
                className=" divide-y  divide-gray-600 border border-slate-600 ml-56 -z-100"
              >
                {updateCalendar}
              </tr>
            </thead>
            <tbody className="divide-y  divide-gray-600 border border-slate-600 bg-white">
              <Resource />
              <Resource />
              <Resource />
              <Resource />
              <Resource />
              <Resource />
              <Resource />

              {[...Array(resourceCount)].map((_, index) => (
                <Resource key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
