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

  // Main logic
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

  let outputDate = "";
  if (yearDay === 47 && isLeapYear(inputYear)) {
    outputDate = "Leap Day";
  } else if (inputMonth == 8 && inputDay == 31) {
    outputDate = "New Years Day";
  } else {
    let outputMonth = newMonthNames[convMonth];
    outputDate = convDay + " " + outputMonth;
  }
  return outputDate;
}

let dateValue;
let yearMonthDay = [];

inputDate.addEventListener("input", (event) => {
  dateValue = document.querySelector("#inputDate").value;
  yearMonthDay = dateValue.split("-");
  console.log(yearMonthDay);

  let outputText = convertCal(yearMonthDay);
  console.log(outputText);

  document.getElementById("outputBox").innerText = outputText;
});
