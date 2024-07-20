import React from "react";
import FaithLogo from '../../../../_assets/logo/faithColleges.png'




export default function Loading() {


    return (
        <>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "500px" }}>
                <div className="text-center  " >
                    <div className="mx-auto d-block mb-5">
                        <img style={{ width: '150px', cursor: "none" }} src={FaithLogo} /> <br />


                    </div>

                    <div className="d-block spinner-border spinner-border-lg text-primary  mx-auto" role="status">

                        <span className="sr-only">Loading...</span>
                    </div>

                    {/* {setTimeout(() => {
                            return <p>Taking too Long? Refresh the Page</p>
                        }, 10000)} */}

                </div></div>


        </>
    )
}