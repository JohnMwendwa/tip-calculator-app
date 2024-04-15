const form = document.querySelector("form");
const resetBtn = document.querySelector(".reset__btn");
const billInput = document.querySelector("#bill");
const tipInput = document.querySelector("#tip");
const peopleInput = document.querySelector("#people");
const tipBtns = document.querySelectorAll(".tip__btn");
const tipAmountDisplay = document.querySelector(".tip__amount > h3");
const totalAmountDisplay = document.querySelector(".total__amount > h3");

// Error message
const billError = document.querySelector(".error__bill");
const peopleError = document.querySelector(".error__people");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Add active class to tip buttons
tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
  });
});

let tip = 0;

// Get tip value from tip buttons
tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset tip value from custom tip input field
    tipInput.value = "";
    tip = parseFloat(btn.textContent.split("%")[0]);

    // Calculate tip amount when tip button is clicked
    if (billInput.value > 0 && peopleInput.value > 0) {
      calculateTip();
    }
  });
});

// Get tip value from custom tip input field
tipInput.addEventListener("keyup", () => {
  // Remove active class from tip buttons
  tipBtns.forEach((btn) => btn.classList.remove("active"));

  // Update tip amount when custom tip input field is not empty
  if (tipInput.value < 0) {
    tipInput.style.outline = "2px solid var(--soft-red)";
    tip = 0;
  } else if (!tipInput.value) {
    tip = 0;
  } else {
    tip = parseFloat(tipInput.value);
    tipInput.style.outline = "none";
  }
});

// Calculate tip amount
const calculateTip = () => {
  const bill = parseFloat(billInput.value).toFixed(2);
  const people = parseFloat(peopleInput.value);

  const tipAmount = (bill * (tip / 100)) / people;
  const totalAmount = bill / people + tipAmount;

  //   Display tip amount
  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;

  //   Display total amount
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
};

// Calculate tip amount on keyup
form.addEventListener("keyup", () => {
  if (!peopleInput.value) {
    peopleInput.style.outline = "2px solid var(--soft-red)";
    peopleError.textContent = "Can't be zero";
  } else if (peopleInput.value < 0) {
    peopleInput.style.outline = "2px solid var(--soft-red)";
    peopleError.textContent = "Can't be negative";
  } else {
    peopleInput.style.outline = "none";
    peopleError.textContent = "";
  }

  if (!billInput.value) {
    billInput.style.outline = "2px solid var(--soft-red)";
    billError.textContent = "Can't be zero";
  } else if (billInput.value < 0) {
    billInput.style.outline = "2px solid var(--soft-red)";
    billError.textContent = "Can't be negative";
  } else {
    billInput.style.outline = "none";
    billError.textContent = "";
  }

  // Set display to zero when bill and people input fields are empty
  if (
    !billInput.value ||
    billInput.value < 0 ||
    !peopleInput.value ||
    peopleInput.value < 0 ||
    tipInput.value < 0
  ) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
  }

  // Calculate tip amount when bill and people input fields are not empty
  if (billInput.value > 0 && peopleInput.value > 0 && tipInput.value >= 0) {
    calculateTip();
  }
});

// Reset form when reset button is clicked
resetBtn.addEventListener("click", () => {
  window.location.reload();
});
