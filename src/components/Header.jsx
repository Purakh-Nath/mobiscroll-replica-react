import React, { useState, useEffect } from "react";
import Side from "./Side";
import Resource from "./Resource";
import Calendar from "./Calendar";
function Header() {
  const [showTable, setShowTable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  // const handleButtonClick = () => {
  //   if (!showTable) {
  //     setShowTable(true);
  //   }
  // };

  useEffect(() => {
    if (showTable) {
      const tableBody = document.createElement("tbody");
      tableBody.className =
        "bg-white divide-y divide-gray-200 border border-slate-600";

      const tableRow = document.createElement("tr");
      tableRow.className = "border border-slate-600";

      const tableCells = [""]; // data here

      tableCells.forEach((cell, index) => {
        const tableCell = document.createElement("td");
        tableCell.className =
          index === 0
            ? "bg-white fixed -left-2 bg-gray-500   py-10 px-2 w-48 whitespace-nowrap border  border-slate-600"
            : "fixed -left-2 bg-gray-500 p-12 py-14 px-4 w-48 m-10 whitespace-nowrap ";
        tableCell.textContent = cell;
        tableRow.appendChild(tableCell);
      });

      tableBody.appendChild(tableRow);

      const parentElement = document.getElementById("calendar-days"); //  parent element ID

      parentElement.appendChild(tableBody);
    }
    // setShowTable(false);
  }, [showTable]);

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

  const addResource = () => {
    setResourceCount(resourceCount + 1);
  };

  return (
    <div
    className=" flex justify-between  bg-white  h-16 "
    style={{
      position: "sticky",
      top: 0,
      zIndex: 1,
      // width: '100vw', // to ensure it's on top of other elements
    }}
  >
    <h1
      onClick={toggleCalendar}
      id="month-year"
      className="text-xl font-bold text-[#4A9FFD] mt-4 ml-2 cursor-pointer"
    ></h1>
    {showCalendar && (
      <div className="absolute top-12 left-60 z-100">
        <Calendar />
      </div>
    )}
    <div class=" flex justify-between items-center">
      <button
        class="flex items-center "
        id="prev-month"
        onClick={handlePrevMonth}
      >
        <svg class="w-10 h-10 mr-2" viewBox="0 0 20 20" fill="blue">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <span class="text-center text-[#007AFF] font-semibold text-xl ">
        Today
      </span>

      <button
        class="flex items-center "
        id="next-month"
        onClick={handleNextMonth}
      >
        <svg class="w-10 h-10 mr-2" viewBox="0 0 20 20" fill="blue">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
  );
}

export default Header;
