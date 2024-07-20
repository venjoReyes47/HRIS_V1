import React from "react";
import NoDataLogo from "../../../../../_metronic/_assets/logo/NoDataFound.png"

export default function NoEnroll() {


    return (
        <>

            <div className="mx-auto" style={{ 'width': '50%' }}>
                <div className="jumbotron bg-white text-center">

                    <img style={{ width: '50%' }} src={NoDataLogo} />
                    <h1 className="display-4">No Data Found</h1>
                    <p className="lead">Oops! Seems like you are not Enrolled on the current Semester.</p>


                </div>

            </div>








        </>
    )
}