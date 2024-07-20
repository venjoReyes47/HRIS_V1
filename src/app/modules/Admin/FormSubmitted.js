import React from "react";
import history from "../../history";
export default function FormSubmitted(props) {

    const onReturnHandler = () => {
        history.push(`/applicant-form`);

    }




    return (
        <div className="container  my-auto " >
            <div className="card  mx-auto my-auto text-center " style={{ width: '500px' }}>

                <div className="card-body">
                    {/* <img className="mb-5" style={{ width: '80px' }} src={FaithLogo} /> */}

                    <h5 className="card-title mb-0">
                        Your application has been received. Please wait for us to contact you.

                    </h5>
                    <p className="card-text mb-4">Thank you.</p>
                    <a href="#" className="btn btn-primary" onClick={onReturnHandler}>Return in Application</a>

                </div>

            </div>
        </div>


    )
}