const ageCalculate = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date-input").value);
  const birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
  };
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
      alert("Not Born Yet");
      displayResult("-", "-", "-");
      displayImage(null, null); // Hide all images if the date is in the future
      return;
  }

  const { years, months, days } = calculateAge(
      birthDetails,
      currentYear,
      currentMonth,
      currentDate
  );

  displayResult(days, months, years);
  displayImage(years, getSelectedGender()); // Display the appropriate image based on age and gender
};

const getSelectedGender = () => {
  const maleChecked = document.getElementById('male').checked;
  return maleChecked ? 'male' : 'female';
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  return (
      birthDetails.year > currentYear ||
      (birthDetails.year === currentYear &&
          (birthDetails.month > currentMonth ||
              (birthDetails.month === currentMonth && birthDetails.date > currentDate)))
  );
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months, days;

  if (currentMonth < birthDetails.month) {
      years--;
      months = 12 - (birthDetails.month - currentMonth);
  } else {
      months = currentMonth - birthDetails.month;
  }

  if (currentDate < birthDetails.date) {
      months--;
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
      days = daysInLastMonth - (birthDetails.date - currentDate);
  } else {
      days = currentDate - birthDetails.date;
  }

  return { years, months, days };
};

const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const getDaysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
  ];
  return getDaysInMonth[month - 1];
};

const displayResult = (bdate, bMonth, bYear) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bdate;
};

const displayImage = (years, gender) => {
  // Hide all images first
  document.querySelectorAll('.image-wrapper img').forEach(img => img.style.display = 'none');

  if (years !== null && gender !== null) {
      if (gender === 'male') {
          if (years >= 0 && years < 15) {
              document.getElementById('male-0-15').style.display = 'block';
          } else if (years >= 15 && years < 30) {
              document.getElementById('male-15-30').style.display = 'block';
          } else if (years >= 30 && years < 50) {
              document.getElementById('male-30-50').style.display = 'block';
          } else if (years >= 50 && years < 90) {
              document.getElementById('male-50-90').style.display = 'block';
          }
      } else if (gender === 'female') {
          if (years >= 0 && years < 15) {
              document.getElementById('female-0-15').style.display = 'block';
          } else if (years >= 15 && years < 30) {
              document.getElementById('female-15-30').style.display = 'block';
          } else if (years >= 30 && years < 50) {
              document.getElementById('female-30-50').style.display = 'block';
          } else if (years >= 50 && years < 90) {
              document.getElementById('female-50-90').style.display = 'block';
          }
      }
  }
};

document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);
