'use strict';

// define empty array for st all objects
let FoodArray = [];

//build constructor
function Food(userName, type) {
  this.type = "img/"+type+".jpg";
  this.userName = userName;

  FoodArray.push(this);
}

function RandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
}
// eslint-disable-next-line no-unused-vars

//set data In localStorage
function setDataInLS() {
  localStorage.setItem('food', JSON.stringify(FoodArray));
}
//Get Data From localstorage
function getDataFromLS() {
  let result = JSON.parse(localStorage.getItem('food'));

  if (result != null) {
    FoodArray = [];
    FoodArray = result;
  }
}

/**
 * @param{event}event
 */

//get Data From user
document.getElementById('FoodForm').addEventListener('submit', (event) => {
  event.preventDefault();

  let user = event.target.userName.value;
  let foodType = event.target.selectFood.value;

  new Food(user, foodType);
  setDataInLS();
  renderDataInTable();
});
console.log(FoodArray);

//renderTable
renderTable();
function renderTable() {
  let body = document.getElementById('resultFood');

  let tableElement = document.createElement('table');
  body.appendChild(tableElement);

  let headerTable = document.createElement('thead');
  tableElement.appendChild(headerTable);

  let trInThead = document.createElement('tr');
  headerTable.appendChild(trInThead);

  let tdInHeaderuserName = document.createElement('td');
  trInThead.appendChild(tdInHeaderuserName);
  tdInHeaderuserName.textContent = 'orderImg';

  let tdInHeaderTypeFood = document.createElement('td');
  trInThead.appendChild(tdInHeaderTypeFood);
  tdInHeaderTypeFood.textContent = 'order Deatiels';

  let tbodyTable = document.createElement('tbody');
  tableElement.appendChild(tbodyTable);
}

function renderDataInTable() {
  let count = 0;
  let tbody = document.getElementsByTagName('tbody')[0];
  tbody.textContent = '';
  for (let i = 0; i < FoodArray.length; i++) {
    let trInTbody = document.createElement('tr');
    tbody.appendChild(trInTbody);

    let tdinTbody = document.createElement('td');
    trInTbody.appendChild(tdinTbody);

    let imgTD = document.createElement('img');
    imgTD.setAttribute('src', FoodArray[i].type);
    imgTD.setAttribute('indexArray', `${count}`);
    imgTD.setAttribute('onclick', `removeItem(${count})`);
    tdinTbody.appendChild(imgTD);

    /*** */
    let tdName = document.createElement('td');
    trInTbody.appendChild(tdName);

    let pElement = document.createElement('p');
    tdName.appendChild(pElement);
    pElement.textContent = 'Customer name: ' + FoodArray[i].userName;
    //************************ */
    let pElement2 = document.createElement('p');
    tdName.appendChild(pElement2);
    pElement2.textContent = "Food Type: " + `${FoodArray[i].type}`;
    /***************************** */
    let pElement3 = document.createElement('p');
    tdName.appendChild(pElement3);
    // eslint-disable-next-line new-cap
    pElement3.textContent = RandomNumber();
  }
}

// eslint-disable-next-line no-unused-vars
function removeItem(index) {
  let newArray = FoodArray.filter((item) => item !== FoodArray[index]);

  FoodArray = newArray;
  setDataInLS();
  getDataFromLS();
  location.reload();
}
// let e3 = new Food("qasem", "pizza");
getDataFromLS();
renderDataInTable();
