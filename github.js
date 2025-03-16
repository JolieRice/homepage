function toggleDropdown(id) {
  var dropdown = document.getElementById(id);

  // Close all other dropdowns before opening this one
  document.querySelectorAll(".dropdown-content").forEach((content) => {
    if (content.id !== id) {
      content.style.display = "none";
    }
  });

  // Toggle visibility
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}
