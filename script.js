document.getElementById("birthdate").max = new Date()
  .toISOString()
  .split("T")[0];

function calculateAge() {
  const birthdate = document.getElementById("birthdate").value;
  const resultElement = document.getElementById("result");

  if (birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);

    if (birthDate > today) {
      resultElement.innerText = "Birthdate cannot be in the future!";
      resultElement.style.color = "red";
      return;
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    resultElement.innerText = `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days.`;
    resultElement.style.color = "green";
  } else {
    resultElement.innerText = "Please enter your birthdate";
    resultElement.style.color = "red";
  }
}

function resetForm() {
  document.getElementById("birthdate").value = "";
  const resultElement = document.getElementById("result");
  resultElement.innerText = "";
  resultElement.style.color = "#333";
}
