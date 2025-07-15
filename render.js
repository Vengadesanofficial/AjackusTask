import { currentPage, itemsPerPage } from "./state.js";
import { getFilteredEmployees, getSortedEmployees } from "./filters.js";
import { renderPagination } from "./pagination.js";
export function renderEmployees() {
  const filtered = getFilteredEmployees();
  const sorted = getSortedEmployees(filtered);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const grid = document.getElementById("employeeGrid");
  const empty = document.getElementById("emptyState");
  const pagination = document.getElementById("pagination");

  document.getElementById(
    "resultsText"
  ).textContent = `Showing ${paginated.length} of ${filtered.length} employees`;

  if (paginated.length === 0) {
    grid.style.display = "none";
    empty.style.display = "block";
    pagination.style.display = "none";
    return;
  }

  grid.innerHTML = paginated
    .map(
      (emp) => `
    <div class="employee-card">
      <div class="employee-header">
        <div class="employee-name">${emp.firstName} ${emp.lastName}</div>
        <div class="employee-id">#${emp.id}</div>
      </div>
      <div class="employee-email">${emp.email}</div>
      <div class="employee-details">
        <span class="employee-badge">${emp.department}</span>
        <span class="employee-badge">${emp.role}</span>
      </div>
      <div class="employee-actions">
        <button class="btn-edit" onclick="editEmployee(${emp.id})">Edit</button>
        <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    </div>`
    )
    .join("");

  grid.style.display = "grid";
  empty.style.display = "none";

  if (totalPages > 1) {
    pagination.style.display = "flex";
    renderPagination(totalPages);
  } else {
    pagination.style.display = "none";
  }
}
