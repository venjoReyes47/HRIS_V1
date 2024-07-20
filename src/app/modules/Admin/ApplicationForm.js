import React, { useState, useEffect } from "react";
import { createApplicant, getAllPosition } from "./__hooks__"
import SelectCreator from "../../../_metronic/functions/SelectCreator";
import IMSelect from "../../../_metronic/layout/components/custom/select/IMSelect";
import history from "../../history";
export default function ApplicantForm() {
    const [positionSelect, setPositionSelect] = useState([])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        address: "",
        contactNo: "",
        emailAddress: "",
        gender: "",
        civilStatus: "",
        religion: "",
        presentAddress: "",
        permanentAddress: "", // course
        placeOfBirth: "", // educational attainment
        positionId: null
    });


    const selectHandleChange = name => event => {
        setFormData((prevData) => {
            return { ...prevData, positionId: event }
        });
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here, e.g., send data to backend, etc.
        console.log(formData);
        await createApplicant(formData)
            .then(resp => {
                // Clear form fields after submission (optional)
                setFormData({
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    address: "",
                    contactNo: "",
                    emailAddress: "",
                    gender: "",
                    civilStatus: "",
                    religion: "",
                    presentAddress: ""
                });

                history.push('/form-submitted')
            })

    };

    useEffect(() => {
        SelectCreator(getAllPosition, setPositionSelect, 'id', 'description')
    }, [])

    return (
        <div className="container mt-4 f-flex align-items-center" style={{ width: '70%', marginTop: '10%' }}>
            <main className="card" style={{ padding: '10%' }}>
                <h2 className="text-center mb-4">Applicant Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-12 col-xl-4">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="col-12 col-xl-4">
                            <label htmlFor="middleName" className="form-label">Middle Name</label>
                            <input type="text" className="form-control" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </div>
                        <div className="col-12 col-xl-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>

                    </div>
                    <div className="row mb-3">
                        <div className="col">
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
                                selectedId={formData.positionId}
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
                        <div className="col">
                            <label htmlFor="contactNo" className="form-label">Contact Number</label>
                            <input type="tel" className="form-control" id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
                        </div>
                        <div className="col">
                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row mb-3">

                        <div className="col">
                            <label htmlFor="gender" className="form-label">Highest Educational Attainment</label>
                            <input type="text" className="form-control" id="placeOfBirth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} required />
                        </div>
                        <div className="col">
                            <label htmlFor="civilStatus" className="form-label">Course</label>
                            <input type="text" className="form-control" id="permanentAddress" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="presentAddress" className="form-label">Present Address</label>
                            <input type="text" className="form-control" id="presentAddress" name="presentAddress" value={formData.presentAddress} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>

        </div>
    );
}
