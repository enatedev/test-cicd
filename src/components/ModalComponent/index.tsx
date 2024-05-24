import Modal from '@mui/material/Modal';
import Styles from "./modalComponent.module.scss";
import ModalBottom from './ModalBottomComponent';
import ModalTop from './ModalTopComponent';
import GlobalStyles from "../../../global.module.scss";
import clsx from 'clsx';

const ModalBadge = ({title}) => {
  return(
    <div className={Styles.ModalBadge}>
      <span className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeMedium,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextLight
              )}>{title}
      </span>
    </div>
  );
}


export default function ModalComponent(props) {
  const {open, handleClose, fixture} = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <div className={clsx(Styles.ModalWrapper,GlobalStyles.FontMontserrat)}>
          <ModalBadge title={fixture.fixtures.leagueName}/>
          <ModalTop fixture={fixture}/>
          <ModalBottom fixture={fixture}/>
          </div>
      </Modal>
    </div>
  );
}
