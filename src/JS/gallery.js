// Add imports above this line
// import { getPhoto } from './apiClient';
// Change code below this line

console.log(getPhoto);


import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";


const div = document.querySelector('.gallery');
const cardsMarkup = creatImageCards(galleryItems);


function creatImageCards(galleryItems) {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `
       <a
       class="gallery__item"
       href="${original}"
       >
       <img
       class="gallery__image"
       src="${preview}"
       alt="${description}"
       >
       </a>
        `;
    }).join('');
}

div.insertAdjacentHTML('beforeend', cardsMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});


