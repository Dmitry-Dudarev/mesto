export class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.prepend(element);
  }
};


//перенести в index
// const cardList = new Section({
//   items: cards,
//   renderer(item){
//     const card = new Card(item, '.cardTemplate', openPicture);
//     const cardElement = card.getCardElement();
//     cardList.addItem(cardElement);
//   } 
// }, '.elements');
// cardList.renderItems()
