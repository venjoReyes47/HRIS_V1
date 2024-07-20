import React, { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import IMSelect from "../select/IMSelect"
import { componentTypes } from "../../snackbar/__hooks__/types";
import { useAppContext } from "../../../../../app/contexts/useAppContext";




const SiblingTable = (props) => {
    const getYearLevel = []
    const { state: { yearLevels }, dispatch } = useAppContext();

    const [yearlevel, setyearlevel] = useState([]);
    const [pageYearLevels, setYearLevels] = useState(yearLevels.page);
    const [rowsPerPageYearLevels, setRowsPerPageYearLevels] = useState(yearLevels.rowsPerPage);
    const [keywordYearLevels, setKeywordYearLevels] = useState(yearLevels.keyword);



    const { register, handleSubmit, errors, setValue } = useForm();
    const [data, setData] = useState({

    })


    const AddSiblingHandler = (e) => {
        const newSibling = {

            siblingKey: Math.floor(Math.random() * 1000000),
            siblingCount: Math.floor(Math.random() * 1000000),
            className: '',
        }

        props.siblingsAddHandler(newSibling)
    }

    const selectHandleChange = name => event => {
        let count = props.siblingsCount
        setData({ ...data, [name]: event, 'siblingCount': count });
    }
    const onChange = (e) => {
        selectHandleChange(e.target.name)(e.target.value)
        props.infoHandler(data)
        console.log(JSON.stringify(data) + ' this is the data')
    }



    const onAddSbiling = (e) => {
        e.preventDefault()

        AddSiblingHandler()

    }

    useEffect(() => {
        const execute = async () => {
            await props.getYearLevelInfo(pageYearLevels, rowsPerPageYearLevels, keywordYearLevels)
                .then(response => {
                    if (response.success) {
                        dispatch({ type: props.types.GET_YEARLEVELS, data: response.data, keyword: keywordYearLevels });
                        ;

                        for (let i = 0; i < response.data.length; i++) {
                            getYearLevel.push({ tableId: response.data[i].YearLevelId, code: response.data[i].YearLevel })


                        }
                        setyearlevel(getYearLevel)

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
    }, [dispatch, pageYearLevels, rowsPerPageYearLevels, keywordYearLevels])

    return (

        <div className="card mt-5" onBlur={onChange}>
            <div className="card-header  bg-secondary p-5">
                <div className='row'>
                    <h5 value='' className="col-6 pr-0 mb-0">Sibling Information</h5>


                    <div className="d-none d-lg-block col float-rigth">


                        <button onClick={onAddSbiling} type='button' className='btn btn-success btn-sm float-right' >Add Sibling</button>
                    </div>
                    <div className="d-block d-lg-none col float-rigth">


                        <button onClick={onAddSbiling} type='button' className='btn btn-success btn-xl float-right'>Add Sibling</button>

                    </div>


                </div>


            </div>

            <div className={`card-body  p-0 `} >
                <div className={props.className}>

                    <div className='p-3'>
                        <div className='row'>
                            <div className="form-group col-12 col-lg-4 mb-3">
                                <label className="col-form-label p-1">Full Name  </label>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`siblingFullName`}
                                    defaultValue=' '
                                    className='form-control'
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />

                            </div>
                            <div className="form-group col-12 col-lg-4 mb-3">
                                <label className="col-form-label p-1"> School / Company  </label>
                                <input
                                    onBlur={onChange}
                                    type="text"
                                    name={`siblingsSchoolCompany`}
                                    defaultValue=' '
                                    className='form-control'
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />

                            </div>
                            <div className='col-12 col-lg-4 mb-0'>
                                <IMSelect
                                    data={yearlevel}
                                    onHandleChange={selectHandleChange('yearLevel')}
                                    refClassContainer="form-group mb-3"
                                    name="yearLevel"
                                    isRequired={true}
                                    withLabel={true}
                                    label="Year Level"
                                    placeHolder=""
                                    forwardRef={setValue}
                                    selectedId={data.yearLevel === null ? props.doc.yearLevel : data.yearLevel}
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
                        <div className='row'>

                            <div className='col-12 col-lg-3 mb=0'>
                                <IMSelect
                                    onHandleChange={selectHandleChange(`siblingsMaritalStatus`)}
                                    refClassContainer="form-group mb-3"
                                    name={`siblingsMaritalStatus`}
                                    isRequired={true}
                                    withLabel={true}
                                    label="Marital Status"
                                    placeHolder=""
                                    forwardRef={setValue}
                                    selectedId={data[`siblingsMaritalStatus`] === null ? props.doc[`siblingsMaritalStatus`] : data[`siblingsMaritalStatus`]}
                                    refClassName={``}
                                    withDescription={false}
                                    // description={`Please select your gender.`}
                                    refDisabled={true}
                                    refIsStatic={true}
                                    refStaticData={[
                                        { id: '', label: '' },
                                        { id: '1', label: 'Single' },
                                        { id: '2', label: 'Married' },
                                        { id: '3', label: 'Widowed' },



                                    ]}
                                    field={{
                                        tableId: '',
                                        display: ''
                                    }}
                                // error={!!errors.gender}
                                // errorMessage={errors.gender && errors.gender.type === "required" && 'Gender is required'}
                                />
                            </div>
                            <div className="form-group col-12 col-lg-3 mb-3">
                                <label className="col-form-label p-0">Contact # </label>
                                <input
                                    onBlur={onChange}
                                    type="number"
                                    name={`siblingsContactNo`}
                                    defaultValue=' '
                                    className='form-control mt-2'
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />

                            </div>
                            <div className="form-group col-12 col-lg-3 mb-3">
                                <label className="col-form-label p-0">Age   </label>
                                <input
                                    onBlur={onChange}
                                    type="number"
                                    name={`siblingsAge`}
                                    defaultValue=' '
                                    className='form-control mt-2'
                                    ref={register({
                                        required: true
                                    })}
                                    autoComplete="off"
                                    maxLength="100"
                                />

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    )

}


export default SiblingTable