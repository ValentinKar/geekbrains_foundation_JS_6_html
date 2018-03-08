"use strict";

/**
 * 1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
 * картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
 * ставиться картинка-заглушка сообщающая об ошибке.
 * @property {Object} settings Настройки галереи.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    nothingImageScreen: 'images/max/nothing.jpg',
  },

  /**
   * Инициализируем галерею.
   * @param {Object} settings Объект с настройками.
   */
  init(settings) {
    this.settings = Object.assign(this.settings, settings);

    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },


  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клика мышью.
   * @param {string} event.target.dataset.full_image_url Событие клика мышью.
   */
  containerClickHandler(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }

    this.openImage(event.target.dataset.full_image_url);
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
    };
    img.onerror = () => {
      this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = this.settings.nothingImageScreen;
    };
  },

  /**
   * Возвращает контейнер для открытой картинки.
   * @returns {Element}
   */
  getScreenContainer() {
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);

    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    return this.createScreenContainer();
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {Element}
   */
  createScreenContainer() {
    // создает элемент div
    const galleryWrapperElement = document.createElement('div');
    // добавляет класс galleryWrapper в созданный div (предыд.строка)
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // создает пустой элемент div
    const galleryScreenElement = document.createElement('div');
    // добавляет в созданный выше элемент div класс galleryWrapper__screen
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    // помещает div galleryWrapper__screen внутрь galleryWrapper
    galleryWrapperElement.appendChild(galleryScreenElement);

    // создает новый обьект - image
    const closeImageElement = new Image();
    // в созданный элемент image добавляет класс galleryWrapper__close (здесь 
    // будет картинка закрытия - крестик)
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    // помещает картинку с крестиком 'images/gallery/close.png' внутрь созданного image
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    // добавляет событие click для image, по которому будет срабатывать this.close
    closeImageElement.addEventListener('click', () => this.close());
    // помещает картинку с крестиком (galleryWrapper__close) внутрь div-а galleryWrapper
    galleryWrapperElement.appendChild(closeImageElement);

    // создает новый обьект - image
    const image = new Image();
    // в созданный элемент image добавляет класс galleryWrapper__image (здесь 
    // будет большое выбранное изображение)
    image.classList.add(this.settings.openedImageClass);
    // помещает большое выбранное изображение (galleryWrapper__image) внутрь div-а galleryWrapper
    galleryWrapperElement.appendChild(image);

    // помещает общий собранный div galleryWrapper с крестиком и большим изображением внутрь документа
    document.body.appendChild(galleryWrapperElement);

    // возвращает общий собранный div galleryWrapper
    return galleryWrapperElement;
  },

  close() {
    // закрывает div galleryWrapper (с большим изображением и картинкой)
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  },
};

window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});