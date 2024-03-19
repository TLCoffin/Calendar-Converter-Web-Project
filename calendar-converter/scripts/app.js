// Takes a year, returns bool isLeapYear
function isLeapYear(year) {
  let isLeapYear = false;
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        isLeapYear = true;
      } else {
        isLeapYear = false;
      }
    } else {
      isLeapYear = true;
    }
  } else {
    isLeapYear = false;
  }
  return isLeapYear;
}

// Takes year, month, day. Returns converted day, month, year array.
function convertCal(dateArray) {
  let inputYear = dateArray[0];
  let inputMonth = dateArray[1];
  let inputDay = dateArray[2];

  // amount of days in each gregorian calendar month starting in january
  const oldMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // names of the months in the new calendar starting with Isonoe (september)
  const newMonthNames = [
    "Isonoe",
    "Nereid",
    "Charon",
    "Umbriel",
    "Ersa",
    "Skrymir",
    "Neso",
    "Calypso",
    "Korai",
    "Narvi",
    "Cordelia",
    "Alvaldi",
    "Erinome",
  ];

  // Main logic
  let outputDate = [];
  if (dateArray[0] === "") {
    outputDate.push("Enter a date to be converted above.");
  }
  else {
    let yearDay = 0;
    for (let i = 0; i < inputMonth - 1; i++) {
      yearDay = yearDay + oldMonthDays[i];
    }
    yearDay = parseInt(yearDay) + parseInt(inputDay);

    let newYearDay = 0;
    if (inputMonth > 8) {
      newYearDay = yearDay - 243;
    } else {
      newYearDay = parseInt(yearDay) + 122;
    }

    if (inputMonth == 2 && inputDay > 15 && isLeapYear(inputYear)) {
      newYearDay--;
    }

    let convDay = 0;
    let convMonth = 0;
    if (newYearDay % 28 === 0) {
      convDay = 28;
      convMonth = Math.floor(newYearDay / 28) - 1;
    } else {
      convDay = newYearDay % 28;
      convMonth = Math.floor(newYearDay / 28);
    }

    if (yearDay === 47 && isLeapYear(inputYear)) {
      outputDate.push("Leap Day");
    }
    else if (inputMonth == 8 && inputDay == 31) {
      outputDate.push("New Years Day");
    }
    else {
      let outputMonth = newMonthNames[convMonth];
      outputDate.push(convDay, outputMonth);
    }

    let convYear = 0;
    if (inputMonth <= 12 && inputMonth >= 9) {
      convYear = inputYear - 2023;
    }
    else if (inputDay == 31 && inputMonth == 8) {
      convYear = inputYear - 2023;
    }
  
    if (convYear < 0) {
      convYear = convYear / -1;
      convYear = `${convYear} BW`;
    }

    outputDate.push(convYear);
  }

  return outputDate;
}

let dateValue;
let yearMonthDay = [];

// Updates the converted box when the user inputs a date
inputDate.addEventListener("input", (event) => {
  // Grab and format date form input box
  dateValue = document.querySelector("#inputDate").value;
  yearMonthDay = dateValue.split("-");

  // Convert with convertCal function
  let outputText = convertCal(yearMonthDay);

  // Display Correct type of text depending on the returned array.
  if (outputText.length === 3) {
    document.getElementById("outputBox").innerText = `Converted Date - ${outputText[0]} ${outputText[1]}, ${outputText[2]}`;
  }
  else if (outputText.length === 2) {
    document.getElementById("outputBox").innerText = `Converted Date - ${outputText[0]}, ${outputText[1]}`;
  }
  else {
    document.getElementById("outputBox").innerText = `Converted Date - ${outputText[0]}`;
  }
});

// Calls the convertCal function with the current date and updates the "Today's date" box.
function updateCurrentDate() {
  // Get current date and assemble it into an array.
  let nowDate = new Date();
  let currentDate = [];

  let currentYear = nowDate.getFullYear();
  let currentMonth = nowDate.getMonth() + 1;
  let currentDay = nowDate.getDate();

  currentDate.push(currentYear, currentMonth, currentDay);

  // Convert current date into converted date.
  let calendarPosition = convertCal(currentDate);

  // Display Correct type of text depending on the returned array.
  if (calendarPosition.length === 3) {
    document.getElementById("currentDayBox").innerText = `Today's Date - ${calendarPosition[0]} ${calendarPosition[1]}, ${calendarPosition[2]}`;
  }
  else if (calendarPosition.length === 2) {
    document.getElementById("currentDayBox").innerText = `Today's Date - ${calendarPosition[0]}, ${calendarPosition[1]}`;
  }
  else {
    document.getElementById("currentDayBox").innerText = `Today's Date - ${calendarPosition[0]}`;
  }

  // Update the calendar UI with a purple square on today's corresponding date box.
  document.querySelector(`#${calendarPosition[1]} li:nth-of-type(${calendarPosition[0]})`).style.backgroundColor = "#af19d1";
  console.log(calendarPosition);
}

// Updates "Today's date on page reload."
updateCurrentDate();
