import { employees, editingEmployeeId } from "./state.js";

export function validateForm() {
  const email = document.getElementById("email").value.trim();
  const emailTaken = employees.some(
    (e) =>
      e.email.toLowerCase() === email.toLowerCase() &&
      e.id !== editingEmployeeId
  );
  if (emailTaken) {
    showError("emailError", "This email is already taken");
    return false;
  }
  return true;
}
