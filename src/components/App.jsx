import styles from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { fetchImage } from '../services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import PropTypes from 'prop-types';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleFormSubmit = searchQuery => {
    // console.log(searchQuery);
    setQuery(searchQuery);
    setPage(1);
  };
  const handleLoadMore = e => {
    e.preventDefault();
    // console.log('loading more');
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = imageURL => {
    setIsModal(true);
    setSelectedImage(imageURL);
  };

  const onCloseModal = () => {
    setIsModal(false);
    setSelectedImage('');
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      if (page === 1) {
        setIsloading(true);

        try {
          const images = await fetchImage(query, page);
          if (images.hits.length === 0) {
            alert('Nothing was found for your image request');
          }
          setImages(images.hits);
          setTotalHits(images.totalHits);
        } catch (error) {
         alert ('Error:', error);
          setError(error.message);
        }  finally {
          setIsloading(false);
        }
      }
      if (page !== 1) {
        try {
          setIsloading(true);
          const images = await fetchImage(query, page);
          if (images.hits.length === 0) {
            alert('Nothing was found for your image request');
          }
          setImages(prevImages => [...prevImages, ...images.hits]);
          setTotalHits(images.totalHits);
        } catch (error) {
          alert ('Error:', error);
          setError(error.message);
        } finally {
          setIsloading(false);
        }
      }
    };
    fetchImages();
  }, [query, page]);

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleFormSubmit} />

      {isLoading && <Loader />}

      <ImageGallery images={images} onOpenModal={onOpenModal} />

      {page < Math.ceil(totalHits / 12) ? (
        <Button onClick={handleLoadMore} />
      ) : null}
      {isModal && (
        <Modal
          largeImage={selectedImage}
          onClick={onCloseModal}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

App.propTypes = {
  images: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  query: PropTypes.string,
  page: PropTypes.number,
  totalHits: PropTypes.number,
  isModal: PropTypes.bool,
  selectedImage: PropTypes.string,
};
