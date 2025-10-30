function toggleAdd() {
  var button = document.getElementById("button");
  var form = document.getElementById("form");

  if (button.innerHTML === "Add New") {
    button.innerHTML = "Close";
    form.style.display = "block";
  } else {
    button.innerHTML = "Add New";
    form.style.display = "none";
  }
}

// var list = [{remark:'Salary', amount:'100000', type:'Income'},
//     {remark:'Bonus', amount:'10000', type:'Income'},
//     {remark:'Shopping', amount:'15000', type:'Expense'}]

function updateRow(list) {
  document.getElementById("history").innerHTML = list
    .map(
      (e, index) => ` 
                <tr id="tr" class="hover:bg-indigo-100 hover rounded-sm shadow-sm text-center">
                    <td class="text-sm text-slate-800 font-semibold p-2">${
                      index + 1
                    }</td>
                    <td class="text-sm text-slate-800 font-semibold p-2">${
                      e.remark
                    }</td>
                    <td class="text-sm text-slate-800 font-semibold p-2">${
                      e.amount
                    }</td>
                    <td  class="text-sm text-slate-800 font-semibold p-2">${
                      e.type
                    }</td>

                    <td id="action" class='p-2 '>
                    
                    <button class='bg-red-500 text-white rounded hover:bg-red-700 px-2 my-2 py-1' onClick='deldata(${index})'>Delete</button>
                    </td>
                </tr>`
    )
    .join("");
  setCard();
}

var listofAll = localStorage.getItem("Entry")
  ? JSON.parse(localStorage.getItem("Entry"))
  : [];
updateRow(listofAll);

function addExpense() {
  let inputrmk = document.getElementById("inputrmk");
  let inputamt = document.getElementById("inputamt");
  let inputtype = document.getElementById("inputtype");
  listofAll.push({
    remark: inputrmk.value,
    amount: parseInt(inputamt.value),
    type: inputtype.value,
  });
  updateRow(listofAll);

  //LOCAL STORAGE
  localStorage.setItem("Entry", JSON.stringify(listofAll));

  inputrmk.value = "";
  inputamt.value = "";
  inputtype.value = "Income";

  button.innerHTML = "Add New";
  form.style.display = "none";
}

function deldata(index) {
  listofAll.splice(index, 1);
  localStorage.setItem("Entry", JSON.stringify(listofAll));
  updateRow(listofAll);
}

function setCard() {
  var income = 0.0;
  var expense = 0.0;
  listofAll.map((e) => {
    if (e.type == "Income") {
      income += e.amount;
    } else {
      expense += e.amount;
    }
  });

  document.getElementById("Income").innerHTML = `&#8377;${income}`;
  document.getElementById("Expenses").innerHTML = `&#8377;${expense}`;
  document.getElementById("Balance").innerHTML = `&#8377;${income - expense}`;
}

function showIncome() {
  var listOfIncome = listofAll.filter((e) => e.type == "Income");
  updateRow(listOfIncome);
}
function showExpense() {
  var listOfExpense = listofAll.filter((e) => e.type == "Expense");
  updateRow(listOfExpense);
}
function showAll() {
  updateRow(listofAll);
}

let remarkSortOrder = true;
let amountSortOrder = true;

function sortRemark() {
  remarkSortOrder = !remarkSortOrder;
  const sortedData = listofAll.sort((a, b) =>
    remarkSortOrder
      ? a.remark.localeCompare(b.remark)
      : b.remark.localeCompare(a.remark)
  );

  updateRow(sortedData);

  document.getElementById("remarkArrow").innerHTML = remarkSortOrder
    ? "&uarr;"
    : "&darr;";
}

function sortAmount() {
  amountSortOrder = !amountSortOrder;
  const sortedData = listofAll.sort((a, b) =>
    amountSortOrder ? a.amount - b.amount : b.amount - a.amount
  );

  updateRow(sortedData);

  document.getElementById("amountArrow").innerHTML = amountSortOrder
    ? "&uarr;"
    : "&darr;";
}
