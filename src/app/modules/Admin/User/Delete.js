import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { registerStudent, getAllUsers, deleteUser } from "./__hooks__";
import { Link } from "react-router-dom";
import { admissionsTypes } from "./__hooks__/types";
import history from "../../../history";

export default function DeleteStudent(props) {
    const { id } = useParams()
    const [student, setStudent] = useState()
    const [users, setUsers] = useState()

    useEffect(() => {
        const executeGetUser = async () => {
            await getAllUsers()
                .then(response => {
                    setUsers(response.data)
                })
                .catch(e => {

                })
        }

        const executeGetStudent = async () => {
            await getAllUsers()
                .then(response => {
                    console.log(response)
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].userId === parseInt(id)) {
                            console.log(response.data[i])
                            setStudent(response.data[i])
                        }
                    }
                })
                .catch(e => {

                })
        }

        executeGetUser()
        executeGetStudent()
    }, [])

    const onClickDelete = () => {

        const execute = async () => {
            await deleteUser(parseInt(id))
                .then(response => {
                    history.push('/admin/users')

                })
                .catch(e => {
                    alert(e)
                })
        }

        execute()
    }

    console.log(student)


    return (
        <>
            {student &&

                <div className="kt-container  kt-grid__item kt-grid__item--fluid">
                    <div className="row ac-minimum-height-container-350">
                        <div className="col-xl-12 col-lg-12 order-xl-1 order-lg-1 p-5">
                            <div className="card card-custom gutter-b example example-compact">
                                <div className="card-body">
                                    <h3>Question</h3>
                                    <p>Are you sure you want to delete this record ( <b className="text-primary">{`${student.lastName}, ${student.firstName}`}</b> ) ?</p>
                                    <Link to={admissionsTypes.LIST_LINK} className="btn btn-lg btn-bold btn-upper btn-font-sm btn-secondary">No</Link>&nbsp;
                                    <button className="btn btn-lg btn-bold btn-upper btn-font-sm btn-success" onClick={onClickDelete} >Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }

        </>
    )
}