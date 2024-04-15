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
  });
});

// Get tip value from custom tip input field
tipInput.addEventListener("keyup", () => {
  // Remove active class from tip buttons
  tipBtns.forEach((btn) => btn.classList.remove("active"));
  tip = parseFloat(tipInput.value);
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
  } else {
    peopleInput.style.outline = "none";
    peopleError.textContent = "";
  }

  if (!billInput.value) {
    billInput.style.outline = "2px solid var(--soft-red)";
    billError.textContent = "Can't be zero";
  } else {
    billInput.style.outline = "none";
    billError.textContent = "";
  }

  if (billInput.value && peopleInput.value) {
    calculateTip();
  }
});

// Reset form when reset button is clicked
resetBtn.addEventListener("click", () => {
  form.reset();
});
