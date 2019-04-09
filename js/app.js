'use strict';

let counter = 0;
let buttonOne = document.getElementById('button-one');
let buttonTwo = document.getElementById('button-two');
let buttonThree = document.getElementById('button-three');
let productImgOne = document.getElementById('one');
let productImgTwo = document.getElementById('two');
let productImgThree = document.getElementById('three');

Product.priorDisplay = [];
Product.currentDisplay = [];
Product.votes = [];
Product.names = [];

function Product(name, url) {
  this.name = name;
  this.url = url;
  this.votes = 0;
  this.iterations = 0;
  this.votePercent = 0;
}

let allProducts = [
  new Product('Bag', 'img/bag.jpg'),
  new Product('Banana', 'img/banana.jpg'),
  new Product('Bathroom', 'img/bathroom.jpg'),
  new Product('Boots', 'img/boots.jpg'),
  new Product('Breakfast', 'img/breakfast.jpg'),
  new Product('Bubblegum', 'img/bubblegum.jpg'),
  new Product('Chair', 'img/chair.jpg'),
  new Product('Cthulu', 'img/cthulhu.jpg'),
  new Product('Dog Duckmouth', 'img/dog-duck.jpg'),
  new Product('Dragon Meat', 'img/dragon.jpg'),
  new Product('Pen', 'img/pen.jpg'),
  new Product('Pet-sweet', 'img/pet-sweep.jpg'),
  new Product('Scissors', 'img/scissors.jpg'),
  new Product('Shark', 'img/shark.jpg'),
  new Product('Sweep', 'img/sweep.png'),
  new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg'),
  new Product('Unicorn', 'img/unicorn.jpg'),
  new Product('Tentacle Usb drive', 'img/usb.gif'),
  new Product('Water Can', 'img/water-can.jpg'),
  new Product('Wine glass', 'img/wine-glass.jpg'),
];

let firstProd = allProducts[0];
let secondProd = allProducts[1];
let thirdProd = allProducts[2];


function firstProdClick() {
  counter++;
  firstProd.votes++;
  firstProd.iterations++;
  secondProd.iterations++;
  thirdProd.iterations++;
  newProduct();
  counterEnd();
}

function secondProdClick() {
  counter++;
  secondProd.votes++;
  firstProd.iterations++;
  secondProd.iterations++;
  thirdProd.iterations++;
  newProduct();
  counterEnd();
}

function thirdProdClick() {
  counter++;
  thirdProd.votes++;
  firstProd.iterations++;
  secondProd.iterations++;
  thirdProd.iterations++;
  newProduct();
  counterEnd();
}

buttonOne.addEventListener('click', firstProdClick);
buttonTwo.addEventListener('click', secondProdClick);
buttonThree.addEventListener('click', thirdProdClick);

function roll() {
  firstProd = allProducts[Math.floor(Math.random() * allProducts.length)];
  secondProd = allProducts[Math.floor(Math.random() * allProducts.length)];
  thirdProd = allProducts[Math.floor(Math.random() * allProducts.length)];
}

function newProduct() {
  roll();
  while (firstProd.url === secondProd.url || firstProd.url === thirdProd.url || secondProd.url === thirdProd.url ||
    Product.priorDisplay.includes(firstProd.url) || Product.priorDisplay.includes(secondProd.url) ||
    Product.priorDisplay.includes(thirdProd.url)) {
    roll();
  }
  Product.currentDisplay.push(firstProd.url);
  Product.currentDisplay.push(secondProd.url);
  Product.currentDisplay.push(thirdProd.url);
  productImgOne.src = firstProd.url;
  productImgTwo.src = secondProd.url;
  productImgThree.src = thirdProd.url;
  Product.priorDisplay[0] = firstProd.url;
  Product.priorDisplay[1] = secondProd.url;
  Product.priorDisplay[2] = thirdProd.url;
}


function counterEnd () {
  let voteTally = document.getElementById('votes');
  if (counter === 25) {
    for (let i = 0; i < allProducts.length; i++) {
      Product.votes.push(allProducts[i].votes);
      Product.names.push(allProducts[i].name);
      let liEl = document.createElement('li');
      liEl.textContent = allProducts[i].name + ' ' + allProducts[i].votes + ' Votes';
      voteTally.appendChild(liEl);
      let division = (allProducts[i].votes / allProducts[i].iterations);
      let votePercent = Math.round(division * 100);
      allProducts[i].votePercent = votePercent;
    }
    buttonOne.removeEventListener('click', firstProdClick);
    buttonTwo.removeEventListener('click', secondProdClick);
    buttonThree.removeEventListener('click', thirdProdClick);
  }
}

counterEnd();
newProduct();
counterEnd();
