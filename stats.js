// stats.js
import { getState } from "./state.js";

export function updateStats() {
  const { employees } = getState();

  document.getElementById("totalEmployees").textContent = employees.length;

  const departments = [...new Set(employees.map((emp) => emp.department))];
  document.getElementById("totalDepartments").textContent = departments.length;

  const roles = [...new Set(employees.map((emp) => emp.role))];
  document.getElementById("totalRoles").textContent = roles.length;
}
