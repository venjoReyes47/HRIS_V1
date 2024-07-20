import React, { useState, useEffect } from "react";
import ProfileLogo from "../../../../_metronic/_assets/logo/person.jpg"; // Adjust path to actual profile picture
import { getIndividualEmployee, approvedEmployee } from "./__hooks__"
import { useParams } from "react-router-dom";


export default function ApplicantDetails() {
    const { id } = useParams()
    const [applicant, setApplicant] = useState(null);

    const getApplicantData = async (d) => {
        await getIndividualEmployee(d)
            .then(response => {
                if (response && response.data.length > 0)
                    setApplicant(response.data[0])
            })
    };

    const onHandleApprove = async () => {
        await approvedEmployee({ id: id })
            .then(response => {
                getApplicantData(id);

            })
    }

    useEffect(() => {

        getApplicantData(id);
    }, []);

    return (
        <>
            {applicant != null &&
                <>
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    {applicant.isApproved == true &&
                                        <>
                                            <div className="card-header bg-success p-2 text-center text-white">
                                                This Applicant are Approved

                                            </div>

                                        </>

                                    }
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                <img src={ProfileLogo} alt="Applicant" className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }} />

                                            </div>
                                            <div className="col-md-8">
                                                <h2 className="card-title"> &nbsp; {applicant.firstName} {applicant.lastName}</h2>
                                                <p className="card-text"><strong>Email:</strong> &nbsp;{applicant.emailAddress}</p>
                                                <p className="card-text"><strong>Phone:</strong> &nbsp;{applicant.contactNo}</p>
                                                <p className="card-text"><strong>Address:</strong> &nbsp;{applicant.presentAddress}</p>
                                                <p className="card-text"><strong>Highest Educational Attainment:</strong> &nbsp;{applicant.placeOfBirth}</p>
                                                <p className="card-text"><strong>Course:</strong> &nbsp;{applicant.permanentAddress}</p>
                                                <p className="card-text"><strong>Present Address:</strong> &nbsp;{applicant.presentAddress}</p>
                                                {applicant.isApproved == false ?
                                                    <>
                                                        <button onClick={() => { onHandleApprove() }} className="btn btn-primary mr-5">Approve</button>
                                                        <button className="btn btn-danger">Decline</button>
                                                    </>
                                                    :
                                                    <>

                                                        {/* <button className="btn btn-danger">Cancel Approval</button> */}

                                                    </>
                                                }

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>

            }

        </>

    );
}
