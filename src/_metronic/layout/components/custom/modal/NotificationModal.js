import React, { useState, forwardRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationModal(props) {
    const { title, content, isOpen, handleClose, onSubmit, classCodeSelect } = props;

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>

            <hr />
            <DialogContent>
                < DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit} variant="contained" color="danger">
                    Proceed
                </Button>
                <Button onClick={handleClose} variant="contained" color="danger">
                    Exit
                </Button>
            </DialogActions>
        </Dialog>
    );
}