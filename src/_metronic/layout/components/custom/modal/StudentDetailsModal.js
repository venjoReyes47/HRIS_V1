import React from "react";
import { Modal, Box, } from '@material-ui/core';
import history from "../../../../../app/history";
import { Link } from 'react-router-dom';


export default function MoreModal(props) {
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

    const onClickUpdate = () => {
        history.push(`update-student/${props.row.studentId}`)

    }

    const onClickCredentials = () => {
        history.push(`receive-documents-form/${props.row.studentId}`)

    }

    const onClickAssessment = () => {
        history.push(`create-assessment/${props.row.studentInfoId}`)

    }
    console.log(props.row)
    return (
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="card p-1 pt-0" style={style}>
                <div className="card-body">
                    <button type="button" className="close" aria-label="Close" onClick={() => { props.handleClose({ ...props.row, isOpenModal: false }) }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="card-header p-2">
                        <h4 className="card-title mb-0"> {props.row.studentName}</h4>
                        <p className="lead mb-0">{props.row.courseDesc}</p>

                    </div>
                    <p className="card-text mt-5 mb-0 font-weight-bold mb-0">Student #: <span className="font-weight-normal text-success">&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; {props.row.studentNo}</span></p>
                    <p className="card-text mb-0 font-weight-bold">Current Status: <span className="font-weight-normal text-success"> &nbsp; {props.row.enrollmentStatus}</span></p>
                    <p className="card-text font-weight-bold mb-0">School Year: <span className="font-weight-normal text-success">&nbsp; &nbsp; &nbsp;  &nbsp;{props.row.sy}</span></p>
                    <p className="card-text font-weight-bold">Year Level: <span className="font-weight-normal text-success">&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; {props.row.yearLevel}</span></p>




                    {/* <button className="btn btn-danger" onClick={() => { props.handleClose({ ...props.row, isOpenModal: false }) }}>Close</button> */}
                </div>
                <div className="btn-group" role="group">
                    <Link to={{ pathname: `update-student/${props.row.studentId}`, data: props.row }} className="btn btn-success" ><i className="fa fa-pen"></i> Update</Link>
                    <button className=" btn btn-info" onClick={() => { onClickCredentials() }}> <i className="fa fa-folder-open"></i> Credentials</button>
                    <button className=" btn btn-primary" onClick={() => { onClickAssessment() }}><i className="fa fa-list"></i> Assessment</button>
                </div>
            </Box>


        </Modal>
    )
}