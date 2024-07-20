import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../contexts/useAppContext";
import IMSelect from "../../../../_metronic/layout/components/custom/select/IMSelect"
import { registerUser } from "./__hooks__";
import history from "../../../history";



export default function UserForm(props) {
    const { register, handleSubmit, setValue, errors } = useForm();
    const { state: { auth }, dispatch } = useAppContext()
    const [data, setData] = useState({ instructorId: null })
    const [users, setUsers] = useState()
    const [instructorSelect, setInstructorSelect] = useState()







    const onBack = () => {
        history.push('/admin/users')
    }

    const selectHandleChange = name => event => {
        setData({ ...data, [name]: event });

    }

    const onSubmit = formValues => {
        console.log(formValues)

        const execute = async () => {
            await registerUser(formValues)
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
    console.log(instructorSelect)

    useEffect(() => {
        register({ name: 'type' },
            { required: true });
    }, [register])


    return (
        <>

            <div class="container">

                <form class="well form-horizontal" action=" " method="post" id="contact_form">
                    <fieldset className="card p-5">

                        <h3 className="text-center card-header" >
                            User Registration Form

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
                                        placeholder="Middle Name"
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
                                        selectedId={data.type === null ? "" : data.type}
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
                                <button type="submit" class="btn btn-primary mt-5 mr-5">Create User</button>
                                <button onClick={() => { onBack() }} type="button" class="btn btn-secondary mt-5">List of User</button>
                            </div>


                        </form>





                    </fieldset>
                </form>
            </div>



        </>
    )
}