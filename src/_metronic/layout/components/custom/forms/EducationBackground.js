import React, { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { useAppContext } from "../../../../../app/contexts/useAppContext";
import { componentTypes } from "../../snackbar/__hooks__/types";
import IMSelect from "../select/IMSelect";

const EducationBackground = (props) => {
    const { state: { schools }, dispatch } = useAppContext();
    const getSchool = []
    const [isUpdate, setIsUpdate] = useState(false)
    const [lastSchool, setLastSchools] = useState([]);
    const pageSchool = schools.page;
    const rowsPerPageSchool = schools.rowsPerPage;
    const keywordSchool = schools.keyword;


    const { register, setValue } = useForm();
    const [data, setData] = useState({

    })

    const onChange = (e) => {
        if (isUpdate === false) {
            selectHandleChange(e.target.name)(e.target.value)

        }
        props.infoHandler(data)

    }

    const selectHandleChange = name => event => {
        setData({ ...data, [name]: event });
        props.infoHandler(data)
    }
    useEffect(() => {
        const execute = async () => {
            await props.getSchoolInfo(pageSchool, rowsPerPageSchool, keywordSchool)
                .then(response => {
                    if (response.success) {
                        dispatch({ type: props.types.GET_SCHOOLS, data: response.data, keyword: keywordSchool });
                        ;

                        for (let i = 0; i < response.data.length; i++) {
                            getSchool.push({ tableId: response.data[i].SchoolId, code: response.data[i].School })


                        }
                        setLastSchools(getSchool)

                    } else {
                        dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 3000, snackBarMessage: response.message });
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        localStorage.clear();

                    } else {
                        dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 3000, snackBarMessage: error.response.data.message });
                    }
                })
        }
        execute();

        const timer = setTimeout(() => {
            dispatch({ type: props.types.CLEAR_LAST_UPDATE_ID });
        }, 2500);
        return () => {
            clearTimeout(timer);
        }
    }, [dispatch, pageSchool, rowsPerPageSchool, keywordSchool])

    useEffect(() => {
        if (props.isUpdate === true) {
            setIsUpdate(true)
        }
    }, [])

    useEffect(() => {
        if (isUpdate === true) {
            setData({
                ...data,
                [`${props.name}Name`]: props.data.SchoolId
                // [`${props.name}Address`]: props.data.parentOccupation,
                // [`${props.name}SchoolAward`]: props.data.parentOccupationAddress,
                // [`${props.name}FromYear`]: props.data.parentContactNo,
                // [`${props.name}ToYear`]: props.data.parentAddress,


            });

        }
    }, [isUpdate])


    useEffect(() => {

        if (data.length !== 0 && isUpdate === true) {
            onChange()

        }

    }, [data])

    console.log(props.data)
    return (
        <div className={props.className} onBlur={onChange}>

            <h5 className="card-header bg-secondary p-5">{props.label}</h5>
            <div className='card-body p-3'>
                <div className='row'>
                    <div className="form-group col-12 col-md-3 mb-3">
                        {props.data !== undefined && props.data.length > 0 ?

                            <IMSelect
                                data={lastSchool}
                                onHandleChange={selectHandleChange(`${props.name}Name`)}
                                refClassContainer="form-group mb-3"
                                name={`${props.name}Name`}
                                isRequired={true}
                                withLabel={true}
                                label="School Name"
                                placeHolder=""
                                forwardRef={setValue}
                                selectedId={props.data[0].SchoolId === undefined ? '' : props.data[0].SchoolId}
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

                            :



                            <IMSelect
                                data={lastSchool}
                                onHandleChange={selectHandleChange(`${props.name}Name`)}
                                refClassContainer="form-group mb-3"
                                name={`${props.name}Name`}
                                isRequired={true}
                                withLabel={true}
                                label="School Name"
                                placeHolder=""
                                forwardRef={setValue}
                                selectedId={data[`${props.name}Name`] === null ? props.doc[`${props.name}Name`] : data[`${props.name}Name`]}
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
                        }


                    </div>
                    <div className="form-group col-12 col-md-3 mb-3">
                        <label className="col-form-label p-0">Address <span className="text-danger">*</span>  </label>
                        <input
                            onBlur={onChange}
                            type="text"
                            name={`${props.name}Address`}
                            defaultValue=' '
                            className='form-control mt-2'
                            ref={register({
                                required: true
                            })}
                            autoComplete="off"
                            maxLength="100"
                        />

                    </div>
                    <div className="form-group col-12 col-md-2 mb-3">
                        <label className="col-form-label p-0">Awards Recieved <span className="text-danger">*</span>  </label>
                        <input
                            onBlur={onChange}
                            type="text"
                            name={`${props.name}Award`}
                            defaultValue=' '
                            className='form-control mt-2'
                            ref={register({
                                required: true
                            })}
                            autoComplete="off"
                            maxLength="100"
                        />

                    </div>
                    <div className="form-group col-12 col-md-2 mb-3">
                        <IMSelect
                            onHandleChange={selectHandleChange('fromYear')}
                            refClassContainer="form-group mb-3"
                            name="fromYear"
                            isRequired={true}
                            withLabel={true}
                            label="From"
                            placeHolder=""
                            forwardRef={setValue}
                            selectedId={data.fromYear === null ? props.doc.fromYear : data.fromYear}
                            refClassName={``}
                            withDescription={false}
                            // description={`Please select your gender.`}
                            refDisabled={true}
                            refIsStatic={true}
                            refStaticData={[
                                { id: '', label: '' },
                                { id: '1', label: '2023' },
                                { id: '2', label: '2022' },
                                { id: '3', label: '2020' },

                                { id: '4', label: '2019' },
                                { id: '5', label: '2018' },
                                { id: '6', label: '2017' },
                                { id: '7', label: '2016' },
                                { id: '8', label: '2015' },
                                { id: '9', label: '2014' },
                                { id: '10', label: '2013' },
                                { id: '11', label: '2012' },
                                { id: '12', label: '2011' },
                                { id: '13', label: '2010' },
                                { id: '14', label: '2009' },
                                { id: '15', label: '2008' },
                                { id: '16', label: '207' },



                            ]}
                            field={{
                                tableId: '',
                                display: ''
                            }}
                        // error={!!errors.gender}
                        // errorMessage={errors.gender && errors.gender.type === "required" && 'Gender is required'}
                        />
                    </div>
                    <div className="form-group col-12 col-md-2 mb-3">
                        <IMSelect
                            onHandleChange={selectHandleChange('toYear')}
                            refClassContainer="form-group mb-3"
                            name="toYear"
                            isRequired={true}
                            withLabel={true}
                            label="To"
                            placeHolder=""
                            forwardRef={setValue}
                            selectedId={data.toYear === null ? props.doc.toYear : data.toYear}
                            refClassName={``}
                            withDescription={false}
                            // description={`Please select your gender.`}
                            refDisabled={true}
                            refIsStatic={true}
                            refStaticData={[
                                { id: '', label: '' },
                                { id: '1', label: '2021' },
                                { id: '2', label: '2020' },
                                { id: '3', label: '2019' },



                            ]}
                            field={{
                                tableId: '',
                                display: ''
                            }}
                        // error={!!errors.gender}
                        // errorMessage={errors.gender && errors.gender.type === "required" && 'Gender is required'}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}


export default EducationBackground