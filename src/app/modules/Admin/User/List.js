import React, { useState, useEffect } from "react";
import history from "../../../history";
import { getAllStudent, getAllUsers } from "./__hooks__";
import { admissionsTypes } from './__hooks__/types';
import { useAppContext } from "../../../contexts/useAppContext";
import IMTableCustom from "../../../../_metronic/layout/components/custom/table/IMTableCustom";




export default function UserList() {
    const { state: { auth }, dispatch } = useAppContext()
    const [students, setStudents] = useState()
    const [instructorStudent, setInstructorStudent] = useState([])
    const [onSearch, setOnSearch] = useState(false);
    const [keyword, setKeyword] = useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isInstructor, setIsInstructor] = useState(false)


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


    const onRegister = () => {
        history.push('/admin/user-registration')
    }

    useEffect(() => {
        const getAll = async () => {
            await getAllUsers()
                .then(response => {
                    if (response.status === 200) {

                        setStudents(response.data)


                    }
                })
                .catch(e => {

                })
        }

        getAll()
    }, [])

    const columns = [
        { id: 'RowCnt', label: '#', align: 'center', minWidth: '15px', withSorting: false, hidden: false, disablePadding: false },
        { id: 'lastName', label: 'Last Name', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'firstName', label: 'First Name', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'userName', label: 'Username', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'type', label: 'User Type', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'Action', label: 'Action', align: 'center', withSorting: false, minWidth: '120px', hidden: false, disablePadding: false },

    ]

    let tableProps
    if (students !== undefined) {
        tableProps = {
            recordId: 'userId',
            sortField: '',
            columns: columns,
            rows: students,
            totalRecords: students.length,
            withMoreButton: true,
            childWithMoreButton: true,
            withFooter: false,
            tableType: 'userList',
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

        }
    }





    console.log(students)
    console.log(auth)
    console.log(localStorage.UserType)
    console.log(auth.data.type === 'A')
    console.log(instructorStudent)
    return (
        <>
            {students || instructorStudent.length > 0 ?
                <>
                    <main className="p-5 container card">
                        <div className="card-header">

                            <h1 className="d-inline">User List</h1>
                            <button onClick={() => { onRegister() }} className="btn btn-primary float-right ">Create User</button>

                        </div>


                        <section className="mt-3">
                            <IMTableCustom tableProps={tableProps} />

                        </section>
                    </main>




                </>
                :

                <>
                    <h1>Student Lists</h1>
                    <button onClick={() => { onRegister() }} className="btn btn-primary">Register Student</button>

                </>
            }

        </>
    )
}