const btn = document.querySelector("button");
btn.addEventListener("click", run);

function calculate() {
  let inputDay = document.querySelector("#day").value;
  let inputMonth = document.querySelector("#month").value;
  let inputYear = document.querySelector("#year").value;

  let today = new Date();

  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let yearsAge = document.querySelector("#years-age");
  let monthsAge = document.querySelector("#months-age");
  let daysAge = document.querySelector("#days-age");

  let outputDay, outputMonth, outputYear;

  outputYear = year - inputYear;

  if (month >= inputMonth) {
    outputMonth = month - inputMonth;
  } else {
    outputYear--;
    outputMonth = month + 12 - inputMonth;
  }

  if (day >= inputDay) {
    outputDay = day - inputDay;
  } else {
    outputMonth--;
    outputDay = getDaysInMonth(inputYear, inputMonth) + day - inputDay;
  }

  if (outputMonth < 0) {
    outputMonth = 11;
    outputYear--;
  }

  yearsAge.innerText = number(outputYear);
  monthsAge.innerText = number(outputMonth);
  daysAge.innerText = number(outputDay);
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function number(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

function errorChecker() {
  let inputDay = document.querySelector("#day").value;
  let inputMonth = document.querySelector("#month").value;
  let inputYear = document.querySelector("#year").value;

  let today = new Date();
  let input = new Date(inputYear, inputMonth - 1, inputDay);

  let dayLabel = document.querySelector("#day-label");
  let monthLabel = document.querySelector("#month-label");
  let yearLabel = document.querySelector("#year-label");

  let emptyMessage = "This field is required";
  let pastMessage = "Must be in the past";
  let validMonthMessage = "Must be a valid month";
  let validDateMessage = "Must be a valid date";

  let dayErrorEffect = () => dayLabel.setAttribute("class", "error-effect");
  let monthErrorEffect = () => monthLabel.setAttribute("class", "error-effect");
  let yearErrorEffect = () => yearLabel.setAttribute("class", "error-effect");

  function errorMessageGenerator(innerText, labelName, errorEffect) {
    let errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "error-message");
    errorMessage.innerText = innerText;
    labelName.appendChild(errorMessage);
    errorEffect;
  }

  if (inputDay === "") {
    errorMessageGenerator(emptyMessage, dayLabel, dayErrorEffect());
  }

  if (inputMonth === "") {
    errorMessageGenerator(emptyMessage, monthLabel, monthErrorEffect());
  }

  if (inputYear === "") {
    errorMessageGenerator(emptyMessage, yearLabel, yearErrorEffect());
  }

  if (inputDay !== "" && inputMonth !== "" && inputYear !== "") {
    if (inputYear > today.getFullYear()) {
      errorMessageGenerator(pastMessage, yearLabel, yearErrorEffect());
    }

    if (inputYear == today.getFullYear()) {
      if (inputMonth > today.getMonth() + 1) {
        errorMessageGenerator(pastMessage, monthLabel, monthErrorEffect());
      }
    } else if (inputMonth != input.getMonth() + 1) {
      errorMessageGenerator(validMonthMessage, monthLabel, monthErrorEffect());
    }

    if (inputDay != input.getDate()) {
      errorMessageGenerator(validDateMessage, dayLabel, dayErrorEffect());
    } else if (inputYear == today.getFullYear()) {
      if (inputMonth == today.getMonth() + 1) {
        if (inputDay > today.getDate()) {
          errorMessageGenerator(pastMessage, dayLabel, dayErrorEffect());
        }
      }
    }
  }
}

function run() {
  while (document.querySelector(".error-message")) {
    document.querySelector(".error-message").remove();
  }
  while (document.querySelector(".error-effect")) {
    document.querySelector(".error-effect").classList.remove("error-effect");
  }
  errorChecker();
  if (document.querySelector(".error-effect") === null) {
    calculate();
  }
}
