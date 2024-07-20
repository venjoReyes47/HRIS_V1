import {
    getStudentInfo, getStudent, getSem, getSchoolYear, getEnrollment, getSubjectSchedule, getStudentEnrollmentSubjects, getSubjectScheduleDetail,
    getSubjects, getSubSchedDetailList, getEnrollmentAccAddOn, getStudentDiscount, getAssessmentTemplate, getFees, getAssessmentTemplateDetail,
    getFeeGroup, getPayment
} from "./__hooks__"
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts/useAppContext";
import { useParams } from "react-router-dom";

import ReAssessment from "./ReAssessment";
import Loading from "../../../../../_metronic/layout/components/custom/forms/Loading";
import NoDocuments from "../../../../../_metronic/layout/components/custom/forms/NoDocuments";

export default function Assessment(props) {
    const { state: { auth } } = useAppContext()
    console.log(auth.data)

    const { id } = useParams()
    const [studentInfo, setStudentInfo] = useState()
    const [activeSy, setActiveSy] = useState()
    const [activeSem, setActiveSem] = useState()
    const [student, setStudent] = useState()
    const [enrollment, setEnrollment] = useState()
    const [subjectSchedule, setSubjectSchedule] = useState()
    const [studentEnrollmentSubjects, setStudentEnrollmentSubjects] = useState()
    const [subjectScheduleDetail, setSubjectScheduleDetail] = useState()
    const [subject, setSubject] = useState()
    const [subjectScheduleDetailList, setSubjectScheduleDetailList] = useState()
    const [enrollmentAcc, setEnrollmentAcc] = useState([])
    const [studentDiscount, setStudentDiscount] = useState()
    const [assessmentTemplate, setAssessmentTemplate] = useState()
    const [assessmentTemplateDetail, setAssessmentTemplateDetail] = useState()
    const [fees, setFees] = useState([])
    const [feeGroup, setFeeGroup] = useState([])
    const [paymentModeId, setPaymentModeId] = useState()
    const [subjectCode, setSubjectCode] = useState([])
    const [subjectSchedId, setSubjectSchedId] = useState()
    const [keepLoading, setKeepLoading] = useState(true)
    const [payment, setPayment] = useState()
    const [allEnrollmentRecords, setAllEnrollmentRecords] = useState()
    const [studentEnrollmentRecords, setStudentEnrollmentRecords] = useState()



    const paymentModeChangeHandler = (paymentMode) => {
        console.log(paymentMode)
        setPaymentModeId(paymentMode)
    }


    const subjectScheduleChangeHandler = (subjectSchedule, subCode) => {
        setSubjectSchedId(subjectSchedule)
        setSubjectCode(subCode)
    }



    const Query = (operation, condition, setData) => {
        let obj = eval("(" + condition + ")");
        console.log(obj)
        const execute = async () => {
            await operation(obj)
                .then(response => {
                    if (response.success) {
                        setData(response.data)
                    }
                    return
                })
                .catch(error => {
                    if (error) {
                        return error
                        // alert("something went wrong")
                    } else {
                        return
                    }
                })
        }

        execute()
    }

    const studentInfoQuery = "{ where: `WHERE student_infos.StudentInfoId = ${student[0].StudentInfoId}` }"
    const studentQuery = " { where: `WHERE s.StudentKey = '${auth.data.UserKey}' ` }"
    const getActiveQuery = "{ where: 'WHERE IsActive = 1' }"
    const getEnrollmentQuery = "{ where: `WHERE e.StudentId = ${student[0].StudentId} AND e.SemesterId = '${activeSem[0].SemesterId}' AND e.SchoolYear = ${activeSy[0].SchoolYear}` }"
    const getSubSchedQuery = "{where: `WHERE sched.CourseId = ${enrollment[0].CourseId} AND sched.SemesterId = '${activeSem[0].SemesterId}' AND sched.SchoolYear = ${activeSy[0].SchoolYear}`  }"
    const getStudentEnrollmentSubjectsQuery = "{where: `WHERE student_enrollment_subjects.StudentId = ${enrollment[0].StudentId} AND student_enrollment_subjects.SemesterId = '${activeSem[0].SemesterId}' AND student_enrollment_subjects.SchoolYear = ${activeSy[0].SchoolYear}`}"
    const getSubjectScheduleQuery = "{where: `WHERE SubjectScheduleId = ${subjectSchedId} AND SemesterId = '${activeSem[0].SemesterId}' AND SchoolYear = ${activeSy[0].SchoolYear} `}"
    const getSubjectScheduleChangeQuery = "{where: `WHERE SubjectCode IN (${subjectCode.map(d => `'${d}'`)}) OR SubjectScheduleId = ${subjectSchedId} AND SemesterId = '${activeSem[0].SemesterId}' AND SchoolYear = ${activeSy[0].SchoolYear} `}"
    const getSubjectQuery = "{where: `WHERE t1.SubjectId IN (${subjectScheduleDetail.map(d => { return d.SubjectId})})`}"
    const getSubjectExistingQuery = "{where: `WHERE t1.SubjectId IN (${studentEnrollmentSubjects.map(d => { return d.SubjectId})})`}"
    const getPaymentQuery = "{ where: `WHERE payments.PayorId = ${student[0].StudentId} AND payments.SemesterId = '${activeSem[0].SemesterId}'  AND payments.SchoolYear = ${activeSy[0].SchoolYear}` }"
    const getSubjectScheduleDetailListQuery = "{where: `WHERE SubjectScheduleDetailId IN (${subjectScheduleDetail.map(d => { return d.SubjectScheduleDetailId})})`}"
    const getEnrollmentAccQuery = "{ where: `WHERE StudentId = ${student[0].StudentId} AND SemesterId = '${activeSem[0].SemesterId}' AND SchoolYear = ${activeSy[0].SchoolYear}` }"
    const getStudentDiscountQuery = " { where: `WHERE StudentId = ${enrollment[0].StudentId}` }"
    const getAssessmentTemplateQuery = "{ where: `WHERE SchoolYear = ${activeSy[0].SchoolYear} AND SemesterId = '${activeSem[0].SemesterId}' AND CourseId = ${enrollment[0].CourseId} AND YearLevelId = ${enrollment[0].YearLevelId}` }"
    const getAssessmentTemplateChangeQuery = "{ where: `WHERE SchoolYear = ${activeSy[0].SchoolYear} AND SemesterId = '${activeSem[0].SemesterId}' AND CourseId = ${enrollment[0].CourseId} AND YearLevelId = ${enrollment[0].YearLevelId} AND PaymentModeId = ${paymentModeId}` }"
    const getAssessmentTemplateDetailQuery = "{where: `WHERE AssessmentTemplateId = ${assessmentTemplate[0].AssessmentTemplateId}`}"
    const getFeesQuery = "{where: `WHERE FeeId IN (${assessmentTemplateDetail.map(d => { return d.FeeId})}) `}"
    const getFeeGroupQuery = "{ where: `WHERE feegroups.FeeGroupId IN (${fees.map(d => { return d.FeeGroupId })})`}"
    const getAllEnrolled = "{where: `WHERE e.StudentId = ${student[0].StudentId}`}"

    useEffect(() => {

        // student
        Query(getStudent, studentQuery, setStudent)

    }, [])
    useEffect(() => {
        // studentInfo
        if (student !== undefined && student.length > 0) {
            console.log(student)
            Query(getStudentInfo, studentInfoQuery, setStudentInfo)
            // all enrollment
            Query(getEnrollment, getAllEnrolled, setAllEnrollmentRecords)
        }

    }, [student])


    useEffect(() => {
        //active sem
        Query(getSem, getActiveQuery, setActiveSem)
    }, [])

    useEffect(() => {
        //active sy
        Query(getSchoolYear, getActiveQuery, setActiveSy)
    }, [])




    useEffect(() => {
        if (student !== undefined && student.length > 0 && activeSem !== undefined && activeSy !== undefined) {
            // enrollment
            Query(getEnrollment, getEnrollmentQuery, setEnrollment)
            // enrollment account
            Query(getEnrollmentAccAddOn, getEnrollmentAccQuery, setEnrollmentAcc)
            // payment
            Query(getPayment, getPaymentQuery, setPayment)
        }
    }, [student, activeSem, activeSy])



    useEffect(() => {
        if (enrollment !== undefined && activeSem !== undefined && activeSy !== undefined) {
            if (enrollment.length > 0) {

                // subject schedule
                Query(getSubjectSchedule, getSubSchedQuery, setSubjectSchedule)
                // student enrollment sub
                Query(getStudentEnrollmentSubjects, getStudentEnrollmentSubjectsQuery, setStudentEnrollmentSubjects)
                // student Discount
                Query(getStudentDiscount, getStudentDiscountQuery, setStudentDiscount)
                // assessment template
                if (paymentModeId !== undefined) {
                    // getAssessmentTemplateChangeQuery
                    Query(getAssessmentTemplate, getAssessmentTemplateChangeQuery, setAssessmentTemplate)
                } else {
                    console.log(enrollment[0].CourseId)
                    console.log(enrollment[0].YearLevelId)
                    console.log(enrollment[0].SchoolYear)
                    console.log(enrollment[0].SemesterId)



                    Query(getAssessmentTemplate, getAssessmentTemplateQuery, setAssessmentTemplate)

                }

            }



        }
    }, [enrollment, activeSem, activeSy, paymentModeId])
    useEffect(() => {

        if (subjectSchedule !== undefined && activeSem !== undefined && activeSy !== undefined) {
            if (subjectSchedId === undefined && subjectSchedule.length > 0) {

                setSubjectSchedId(subjectSchedule[0].SubjectScheduleId)
            } else {
                if (subjectCode === undefined || subjectCode.length === 0) {
                    //subject schedule detail
                    Query(getSubjectScheduleDetail, getSubjectScheduleQuery, setSubjectScheduleDetail)
                } else {
                    Query(getSubjectScheduleDetail, getSubjectScheduleChangeQuery, setSubjectScheduleDetail)

                }
            }


        }
    }, [subjectSchedule, activeSy, activeSem, subjectCode, subjectSchedId])


    useEffect(() => {
        if (subjectScheduleDetail !== undefined && subjectScheduleDetail.length > 0) {

            if (studentEnrollmentSubjects === undefined || studentEnrollmentSubjects.length === 0) {
                // subject
                Query(getSubjects, getSubjectQuery, setSubject)
            } else {
                // subject
                Query(getSubjects, getSubjectExistingQuery, setSubject)
            }

            // subject schedule detail list
            Query(getSubSchedDetailList, getSubjectScheduleDetailListQuery, setSubjectScheduleDetailList)



        }
    }, [subjectScheduleDetail, studentEnrollmentSubjects])
    useEffect(() => {
        if (assessmentTemplate !== undefined && assessmentTemplate.length > 0) {
            // assessment template detail
            Query(getAssessmentTemplateDetail, getAssessmentTemplateDetailQuery, setAssessmentTemplateDetail)

        }
    }, [assessmentTemplate])
    useEffect(() => {
        if (assessmentTemplateDetail !== undefined) {
            Query(getFees, getFeesQuery, setFees)

        }
    }, [assessmentTemplateDetail])

    useEffect(() => {
        if (fees !== undefined) {
            Query(getFeeGroup, getFeeGroupQuery, setFeeGroup)

        }
    }, [fees])
    console.log(activeSem)
    console.log(activeSy)
    console.log(enrollment)
    console.log(subjectSchedId)
    console.log(student)
    console.log(studentInfo)
    console.log(activeSem)
    console.log(activeSy)
    console.log(enrollment)
    console.log(subjectSchedule)
    console.log(studentEnrollmentSubjects)
    console.log(subjectScheduleDetail)
    console.log(subject)
    console.log(subjectScheduleDetailList)
    console.log(enrollmentAcc)
    console.log(studentDiscount)
    console.log(assessmentTemplate)
    console.log(assessmentTemplateDetail)
    console.log(fees)
    console.log(feeGroup)
    console.log(subjectCode)
    console.log(payment)
    console.log(auth)

    setTimeout(function () {
        setKeepLoading(false)
    }, 1000);
    return (
        <div >
            {student !== undefined && studentInfo !== undefined && activeSem !== undefined && activeSy !== undefined &&
                enrollment !== undefined && subjectSchedule !== undefined && subjectScheduleDetail !== undefined &&
                subject !== undefined && subjectScheduleDetailList !== undefined && assessmentTemplate !== undefined && assessmentTemplateDetail !== undefined
                && fees !== undefined && feeGroup !== undefined

                ?

                <ReAssessment
                    student={student}
                    studentInfo={studentInfo}
                    activeSem={activeSem}
                    activeSy={activeSy}
                    enrollment={enrollment}
                    subjectScheduleList={subjectSchedule}
                    studentEnrollmentSub={studentEnrollmentSubjects}
                    subjectScheduleDetail={subjectScheduleDetail}
                    subject={subject}
                    subjectScheduleDetailList={subjectScheduleDetailList}
                    enrollmentAcc={enrollmentAcc}
                    studentDiscount={studentDiscount}
                    assessmentTemplate={assessmentTemplate}
                    assessmentTemplateDetail={assessmentTemplateDetail}
                    fees={fees}
                    feeGroup={feeGroup}
                    paymentModeChangeHandler={paymentModeChangeHandler}
                    subjectScheduleChangeHandler={subjectScheduleChangeHandler}
                    payment={payment}
                    allEnrollmentRecord={allEnrollmentRecords}
                />

                :

                <>
                    {enrollment === undefined || enrollment.length === 0
                        ?
                        <>
                            {keepLoading === true ?
                                <Loading />
                                :
                                <NoDocuments />
                            }
                        </>
                        :
                        <Loading />
                    }
                </>


            }

        </div>

    )
}
