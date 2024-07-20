import React, { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import IMSelect from "../select/IMSelect"
import { componentTypes } from "../../snackbar/__hooks__/types";
import { useAppContext } from "../../../../../app/contexts/useAppContext";

const FamilyMonthlyIncome = (props) => {
    const { netIncomeSelect, educationalPlanSelect, scholarshipSelect, familyPositionSelect } = props


    const { setValue } = useForm();
    const [data, setData] = useState({

    })

    const selectHandleChange = name => event => {
        let count = props.siblingsCount
        setData({ ...data, [name]: event, 'siblingCount': count });
    }
    const onChange = (e) => {
        selectHandleChange(e.target.name)(e.target.value)
        props.infoHandler(data)
        console.log(JSON.stringify(data) + ' this is the data')
    }


    return (

        <div className="card my-5" onBlur={onChange}>
            <div className="card-header  bg-secondary p-5">
                <div className='row'>
                    <h5 value='' className="col-6 pr-0 mb-0">Income Information</h5>

                </div>


            </div>

            <div className={`card-body  p-0 `} >
                <div className='mt-5'>

                    <div className='p-3'>
                        <div className='row'>
                            <div className='col-12 col-lg-3 mb=0'>
                                <IMSelect
                                    data={netIncomeSelect}
                                    onHandleChange={selectHandleChange(`monthlyFamilyIncome`)}
                                    refClassContainer="form-group mb-3"
                                    name={`monthlyFamilyIncome`}
                                    isRequired={true}
                                    withLabel={true}
                                    label="Monthly Family Income"
                                    placeHolder=""
                                    forwardRef={setValue}
                                    selectedId={data[`monthlyFamilyIncome`] === null ? props.doc[`monthlyFamilyIncome`] : data[`monthlyFamilyIncome`]}
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
                            <div className='col-12 col-lg-3 mb=0'>
                                <IMSelect
                                    data={educationalPlanSelect}
                                    onHandleChange={selectHandleChange(`educationalPlan`)}
                                    refClassContainer="form-group mb-3"
                                    name={`educationalPlan`}
                                    isRequired={true}
                                    withLabel={true}
                                    label="Educational Plan"
                                    placeHolder=""
                                    forwardRef={setValue}
                                    selectedId={data[`educationalPlan`] === null ? props.doc[`educationalPlan`] : data[`educationalPlan`]}
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
                            <div className='col-12 col-lg-3 mb=0'>
                                <IMSelect
                                    data={scholarshipSelect}
                                    onHandleChange={selectHandleChange(`scholarship`)}
                                    refClassContainer="form-group mb-3"
                                    name={`scholarship`}
                                    isRequired={true}
                                    withLabel={true}
                                    label="Scholarship"
                                    placeHolder=""
                                    forwardRef={setValue}
                                    selectedId={data[`scholarship`] === null ? props.doc[`scholarship`] : data[`scholarship`]}
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
                            <div className='col-12 col-lg-3 mb=0'>
                                <IMSelect
                                    data={familyPositionSelect}
                                    onHandleChange={selectHandleChange(`familyPosition`)}
                                    refClassContainer="form-group mb-3"
                                    name={`familyPosition`}
                                    isRequired={true}
                                    withLabel={true}
                                    label="Position in the Family"
                                    placeHolder=""
                                    forwardRef={setValue}
                                    selectedId={data[`familyPosition`] === null ? props.doc[`familyPosition`] : data[`familyPosition`]}
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



                        </div>

                    </div>
                </div>
            </div>
        </div>


    )

}


export default FamilyMonthlyIncome 