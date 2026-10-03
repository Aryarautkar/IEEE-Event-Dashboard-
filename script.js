// State management
let participants = JSON.parse(localStorage.getItem("ieee_participants")) || [
  {
    name: "Aman Gupta",
    email: "aman@mitsgwalior.in",
    branch: "CST",
    year: "1st Year",
    phone: "9876543210"
  }
];

// Elements
const form = document.getElementById("registrationForm");
const participantList = document.getElementById("participantList");
const searchInput = document.getElementById("searchInput");
const filterBranch = document.getElementById("filterBranch");
const totalCount = document.getElementById("totalCount");
const noResults = document.getElementById("noResults");

// Error elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const branchError = document.getElementById("branchError");
const yearError = document.getElementById("yearError");
const phoneError = document.getElementById("phoneError");

// Render Participants Table
function renderList() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedBranch = filterBranch.value;

  const filtered = participants.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                          p.email.toLowerCase().includes(searchTerm);
    const matchesBranch = selectedBranch === "ALL" || p.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  totalCount.textContent = participants.length;
  participantList.innerHTML = "";

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    filtered.forEach((p, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${p.name}</strong></td>
        <td>${p.email}</td>
        <td>${p.branch}</td>
        <td>${p.year}</td>
        <td>${p.phone}</td>
      `;
      participantList.appendChild(row);
    });
  }
}

// Validation Logic
function validateForm() {
  let isValid = true;

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  branchError.textContent = "";
  yearError.textContent = "";
  phoneError.textContent = "";

  const nameVal = document.getElementById("fullName").value.trim();
  const emailVal = document.getElementById("email").value.trim();
  const branchVal = document.getElementById("branch").value;
  const yearVal = document.getElementById("year").value;
  const phoneVal = document.getElementById("phone").value.trim();

  // Name check
  if (!nameVal || nameVal.length < 3) {
    nameError.textContent = "Please enter a valid name (min 3 chars).";
    isValid = false;
  }

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailVal)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Branch check
  if (!branchVal) {
    branchError.textContent = "Please select your branch.";
    isValid = false;
  }

  // Year check
  if (!yearVal) {
    yearError.textContent = "Please select your current year.";
    isValid = false;
  }

  // Phone check (10 digits)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phoneVal)) {
    phoneError.textContent = "Enter a valid 10-digit mobile number.";
    isValid = false;
  }

  return isValid;
}

// Submit Event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const newParticipant = {
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    branch: document.getElementById("branch").value,
    year: document.getElementById("year").value,
    phone: document.getElementById("phone").value.trim()
  };

  participants.unshift(newParticipant);
  localStorage.setItem("ieee_participants", JSON.stringify(participants));

  form.reset();
  renderList();
  alert("Registration Successful!");
});

// Search and Filter Listeners
searchInput.addEventListener("input", renderList);
filterBranch.addEventListener("change", renderList);

// Initial Load
renderList();

