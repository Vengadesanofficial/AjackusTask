import { getState, setState } from "./state.js";
import { renderEmployees } from "./render.js";
import { updateFiltersUI } from "./filters.js";
import { updateStats } from "./stats.js";
import { showToast } from "./toast.js";
import { getFilteredEmployees } from "./filters.js";

export function editEmployee(id) {
  const { employees } = getState();
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) return;

  setState({ editingEmployeeId: id });

  document.getElementById("modalTitle").textContent = "Edit Employee";
  document.getElementById("firstName").value = employee.firstName;
  document.getElementById("lastName").value = employee.lastName;
  document.getElementById("email").value = employee.email;
  document.getElementById("department").value = employee.department;
  document.getElementById("role").value = employee.role;

  clearErrors();
  document.getElementById("modalOverlay").style.display = "flex";
}

export function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("employeeForm").reset();
  clearErrors();
  setState({ editingEmployeeId: null });
}

export function saveEmployee() {
  if (!validateForm()) return;

  const { employees, editingEmployeeId } = getState();

  const formData = new FormData(document.getElementById("employeeForm"));
  const employeeData = {
    firstName: formData.get("firstName").trim(),
    lastName: formData.get("lastName").trim(),
    email: formData.get("email").trim(),
    department: formData.get("department"),
    role: formData.get("role").trim(),
  };

  let updatedEmployees = [...employees];

  if (editingEmployeeId) {
    const index = employees.findIndex((emp) => emp.id === editingEmployeeId);
    if (index !== -1) {
      updatedEmployees[index] = { ...employeeData, id: editingEmployeeId };
      showToast("Employee updated successfully!");
    }
  } else {
    const newId = Math.max(...employees.map((e) => e.id), 0) + 1;
    const newEmp = { ...employeeData, id: newId };

    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem("newEmployees") || "[]");
    stored.push(newEmp);
    localStorage.setItem("newEmployees", JSON.stringify(stored));

    updatedEmployees.push(newEmp);
    showToast("Employee added successfully!");
  }

  setState({ employees: updatedEmployees, editingEmployeeId: null });
  closeModal();
  updateFiltersUI();
  updateStats();
  renderEmployees();
}

export function deleteEmployee(id) {
  const { employees, currentPage, itemsPerPage } = getState();

  if (!confirm("Are you sure you want to delete this employee?")) return;

  const updatedEmployees = employees.filter((emp) => emp.id !== id);
  setState({ employees: updatedEmployees });

  showToast("Employee deleted successfully!");
  updateFiltersUI();
  updateStats();

  const filtered = getFilteredEmployees();
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    setState({ currentPage: totalPages });
  }

  renderEmployees();
}

//  basic validation and utility
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
}

function validateForm() {
  clearErrors();
  let valid = true;

  const getVal = (id) => document.getElementById(id).value.trim();

  if (!getVal("firstName")) {
    showError("firstNameError", "First name is required");
    valid = false;
  }
  if (!getVal("lastName")) {
    showError("lastNameError", "Last name is required");
    valid = false;
  }
  const email = getVal("email");
  if (!email) {
    showError("emailError", "Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("emailError", "Invalid email");
    valid = false;
  }

  if (!getVal("department")) {
    showError("departmentError", "Department is required");
    valid = false;
  }
  if (!getVal("role")) {
    showError("roleError", "Role is required");
    valid = false;
  }

  return valid;
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
