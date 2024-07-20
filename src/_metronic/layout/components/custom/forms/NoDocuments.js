import React from "react";
import NoDocument from "../../../../_assets/logo/NoDocument.png"


const NoDocuments = (props) => {


    return (
        <>
            <div className="mx-auto" style={{ 'width': '40%' }}>
                <div className="jumbotron bg-white text-center">

                    <img style={{ width: '40%' }} src={NoDocument} />
                    <h1 className="display-4">No Credentials</h1>
                    <p className="lead">Credentials need to be submitted first in Registrar Office.</p>


                </div>

            </div>
        </>
    )

}

export default NoDocuments