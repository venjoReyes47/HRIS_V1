import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../contexts/useAppContext";
import { getAllUsers, updateUser } from "./__hooks__";
import history from "../../../history";
import IMSelect from "../../../../_metronic/layout/components/custom/select/IMSelect";
import { getStudent } from "../_Dashboards/StudentDashboard/__hooks__";

export default function UserUpdate() {
    const { id } = useParams()
    const { register, handleSubmit, setValue } = useForm();
    const { state: { auth }, dispatch } = useAppContext()
    const [data, setData] = useState({ instructorId: null })
    const [users, setUsers] = useState()
    const [student, setStudent] = useState()

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




    const onBack = () => {
        history.push('/admin/users')
    }

    const selectHandleChange = name => event => {
        setData({ ...data, [name]: event });

    }

    const onSubmit = formValues => {
        console.log(formValues)

        let data = { ...formValues, userId: parseInt(id) }

        const execute = async () => {
            await updateUser(parseInt(id), data)
                .then(response => {

                    if (response.status === 200) {
                        history.push('/admin/users')

                    }
                })
                .catch(e => {
                    alert(e)
                })
        }

        execute()

    }

    console.log(users)

    useEffect(() => {
        register({ name: 'type' },
            { required: true });
    }, [register])


    console.log(student)

    return (
        <>
            {student && <div class="container">

                <form class="well form-horizontal" action=" " method="post" id="contact_form">
                    <fieldset className="card p-5">

                        <h3 className="text-center card-header" >
                            Student Details

                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-5">
                            <div className="form-row">
                                <div className="form-group m-0 col">
                                    <label for="inputEmail4">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        id="inputEmail4"
                                        placeholder="Last Name"
                                        defaultValue={student.lastName === undefined ? "" : student.lastName}
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="form-group m-0 col">
                                    <label for="inputPassword4">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        id="inputPassword4"
                                        placeholder="First Name"
                                        defaultValue={student.firstName === undefined ? "" : student.firstName}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="form-group m-0 col">
                                    <label for="inputPassword4">User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        id="inputPassword4"
                                        placeholder="userName"
                                        defaultValue={student.userName === undefined ? "" : student.userName}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="form-row mt-5">
                                <div className="form-group m-0 col-6">
                                    <IMSelect
                                        onHandleChange={selectHandleChange('type')}
                                        refClassContainer="form-group mb-3"
                                        name="type"
                                        isRequired={true}
                                        withLabel={true}
                                        label="User Type"
                                        placeHolder="User Type"
                                        forwardRef={setValue}
                                        selectedId={student.type === null ? "" : student.type}
                                        refClassName={``}
                                        withDescription={false}
                                        // description={`Please select your gender.`}
                                        refDisabled={true}
                                        refIsStatic={true}
                                        refStaticData={[
                                            { id: '', label: '' },
                                            { id: 'I', label: 'Instructor' },
                                            { id: 'A', label: 'Admin' }
                                        ]}
                                        field={{
                                            tableId: '',
                                            display: ''
                                        }}

                                    />

                                </div>


                            </div>
                            <div className="float-right">
                                <button type="submit" class="btn btn-warning mt-5 mr-5">Update</button>
                                <button onClick={() => { onBack() }} type="button" class="btn btn-secondary mt-5">Back</button>
                            </div>


                        </form>





                    </fieldset>
                </form>
            </div>
            }
        </>
    )
}