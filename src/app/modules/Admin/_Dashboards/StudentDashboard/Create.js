import React, { useState, useEffect } from "react";
import { Modal, Box } from '@material-ui/core'
import FaithLogo from "../../../../../_metronic/_assets/logo/FaithCollegesPNG.png"
import { useAppContext } from "../../../../contexts/useAppContext";
import { getUser, updateUser } from "../__hooks__/"
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import Assessement from "./Assessment"
import ChangePasswordModal from "../../../../../_metronic/layout/components/custom/modal/ChangePasswordModal";
export default function Student_Dashboard(props) {
    const { state: { auth } } = useAppContext()
    const [isOpen, setIsOpen] = useState(true)
    const [passwordChanged, setPasswordChanged] = useState(false)
    const [user, setUser] = useState()
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {

    }, [passwordChanged])

    const handleClose = () => {
        setPasswordChanged(false)
    }

    const executeOperation = async (operation, condition, setter) => {
        let arr = []
        await operation()
            .then(response => {
                if (response.success) {

                    for (let i = 0; i < response.data.length; i++) {
                        if (eval(condition)) {
                            arr.push(response.data[i])

                        }
                    }
                    setter(arr)
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }

    const onSubmitChangePassword = (formValues) => {
        const { password } = formValues
        const encyptionResult = ("*" + CryptoJS.SHA1(CryptoJS.SHA1(password))).toUpperCase();

        const userValues = {
            isDefaultPassword: 0,
            password: encyptionResult
        }

        const execute = async () => {
            await updateUser(auth.data.UserId, userValues)
                .then(response => {
                    if (response.success) {
                        setIsOpen(false)
                        setPasswordChanged(true)
                    }
                })
                .catch(error => {
                    alert("something went wrong")
                    console.log(error)
                })
        }
        execute();
    }

    const ChangePasswordModal = (props) => {
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
                <Box className="card" style={style}>
                    <div className="mt-5 text-center"> <img className="d-inline mx-auto" style={{ width: '50%' }} src={FaithLogo} /> </div>
                    <div className="card-body">
                        <h3 className="mb-4">Change you Password</h3>
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

    const PasswordDeletionConfirmation = (props) => {
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

        return (
            <Modal
                open={props.isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="card p -5" style={style}>
                    <div className="mt-5 text-center">
                        <div className="check d-inline">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>

                    </div>
                    <div className="card-body text-center">
                        <h3 className="mb-5">Success!</h3>
                        <p className="card-text lead">Your Password has been changed. </p>
                        <button onClick={() => { handleClose() }} className="btn btn-primary">Confirm</button>


                    </div>
                </Box>


            </Modal>
        )
    }

    useEffect(() => {
        register({ name: 'password' },
            { required: true });
    }, [register])

    useEffect(() => {
        executeOperation(getUser, 'response.data[i].UserId === auth.data.UserId', setUser)
    }, [])

    console.log(auth)
    console.log(user)


    return (
        <>

            {user !== undefined ?
                <>
                    {user[0].IsDefaultPassword === 1
                        ?

                        <>
                            <ChangePasswordModal
                                isOpen={isOpen}
                            />

                            <PasswordDeletionConfirmation
                                isOpen={passwordChanged}

                            />
                        </>




                        :


                        <Assessement />
                    }

                </>

                :

                ''

            }


        </>
    )
}