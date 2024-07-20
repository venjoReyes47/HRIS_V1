import React from "react";
import Error from "../../../../_assets/logo/NoDataFound.png"



export default function CustomError(props) {
    const { errorName, errorDesc } = props


    return (
        <>
            <section className="card p-5">
                <div className="card-header"><h3>Something went wrong</h3> </div>
                <div className="mx-auto" style={{ 'width': '50%' }}>
                    <div className="jumbotron bg-white text-center">

                        <img style={{ width: '40%' }} src={Error} />
                        <h1 className="display-4">{errorName}</h1>
                        <p className="lead">{errorDesc}</p>


                    </div>

                </div>
            </section>

        </>
    )
} 