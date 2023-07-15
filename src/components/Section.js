class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    appendItem(element) {
        this._container.append(element);
    }

// отображение начальных карточек
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }
// отображение карточки добавленной пользователем
    addItem(element) {
        this._container.prepend(element);
    }
}

export default Section;