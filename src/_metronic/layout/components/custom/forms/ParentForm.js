
import React, { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { useAppContext } from "../../../../../app/contexts/useAppContext";
import { componentTypes } from "../../snackbar/__hooks__/types";

import IMSelect from "../select/IMSelect"

const ParentForm = (props) => {
    const getCivilStatus = []
    const getNationality = []
    const [isUpdate, setIsUpdate] = useState(false)
    const [isTrueName, setIsTrueName] = useState(false)
    const [isTrueOccupation, setIsTrueOccupation] = useState(false)
    const [isTrueOccupationAddress, setIsTrueOccupationAddress] = useState(false)
    const [isTrueContactNumber, setIsTrueContactNumber] = useState(false)
    const [isTrueHomeAddress, setIsTrueHomeAddress] = useState(false)
    const [isTrueMaritalStatus, setIsTrueMaritalStatus] = useState(false)
    const [oneScan, setOneScan] = useState(false)




    const { state: { civilStatuses, nationalities }, dispatch } = useAppContext();

    const [civilStatus, setCivilStatus] = useState([]);
    const [pageCivil, setPageCivil] = useState(civilStatuses.page);
    const [rowsPerPageCivil, setRowsPerPageCivil] = useState(civilStatuses.rowsPerPage);
    const [keywordCivil, setKeywordCivil] = useState(civilStatuses.keyword);

    const [nationality, setNationality] = useState([]);
    const [pageNationality, setPageNationality] = useState(nationalities.page);
    const [rowsPerPageNationality, setRowsPerPageNationality] = useState(nationalities.rowsPerPage);
    const [keywordNationality, setKeywordNationality] = useState(nationalities.keyword);


    const [isLastUpdate, setIsLastUpdate] = useState(true);
    const [state, setState] = useState()
    const name = props.name
    const { register, handleSubmit, setErrors, setValue, formState: { errors } } = useForm({
        defaultValues: {
            fatherMaritalStatus: '',
            motherMaritalStatus: '',
            fatherCitizenship: '',
            motherCitizenship: '',
            fatherHighestEducationalAttainment: '',
            motherHighestEducationalAttainment: ''


        }
    });
    const [data, setData] = useState([])

    const onChange = (e) => {

        if (Object.keys(data).length) {
            if (data[`${props.name}Name`]) {
                if (data[`${props.name}Name`].trim().length === 0) {
                    setIsTrueName(true)
                } else {
                    setIsTrueName(false)

                }
            }
            if (data[`${props.name}Occupation`]) {
                if (data[`${props.name}Occupation`].trim().length === 0) {
                    setIsTrueOccupation(true)
                } else {
                    setIsTrueOccupation(false)

                }
            }
            if (data[`${props.name}OccupationAddress`]) {
                if (data[`${props.name}OccupationAddress`].trim().length === 0) {
                    setIsTrueOccupationAddress(true)
                } else {
                    setIsTrueOccupationAddress(false)

                }
            }

            if (data[`${props.name}HomeAddress`]) {
                if (data[`${props.name}HomeAddress`].trim().length === 0) {
                    setIsTrueHomeAddress(true)
                } else {
                    setIsTrueHomeAddress(false)

                }
            }
            if (data[`${props.name}MaritalStatus`]) {
                if (data[`${props.name}MaritalStatus`].length === 0) {
                    setIsTrueMaritalStatus(true)
                } else {
                    setIsTrueMaritalStatus(false)

                }
            }
        }

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
        register({ name: `${name}MaritalStatus` },
            { required: true });
    }, [register])

    useEffect(() => {
        register({ name: `${name}Citizenship` },
            { required: true });
    }, [register])

    useEffect(() => {
        register({ name: `${name}HighestEducationalAttainment` },
            { required: true });
    }, [register])

    useEffect(() => {
        const execute = async () => {
            await props.getCivilStatusInfo(pageCivil, rowsPerPageCivil, keywordCivil)
                .then(response => {
                    if (response.success) {
                        dispatch({ type: props.types.GET_CIVILSTATUS, data: response.data, keyword: keywordCivil });
                        ;

                        for (let i = 0; i < response.data.length; i++) {
                            getCivilStatus.push({ tableId: response.data[i].CivilStatusId, code: response.data[i].CivilStatus })


                        }
                        setCivilStatus(getCivilStatus)

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
            setIsLastUpdate(false);
            dispatch({ type: props.types.CLEAR_LAST_UPDATE_ID });
        }, 2500);
        return () => {
            clearTimeout(timer);
        }
    }, [dispatch, pageCivil, rowsPerPageCivil, keywordCivil])

    useEffect(() => {
        const execute = async () => {
            await props.getNationalityInfo(pageNationality, rowsPerPageNationality, keywordNationality)
                .then(response => {
                    if (response.success) {
                        dispatch({ type: props.types.GET_NATIONALITY, data: response.data, keyword: keywordNationality });
                        ;

                        for (let i = 0; i < response.data.length; i++) {
                            getNationality.push({ tableId: response.data[i].NationalityId, code: response.data[i].Nationality })


                        }
                        setNationality(getNationality)

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
            setIsLastUpdate(false);
            dispatch({ type: props.types.CLEAR_LAST_UPDATE_ID });
        }, 2500);
        return () => {
            clearTimeout(timer);
        }
    }, [dispatch, pageCivil, rowsPerPageCivil, keywordCivil])



    useEffect(() => {
        if (props.isUpdate === true) {
            setIsUpdate(true)
        }
    }, [])


    useEffect(() => {
        if (isUpdate === true) {
            setData({
                ...data,
                [`${props.name}Name`]: props.parentData.parentName,
                [`${props.name}Occupation`]: props.parentData.parentOccupation,
                [`${props.name}OccupationAddress`]: props.parentData.parentOccupationAddress,
                [`${props.name}ContactNumber`]: props.parentData.parentContactNo,
                [`${props.name}HomeAddress`]: props.parentData.parentAddress,
                [`${props.name}MaritalStatus`]: props.parentData.parentMaritalStatus,
                [`${props.name}Citizenship`]: props.parentData.parentCitizen,
                [`${props.name}HighestEducationalAttainment`]: props.parentData.parentEducation,

            });

        }
    }, [isUpdate])

    useEffect(() => {

        if (data.length !== 0 && isUpdate === true && oneScan === false) {
            onChange()
            setOneScan(true)
        }

    }, [data])
    console.log(props.label)
    console.log(props.parentData)

    return (
        <div className={props.className} onSubmit={onChange} onBlur={onChange} >

            <h5 className="card-header bg-secondary p-5">{props.label}</h5>
            <div className='card-body p-3'>
                <div className='row'>
                    <div className="form-group col-12 col-md-4 mb-3">
                        <label className="col-form-label p-0">Full Name <span className="text-danger">*</span>  </label>
                        {props.parentData !== undefined ?
                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}Name`}
                                    defaultValue={props.parentData.parentName === undefined ? '' : props.parentData.parentName}
                                    className={`form-control ${isTrueName && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />

                                {isTrueName && <span className="form-text text-danger"> This Field is Required </span>}

                            </>

                            :

                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}Name`}
                                    defaultValue=''
                                    className={`form-control ${isTrueName && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />

                                {isTrueName && <span className="form-text text-danger"> This Field is Required </span>}

                            </>
                        }


                    </div>
                    <div className="form-group col-12 col-md-4 mb-3">
                        <label className="col-form-label p-0">Occupation <span className="text-danger">*</span>  </label>
                        {props.parentData ?

                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}Occupation`}
                                    defaultValue={props.parentData.parentOccupation === undefined ? '' : props.parentData.parentOccupation}
                                    className={`form-control ${isTrueOccupation && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueOccupation && <span className="form-text text-danger"> This Field is Required </span>}
                            </>

                            :
                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}Occupation`}
                                    defaultValue=''
                                    className={`form-control ${isTrueOccupation && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueOccupation && <span className="form-text text-danger"> This Field is Required </span>}
                            </>

                        }


                    </div>
                    <div className="form-group col-12 col-md-4 mb-3">
                        <label className="col-form-label p-0">Occupation Address <span className="text-danger">*</span>  </label>
                        {props.parentData !== undefined

                            ?
                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}OccupationAddress`}
                                    defaultValue={props.parentData.parentOccupationAddress === undefined ? '' : props.parentData.parentOccupationAddress}
                                    className={`form-control mt-2 ${isTrueOccupationAddress && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueOccupationAddress && <span className="form-text text-danger"> This Field is Required </span>}
                            </>

                            :
                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}OccupationAddress`}
                                    defaultValue=''
                                    className={`form-control mt-2 ${isTrueOccupationAddress && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueOccupationAddress && <span className="form-text text-danger"> This Field is Required </span>}
                            </>


                        }


                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-12 col-md-6 mb-3">
                        <label className="col-form-label p-0">Contact # <span className="text-danger">*</span>  </label>
                        {props.parentData ?
                            <>
                                <input
                                    onBlur={onChange}
                                    type="number"
                                    name={`${props.name}ContactNumber`}
                                    defaultValue={props.parentData.parentContactNo === undefined ? '' : props.parentData.parentContactNo}
                                    className={`form-control mt-2 ${isTrueContactNumber && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueContactNumber && <span className="form-text text-danger"> This Field is Required </span>}


                            </>

                            :
                            <>
                                <input
                                    onBlur={onChange}
                                    type="number"
                                    name={`${props.name}ContactNumber`}
                                    defaultValue=''
                                    className={`form-control mt-2 ${isTrueContactNumber && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueContactNumber && <span className="form-text text-danger"> This Field is Required </span>}


                            </>

                        }


                    </div>
                    <div className="form-group col-12 col-md-6 mb-3">
                        <label className="col-form-label p-0">Home Address <span className="text-danger">*</span>  </label>

                        {props.parentData ?
                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}HomeAddress`}
                                    defaultValue={props.parentData.parentAddress === undefined ? '' : props.parentData.parentAddress}
                                    className={`form-control mt-2 ${isTrueHomeAddress && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueHomeAddress && <span className="form-text text-danger"> This Field is Required </span>}
                            </>


                            :
                            <>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`${props.name}HomeAddress`}
                                    defaultValue=''
                                    className={`form-control mt-2 ${isTrueHomeAddress && ' is-invalid'}`}
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />
                                {isTrueHomeAddress && <span className="form-text text-danger"> This Field is Required </span>}
                            </>

                        }


                    </div>

                </div>
                <div className='row'>

                    <div className='col-12 col-md-4 mb=0'>
                        {props.parentData ?

                            <IMSelect
                                data={civilStatus}
                                onHandleChange={selectHandleChange(`${name}MaritalStatus`)}
                                refClassContainer="form-group mb-3"
                                name={`${name}MaritalStatus`}
                                isRequired={true}
                                withLabel={true}
                                label="Marital Status"
                                placeHolder="Marital Status"
                                forwardRef={setValue}
                                selectedId={props.parentData.parentMaritalStatus === undefined ? '' : props.parentData.parentMaritalStatus}
                                withClassContainer={` ${isTrueMaritalStatus && ' is-invalid'}`}
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
                                error={!!errors[`${name}MaritalStatus`]}
                                errorMessage={errors[`${name}MaritalStatus`] && errors[`${name}MaritalStatus`].type === "required" && 'Gender is required'}
                            />

                            :
                            <IMSelect
                                data={civilStatus}
                                onHandleChange={selectHandleChange(`${name}MaritalStatus`)}
                                refClassContainer="form-group mb-3"
                                name={`${name}MaritalStatus`}
                                isRequired={true}
                                withLabel={true}
                                label="Marital Status"
                                placeHolder="Marital Status"
                                forwardRef={setValue}
                                selectedId={data[`${name}MaritalStatus`] === null ? props.doc[`${name}MaritalStatus`] : data[`${name}MaritalStatus`]}
                                withClassContainer={` ${isTrueMaritalStatus && ' is-invalid'}`}
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
                                error={!!errors[`${name}MaritalStatus`]}
                                errorMessage={errors[`${name}MaritalStatus`] && errors[`${name}MaritalStatus`].type === "required" && 'Gender is required'}
                            />

                        }

                    </div>
                    <div className='col-12 col-md-4 mb=0'>
                        {props.parentData ?
                            <IMSelect
                                data={nationality}
                                onHandleChange={selectHandleChange(`${name}Citizenship`)}
                                refClassContainer="form-group mb-3"
                                name={`${name}Citizenship`}
                                isRequired={true}
                                withLabel={true}
                                label="Citizenship"
                                placeHolder=""
                                forwardRef={setValue}
                                selectedId={props.parentData.parentCitizen === undefined ? '' : props.parentData.parentCitizen}
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
                                data={nationality}
                                onHandleChange={selectHandleChange(`${name}Citizenship`)}
                                refClassContainer="form-group mb-3"
                                name={`${name}Citizenship`}
                                isRequired={true}
                                withLabel={true}
                                label="Citizenship"
                                placeHolder=""
                                forwardRef={setValue}
                                selectedId={data[`${name}Citizenship`] === null ? props.doc[`${name}Citizenship`] : data[`${name}Citizenship`]}
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
                    <div className='col-12 col-md-4 mb=0'>
                        {props.parentData ?
                            <IMSelect
                                onHandleChange={selectHandleChange(`${name}HighestEducationalAttainment`)}
                                refClassContainer="form-group mb-3"
                                name={`${name}HighestEducationalAttainment`}
                                isRequired={true}
                                withLabel={true}
                                label="Highest Educational Attainment"
                                placeHolder=""
                                forwardRef={setValue}
                                selectedId={props.parentData.parentEducation === undefined ? '' : props.parentData.parentEducation}
                                refClassName={``}
                                withDescription={false}
                                // description={`Please select your gender.`}
                                refDisabled={true}
                                refIsStatic={true}
                                refStaticData={[
                                    { id: '', label: '' },
                                    { id: 1, label: 'Preschool' },
                                    { id: 2, label: 'Elementary' },
                                    { id: 3, label: 'Highschool' },
                                    { id: 4, label: 'Bachelor Degree' },
                                    { id: 5, label: 'Masteral Degree' },
                                    { id: 6, label: 'Doctoral Degree' }


                                ]}
                                field={{
                                    tableId: '',
                                    display: ''
                                }}
                            // error={!!errors.gender}
                            // errorMessage={errors.gender && errors.gender.type === "required" && 'Gender is required'}
                            />

                            :
                            <IMSelect
                                onHandleChange={selectHandleChange(`${name}HighestEducationalAttainment`)}
                                refClassContainer="form-group mb-3"
                                name={`${name}HighestEducationalAttainment`}
                                isRequired={true}
                                withLabel={true}
                                label="Highest Educational Attainment"
                                placeHolder=""
                                forwardRef={setValue}
                                selectedId={data[`${name}HighestEducationalAttainment`] === null ? props.doc[`${name}HighestEducationalAttainment`] : data[`${name}HighestEducationalAttainment`]}
                                refClassName={``}
                                withDescription={false}
                                // description={`Please select your gender.`}
                                refDisabled={true}
                                refIsStatic={true}
                                refStaticData={[
                                    { id: '', label: '' },
                                    { id: 1, label: 'Preschool' },
                                    { id: 2, label: 'Elementary' },
                                    { id: 3, label: 'Highschool' },
                                    { id: 4, label: 'Bachelor Degree' },
                                    { id: 5, label: 'Masteral Degree' },
                                    { id: 6, label: 'Doctoral Degree' }


                                ]}
                                field={{
                                    tableId: '',
                                    display: ''
                                }}
                            // error={!!errors.gender}
                            // errorMessage={errors.gender && errors.gender.type === "required" && 'Gender is required'}
                            />

                        }

                    </div>
                </div>
            </div>

        </div>
    )
}


export default ParentForm