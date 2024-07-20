import { tr } from "date-fns/locale";
import React, { useState, useEffect } from "react";

export default function STable(props) {
    const institute = props.data

    const loopRow = () => {


    }

    console.log(institute)

    //     <tr>
    //     <th>{institute[i]}</th>
    //     <td>Number</td>
    //     <td>Number</td>
    //     <td>Number</td>
    //     <td>Number</td>
    //     <td>Number</td>

    // </tr>

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col text-center">Institute</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Enrolled Last Year</th>
                        <th scope="col">Assessed</th>
                        <th scope="col">Inquired</th>
                        <th scope="col">Processed</th>

                        {/* {ThData} */}

                    </tr>
                </thead>
                <tbody>
                    {institute.map((listValue, index) => {
                        return (
                            <tr key={index}>
                                <th>{listValue.institute}</th>
                                <td>{listValue.enrolled}</td>
                                <td>{listValue.enrolledLY}</td>
                                <td>{listValue.assessed}</td>
                                <td>{listValue.inquired}</td>
                                <td>{listValue.processed}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}