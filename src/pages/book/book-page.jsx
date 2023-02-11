import { useParams } from 'react-router-dom';

import { Header } from '../../components/header-component';
import { Breadcrumbs } from '../../components/breadcrumbs-component';
import { Footer } from '../../components/footer-component';
import { BookDetailsInfo } from '../../components/book-details/book-details-info';
import { BookDetailsReviews } from '../../components/book-details/book-details-reviews';

import data from '../../assets/books-template.json';

export function BookPage() {
  const bookId = useParams().id;
  const book = data.filter((item) => item.id === bookId).reduce((item) => item);

  return (
    <div className='wrapper'>
      <Header />
      <Breadcrumbs title={book.title} />
      <div className='book-details__content'>
        <BookDetailsInfo image={book.image} title={book.title} author={book.author} year={book.year} />
        <BookDetailsReviews rating={book.rating} />
      </div>
      <Footer />
    </div>
  );
}
