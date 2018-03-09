"use strict";

/**
 * 2. Реализовать модуль корзины. У каждого товара есть кнопка «Купить», при нажатии на которую
 * происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать
 * общую сумму заказа. Один товар можно добавить несколько раз.
 * @property {Object} settings Настройки корзины.
 * @property {Object} goods Список товаров.
 * @property {Object} basket Корзина.
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

  /**
   * Инициализирует корзину.
   */
  init() {
  	// строит теги с товарами (изображения, кнопки ...)
    this.renderGoods();
    // отображает кол-во товаров в корзине
    this.renderSum();
    // отображает сумму товаров в корзине
    this.renderAmount();
    // запускает обработчики событий по кнопкам купить
    this.buyGoods();
  },

  /**
   * Строит страницу с товарами.
   */
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

  /**
   * Помещает теги из массива array внутрь тега elem.
   * @param {Object} elem Наружний обьект (тэг).
   * @param {array} array Массив с обьектами (тэгами), которые будут внутри elem.
   */
  appendChildElem(elem, array) {
    array.forEach(function(element) {
      elem.appendChild(element);
    });
  },

  /**
   * Создает тэг elem в документе (на html странице) и добавляет в него класс.
   * @param {string} elem Создаваемый элемент (тэг).
   * @param {string} classElem Класс, который добавляется к тэгу elem.
   * @returns {Object} classElem Созданный тэг с классом.
   */
  addClassElement(elem, classElem) {
    const creatElem = this.addElem(elem);
    creatElem.classList.add(classElem);
    return creatElem;
  },

  /**
   * Создает тэг elem в документе (на html странице).
   * @param {string} elem Создаваемый элемент (тэг).
   * @returns {Object} Созданный тэг.
   */
  addElem(elem) {
    return document.createElement(elem);
  },

  /**
   * Создает ряд обработчиков событий click по кнопке button. И передает 
   * событие event в метод goodsClickHandler.
   */
  buyGoods() {
    for (let i = 0; i < this.goods.length; i++)  {
      document
        .querySelector(`.${this.goods[i].class}`)
        .addEventListener('click', event => this.goodsClickHandler(event));
    }
  },

  /**
   * Принимает на обработку событие event и заносит товары в корзину.
   * @param {Object} event Событие click по кнопке button.
   */
  goodsClickHandler(event) {
    for (let i = 0; i < this.goods.length; i++)  {
      // для всего ряда товаров, если событие было на кнопке с классом = классу товара
      if (this.goods[i].class === event.target.classList.value) {
      	// добавляет название товара в корзину
      	this.basket.goods.push(this.goods[i].name);
      	// увеличивает кол-во товаров в корзине
      	++this.basket.number;
      	// увеличивает сумму в корзине
      	this.basket.amount += this.goods[i].price;
      };
    }
    // отображает кол-во товаров в корзине на странице
    this.renderSum();
    // отображает стоимость выбранных товаров в корзине
    this.renderAmount();
  },

  /**
   * Отображает кол-во товаров в корзине на html-странице.
   */
  renderSum() {
    this.renderTag(this.basket.tagSum, this.basket.number);
  },

  /**
   * Отображает стоимость выбранных товаров в корзине на html-странице.
   */
  renderAmount() {
    this.renderTag(this.basket.tagAmount, this.basket.amount);
  },

  /**
   * Добавляет внутрь тэга на html-странице строку string.
   * @param {Object} tag Тэг на html-странице.
   * @param {string} string Строка, записываемая в тэг.
   */
  renderTag(tag, string) {
  	document.querySelector(`.${tag}`).innerHTML = string;
  },
};

window.onload = () => basket.init();