import React, { useState, forwardRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IMDialog(props) {
  const { title, content, isOpen, onShowDialog, onHandleDelete } = props;
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    onShowDialog({ status: false });
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="btn btn-danger">
            No
          </button>
          <button onClick={onHandleDelete} className="btn btn-success">
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}