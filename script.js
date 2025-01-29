// Initialize expenses array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

// Function to display all expenses
function displayExpenses() {
  // Clear current list
  expenseList.innerHTML = '';

  // Add each expense to the list
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('flex', 'justify-between', 'items-center', 'mb-4', 'p-4', 'border', 'border-gray-300', 'rounded-lg');
    expenseItem.innerHTML = `
      <div>
        <strong>${expense.name}</strong>: $${expense.amount}
      </div>
      <button onclick="removeExpense(${index})" class="bg-red-500 text-white p-2 rounded-lg">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });

  // Update total amount
  const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  totalAmountDisplay.innerHTML = `Total: $${totalAmount.toFixed(2)}`;
}

// Function to add expense
function addExpense(name, amount) {
  expenses.push({ name, amount });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Function to remove expense
function removeExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Event listener for form submission
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
    addExpense(expenseName, expenseAmount);
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  } else {
    alert('Please enter valid expense details');
  }
});

// Initial call to display expenses when the page loads
displayExpenses();
