export class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  renderItems() {
    this.items.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.prepend(element);
  }
};