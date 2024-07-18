class ImageGallery {
  #images;
  #container;
  #lightbox;

  constructor(container, images) {
    this.#container = container;
    this.#images = images;
    this.#render();
    this.#setup();
  }

  #render() {
    let items = [];

    for (let i = 0; i < this.#images.length; i++) {
      let image = this.#images[i];
      items.push(`
          <li class="list-item">
              <img src="${image.url}" title="${image.title}"/>
          </li>`);
    }

    this.#container.innerHTML = `
      <div class="image-gallery">
          <ul class="list">${items.join('')}</ul>
          <div class="lightbox hidden">
              <div class="lightbox-content">
                  <img class="lightbox-img"/>
                  <div class="lightbox-title">
                  </div>
              </div>
              <button class="lightbox-button">Close</button>
          </div>
      </div>
      `;
  }

  #setup() {
    this.#lightbox = this.#container.querySelector('.lightbox');

    this.#lightbox
      .querySelector('.lightbox-button')
      .addEventListener('click', this.#onCloseLightbox.bind(this));

    let allImages = this.#container.querySelectorAll('.list img');

    for (let i = 0; i < allImages.length; i++) {
      let img = allImages[i];

      img.addEventListener('click', this.#onImageItemSelected.bind(this));
    }
  }

  #onImageItemSelected(event) {
    let img = event.target;
    let src = img.src;
    let title = img.title;

    this.#lightbox.querySelector('.lightbox-img').src = src;
    this.#lightbox.querySelector('.lightbox-title').innerHTML = title;
    this.#lightbox.classList.remove('hidden');
  }

  #onCloseLightbox() {
    this.#lightbox.classList.add('hidden');
  }
}

export default ImageGallery;
