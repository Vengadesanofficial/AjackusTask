import {
  employees,
  searchTerm,
  departmentFilter,
  roleFilter,
  sortField,
  sortOrder,
} from "./state.js";
import { setState } from "./state.js";
import { renderEmployees } from "./render.js";
export function getFilteredEmployees() {
  return employees.filter((employee) => {
    const matchesSearch =
      searchTerm === "" ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;

    const matchesRole = roleFilter === "all" || employee.role === roleFilter;

    return matchesSearch && matchesDepartment && matchesRole;
  });
}

export function getSortedEmployees(filteredEmployees) {
  return filteredEmployees.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
}

export function updateFiltersUI() {
  const departmentFilterEl = document.getElementById("departmentFilter");
  const roleFilterEl = document.getElementById("roleFilter");

  const departments = [...new Set(employees.map((emp) => emp.department))];
  departmentFilterEl.innerHTML =
    '<option value="all">All Departments</option>' +
    departments.map((d) => `<option value="${d}">${d}</option>`).join("");

  const roles = [...new Set(employees.map((emp) => emp.role))];
  roleFilterEl.innerHTML =
    '<option value="all">All Roles</option>' +
    roles.map((r) => `<option value="${r}">${r}</option>`).join("");
}
export function clearFilters() {
  setState({
    searchTerm: "",
    departmentFilter: "all",
    roleFilter: "all",
    sortField: "firstName",
    sortOrder: "asc",
    currentPage: 1,
  });

  document.getElementById("searchInput").value = "";
  document.getElementById("departmentFilter").value = "all";
  document.getElementById("roleFilter").value = "all";

  updateSortButtons?.();
  renderEmployees();
}
export function updateSortButtons() {
  document.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.classList.remove("active", "asc", "desc");
    if (btn.dataset.field === sortField) {
      btn.classList.add("active", sortOrder);
    }
  });
}
