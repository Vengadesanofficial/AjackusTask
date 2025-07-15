import { getState, setState } from "./state.js";
import { renderEmployees } from "./render.js";

export function renderPagination(totalPages) {
  const { currentPage } = getState();
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.className = "page-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => changePage(currentPage - 1));
  pagination.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = "page-btn" + (i === currentPage ? " active" : "");
    pageBtn.addEventListener("click", () => changePage(i));
    pagination.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.className = "page-btn";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => changePage(currentPage + 1));
  pagination.appendChild(nextBtn);
}

function changePage(page) {
  const { itemsPerPage } = getState();
  const totalItems = getState().employees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (page >= 1 && page <= totalPages) {
    setState({ currentPage: page });
    renderEmployees();
  }
}
