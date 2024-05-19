import React from "react";
function Resource() {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomColorText = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleTdClick = (e, index) => {
    const td = e.target;
    const table = td.parentNode.parentNode;
    const rect = td.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;
    if (td) {
      console.log(td);
    }
    // Create a resizable div
    const resizerDiv = document.createElement("div");
    resizerDiv.className = "resizer";
    resizerDiv.style.top = `${y}px`;
    resizerDiv.style.left = `${x}px`;
    resizerDiv.style.width = "100px";
    resizerDiv.style.height = "20px";
    resizerDiv.style.position = "absolute";
    resizerDiv.style.zIndex = 1000;
    resizerDiv.style.background = getRandomColor();
    resizerDiv.style.borderRadius = "5px";
    resizerDiv.style.padding = "5px";
    resizerDiv.style.fontSize = "12px";
    resizerDiv.style.color = getRandomColorText();
    resizerDiv.style.cursor = "move";

    // Add time range text
    const timeRangeText = document.createElement("span");

    resizerDiv.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = resizerDiv.offsetWidth;
      const startHeight = resizerDiv.offsetHeight;

      const moveHandler = (e) => {
        const newWidth = Math.max(startWidth + (e.clientX - startX), 20);
        const newHeight = Math.max(startHeight + (e.clientY - startY), 20);
        resizerDiv.style.width = `${newWidth}px`;
        resizerDiv.style.height = `${newHeight}px`;
        updateTimeRangeText(resizerDiv, newWidth);
      };

      document.addEventListener("mousemove", moveHandler);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveHandler);
      });
    });
    timeRangeText.textContent = "12:00 AM - 12:00 AM";
    resizerDiv.appendChild(timeRangeText);

    const increaseButton = createIncreaseButton();
    increaseButton.addEventListener("click", () => {
      const currentWidth = resizerDiv.offsetWidth;
      const newWidth = Math.min(
        currentWidth + 10,

        window.innerWidth - resizerDiv.offsetLeft - 10
      );

      resizerDiv.style.width = `${newWidth}px`;
      updateTimeRangeText(resizerDiv, newWidth);
    });

    const decreaseButton = createDecreaseButton();
    decreaseButton.addEventListener("click", () => {
      const currentWidth = resizerDiv.offsetWidth;
      const newWidth = Math.max(currentWidth - 10, 20);

      resizerDiv.style.width = `${newWidth}px`;
      updateTimeRangeText(resizerDiv, newWidth);
    });

    //  resizer handles
    const resizerHandleLeft = document.createElement("div");
    resizerHandleLeft.className = "resizer-handle";
    resizerHandleLeft.style.top = "0px";
    resizerHandleLeft.style.left = `${x - 10}px`;
    resizerHandleLeft.style.width = "10px";
    resizerHandleLeft.style.height = "100%";
    resizerHandleLeft.style.background = getRandomColorText();
    resizerHandleLeft.style.borderRadius = "5px";
    resizerHandleLeft.style.cursor = "ew-resize";

    const resizerHandleRight = document.createElement("div");
    resizerHandleRight.className = "resizer-handle";
    resizerHandleRight.style.top = "0px";
    resizerHandleRight.style.left = `${x + 100}px`;
    resizerHandleRight.style.width = "10px";
    resizerHandleRight.style.height = "100%";
    resizerHandleRight.style.background = getRandomColorText();
    resizerHandleRight.style.borderRadius = "5px";
    resizerHandleRight.style.cursor = "ew-resize";

    // Append the resizer handles to the same parent element as the resizerDiv
    table.parentNode.appendChild(resizerHandleLeft);
    table.parentNode.appendChild(resizerHandleRight);
    table.parentNode.appendChild(resizerDiv);
    // table.parentNode.appendChild(increaseButton);
    // table.parentNode.appendChild(resizerDiv);
    // table.parentNode.appendChild(decreaseButton);
    // table.parentNode.appendChild(resizerHandleLeft);
    // Add event listeners for resizer handles
    resizerHandleLeft.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const startWidth = resizerDiv.offsetWidth;
      const moveHandler = (e) => {
        if (e.target === resizerDiv || resizerDiv.contains(e.target)) {
          const newWidth = startWidth + (e.clientX - startX);
          resizerDiv.style.width = `${newWidth}px`;
          updateTimeRangeText(resizerDiv, newWidth);
        } else {
          document.removeEventListener("mousemove", moveHandler);
        }
      };
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveHandler);
      });
    });

    resizerHandleRight.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const startWidth = resizerDiv.offsetWidth;
      const moveHandler = (e) => {
        if (e.target === resizerDiv || resizerDiv.contains(e.target)) {
          const newWidth = startWidth + (e.clientX - startX);
          resizerDiv.style.width = `${newWidth}px`;
          updateTimeRangeText(resizerDiv, newWidth);
        } else {
          document.removeEventListener("mousemove", moveHandler);
        }
      };
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveHandler);
      });
    });

    resizerDiv.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = resizerDiv.offsetLeft;
      const startTop = resizerDiv.offsetTop;

      const moveHandler = (e) => {
        const newLeft = startLeft + (e.clientX - startX);
        const newTop = startTop + (e.clientY - startY);
        resizerDiv.style.left = `${newLeft}px`;
        resizerDiv.style.top = `${newTop}px`;
      };

      document.addEventListener("mousemove", moveHandler);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveHandler);
      });
    });

    table.addEventListener("drop", (e) => {
      e.preventDefault();
      const dropX = e.clientX;
      const dropY = e.clientY;
      const dropTd = getTdFromCoordinates(dropX, dropY, table);
      if (dropTd) {
        // Update the resizerDiv's position and size based on the dropped TD
        const rect = dropTd.getBoundingClientRect();
        resizerDiv.style.left = `${rect.left}px`;
        resizerDiv.style.top = `${rect.top}px`;
        resizerDiv.style.width = `${rect.width}px`;
        updateTimeRangeText(resizerDiv, rect.width);
      }
    });

    table.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // Add the resizer div to the table
    table.parentNode.appendChild(resizerDiv);

    function onPageLoad() {
      // Check for stored resizer data
      const storedData = JSON.parse(localStorage.getItem("resizerData"));
      if (storedData) {
        // Create a new div with stored data
        const newResizerDiv = document.createElement("div");
        newResizerDiv.className = "resizer";
        newResizerDiv.style.left = `${storedData.left}px`;
        newResizerDiv.style.top = `${storedData.top}px`;
        newResizerDiv.style.width = `${storedData.width}px`;
        newResizerDiv.style.height = `${storedData.height}px`;

        document.body.appendChild(newResizerDiv);
      }
    }
    window.onload = onPageLoad;
  };

  const getTdFromCoordinates = (x, y, table) => {
    const tds = table.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
      const td = tds[i];
      const rect = td.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return td;
      }
    }
    return null;
  };

  function createIncreaseButton() {
    const button = document.createElement("button");
    button.className = "resizer-button";
    button.textContent = "▲";

    return button;
  }

  // Function to create decrease button
  function createDecreaseButton() {
    const button = document.createElement("button");
    button.className = "resizer-button decrease";
    button.textContent = "▼";

    return button;
  }

  const updateTimeRangeText = (resizerDiv, newWidth) => {
    const timeRangeText = resizerDiv.querySelector("span");
    const startTime = "12:00 AM";
    const endTime = getTimeFromWidth(newWidth);
    timeRangeText.textContent = `${startTime} - ${endTime}`;
  };

  const getTimeFromWidth = (width) => {
    const minutesPerPixel = 10; // adjust this value to change the time range
    const minutes = width / minutesPerPixel;
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutesRemainder
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  };
  return (
    <>
      <tr className="" onClick={(e) => handleTdClick(e, e.target.cellIndex)}>
        {/* <td class="  left-0 bg-white p-12 text-center py-4  whitespace-nowrap border border-slate-600 w-[220px] h-20" ></td> */}
        <td
          class="bg-white  py-4 whitespace-nowrap border border-slate-600     h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
        <td
          class="bg-white px-6 py-4 whitespace-nowrap border border-slate-600 h-20 w-24"
          onClick={(e) => handleTdClick(e, e.target.cellIndex)}
        ></td>
      </tr>

      {/* <Table/> */}
    </>
  );
}

export default Resource;
