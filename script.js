
var currentDay = document.getElementById("currentDay");

const current = new Date();

const today = current.getDay();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const month = current.getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const todaydate = current.getDate();

// Displays current Day, Month and Date at the top of the page //
currentDay.textContent = dayNames[today] + ', ' + monthNames[month] + ' ' + todaydate;

// Execution starts when DOM is fully loaded //
$(document).ready(function () {

  const currentHour = dayjs().hour(); // Gets current hour from JS library //

  // Saves user's input to localStorage when saveBtn is clicked //
  function saveInput() {
    $('.saveBtn').on('click', function () {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('description').val();

      localStorage.setItem(key, value);
    });
  }

  // Toggles between past, present and future classes to style each time block comparing with current time //
  function compareHour() {
    $('.time-block').each(function () {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  // Resets the color of each time block based on whether it's in the past, present or future comparing with the current hour //
  function resetState() {
    $('.time-block').each(function () {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      }
      else if (blockHour > currentHour) {
        $(this).removeClass('past present').addClass('future');
      }
      else {
        $(this).removeClass('present future').addClass('past');
      }

    });
  }

  // Retrieves value from localStorage and sets them to the textarea values for each time-block //

  $('.time-block').each(function () {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

 // Calls all main functions //
  compareHour();
  saveInput();
  resetState();

});
