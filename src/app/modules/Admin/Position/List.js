import React, { useEffect, useState, forwardRef } from "react";
import history from "../../../history";
import { getAllPosition, createPosition, deletePosition, updatePosition } from "./__hooks__";
import { admissionsTypes } from './__hooks__/types';
import { useAppContext } from "../../../contexts/useAppContext";
import IMTableCustom from "../../../../_metronic/layout/components/custom/table/IMTableCustom";
import { Alert } from "react-bootstrap";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';
import NotificationModal from "../../../../_metronic/layout/components/custom/modal/NotificationModal";
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';
import { Update } from "@material-ui/icons";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function PositionList(props) {
    const { state: { auth }, dispatch } = useAppContext()
    const [position, setPosition] = useState([])
    const [instructorStudent, setInstructorStudent] = useState([])
    const [onSearch, setOnSearch] = useState(false);
    const [keyword, setKeyword] = useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [positionData, setPositionData] = useState({})
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [toDelete, setIsToDelete] = useState(null)


    const [isInstructor, setIsInstructor] = useState()


    const handleChangeOnSearch = (event) => {
        setOnSearch(event)
    };

    const handleChangeKeyword = (event) => {

    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleDelete = async (id) => {
        setIsOpenDelete(true)
        setIsToDelete(id)

    }


    const handleUpdate = async (d) => {
        alert('test')
        setPositionData(d)
        setIsOpenUpdate(true)
    }

    const getAll = async () => {
        await getAllPosition()
            .then(response => {
                if (response.status === 200) {
                    setPosition(response.data)
                }
            })
            .catch(e => {
            })
    }


    // Create 
    function CreateModal(props) {
        const { title, content, isOpen, handleClose, onSubmit, classCodeSelect } = props;
        const [data, setData] = useState({})
        const [isSubmitting, setIsSubmitting] = useState(false)
        const handleChange = (e) => {
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const onHandleSubmit = () => {
            console.log(data)
            onSubmit(data)
        }
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
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="firstName" className="form-label">Position Description</label>
                            <input type="text" className="form-control" id="firstName" name="description" value={data.description} onChange={handleChange} required />
                        </div>

                    </div>


                </DialogContent>
                <DialogActions>
                    {isSubmitting == false
                        ?
                        <button onClick={() => { setIsSubmitting(true); onHandleSubmit() }} className="btn btn-primary btn-sm">
                            Submit
                        </button>
                        :
                        <button className="btn btn-secondary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            &nbsp; Loading...
                        </button>
                    }

                    <Button onClick={handleClose} variant="contained" color="danger">
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    // Update 
    function UpdateModal(props) {
        const { title, content, isOpen, handleClose, onSubmit, position, classCodeSelect } = props;
        const [data, setData] = useState(position)
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [switchState, setSwitchState] = useState({
            IsActive: position.isActive
        });
        const handleChange = (e) => {
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const switchHandleChange = name => event => {
            setData({ ...data, [name]: event.target.checked });
        };

        const onHandleSubmit = () => {
            console.log(data)
            onSubmit(data)
        }
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
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="firstName" className="form-label">Position Description</label>
                            <input type="text" className="form-control" id="firstName" name="description" defaultValue={position.description} onChange={handleChange} required />
                        </div>
                        <div className="col">
                            <FormControl component="fieldset" className="mr-auto">
                                <FormControlLabel
                                    name="isActive"
                                    inputRef={() => { }}
                                    control={<Switch checked={data.isActive}
                                        onChange={switchHandleChange('isActive')}
                                        value={data.isActive} />}
                                    label="Is Active"

                                />
                            </FormControl>
                        </div>

                    </div>


                </DialogContent>
                <DialogActions>
                    {isSubmitting == false
                        ?
                        <button onClick={() => { setIsSubmitting(true); onHandleSubmit() }} className="btn btn-primary btn-sm">
                            Submit
                        </button>
                        :
                        <button className="btn btn-secondary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            &nbsp; Loading...
                        </button>
                    }

                    <Button onClick={handleClose} variant="contained" color="danger">
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    useEffect(() => {
        getAll()
    }, [])

    const columnPosition = [
        { id: 'RowCnt', label: '#', align: 'center', minWidth: '15px', withSorting: false, hidden: false, disablePadding: false },
        { id: 'description', label: 'Position', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'Action', label: 'Action', align: 'center', withSorting: true, hidden: false, disablePadding: false },
    ]


    let tableProps = {
        recordId: 'id',
        sortField: '',
        columns: columnPosition,
        rows: position,
        totalRecords: position.length,
        withMoreButton: true,
        childWithMoreButton: true,
        withFooter: false,
        tableType: 'positionList',
        parentId: null,
        tableTitle: '',
        onSearch: onSearch,
        keyword: keyword,
        lastUpdateId: 0,
        onIsLastUpdate: true,
        onPage: page,
        onRowsPerPage: rowsPerPage,
        onRowsPerPageOptions: [10, 25, 50, 100],
        onTypes: admissionsTypes,
        onHandleChangePage: handleChangePage,
        onHandleChangeRowsPerPage: handleChangeRowsPerPage,
        onHandleChangeKeyword: handleChangeKeyword,
        onHandleChangeOnSearch: handleChangeOnSearch,
        onHandleDelete: handleDelete,
        onHandleUpdate: handleUpdate
    }

    console.log(position)
    console.log(auth)
    console.log(localStorage.UserType)
    console.log(auth.data.type === 'A')
    console.log(instructorStudent)

    return (
        <>
            <CreateModal
                isOpen={isOpenCreate}
                handleClose={() => setIsOpenCreate(false)}
                onSubmit={async (d) => { await createPosition(d).then(resp => { setIsOpenCreate(false); getAll() }) }}
                title={'Create Position'}
            />

            <UpdateModal
                isOpen={isOpenUpdate}
                handleClose={() => setIsOpenUpdate(false)}
                onSubmit={async (d) => { await updatePosition(d.id, d).then(resp => { setIsOpenUpdate(false); getAll() }) }}
                position={positionData}
                title={'Create Position'}
            />

            <NotificationModal
                isOpen={isOpenDelete}
                handleClose={() => setIsOpenDelete(false)}
                onSubmit={async () => { await deletePosition(toDelete).then(resp => { setIsOpenDelete(false); setIsToDelete(null); getAll() }) }}
                title={'Delete Position'}
                content={'Are you sure you want to delete?'}
            />
            <main className="card container">
                <div className="card-header">
                    <h1 className="d-inline">Position List</h1>
                    <button onClick={() => { setIsOpenCreate(true) }} className="btn btn-primary float-right">Add Position</button>
                </div>
                <section className=" mt-3">
                    <IMTableCustom tableProps={tableProps} />
                </section>
            </main>

        </>
    )
}