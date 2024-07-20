import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../contexts/useAppContext";
import { registerStudent, getAllUsers, getAllStudent, updateStudent } from "./__hooks__";
import history from "../../../history";
import IMSelect from "../../../../_metronic/layout/components/custom/select/IMSelect";
import { getStudent } from "../_Dashboards/StudentDashboard/__hooks__";

export default function UpdateStudent() {
    const { id } = useParams()
    const { register, handleSubmit, setValue } = useForm();
    const { state: { auth }, dispatch } = useAppContext()
    const [data, setData] = useState({ instructorId: null, gender: null })
    const [users, setUsers] = useState()
    const [instructorSelect, setInstructorSelect] = useState()
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
            await getAllStudent()
                .then(response => {
                    console.log(response)
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].studentId === parseInt(id)) {
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


    useEffect(() => {
        if (users !== undefined) {
            console.log(users)
            let instructorSelectArr = []
            for (let i = 0; i < users.length; i++) {
                if (users[i].type === 'I') {
                    instructorSelectArr.push({ tableId: users[i].userId, code: `${users[i].lastName}, ${users[i].firstName}` })

                }
            }
            setInstructorSelect(instructorSelectArr)
        }
    }, [users])

    const onBack = () => {
        history.push('/admin/students')
    }

    const selectHandleChange = name => event => {
        setData({ ...data, [name]: event });

    }

    const onSubmit = formValues => {
        console.log(formValues)

        let data = { ...formValues, studentId: parseInt(id) }

        const execute = async () => {
            await updateStudent(parseInt(id), data)
                .then(response => {

                    if (response.status === 200) {
                        history.push('/admin/students')

                    }
                })
                .catch(e => {
                    alert(e)
                })
        }

        execute()

    }

    console.log(users)
    console.log(instructorSelect)

    useEffect(() => {
        register({ name: 'instructorId' },
            { required: true });
    }, [register])

    useEffect(() => {
        register({ name: 'gender' },
            { required: true });
    }, [register])


    console.log(student)

    return (
        <>
            {instructorSelect && student && <div class="container">

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
                                    <label for="inputPassword4">Middle Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="middleName"
                                        id="inputPassword4"
                                        placeholder="Middle Name"
                                        defaultValue={student.middleName === undefined ? "" : student.middleName}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-row mt-5 mb-0">
                                <div className="form-group col mb-0">
                                    <label for="inputEmail4">Contact No</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="contactNo"
                                        id="inputEmail4"
                                        placeholder="Contact No"
                                        defaultValue={student.contactNo === undefined ? "" : student.contactNo}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="form-group col  mb-0">
                                    <label for="inputPassword4">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="emailAddress"
                                        id="inputPassword4"
                                        placeholder="Email Address"
                                        defaultValue={student.emailAddress === undefined ? "" : student.emailAddress}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="form-group col  mb-0">
                                    <IMSelect
                                        onHandleChange={selectHandleChange('gender')}
                                        refClassContainer="form-group mb-3"
                                        name="gender"
                                        isRequired={true}
                                        withLabel={true}
                                        label="Gender"
                                        placeHolder="Gender"
                                        forwardRef={setValue}
                                        selectedId={data.gender === null ? student.gender : data.gender}
                                        refClassName={``}
                                        withDescription={false}
                                        // description={`Please select your gender.`}
                                        refDisabled={true}
                                        refIsStatic={true}
                                        refStaticData={[
                                            { id: '', label: '' },
                                            { id: 'M', label: 'Male' },
                                            { id: 'F', label: 'Female' }
                                        ]}
                                        field={{
                                            tableId: '',
                                            display: ''
                                        }}

                                    />
                                </div>
                                <div className="form-group col  mb-0">
                                    <label for="inputPassword4">Age</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        id="inputPassword4"
                                        placeholder="Age"
                                        defaultValue={student.age === undefined ? "" : student.age}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-5 mb-0">
                                <label for="inputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    id="inputAddress"
                                    placeholder="1234 Main St"
                                    defaultValue={student.address === undefined ? "" : student.address}

                                    ref={register({
                                        required: true
                                    })}
                                />
                            </div>
                            <div className="form-row mt-5">
                                <div className="form-group m-0 col">
                                    <label for="inputEmail4">Guardian Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianName"
                                        id="inputEmail4"
                                        placeholder="Name"
                                        defaultValue={student.guardianName === undefined ? "" : student.guardianName}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="form-group m-0 col">
                                    <label for="inputPassword4">Guardian Contact No</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="guardianContactNo"
                                        id="inputPassword4"
                                        placeholder="Contact No"
                                        defaultValue={student.guardianContactNo === undefined ? "" : student.guardianContactNo}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="form-group m-0 col">
                                    <label for="inputPassword4">Guardian Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="guardianEmailAddress"
                                        id="inputPassword4"
                                        placeholder="Email"
                                        defaultValue={student.guardianEmailAddress === undefined ? "" : student.guardianEmailAddress}

                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-row mt-5">
                                <div className="form-group m-0 col-6">
                                    <IMSelect
                                        data={instructorSelect}
                                        onHandleChange={selectHandleChange('instructorId')}
                                        refClassContainer=""
                                        name="instructorId"
                                        isRequired={true}
                                        withLabel={true}
                                        label="Assign a Instructor"
                                        placeHolder="Choose Instructor"
                                        forwardRef={setValue}
                                        selectedId={data.instructorId === null ? student.instructorId : data.instructorId}
                                        refClassName={``}
                                        withDescription={false}
                                        // description={`Please select your gender.`}
                                        refDisabled={true}
                                        refIsStatic={false}
                                        refStaticData={[

                                        ]
                                        }
                                        field={{
                                            tableId: 'tableId',
                                            display: 'code'
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