import { baseEmployee } from "./data.js";
import { renderEmployees } from "./render.js";
import { updateFiltersUI } from "./filters.js";
import { setState } from "./state.js";
import { updateStats } from "./stats.js";
import { clearFilters } from "./filters.js";
import { openAddModal } from "./modal.js";

import {
  editEmployee,
  deleteEmployee,
  saveEmployee,
  closeModal,
} from "./formHandler.js";

window.openAddModal = openAddModal;
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.saveEmployee = saveEmployee;
window.closeModal = closeModal;

document.addEventListener("DOMContentLoaded", () => {
  const newEmployees = JSON.parse(localStorage.getItem("newEmployees") || "[]");
  const allEmployees = [...baseEmployee, ...newEmployees];
  setState({ employees: allEmployees });

  updateFiltersUI();
  renderEmployees();
});
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    setState({ searchTerm: e.target.value, currentPage: 1 });
    renderEmployees();
  });

  document
    .getElementById("departmentFilter")
    .addEventListener("change", (e) => {
      setState({ departmentFilter: e.target.value, currentPage: 1 });
      renderEmployees();
    });

  document.getElementById("roleFilter").addEventListener("change", (e) => {
    setState({ roleFilter: e.target.value, currentPage: 1 });
    renderEmployees();
  });

  document.getElementById("itemsPerPage").addEventListener("change", (e) => {
    setState({ itemsPerPage: parseInt(e.target.value), currentPage: 1 });
    renderEmployees();
  });

  document.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = btn.dataset.field;
      setState((prev) => {
        const newOrder =
          prev.sortField === field && prev.sortOrder === "asc" ? "desc" : "asc";
        return { sortField: field, sortOrder: newOrder };
      });
      renderEmployees();
    });
  });

  document
    .querySelector(".btn-primary")
    .addEventListener("click", openAddModal);
  document
    .querySelector(".btn-secondary")
    .addEventListener("click", clearFilters);

  // Initial UI setup
  updateFiltersUI();
  renderEmployees();
});

document.addEventListener("DOMContentLoaded", () => {
  // Clear Button
  document.getElementById("clearBtn")?.addEventListener("click", clearFilters);
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = btn.dataset.field;

      import("./state.js").then(({ getState, setState }) => {
        const { sortField, sortOrder } = getState();
        const newOrder =
          sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setState({ sortField: field, sortOrder: newOrder });

        import("./render.js").then(({ renderEmployees }) => renderEmployees());
        updateSortButtons();
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".modal-footer .btn-secondary")
    .addEventListener("click", closeModal);

  document
    .getElementById("employeeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      saveEmployee();
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // Combine base + localStorage data if available
  const newEmployees = JSON.parse(localStorage.getItem("newEmployees") || "[]");
  const employees = [...baseEmployee, ...newEmployees];

  setState({ employees });

  updateFiltersUI();
  renderEmployees();
  updateStats();
});

document.addEventListener("DOMContentLoaded", () => {
  const sortButtons = document.querySelectorAll(".sort-btn");

  sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      sortButtons.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked one
      btn.classList.add("active");

      const field = btn.dataset.field;
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Select all major sections to animate
  const fadeElements = document.querySelectorAll(
    ".header, .controls-card, .stats-grid, .results-info, .employee-grid, .pagination"
  );

  fadeElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("fade-in");
    }, i * 150); // delay each section slightly
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".container").classList.add("fade-zoom");
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  container.classList.add("zoom-in");

  // Force scroll to top after short delay
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 500); // match the animation duration (0.5s)
});
