import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts/useAppContext";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import IMSelect from "../../../../../_metronic/layout/components/custom/select/IMSelect";
import IMCollapsibleTableStudent from "../../../../../_metronic/layout/components/custom/table/IMCollapsibleTableStudent";
import IMTableStudentAssessment from "../../../../../_metronic/layout/components/custom/table/IMTableStudentAssessment";
import { componentTypes } from "../../../../../_metronic/layout/components/snackbar/__hooks__/types";
import history from "../../../../history";
import NoEnroll from "../../../../../_metronic/layout/components/custom/forms/NotEnroll";
import Loading from "../../../../../_metronic/layout/components/custom/forms/Loading"
import FaithLogo from "../../../../../_metronic/_assets/logo/lb-logo.png"
import { studentTypes } from "./__hooks__/types";
import IMTableAssessmentFee from "../../../../../_metronic/layout/components/custom/table/IMTableAssessmentFee";
import {
    createStudentEnrollmentSubjects, updateEnrollment, createEnrollmentAccountAddsOn, deleteStudentEnrollmentSubjects,
    deleteEnrollmentAccountAddsOn, getModeOfPayment, getStudentCampus
} from './__hooks__'




export default function StudentPreAssessment(props) {
    const { student, studentInfo, activeSem, activeSy, enrollment, subjectScheduleList, studentEnrollmentSub,
        subjectScheduleDetail, subject, subjectScheduleDetailList, enrollmentAcc, studentDiscount, assessmentTemplate,
        assessmentTemplateDetail, fees, feeGroup, payment, allEnrollmentRecord } = props

    const { state: { auth, subjectScheduleDetails }, dispatch } = useAppContext();
    const { setValue } = useForm();
    const [subSchedReferences, setSubSchedReferences] = useState([])
    const [data, setData] = useState({ SubjectScheduleId: 0, PaymentModeId: 2 })
    const [assessmentTemplateRef, setAssessmentTemplateRef] = useState()
    const [enrollmentAddOnsData, setEnrollmentAddOnsData] = useState()
    const [paymentRecieved, setPaymentRecieved] = useState()
    const [totalPayment, setTotalPayment] = useState(0)
    const [totalF, setTotalF] = useState()
    const [ready, setReady] = useState(false)
    const [paymentRef, setPaymentRef] = useState()
    const [uniqueSubjectScheduleDetail, setUniqueSubjectScheduleDetail] = useState([])
    const [totalUnit, setTotalUnit] = useState()
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [totalTuition, setTotalTuition] = useState(0)
    const [totalFee, setTotalFee] = useState(0)
    const [isExistedAcc, setIsExistedAcc] = useState(false)
    const [selectedSubjectCode, setSelectedSubjectCode] = useState([])
    const [selectedSchedCode, setSelectedSchedCode] = useState([])
    const [discountTable, setDiscountTable] = useState()
    const [selectedSubList, setSelectedSubList] = useState()
    const [firstScan, setFirstScan] = useState(true)


    const [studentEnrollmentSubject, setStudentEnrollmentSubject] = useState()
    const [existingSelectedSub, setExistingSelectedSub] = useState()
    const [existingSelectedSched, setExistingSelectedSched] = useState()
    const [existingSelectedSubCode, setExistingSelectedSubCode] = useState()
    const [isProcessed, setIsProcessed] = useState(false)
    const [modeofPayment, setModeOfPayment] = useState()
    const [interest, setInterest] = useState()
    const [totalInterest, setTotalInterest] = useState(0)
    const [paymentModeId, setPaymentModeId] = useState()
    const [chosenPaymentMode, setChosenPaymentMode] = useState()
    const [isWithBakAcct, setIsWithBakAcct] = useState()
    const [keepLoading, setKeepLoading] = useState(true)


    const [existingAssessmentTemplate, setExistingAssessmentTemplate] = useState()
    const [existingPaymentModeId, setExistingPaymentModeId] = useState()





    //  const [rerender, setRerender] = useState(false)
    const keyword = subjectScheduleDetails.keyword;
    const onSearch = subjectScheduleDetails.keyword === '' ? false : true;
    const updateId = subjectScheduleDetails.id;
    const page = subjectScheduleDetails.page;
    const rowsPerPage = subjectScheduleDetails.rowsPerPage;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const numberWithCommas = (x) => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
    const { id } = useParams()


    const onSubmit = () => {
        if (selectedSchedCode && selectedSubjectCode && enrollmentAddOnsData) {
            if (selectedSubjectCode.length === 0 || enrollmentAddOnsData.length === 0) {
                dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 5000, snackBarMessage: 'Please select your preferred Subject with your Schedule and Payment Mode' });

            } else {
                // need revision
                const enrollmentValues = {
                    assessmentTemplateId: assessmentTemplate[0].AssessmentTemplateId,
                    studentId: student[0].StudentId,
                    assessmentDate: dateTime,
                    enrollmentDate: dateTime,
                    enrollmentStatusId: 'FV',
                    paymentModeId: paymentModeId
                }

                //save enrollment
                onUpdateEnrollment(enrollment[0].EnrollmentId, enrollmentValues)

                //save subjects
                for (let c = 0; c < studentEnrollmentSubject.length; c++) {
                    onCreateStudentEnrollmentSub(studentEnrollmentSubject[c])
                }

                // save fees
                for (let v = 0; v < enrollmentAddOnsData.length; v++) {
                    onCreateStudentEnrollmentAddOns(enrollmentAddOnsData[v])
                }

                dispatch({
                    type: componentTypes.SHOW_SNACKBAR,
                    snackBarStatus: 'success',
                    snackBarDuration: 5000,
                    snackBarMessage: 'Student Pre-Assessment Submitted'
                });

                history.push('/admin/student')
                setTimeout(() => {
                    history.push(studentTypes.LIST_LINK)
                }, 50);


            }
        } else {
            dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 5000, snackBarMessage: 'Please select your preferred Subject with your Schedule and Payment Mode' });

        }

    }




    const onUpdate = () => {
        const enrollmentValues = {
            assessmentTemplateId: assessmentTemplate[0].AssessmentTemplateId,
            studentId: student[0].StudentId,
            assessmentDate: dateTime,
            enrollmentDate: dateTime,
            enrollmentStatusId: 'FV',
            paymentModeId: paymentModeId
        }

        //update enrollment
        onUpdateEnrollment(enrollment[0].EnrollmentId, enrollmentValues)
        console.log(studentEnrollmentSub)
        console.log(studentEnrollmentSubject)
        // delete studentSub

        for (let v = 0; v < studentEnrollmentSub.length; v++) {
            onDeleteStudentEnrollmentSub(studentEnrollmentSub[v].StudentEnrollmentSubjectsId)
        }


        //insert new studentSub
        for (let c = 0; c < studentEnrollmentSubject.length; c++) {
            onCreateStudentEnrollmentSub(studentEnrollmentSubject[c])

        }

        //delete fees
        for (let v = 0; v < enrollmentAcc.length; v++) {
            onDeleteStudentEnrollmentAddOns(enrollmentAcc[v].EnrollmentAccountId)
        }


        //insert new fees
        for (let v = 0; v < enrollmentAddOnsData.length; v++) {
            onCreateStudentEnrollmentAddOns(enrollmentAddOnsData[v])
        }

        dispatch({
            type: componentTypes.SHOW_SNACKBAR,
            snackBarStatus: 'success',
            snackBarDuration: 5000,
            snackBarMessage: 'Student Pre-Assessment Updated'
        });
        history.push('/admin/student')
        setTimeout(() => {
            history.push(`${studentTypes.LIST_LINK}`)
        }, 50);

    }

    const handleChangeRowsPerPage = (event) => {

    };
    const handleChangeKeyword = (event) => {

    };
    const handleChangeOnSearch = (event) => {

    };
    const onUpdateEnrollment = async (id, values) => {
        await updateEnrollment(id, values)
            .then(response => {
                if (response.success) {
                } else {

                }
            })
            .catch(error => {
                alert('enrollment did not update')
            })
    }



    const onCreateStudentEnrollmentSub = async (values) => {
        await createStudentEnrollmentSubjects(values)
            .then(response => {
                if (response.success) {
                    // setRerender(true)


                }
            })
            .catch(error => {
                alert('student enrollment subject did not saved')
            })
    }



    const onDeleteStudentEnrollmentSub = async (id) => {
        await deleteStudentEnrollmentSubjects(id)
            .then(response => {
                if (response.success) {


                }
            })
            .catch(error => {
            })
    }



    const onCreateStudentEnrollmentAddOns = async (values) => {
        await createEnrollmentAccountAddsOn(values)
            .then(response => {
                if (response.success) {
                }
            })
            .catch(error => {
                // alert('student enrollment add ons did not saved')
            })
    }




    const onDeleteStudentEnrollmentAddOns = async (id) => {
        await deleteEnrollmentAccountAddsOn(id)
            .then(response => {
                if (response.success) {
                }
            })
            .catch(error => {
                // alert('student enrollment add ons did not saved')
            })
    }






    const useEffectOperation = (operation, condition, setData, trigger, trigger2, trigger3) => {
        let dataStorer = []
        useEffect(() => {
            const execute = async () => {
                await operation()
                    .then(response => {
                        if (response.success) {
                            for (let i = 0; i < response.data.length; i++) {
                                if (eval(condition)) {
                                    dataStorer.push(response.data[i])
                                }
                            }
                            setData(dataStorer)
                        } else {
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        if (error) {
                            // alert("something went wrong")
                            console.log(error)
                        } else {
                        }
                    })
            }
            execute()

        }, [trigger, trigger2, trigger3])
    }

    const selectHandleChange = name => event => {
        setData({ ...data, [name]: event });
        if (name === "PaymentModeId") {
            props.paymentModeChangeHandler(event)
        }

        if (name === "SubjectScheduleId") {
            let arr = []

            arr.push(...selectedSubjectCode)
            for (let i = 0; i < subject.length; i++) {
                if (event === subject[i].SubjectId) {
                    if (arr.includes(subject[i].SubjectCode)) {

                    } else {
                        arr.push(subject[i].SubjectId)

                    }
                }
            }
            console.log(arr)
            props.subjectScheduleChangeHandler(event, arr)
        }


    }
    const handleChangePage = () => { return }
    const subjectCodeHandler = (data) => {
        console.log(data)
        setSelectedSubjectCode(data)

    }

    const scheduleCodeHandler = (data) => {
        console.log(data)
        setSelectedSchedCode(data)
    }
    const [fScan, setFScan] = useState(true)
    useEffect(() => {
        if (studentEnrollmentSubject !== undefined && fScan === true) {
            let arr = []

            arr.push(...selectedSubjectCode)
            for (let i = 0; i < studentEnrollmentSubject.length; i++) {

                arr.push(studentEnrollmentSubject[i].SubjectId)



            }
            console.log(arr)
            props.subjectScheduleChangeHandler(null, arr)
            setFScan(false)
        }

    }, [studentEnrollmentSubject])

    useEffect(() => {
        if (subject !== undefined && ready === false) {
            console.log(subject)

            let arr = []
            let arr2 = []
            for (let i = 0; i < subject.length; i++) {
                console.log(subject[i].SubjectCode)
                arr.push(subject[i].SubjectCode)
                arr2.push(subject[i].SubjectId)
            }
            setSelectedSubjectCode(arr)
            setExistingSelectedSub(arr2)
            setExistingSelectedSubCode(arr)
        }


        if (payment !== undefined && payment.length > 0) {
            let arr = []
            let totalPay = 0
            for (let i = 0; i < payment.length; i++) {
                arr.push({
                    paymentId: payment[i].PaymentId,
                    studentId: payment[i].PayorId,
                    sem: payment[i].SemesterId,
                    schoolYear: payment[i].SchoolYear,
                    yearSem: `${payment[i].SchoolYear}-${payment[i].SchoolYear + 1} / ${payment[i].SemesterId}`,
                    orNo: payment[i].ORNo,
                    orDate: payment[i].ORDate,
                    date: payment[i].DateCreated.slice(0, 10),
                    teller: payment[i].CreatedBy.slice(0, -17),
                    paymentType: payment[i].PaymentTenderTypeId,
                    amount: numberWithCommas(parseInt(payment[i].TotalAmount)),
                    totalFee: numberWithCommas(payment[i].TotalFee)



                })
                totalPay += parseInt(payment[i].TotalAmount)
            }
            setTotalPayment(totalPay)
            setPaymentRecieved(arr)
        }
    }, [])

    useEffect(() => {

        const execute = async (studentNo) => {
            await getStudentCampus(studentNo)
                .then(response => {
                    setIsWithBakAcct(response[0].IsWithBakAcct);
                    if (response.success) {

                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                    if (error) {
                        // alert("something went wrong")
                        //console.log(error)
                    } else {
                        //console.log(error)
                    }
                })
        }
        if (student !== undefined) {

            for (let i = 0; i < student.length; i++) {

                execute(student[i].StudentNo);

            }
        }
        // const [IsWithBakAcct, setIsWithBakAcct] = useState()



    }, [student])


    let conDefault = 'response.data'

    useEffectOperation(getModeOfPayment, conDefault, setModeOfPayment)
    useEffectOperation(getStudentCampus, conDefault, setIsWithBakAcct)


    // revision 4-07-22
    useEffect(() => {
        let arr = []
        let arr2 = []
        let arr3 = []
        let arr4 = []
        let assessmentTemplate
        if (studentEnrollmentSub.length > 0 && subject !== undefined && firstScan === true) {
            setIsExistedAcc(true)
            for (let i = 0; i < studentEnrollmentSub.length; i++) {
                for (let v = 0; v < subject.length; v++) {
                    if (subject[v].SubjectId === studentEnrollmentSub[i].SubjectId) {
                        arr.push(subject[v].SubjectId)
                        arr2.push(studentEnrollmentSub[i].SubjectScheduleDetailListId)
                        arr3.push(subject[v].SubjectCode)
                    }
                }

            }
            setExistingSelectedSched(arr2)
            setSelectedSchedCode(arr2)
            setExistingSelectedSub(arr)
            setSelectedSubjectCode(arr3)
            setExistingSelectedSubCode(arr3)
            setFirstScan(false)
        }
        if (studentEnrollmentSub.length > 0 && firstScan === true) {
            if (studentEnrollmentSub.length === 0 && uniqueSubjectScheduleDetail !== undefined && subject !== undefined) {
                let sub = []
                for (let i = 0; i < uniqueSubjectScheduleDetail.length; i++) {
                    for (let c = 0; c < subject.length; c++) {
                        if (uniqueSubjectScheduleDetail[i].SubjectId === subject[c].SubjectId) {
                            arr.push(subject[c].SubjectId)
                            // arr2.push(studentEnrollmentSub[i].SubjectScheduleDetailListId)
                            arr3.push(subject[c].SubjectCode)
                            // sub.push(uniqueSubjectScheduleDetail[i].SubjectCode)

                        }
                    }
                }
                setSelectedSchedCode([])
                setExistingSelectedSub(arr)
                setSelectedSubjectCode(arr3)
                setExistingSelectedSubCode(arr3)
                setFirstScan(false)
            }
        }


        if (enrollment !== undefined) {
            if (enrollment.length > 0) {
                assessmentTemplate = enrollment[0].AssessmentTemplateId

            }
        }
        setExistingAssessmentTemplate(assessmentTemplate)

    }, [studentEnrollmentSub, subject, enrollment, uniqueSubjectScheduleDetail])


    useEffect(() => {
        let referencessArr = []

        if (subjectScheduleList) {
            for (let i = 0; i < subjectScheduleList.length; i++) {

                referencessArr.push({ tableId: subjectScheduleList[i].SubjectScheduleId, code: subjectScheduleList[i].ReferenceName })

            }
            setData({ ...data, SubjectScheduleId: referencessArr[0].tableId })

            setSubSchedReferences(referencessArr)
        }
    }, [subjectScheduleList])

    //change this to payment mode
    useEffect(() => {
        let assessmentTemplateArr = []
        if (modeofPayment !== undefined) {
            console.log(modeofPayment)
            console.log(assessmentTemplate)
            for (let i = 0; i < modeofPayment.length; i++) {
                for (let v = 0; v < assessmentTemplate.length; v++) {

                    if (modeofPayment[i].PaymentModeId === assessmentTemplate[v].PaymentModeId) {
                        assessmentTemplateArr.push({ tableId: modeofPayment[i].PaymentModeId, code: modeofPayment[i].PaymentMode, paymentMode: modeofPayment[i].PaymentModeId })
                    }

                }
            }
            setAssessmentTemplateRef(assessmentTemplateArr)
        }
    }, [modeofPayment])




    useEffect(() => {
        let arr = []
        if (subjectScheduleDetail !== undefined) {
            for (let i = 0; i < subjectScheduleDetail.length; i++) {

                arr.push(subjectScheduleDetail[i])

            }

            setUniqueSubjectScheduleDetail(arr)
        }


    }, [data, subjectScheduleDetail])




    useEffect(() => {

        let total = 0
        if (subject !== undefined) {
            for (let i = 0; i < subject.length; i++) {
                for (let v = 0; v < selectedSubjectCode.length; v++) {
                    if (selectedSubjectCode[v] === subject[i].SubjectCode) {
                        total += parseInt(subject[i].Units)

                    }
                }
            }
        }

        setTotalUnit(total)

    }, [selectedSubjectCode])





    useEffect(() => {
        window.assessmentDetailAmount = []
        if (feeGroup !== undefined && assessmentTemplateDetail !== undefined) {

            const keys = ['FeeGroupId'],
                summarizedFeeGroup = feeGroup.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );


            for (let i = 0; i < summarizedFeeGroup.length; i++) {
                for (let v = 0; v < assessmentTemplateDetail.length; v++) {
                    if (summarizedFeeGroup[i].FeeGroupId === assessmentTemplateDetail[v].FeeGroupId) {
                        if (window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode]) {
                            window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode] = window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode] + parseInt(assessmentTemplateDetail[v].Amount)
                        } else {
                            window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode] = parseInt(assessmentTemplateDetail[v].Amount)
                        }
                    }
                }
            }
            setReady(true)





        }

    }, [feeGroup, assessmentTemplateDetail])

    console.log(feeGroup)
    console.log(fees)

    useEffect(() => {
        let arr = []
        if (feeGroup !== undefined && fees !== undefined && ready === true) {

            const keys = ['FeeGroupId'],
                summarizedFeeGroup = feeGroup.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );
            for (let i = 0; i < summarizedFeeGroup.length; i++) {
                if (summarizedFeeGroup[i].FeeCode !== 'TF') {
                    arr.push({
                        feeCode: summarizedFeeGroup[i].FeeCode,
                        description: summarizedFeeGroup[i].Description,
                        amount: window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode]

                    })
                } else {
                    if (totalUnit === 0) {
                        arr.push({
                            feeCode: summarizedFeeGroup[i].FeeCode,
                            description: summarizedFeeGroup[i].Description,
                            amount: window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode]

                        })
                    } else {
                        arr.push({
                            feeCode: summarizedFeeGroup[i].FeeCode,
                            description: summarizedFeeGroup[i].Description,
                            amount: window.assessmentDetailAmount[summarizedFeeGroup[i].FeeCode] * totalUnit

                        })
                    }

                }




            }
            setPaymentRef(arr)
        }

    }, [ready, feeGroup, totalUnit, fees, data])

    console.log(feeGroup)
    useEffect(() => {
        const percentageCalc = (percentageRate, price) => {
            let percentage = percentageRate / 100
            return percentage * price
        }
        if (paymentRef !== undefined) {
            let totalDis = 0
            let totalTuition = 0
            let total = 0
            for (let i = 0; i < paymentRef.length; i++) {
                total += paymentRef[i].amount
                if (paymentRef[i].feeCode === 'TF' && studentDiscount.length > 0) {
                    totalTuition = paymentRef[i].amount
                    if (studentDiscount[0].ApplyType === 'P') {
                        totalDis = percentageCalc(parseInt(studentDiscount[0].ApplyRate), paymentRef[i].amount)
                    } else if (studentDiscount[0].ApplyType === 'A') {
                        totalDis = parseInt(studentDiscount[0].ApplyRate)
                    }
                }
            }
            setTotalDiscount(totalDis)
            setTotalFee(total)
            setTotalTuition(totalTuition)
        }
    }, [paymentRef, studentDiscount])


    useEffect(() => {


        if (assessmentTemplateDetail !== undefined
            && fees !== undefined && totalUnit !== undefined && enrollment !== undefined && window.assessmentDetailAmount['TF'] !== undefined) {
            let obj = []
            obj = []
            for (let i = 0; i < assessmentTemplateDetail.length; i++) {
                if (assessmentTemplateDetail[i].FeeId === 89) {
                    if (totalUnit === 0) {

                        if (studentDiscount.length > 0) {
                            obj.push({
                                studentId: student[0].StudentId,
                                schoolYear: activeSy[0].SchoolYear,
                                semesterId: activeSem[0].SemesterId,
                                feeId: assessmentTemplateDetail[i].FeeId,
                                feeGroupId: 1,
                                amount: (window.assessmentDetailAmount['TF'] - totalDiscount).toString(),
                                enrollmentId: enrollment[0].EnrollmentId,
                                dateCreated: dateTime,
                                createdBy: auth.data.Username
                            })
                        } else {
                            obj.push({
                                studentId: student[0].StudentId,
                                schoolYear: activeSy[0].SchoolYear,
                                semesterId: activeSem[0].SemesterId,
                                feeId: assessmentTemplateDetail[i].FeeId,
                                feeGroupId: 1,
                                amount: window.assessmentDetailAmount['TF'].toString(),
                                enrollmentId: enrollment[0].EnrollmentId,
                                dateCreated: dateTime,
                                createdBy: auth.data.Username
                            })
                        }

                    } else {
                        if (totalDiscount !== undefined) {
                            obj.push({
                                studentId: student[0].StudentId,
                                schoolYear: activeSy[0].SchoolYear,
                                semesterId: activeSem[0].SemesterId,
                                feeId: assessmentTemplateDetail[i].FeeId,
                                feeGroupId: assessmentTemplateDetail[i].FeeGroupId,
                                amount: (window.assessmentDetailAmount['TF'] * totalUnit).toString(),
                                enrollmentId: enrollment[0].EnrollmentId,
                                dateCreated: dateTime,
                                createdBy: auth.data.Username

                            })
                        } else {
                            obj.push({
                                studentId: student[0].StudentId,
                                schoolYear: activeSy[0].SchoolYear,
                                semesterId: activeSem[0].SemesterId,
                                feeId: assessmentTemplateDetail[i].FeeId,
                                feeGroupId: assessmentTemplateDetail[i].FeeGroupId,
                                amount: (window.assessmentDetailAmount['TF'] * totalUnit).toString(),
                                enrollmentId: enrollment[0].EnrollmentId,
                                dateCreated: dateTime,
                                createdBy: auth.data.Username

                            })
                        }

                    }

                } else if (assessmentTemplateDetail[i].FeeId !== 89) {


                    obj.push({
                        studentId: student[0].StudentId,
                        schoolYear: activeSy[0].SchoolYear,
                        semesterId: activeSem[0].SemesterId,
                        feeId: assessmentTemplateDetail[i].FeeId,
                        feeGroupId: assessmentTemplateDetail[i].FeeGroupId,
                        amount: (Math.round(parseInt(assessmentTemplateDetail[i].Amount))).toString(),
                        enrollmentId: enrollment[0].EnrollmentId,
                        dateCreated: dateTime,
                        createdBy: auth.data.Username

                    })
                }
            }
            const keys = ['feeId'],
                filteredAcc = obj.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );
            setEnrollmentAddOnsData(filteredAcc)
        }
    }, [studentDiscount, assessmentTemplateDetail, fees, totalDiscount, paymentRef])


    useEffect(() => {
        const percentageCalc = (percentageRate, price) => {
            let percentage = percentageRate / 100
            return percentage * price
        }
        if (studentDiscount !== undefined && totalTuition !== undefined) {
            let arr = []
            for (let i = 0; i < studentDiscount.length; i++) {
                if (studentDiscount[i].ApplyType === 'P') {
                    arr.push({ ...studentDiscount[i], discount: percentageCalc(parseInt(studentDiscount[i].ApplyRate), totalTuition) })

                } else if (studentDiscount[i].ApplyType === 'A') {
                    console.log(parseInt(studentDiscount[i].ApplyRate))
                    arr.push({ ...studentDiscount[i], discount: parseInt(studentDiscount[i].ApplyRate) })

                }
            }
            console.log(arr)
            setDiscountTable(arr)
        }

    }, [studentDiscount, totalTuition])



    useEffect(() => {
        if (subjectScheduleDetail !== undefined) {
            let arr = []
            for (let c = 0; c < subjectScheduleDetail.length; c++) {
                for (let v = 0; v < subjectScheduleDetailList.length; v++) {
                    for (let r = 0; r < selectedSchedCode.length; r++) {
                        if (selectedSchedCode[r] === subjectScheduleDetailList[v].SubjectScheduleDetailListId) {
                            arr.push({
                                subSchedDetailId: subjectScheduleDetail[c].SubjectScheduleDetailId,
                                subSchedDetailListId: selectedSchedCode[r],
                                subjectId: subjectScheduleDetail[c].SubjectId
                            })
                        }
                    }
                }
            }
            const keys = ['subSchedDetailId'],
                filteredSubList = arr.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );
            setSelectedSubList(filteredSubList)
        }
    }, [subjectScheduleDetailList, selectedSchedCode, isExistedAcc, subjectScheduleDetail])

    console.log(selectedSchedCode)
    useEffect(() => {
        if (selectedSubjectCode !== undefined && selectedSubList !== undefined
            && enrollment !== undefined && activeSem !== undefined
            && activeSy !== undefined && subjectScheduleDetail !== undefined) {
            let arr = []
            for (let c = 0; c < selectedSubjectCode.length; c++) {
                for (let r = 0; r < subjectScheduleDetail.length; r++) {
                    for (let v = 0; v < selectedSubList.length; v++) {
                        if (subjectScheduleDetail[r].SubjectCode === selectedSubjectCode[c] && selectedSubList[v].subjectId === subjectScheduleDetail[r].SubjectId) {
                            arr.push({
                                studentId: enrollment[0].StudentId,
                                subjectId: subjectScheduleDetail[r].SubjectId,
                                semesterId: activeSem[0].SemesterId,
                                schoolYear: activeSy[0].SchoolYear,
                                createdBy: auth.data.Username,
                                isActive: 1,
                                subjectScheduleDetailListId: selectedSubList[v].subSchedDetailListId,
                                subjectScheduleId: data.SubjectScheduleId,
                            })


                        }
                    }



                }
            }
            setStudentEnrollmentSubject(arr)
        }

    }, [selectedSubjectCode, enrollment, activeSem, activeSy, subjectScheduleDetail, selectedSubList, isExistedAcc])


    useEffect(() => {
        if (interest !== undefined && totalFee !== undefined) {
            let interestDec = parseInt(interest) / 100
            let principal = totalFee
            let time = 16 / 52
            let step1 = principal * interestDec
            let totalInterestFee = step1 * time

            console.log(interestDec)
            console.log(principal)
            console.log(time)
            console.log(totalInterestFee)
            setTotalInterest(parseInt(totalInterestFee))

        }
    }, [interest, totalFee])

    useEffect(() => {

        if (assessmentTemplate !== undefined) {
            setChosenPaymentMode(assessmentTemplate[0].PaymentMode)
        }

    }, [assessmentTemplate])

    useEffect(() => {
        if (enrollment !== undefined) {
            if (enrollment.length > 0) {
                if (enrollment[0].EnrollmentStatusId === 'E' || enrollment[0].EnrollmentStatusId === 'PV' || enrollment[0].EnrollmentStatusId === 'A') {
                    setIsProcessed(true)
                }
            }

        }
    }, [enrollment])


    useEffect(() => {
        if (modeofPayment !== undefined && data !== undefined && assessmentTemplateRef !== undefined) {
            let interest
            let modeOfPayment
            for (let i = 0; i < modeofPayment.length; i++) {
                for (let v = 0; v < assessmentTemplateRef.length; v++) {
                    if (data.PaymentModeId === assessmentTemplateRef[v].tableId) {
                        if (assessmentTemplateRef[v].paymentMode === modeofPayment[i].PaymentModeId) {
                            interest = modeofPayment[i].InterestPercentage
                            modeOfPayment = modeofPayment[i].PaymentModeId
                        }

                    }
                }

            }
            console.log(interest)
            setInterest(interest)
            setPaymentModeId(modeOfPayment)
        }
    }, [data, modeofPayment, assessmentTemplateRef])

    useEffect(() => {
        if (subjectScheduleDetailList !== undefined) {
            let arr = []
            for (let i = 0; i < subjectScheduleDetailList.length; i++) {
                arr.push(subjectScheduleDetailList[i].SubjectScheduleDetailListId)
            }

            console.log(arr)
            setSelectedSchedCode(arr)
        }
    }, [subjectScheduleDetailList])

    useEffect(() => {
        if (existingAssessmentTemplate !== undefined && assessmentTemplate !== undefined) {
            for (let i = 0; i < assessmentTemplate.length; i++) {
                if (assessmentTemplate[i].AssessmentTemplateId === existingAssessmentTemplate) {
                    setExistingPaymentModeId(assessmentTemplate[i].PaymentModeId)

                }
            }

        }
    }, [existingAssessmentTemplate])

    useEffect(() => {
        if (existingPaymentModeId !== undefined) {
            setData({ ...data, PaymentModeId: existingPaymentModeId })
        }
        console.log(data)
        console.log(existingPaymentModeId)
    }, [existingPaymentModeId])




    const imSelectDropdownReference = () => {

        return <IMSelect
            data={subSchedReferences}
            onHandleChange={selectHandleChange('SubjectScheduleId')}
            refClassContainer=""
            name="SubjectScheduleId"
            isRequired={true}
            withLabel={true}
            label="Choose References"
            placeHolder="References"
            forwardRef={setValue}
            selectedId={data.SubjectScheduleId === null ? '' : data.SubjectScheduleId}
            refClassName={``}
            withDescription={false}
            // description={`Please select your gender.`}
            refDisabled={true}
            refIsStatic={false}
            refStaticData={[

            ]
            }
            field={{
                tableId: 'tableId',
                display: 'code'
            }}

        />


    }

    const imSelectDropdownPaymentMode = () => {
        console.log(existingAssessmentTemplate)
        return <IMSelect
            data={assessmentTemplateRef}
            onHandleChange={selectHandleChange('PaymentModeId')}
            refClassContainer=""
            name="PaymentModeId"
            isRequired={true}
            withLabel={true}
            label="Choose Payment Mode"
            placeHolder="Payment Mode"
            forwardRef={setValue}
            selectedId={data.PaymentModeId === null ? '' : data.PaymentModeId}
            refClassName={``}
            withDescription={false}
            // description={`Please select your gender.`}
            refDisabled={true}
            refIsStatic={false}
            refStaticData={[

            ]
            }
            field={{
                tableId: 'tableId',
                display: 'code'
            }}

        />

    }

    const childColumns = [
        { id: 'RowCnt', type: 'index', label: '', align: 'center', minWidth: '15px', withSorting: false, hidden: false, disablePadding: false },
        { id: 'TimeStartDesc', type: 'time', label: 'Time Start', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'TimeEndDesc', type: 'time', label: 'Time End', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'DayCode', type: 'string', label: 'Day Code', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'Room', type: 'string', label: 'Room', align: 'left', withSorting: true, hidden: false, disablePadding: false },
    ]

    const columns = [

        { id: 'Subject', label: 'Subjects', align: 'left', withSorting: false, hidden: false, disablePadding: false },
        { id: 'ClassCode', label: 'Class Code', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'SubjectCode', label: 'Subject Code', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'Action', type: 'action', label: 'Select Subject', align: 'center', withSorting: false, minWidth: '120px', hidden: false, disablePadding: false }


    ]

    const columnsPayment = [

        { id: 'RowCnt', label: '#', align: 'left', withSorting: false, hidden: false, disablePadding: false },
        { id: 'feeCode', label: 'Fee Code', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'description', label: 'Description', align: 'left', withSorting: true, hidden: false, disablePadding: false },
        { id: 'amount', type: 'Amount', label: 'Select Subject', align: 'center', withSorting: false, minWidth: '120px', hidden: false, disablePadding: false }


    ]

    const columnsDiscount = [

        { id: 'RowCnt', label: '#', align: 'left', withSorting: false, hidden: false, disablePadding: false },
        { id: 'Scholarship', label: 'Scholarship', align: 'right', withSorting: true, hidden: false, disablePadding: false },
        { id: 'discount', label: 'Discount Fee', align: 'right', withSorting: true, hidden: false, disablePadding: false },


    ]

    const columnsRecievedPayments = [
        { id: 'RowCnt', label: '#', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'yearSem', label: 'S.Y / Semester', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'orNo', label: 'OR Number', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'date', label: 'Date', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'teller', label: 'Teller', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'paymentType', label: 'Type', align: 'center', withSorting: true, hidden: false, disablePadding: false },
        { id: 'amount', label: 'Amount', align: 'center', withSorting: true, hidden: false, disablePadding: false },

    ]
    const tableProps = {
        recordId: 'SubjectId',
        recordIdMore: 'SubjectScheduleDetailListId',
        sortField: '',
        columns: columns,
        childColumns: childColumns,
        rows: uniqueSubjectScheduleDetail,
        totalRecords: uniqueSubjectScheduleDetail.length,
        withMoreButton: false,
        childWithMoreButton: false,
        withFooter: true,
        tableType: 'child',
        // parentId: id,
        childArray: 'schedules',
        tableTitle: 'List of Subjects',
        onSearch: onSearch,
        keyword: keyword,
        lastUpdateId: updateId,
        // onIsLastUpdate: isLastUpdate,
        onPage: page,
        onRowsPerPage: rowsPerPage,
        onRowsPerPageOptions: [10, 25, 50, 100],
        onTypes: studentTypes,
        onHandleChangePage: handleChangePage,
        // onHandleChangeRowsPerPage: handleChangeRowsPerPage,
        // onHandleChangeKeyword: handleChangeKeyword,
        // onHandleChangeOnSearch: handleChangeOnSearch
    }

    const tablePropsFeeGroup = {
        recordId: 'feeCode',
        sortField: '',
        columns: columnsPayment,
        rows: paymentRef,
        // totalRecords: paymentRef.length,
        withMoreButton: true,
        childWithMoreButton: true,
        withFooter: true,
        tableType: 'parent',
        parentId: null,
        tableTitle: 'Fees',
        onSearch: onSearch,
        keyword: keyword,
        lastUpdateId: updateId,
        // onIsLastUpdate: isLastUpdate,
        onPage: page,
        onRowsPerPage: rowsPerPage,
        onRowsPerPageOptions: [10, 25, 50, 100],
        onTypes: studentTypes,
        onHandleChangePage: handleChangePage,
        // onHandleChangeRowsPerPage: handleChangeRowsPerPage,
        // onHandleChangeKeyword: handleChangeKeyword,
        // onHandleChangeOnSearch: handleChangeOnSearch
    }


    const tablePropsScholarships = {
        recordId: 'StudentDiscountId',
        sortField: '',
        columns: columnsDiscount,
        rows: discountTable,
        // totalRecords: paymentRef.length,
        withMoreButton: true,
        childWithMoreButton: true,
        withFooter: true,
        tableType: 'parent',
        parentId: null,
        tableTitle: 'Scholarships',
        onSearch: onSearch,
        keyword: keyword,
        lastUpdateId: updateId,
        // onIsLastUpdate: isLastUpdate,
        onPage: page,
        onRowsPerPage: rowsPerPage,
        onRowsPerPageOptions: [10, 25, 50, 100],
        onTypes: studentTypes,
        onHandleChangePage: handleChangePage,
        // onHandleChangeRowsPerPage: handleChangeRowsPerPage,
        // onHandleChangeKeyword: handleChangeKeyword,
        // onHandleChangeOnSearch: handleChangeOnSearch
    }

    const tablePropsPaymentRecieved = {
        recordId: 'paymentId',
        sortField: '',
        columns: columnsRecievedPayments,
        rows: paymentRecieved,
        totalRecords: 9,
        withMoreButton: true,
        childWithMoreButton: true,
        withFooter: true,
        tableType: 'parent',
        parentId: null,
        tableTitle: 'Payment History    ',
        withTableTitle: false,
        onSearch: onSearch,
        keyword: keyword,
        // lastUpdateId: updateId,
        onIsLastUpdate: true,
        onPage: page,
        onRowsPerPage: 9,
        onRowsPerPageOptions: [10, 25, 50, 100],
        onTypes: studentTypes,
        onHandleChangePage: handleChangePage,
        onHandleChangeRowsPerPage: handleChangeRowsPerPage,
        onHandleChangeKeyword: handleChangeKeyword,
        onHandleChangeOnSearch: handleChangeOnSearch
    }
    console.log(student)
    console.log(enrollment)
    console.log(studentInfo)
    console.log(subject)
    console.log(assessmentTemplateRef)
    console.log(paymentRef)
    console.log(subjectScheduleList)
    console.log(selectedSubjectCode)
    console.log(assessmentTemplate)


    return (
        <>
            {student && enrollment && studentInfo !== undefined && subject && assessmentTemplateRef
                && paymentRef && subjectScheduleList && selectedSubjectCode !== undefined
                && assessmentTemplate !== undefined
                ?
                <>
                    <main className="">
                        <nav>
                            <div className="nav nav-pills nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Assessment Form</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Balance</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Payment History</a>
                                <a className="nav-item nav-link" id="nav-history-tab" data-toggle="tab" href="#nav-history" role="tab" aria-controls="nav-history" aria-selected="false">Assessment History</a>

                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                <div className="container">
                                    <h4 className="card-header">
                                        <img style={{ width: '50px' }} src={FaithLogo} />
                                        &nbsp;  Student Assessment Form</h4>

                                    <div className="row  container ">
                                        <div className="col-12 col-lg-4 p-5  border-0">
                                            <div className="card-header ">
                                                <h2 className="">{`${studentInfo[0].LastName}, ${studentInfo[0].FirstName} ${studentInfo[0].MiddleName}`}</h2>
                                                <p className="my-0 lead ">{`SY ${enrollment[0].SchoolYear} - ${parseInt(enrollment[0].SchoolYear) + 1}`}</p>
                                                <p className="my-0 lead">{enrollment[0].SemesterId === '1S' ? 'First Semester' : ''}</p>
                                                <p className="my-0 lead">{enrollment[0].SemesterId === '2S' ? 'Second Semester' : ''}</p>
                                                <p className="my-0 lead">{enrollment[0].SemesterId === 'SM' ? 'Summer' : ''}</p>

                                                <p className="my-0 lead ">{`${student[0].StudentNo}`}</p>
                                                {/* <h2 className="card-header  text-dark p-5 ">Subject Selection</h2> */}
                                                {enrollment[0].EnrollmentStatusId === 'V' || enrollment[0].EnrollmentStatusId === 'PV' ? <div className="input-group mt-5">
                                                    <div className="input-group-prepend ">
                                                        <span className="input-group-text" id="basic-addon1">Subject Reference Name</span>
                                                    </div>
                                                    <input value={subjectScheduleList[0].ReferenceName} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                </div>
                                                    : <div className='my-5 ' >{imSelectDropdownReference()}</div>
                                                }

                                                {enrollment[0].EnrollmentStatusId === 'V' || enrollment[0].EnrollmentStatusId === 'PV' && chosenPaymentMode !== undefined ?
                                                    <div className="input-group mt-5 ">
                                                        <div className="input-group-prepend ">
                                                            <span className="input-group-text" id="basic-addon1">Payment Mode</span>
                                                        </div>
                                                        <input value={chosenPaymentMode} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    : <div className=''>{imSelectDropdownPaymentMode()}</div>
                                                }

                                                <div className="row  mt-5 ">

                                                    {enrollment[0].EnrollmentStatusId === 'DR'
                                                        ?
                                                        <button onClick={() => { onSubmit() }} className="mt-5 btn btn-sm btn-primary btn-block">Submit Assessment</button>
                                                        : ''}
                                                    {enrollment[0].EnrollmentStatusId === 'FV'
                                                        ?
                                                        <button onClick={() => { onUpdate() }} className="btn btn-sm btn-secondary btn-block    ">Resubmit Assessment</button>
                                                        : ''}

                                                    {enrollment[0].EnrollmentStatusId === 'V'
                                                        ? <div style={{ 'backgroundColor': 'rgba(34, 255, 145, 0.2)' }} className="alert" role="alert">
                                                            Your Assessment is Already Validated
                                                        </div>
                                                        : ''}
                                                    {enrollment[0].EnrollmentStatusId === 'A'
                                                        ? <div style={{ 'backgroundColor': 'rgba(34, 255, 145, 0.2)' }} className="alert" role="alert">
                                                            Your Assessment is Assessed
                                                        </div>
                                                        : ''}
                                                    {enrollment[0].EnrollmentStatusId === 'PV'
                                                        ? <div style={{ 'backgroundColor': 'rgba(34, 255, 145, 0.2)' }} className="alert" role="alert">
                                                            Your Assessment is Payment Validated
                                                        </div>
                                                        : ''}

                                                    {enrollment[0].EnrollmentStatusId === 'E'
                                                        ? <div style={{ 'backgroundColor': 'rgba(34, 255, 145, 0.2)' }} className="alert w-100 text-center" role="alert">
                                                            You are Enrolled
                                                        </div>
                                                        : ''}

                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-12 col-lg-8 ">

                                            <div className=" card container border-0  mb-5 p-5">

                                                <IMCollapsibleTableStudent
                                                    tableProps={tableProps}
                                                    subjectCodeHandler={subjectCodeHandler}
                                                    scheduleCodeHandler={scheduleCodeHandler}
                                                    subSchedDetailList={subjectScheduleDetailList}
                                                    selectedSub={existingSelectedSub}
                                                    selectedSched={existingSelectedSched}
                                                    selectedSubCode={existingSelectedSubCode}
                                                    isExistedAcc={isExistedAcc}
                                                    isProcessed={isProcessed}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                {/* hidden - vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*/}
                                <div className="card p-5">
                                    <div className=" row pb-5">
                                        <div className="col-6">
                                            <IMTableStudentAssessment
                                                tableProps={tablePropsFeeGroup}
                                            />

                                            {
                                                discountTable !== undefined
                                                    ?
                                                    <IMTableStudentAssessment tableProps={tablePropsScholarships} />
                                                    :
                                                    ''
                                            }
                                        </div>
                                        <div className="col-6 border-left border-secondary">

                                            <div className="card p-5 bg-secondary mt-5">
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-dark font-weight-bold">Total Fee: </p>

                                                    </div>
                                                    <div className="col">

                                                        <h6 className="mb-0 text-right pr-5 mr-5 text-dark font-weight-bold"> ₱ {numberWithCommas(parseInt(totalFee))}</h6>
                                                    </div>
                                                </div>

                                                {interest !== undefined && interest !== 0 ?
                                                    <div className="row">
                                                        <div className="col">
                                                            <p className="text-dark font-weight-bold">Interest: </p>

                                                        </div>
                                                        <div className="col">

                                                            <h6 className="mb-0 text-right pr-5 mr-5 text-dark font-weight-bold">₱ {numberWithCommas(totalInterest)}</h6>
                                                        </div>
                                                    </div>
                                                    : ''

                                                }
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-dark font-weight-bold">Tuition Fee Discounts: </p>

                                                    </div>
                                                    <div className="col">

                                                        <h6 className="mb-0 text-right pr-5 mr-5 text-dark font-weight-bold"> - ₱{totalDiscount ? numberWithCommas(totalDiscount) : 0}</h6>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-dark font-weight-bold   ">Total Tuition Fee: </p>

                                                    </div>
                                                    <div className="col">

                                                        <h6 className="mb-0 text-right pr-5 mr-5 text-dark font-weight-bold"> ₱{totalDiscount ? numberWithCommas(totalFee - totalDiscount + parseInt(totalInterest)) : numberWithCommas(parseInt(parseInt(totalFee) + parseInt(totalInterest)))}</h6>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card mt-5 p-4 bg-info">

                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-light font-weight-bold">Total Payment: </p>

                                                    </div>
                                                    <div className="col">

                                                        <h6 className="mb-0 text-right pr-5 mr-5 text-light font-weight-bold"> ₱{numberWithCommas(totalPayment)}</h6>
                                                    </div>
                                                    <hr />

                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-light font-weight-bold">Total Tuition Fee: </p>

                                                    </div>
                                                    <div className="col">

                                                        <h6 className="mb-0 text-right pr-5 mr-5 text-light font-weight-bold"> ₱{totalDiscount ? numberWithCommas(totalFee - totalDiscount + parseInt(totalInterest)) : numberWithCommas(parseInt(parseInt(totalFee) + parseInt(totalInterest)))}</h6>
                                                    </div>
                                                    <hr />

                                                </div>
                                                <div className="row border-top border-light p-5">
                                                    <div className="col">
                                                        <p className="text-light font-weight-bold">Remaining Balance: </p>

                                                    </div>
                                                    <div className="col">

                                                        <h6 className="mb-0 text-right pr-5 mr-5 text-light font-weight-bold"> ₱{numberWithCommas(totalFee - totalDiscount + parseInt(totalInterest) - totalPayment)}</h6>
                                                    </div>
                                                    <hr />

                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* hidden - ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/}

                            </div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

                                <div className="card p-5">
                                    {payment !== undefined && payment.length > 0 ?
                                        <IMTableAssessmentFee tableProps={tablePropsPaymentRecieved} />

                                        :

                                        <p className="lead alert-secondary p-5 text-center">Still No Payment to show</p>

                                    }
                                </div>



                            </div>
                            {/* <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">

                                <div className="card p-5">
                                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                        {allEnrollmentRecord !== undefined ?

                                            allEnrollmentRecord.map(data => {

                                                return (
                                                    <>
                                                        <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">{data.SchoolYear}</a>



                                                    </>
                                                )

                                            }) : ''}
                                    </div>

                                </div>



                            </div> */}
                        </div>
                    </main>

                </>

                :

                <>
                    {keepLoading === true
                        ?
                        <Loading />
                        :
                        <NoEnroll />
                    }
                </>
            }

        </>
    )
}

