import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import axios from 'axios';
import NewsApiService from "./js/api-service";
import hitsTpl from "./templates/hits.hbs";

const refs = {
searchForm: document.querySelector(".search-form"),
gallery: document.querySelector(".gallery"),
loadBtn: document.querySelector(".load-more"),
};

const newsApiService = new NewsApiService();

const lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});


refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage(); 

  if (newsApiService.query === '') {
    return Notiflix.Notify.info('Sorry, we have not found any images matching your query... Please try again.');
  } 

  clearImageCards();
  
  newsApiService.fetchArticles().then(data => {
    if (data.length < 1) {
      Notiflix.Notify.failure('Error, not found any images matching your query.');
    }
    else {
      creatImageCards(data);
      refs.loadBtn.classList.remove('is-hidden');
      Notiflix.Notify.success(`We have found  images!`);
      lightbox.refresh();
    };
  
  });
  // newsApiService.fetchArticles().then(creatImageCards);
 }

function onLoadMore() {
  refs.loadBtn.classList.add('is-hidden');
  newsApiService.fetchArticles().then(data => {
  creatImageCards(data);
  refs.loadBtn.classList.remove('is-hidden');
  // lightbox.refresh();
  });
}

function creatImageCards(data) {
    refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(data));

}

function clearImageCards() {
  refs.gallery.innerHTML = '';
}


