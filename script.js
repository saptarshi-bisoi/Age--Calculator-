// Set max date to today
document.getElementById("birthdate").max = new Date()
  .toISOString()
  .split("T")[0];

// Add loading state management
let isLoading = false;

function setLoading(loading) {
  isLoading = loading;
  const buttons = document.querySelectorAll("button");
  const container = document.querySelector(".container");

  if (loading) {
    container.classList.add("loading");
    buttons.forEach((btn) => (btn.disabled = true));
  } else {
    container.classList.remove("loading");
    buttons.forEach((btn) => (btn.disabled = false));
  }
}

function calculateAge() {
  if (isLoading) return;

  const birthdate = document.getElementById("birthdate").value;
  const resultElement = document.getElementById("result");

  if (!birthdate) {
    showResult("Please enter your birthdate", "error");
    return;
  }

  setLoading(true);

  // Simulate a small delay for better UX
  setTimeout(() => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    if (birthDate > today) {
      showResult("Birthdate cannot be in the future!", "error");
      setLoading(false);
      return;
    }

    const age = calculateExactAge(birthDate, today);
    showResult(
      `Your age is ${age.years} years, ${age.months} months, and ${age.days} days.`,
      "success"
    );
    setLoading(false);
  }, 300);
}

function calculateExactAge(birthDate, today) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function showResult(message, type = "info") {
  const resultElement = document.getElementById("result");

  // Clear previous content
  resultElement.innerHTML = "";

  // Add appropriate styling based on type
  resultElement.style.color =
    type === "success" ? "green" : type === "error" ? "red" : "#333";

  // Create and append the message
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.minHeight = "60px";

  resultElement.appendChild(messageElement);

  // Add animation
  resultElement.style.animation = "none";
  resultElement.offsetHeight; // Trigger reflow
  resultElement.style.animation = "slideIn 0.4s ease-out";
}

function resetForm() {
  if (isLoading) return;

  const form = document.querySelector("form");
  const resultElement = document.getElementById("result");

  // Reset form
  form.reset();

  // Clear result with animation
  resultElement.style.animation = "slideOut 0.3s ease-out";

  setTimeout(() => {
    resultElement.innerHTML = "";
    resultElement.style.animation = "";
    resultElement.style.color = "#333";
  }, 300);
}

// Add keyboard support
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const birthdateInput = document.getElementById("birthdate");

  // Handle Enter key on input
  birthdateInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateAge();
    }
  });

  // Add focus styles
  birthdateInput.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  birthdateInput.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");
  });
});

// Add slideOut animation to CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  .input-group.focused label {
    color: rgba(255, 255, 255, 1);
  }
`;
document.head.appendChild(style);
