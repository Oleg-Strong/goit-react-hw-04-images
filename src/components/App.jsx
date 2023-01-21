import css from './App.module.css';
import React, { useState, useEffect } from 'react';
import fetchCards from '../utils/fatch-api';
import Searchbar from './Searchbar';
import SearchForm from './Form';
import ImageGallery from './ImageGallery';
import Button from './Button';
import notify from 'utils/alert';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import { ScrollToTop } from 'react-to-top';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const isEndOfCollection = totalHits > images.length;

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoad(true);

    fetchCards(searchQuery, page)
      .then(({ data: { hits, totalHits } }) => {
        if (!totalHits) {
          return notify('warning');
        }
        setImages(images => (images = [...images, ...hits]));
        setTotalHits(totalHits);
      })
      .catch(error => {
        notify('error');
        console.log(error);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [searchQuery, page]);

  const changeQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalHits(null);
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar>
        <SearchForm onSubmit={changeQuery}></SearchForm>
      </Searchbar>
      <ImageGallery pictures={images}></ImageGallery>
      {!isLoad && isEndOfCollection ? (
        <Button onChange={changePage}>Load more</Button>
      ) : null}
      {isLoad && (
        <ThreeDots
          color="#ff0000"
          wrapperStyle={{
            justifyContent: 'center',
          }}
        />
      )}
      <ScrollToTop
        strokeWidth={0}
        symbolColor={'#fff'}
        symbolSize={30}
        bgColor={'#a7a7a7'}
      />
      <ToastContainer />
    </div>
  );
};
export default App;
