document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".tip-btn");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalAmountDisplay = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset");

  let billValue = 0;
  let tipValue = 0;
  let peopleValue = 1;

  billInput.addEventListener("input", handleInput);
  peopleInput.addEventListener("input", handleInput);
  customTipInput.addEventListener("input", handleCustomTip);

  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tipValue = parseFloat(this.getAttribute("data-tip"));
      clearCustomTip();
      calculateTip();
    });
  });

  resetButton.addEventListener("click", reset);

  function handleInput() {
    billValue = parseFloat(billInput.value) || 0;
    peopleValue = parseFloat(peopleInput.value) || 1;
    calculateTip();
  }

  function handleCustomTip() {
    tipValue = parseFloat(customTipInput.value) || 0;
    calculateTip();
  }

  function clearCustomTip() {
    customTipInput.value = "";
  }

  function calculateTip() {
    if (peopleValue > 0) {
      let tipAmount = (billValue * (tipValue / 100)) / peopleValue;
      let totalAmount = billValue / peopleValue + tipAmount;
      tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }

    toggleResetButton();
  }

  function toggleResetButton() {
    if (billValue || tipValue || peopleValue) {
      resetButton.disabled = false;
    } else {
      resetButton.disabled = true;
    }
  }

  function reset() {
    billInput.value = "";
    peopleInput.value = "";
    clearCustomTip();
    tipValue = 0;
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    resetButton.disabled = true;
  }
});
