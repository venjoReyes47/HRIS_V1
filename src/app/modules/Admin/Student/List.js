import React, { useEffect, useState } from "react";
import history from "../../../history";
import { getUnApproveApplicants, deleteApplicant, getAllPosition, getApproveApplicants } from "./__hooks__";
import { admissionsTypes } from './__hooks__/types';
import { useAppContext } from "../../../contexts/useAppContext";
import IMTableCustom from "../../../../_metronic/layout/components/custom/table/IMTableCustom";
import NotificationModal from "../../../../_metronic/layout/components/custom/modal/NotificationModal";
import IMSelect from "../../../../_metronic/layout/components/custom/select/IMSelect";
import SelectCreator from "../../../../_metronic/functions/SelectCreator";
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';
import Loading from "../../../../_metronic/layout/components/custom/forms/Loading";

export default function StudentList(props) {
    const { state: { auth }, dispatch } = useAppContext()
    const [students, setStudents] = useState([])
    const [applicants, setApplicants] = useState([])
    const [instructorStudent, setInstructorStudent] = useState([])
    const [onSearch, setOnSearch] = useState(false);
    const [keyword, setKeyword] = useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [toDelete, setIsToDelete] = useState(null)
    const [positionId, setPositionId] = useState(null)
    const [positionSelect, setPositionSelect] = useState([])
    const [switchState, setSwitchState] = useState({
        IsActive: true
    });


    const switchHandleChange = name => event => {
        setSwitchState({ ...switchState, [name]: event.target.checked });
    };
    const sampleEmployee = [
        {
            "lastName": "Smith",
            "firstName": "John",
            "address": "123 Main St, Anytown, USA",
            "contactNo": "+1-123-456-7890",
            "emailAddress": "john.smith@example.com"
        },
        {
            "lastName": "Johnson",
            "firstName": "Jane",
            "address": "456 Elm St, Othertown, USA",
            "contactNo": "+1-987-654-3210",
            "emailAddress": "jane.johnson@example.com"
        },
        {
            "lastName": "Doe",
            "firstName": "James",
            "address": "789 Oak Ave, Anycity, USA",
            "contactNo": "+1-555-123-4567",
            "emailAddress": "james.doe@example.com"
        },
        {
            "lastName": "Brown",
            "firstName": "Emily",
            "address": "321 Pine Rd, Newville, USA",
            "contactNo": "+1-333-777-9999",
            "emailAddress": "emily.brown@example.com"
        },
        {
            "lastName": "Garcia",
            "firstName": "Michael",
            "address": "654 Cedar Blvd, Townsville, USA",
            "contactNo": "+1-444-222-1111",
            "emailAddress": "michael.garcia@example.com"
        }
    ]

    const getAll = async () => {
        await getUnApproveApplicants()
            .then(response => {
                if (response != undefined)
                    setApplicants(response)
                // setIsInstructor(false
            })
            .catch(e => {
            })
    }




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

    const selectHandleChange = name => event => {
        setPositionId(event);
    }


    const handleDelete = async (id) => {
        setIsOpenDelete(true)
        setIsToDelete(id)

    }

    useEffect(() => {

        getAll()
        SelectCreator(getAllPosition, setPositionSelect, 'id', 'description')
    }, [])


    useEffect(() => {

        if (positionId == null) {
            if (switchState.IsActive == true) {
                // kapag all position at disapproved ang lalabas
                getUnApproveApplicants()
                    .then(response => {
                        if (response != undefined)
                            setApplicants(response)

                    })
            } else {
                // kapag all position at approved ang lalabas
                getApproveApplicants()
                    .then(response => {
                        if (response != undefined)
                            setApplicants(response)

                    })
            }

        } else {
            if (switchState.IsActive == true) {
                // kapag may position at disapproved ang lalabas
                getUnApproveApplicants(positionId)
                    .then(response => {
                        if (response != undefined)
                            setApplicants(response)

                    })

            } else {
                // kapag may position at approved ang lalabas
                getApproveApplicants(positionId)
                    .then(response => {
                        if (response != undefined)
                            setApplicants(response)

                    })

            }
        }
    }, [positionId, switchState])

    const columnsStudent = [
        { id: 'RowCnt', label: '#', align: 'center', minWidth: '15px', withSorting: false, hidden: false, disablePadding: false },
        { id: 'lastName', label: 'Last Name', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'firstName', label: 'First Name', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'position', label: 'Position', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'permanentAddress', label: 'Address', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'contactNo', label: 'Contact No', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'emailAddress', label: 'Email', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'Action', label: 'Action', align: 'center', withSorting: true, hidden: false, disablePadding: false },


    ]

    let tableProps = {
        recordId: 'id',
        sortField: '',
        columns: columnsStudent,
        rows: applicants,
        totalRecords: applicants && applicants.length ? applicants.length : 0,
        withMoreButton: true,
        childWithMoreButton: true,
        withFooter: false,
        tableType: 'employeeList',
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
        onHandleDelete: handleDelete

    }

    console.log(applicants)
    console.log(auth)
    console.log(localStorage.UserType)
    console.log(auth.data.type === 'A')
    console.log(instructorStudent)

    return (
        <>
            <NotificationModal
                isOpen={isOpenDelete}
                handleClose={() => setIsOpenDelete(false)}
                onSubmit={async () => { await deleteApplicant(toDelete).then(resp => { setIsOpenDelete(false); setIsToDelete(null); getAll() }) }}
                title={'Delete Applicant'}
                content={'Are you sure you want to delete?'}
            />

            <main className="card container">
                <div className="card-header">
                    <h1 className="d-inline">Applicant List</h1>


                </div>
                <section className=" mt-3">
                    <section className="row">
                        <div className="mb-5 col-3">
                            <IMSelect
                                data={positionSelect}
                                onHandleChange={selectHandleChange(`positionId`)}
                                refClassContainer="form-group mb-3"
                                name={`positionId`}
                                isRequired={false}
                                withLabel={true}
                                label="Position"
                                placeHolder=""
                                forwardRef={() => { }}
                                selectedId={positionId}
                                refClassName={``}
                                withDescription={false}
                                // description={`Please select your gender.`}
                                refDisabled={true}
                                refIsStatic={false}
                                refStaticData={[
                                ]}
                                field={{
                                    tableId: 'tableId',
                                    display: 'code'
                                }}
                            // error={!!errors.gender}
                            // errorMessage={errors.gender && errors.gender.type === "required" && 'Gender is required'}
                            />
                        </div>
                        <div className="col d-flex justify-content-end">
                            <FormControl component="fieldset" className="">
                                <FormControlLabel
                                    name="IsActive"
                                    inputRef={() => { }}
                                    control={<Switch checked={switchState.IsActive}
                                        onChange={switchHandleChange('IsActive')}
                                        value={switchState.IsActive} />}
                                    label="For Approval"

                                />
                            </FormControl>
                        </div>
                    </section>


                    <IMTableCustom tableProps={tableProps} />

                </section>
            </main>

        </>
    )
}