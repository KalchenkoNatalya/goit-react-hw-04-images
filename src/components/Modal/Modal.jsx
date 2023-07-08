import styles from './Modal.module.css';
import {   useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ onCloseModal, largeImage, onClick }) => {
  
    const handleOverlayClose = e => {
    onCloseModal();
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);



  return (
    <div className={styles.overlay} onClick={handleOverlayClose}>
      <div className={styles.modal}>
        <img src={largeImage} alt="" onClick={onClick} />
      </div>
    </div>
  );
};

// export class Modal extends Component {
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };
//   handleOverlayClose = e => {
//     this.props.onCloseModal();
//   };

//   componentDidMount = () => {
//     window.addEventListener('keydown', this.handleKeyDown);
//   };

//   componentWillUnmount = () => {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   render() {
//     return (
//       <div className={styles.overlay} onClick={this.handleOverlayClose}>
//         <div className={styles.modal}>
//           <img
//             src={this.props.largeImage}
//             alt=""
//             onClick={this.props.onClick}
//           />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
