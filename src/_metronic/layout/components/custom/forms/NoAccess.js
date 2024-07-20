import React from "react";
import AccessDenied from "../../../../_assets/logo/AccessDenied.png"


export const NoAccess = (props) => {


    return (
        <>
            <div className="mx-auto" style={{ 'width': '50%' }}>
                <div className="jumbotron bg-white text-center">

                    <img style={{ width: '40%' }} src={AccessDenied} />
                    <h1 className="display-4">Access Denied</h1>
                    <p className="lead">Oops! Seems like you don't have Access to this page.</p>


                </div>

            </div>
        </>
    )

}