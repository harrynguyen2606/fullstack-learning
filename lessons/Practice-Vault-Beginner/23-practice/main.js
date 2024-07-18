import ImageGallery from './image-gallery.js';

let images = [
  {
    title: 'Kill Bill Volume 1',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/100-Kill-Bill-Vol-1-1.jpg',
  },
  {
    title: 'Star Wars Episode III: Revenge of the Sith',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/99-Star-Wars-ep-III.jpg',
  },
  {
    title: 'Moulin Rouge! ',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/98-Moulin-Rouge.jpg',
  },
  {
    title: 'Spider-Man: Far From Home',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/97-Spider-man-Far-from-Home.jpg',
  },
  {
    title: 'The Fifth Element',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/96-The-Fifth-Element.jpg',
  },
  {
    title: 'Vertigo',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/95-Vertigo.jpg',
  },
  {
    title: "Monty Python's Life of Brian",
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/94-Monty-Pythons-Life-of-Brian.jpg',
  },
  {
    title: 'There Will Be Blood',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/93-There-Will-Be-Blood.jpg',
  },
  {
    title: 'Whiplash',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/92-Whiplash.jpg',
  },
  {
    title: 'The Goonies',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/91-The-Goonies.jpg',
  },
  {
    title: 'Blade Runner 2049',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/90-Blade-Runner-2049.jpg',
  },
  {
    title: 'La La Land',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/89-La-La-Land.jpg',
  },
  {
    title: 'The Avengers',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/88-The-Avengers.jpg',
  },
  {
    title: 'No Country for Old Men',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/87-No-Country-for-Old-Men.jpg',
  },
  {
    title: 'Dead Poets Society',
    url: 'https://images-r2.thebrag.com/rs/uploads/2020/10/86-Dead-Poets-Society.jpg',
  },
];

let gallery = new ImageGallery(document.querySelector('#app'), images);
