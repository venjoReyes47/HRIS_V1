import React, { useState } from "react";
import { Modal, Box } from '@material-ui/core'

export default function ChangePasswordModal(props) {
    const { isOpen, FaithLogo, handleSubmit, onSubmitChangePassword, register } = props
    const style = {
        position: 'absolute',
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',

        boxShadow: 24,
        p: 4,
    };
    const check = () => {
        if (document.getElementById('password').value == document.getElementById('passwordRetype').value) {
            document.getElementById('changePasswordSubmit').removeAttribute("disabled");

        } else {
            document.getElementById('changePasswordSubmit').setAttribute("disabled", "disabled");
        }
    }
    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="card p -5" style={style}>
                <div className="card-header "> <img className="d-inline" style={{ width: '50px' }} src={FaithLogo} /> <p className="lead d-inline text-center"> &nbsp;Change your Password</p> </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmitChangePassword)} method="post">
                        <div className="mb-3">
                            <label className="col-form-label p-0" htmlFor="password">New Password</label>

                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                id="password"
                                onKeyUp={check}
                                ref={register({
                                    required: true
                                })}
                                required
                            />
                        </div>


                        <div>
                            <label className="col-form-label p-0" htmlFor="passwordRetype">Re-type Password</label>

                            <input
                                name="passwordRetype"
                                type="password"
                                className="form-control"
                                id="passwordRetype"
                                onKeyUp={check}

                                required
                            />
                        </div>

                        <button id="changePasswordSubmit" className="btn btn-primary btn-block mt-3">Save</button>

                    </form>

                </div>
            </Box>


        </Modal>
    )
}