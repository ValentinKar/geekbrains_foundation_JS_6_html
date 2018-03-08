"use strict";

/**
 * 2. Реализовать модуль корзины. У каждого товара есть кнопка «Купить», при нажатии на которую
 * происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать
 * общую сумму заказа. Один товар можно добавить несколько раз.
 * @property {Object} settings Настройки корзины.
 */
const basket = {
  settings: {
    divGoodsClass: 'goods',
    buyButton: 'Buy',
  },

  goods: [
    {
      class: 'buy-1',
      name: 'Router Cisco C881-K9',
      painting: 'images/goods/1.jpg',
      price: 22422,
    },

    {
      class: 'buy-2',
      name: 'Router Cisco ISR4331/K9',
      painting: 'images/goods/2.jpg',
      price: 110603,
    },

    {
      class: 'buy-3',
      name: 'Router Cisco ISR4451-X-AXV/K9',
      painting: 'images/goods/3.jpg',
      price: 871416,
    },
  ],

  basket: {
    goods: [],
    number: 0,
    amount: 0,
    tagSum: 'sum',
    tagAmount: 'amount',
  },

  init() {
  	this.renderGoods();
    this.renderSum();
    this.renderAmount();
    this.buyGoods();
  },

  renderGoods() {
    for (let i = 0; i < this.goods.length; i++) {
      // создает элемент div и добавляет class="goods" в созданный div
      const goodsDiv = this.addClassElement('div', this.settings.divGoodsClass);

      // создает новый обьект - image
      const goodsImage = new Image();
      // помещает картинку с товаром внутрь созданного image
      goodsImage.src = this.goods[i].painting;

      // создает элемент span
      const goodsSpan = this.addElem('span');
      // добавляет в созданный span название товара и цену
      goodsSpan.innerHTML = `${this.goods[i].name}, price: ${this.goods[i].price} rub. `;

      // создает элемент button и добавляет class="buy-1,2,3" в созданный button
      const goodsButton = this.addClassElement('button', this.goods[i].class);
      // добавляет надпись buy в созданный button
      goodsButton.innerHTML = this.settings.buyButton;

      this.appendChildElem(goodsDiv, [goodsImage,goodsSpan,goodsButton]);
      // помещает общий собранный div class="goods" внутрь документа
      this.appendChildElem(document.body, [goodsDiv]);
    }
  },

  appendChildElem(elem, array) {
    array.forEach(function(element) {
      elem.appendChild(element);
    });
  },

  addClassElement(elem, classElem) {
    const creatElem = this.addElem(elem);
    creatElem.classList.add(classElem);
    return creatElem;
  },

  addElem(elem) {
    return document.createElement(elem);
  },

  buyGoods() {
    for (let i = 0; i < this.goods.length; i++)  {
      document
        .querySelector(`.${this.goods[i].class}`)
        .addEventListener('click', event => this.goodsClickHandler(event));
    }
  },

  goodsClickHandler(event) {
    for (let i = 0; i < this.goods.length; i++)  {
      if (this.goods[i].class === event.target.classList.value) {
      	this.basket.goods.push(this.goods[i].name);
      	++this.basket.number;
      	this.basket.amount += this.goods[i].price;
      };
    }
    this.renderSum();
    this.renderAmount();
  },

  renderSum() {
    this.renderTag(this.basket.tagSum, this.basket.number);
  },

  renderAmount() {
    this.renderTag(this.basket.tagAmount, this.basket.amount);
  },

  renderTag(tag, string) {
  	document.querySelector(`.${tag}`).innerHTML = string;
  },
};

window.onload = () => basket.init();