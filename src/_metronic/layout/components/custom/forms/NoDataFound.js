import React from "react";
import NoDataLogo from "../../../../../_metronic/_assets/logo/NoDataFound.png"

export default function NoDataFound() {


    return (
        <>

            <div className="mx-auto" style={{ 'width': '50%' }}>
                <div className="jumbotron bg-white text-center">

                    <img style={{ width: '30%' }} src={NoDataLogo} />
                    <h1 className="display-4">No Data Found</h1>
                    <p className="lead">Oops! Seems like theres nothing in this folder yet.</p>


                </div>

            </div>








        </>
    )
}