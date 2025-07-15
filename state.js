export let employees = [];
export let currentPage = 1;
export let itemsPerPage = 10;
export let searchTerm = "";
export let departmentFilter = "all";
export let roleFilter = "all";
export let sortField = "firstName";
export let sortOrder = "asc";
export let editingEmployeeId = null;

export function setState(partialState) {
  if ("employees" in partialState) employees = partialState.employees;
  if ("currentPage" in partialState) currentPage = partialState.currentPage;
  if ("itemsPerPage" in partialState) itemsPerPage = partialState.itemsPerPage;
  if ("searchTerm" in partialState) searchTerm = partialState.searchTerm;
  if ("departmentFilter" in partialState)
    departmentFilter = partialState.departmentFilter;
  if ("roleFilter" in partialState) roleFilter = partialState.roleFilter;
  if ("sortField" in partialState) sortField = partialState.sortField;
  if ("sortOrder" in partialState) sortOrder = partialState.sortOrder;
  if ("editingEmployeeId" in partialState)
    editingEmployeeId = partialState.editingEmployeeId;
}

export function getState() {
  return {
    employees,
    currentPage,
    itemsPerPage,
    searchTerm,
    departmentFilter,
    roleFilter,
    sortField,
    sortOrder,
    editingEmployeeId,
  };
}
