import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sound from 'react-sound';
import Modal from '@material-ui/core/Modal';
import laugh from  './laugh.mp3'
import './LaughingModal.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function LaughingModal({ openModal, setOpenModal, player }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpenModal(false);
  };

  const body = (
    <div className={`${classes.paper} LaughingModal`}>
      <h2 id="simple-modal-title">{player}</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <Sound
        url={laugh}
        playStatus='PLAYING'
        playFromPosition={0}
      />
    </div>
  );

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}

export default LaughingModal;