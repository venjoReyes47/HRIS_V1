
import React, { useState, useEffect } from "react";
import LineChart from '../../../../../_metronic/layout/components/custom/chart/line-chart'
import GraphChart from "../../../../../_metronic/layout/components/custom/chart/graph-chart";
import DoughnutChart from "../../../../../_metronic/layout/components/custom/chart/dougnut-chart";
import { getInstitute, getEnrollment } from './__hooks__'
import STable from '../../../../../_metronic/layout/components/custom/table/STable'
import '../../../../../_metronic/css/custom/cards/cardsCustom.scss'
import moment from "moment";
import Form from './Form'
import { setIn } from "formik";


export default function Cashier_Accountant_Dashboard(props) {
    const [isInstitute, setIsInstitute] = useState(false)
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [isWeek, setIsWeek] = useState(false)
    const [institute, setInstitute] = useState(undefined)
    const [Enrolled, setEnrolled] = useState(undefined)
    const [totalEnrolled, setTotalEnrolled] = useState()
    const [Assessed, setAssessed] = useState()
    const [totalAssessed, setTotalAssessed] = useState()
    const [Inquires, setInquiries] = useState()
    const [allInquiries, setAllInquiries] = useState()
    const [totalInquires, setTotalInquiries] = useState()
    const [processed, setProcessed] = useState()
    const [totalProcessed, setTotalProcessed] = useState()
    const [last14Days, setLast14Days] = useState(undefined)
    const [weeklyEnrollmentStats, setWeeklyEnrollmentStats] = useState()
    const [dailyEnrollmentStats, setDailyEnrollmentStats] = useState()
    const [instituteEnrollmentStats, setInstituteEnrollmentStats] = useState()
    const [weeklyThisWeek, setWeeklyThisWeek] = useState()
    const [weeklyLastWeek, setWeeklyLastWeek] = useState()
    const [instituteStats, setInstituteStats] = useState()
    const [instituteStatistics, setInstituteStatistics] = useState()


    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const date2 = new Date().toISOString().substr(0, 19).replace('T', ' ').slice(0, -9);
    const lastYear = today.getFullYear() - 1;
    const thisMonth = moment(today).add(0, 'M')

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const executeOperation = async (operation, condition, targetData, setter) => {
        let arr = []
        await operation()
            .then(response => {
                if (response.success) {

                    for (let i = 0; i < response.data.length; i++) {
                        if (eval(condition)) {
                            arr.push(eval(targetData))

                        }
                    }
                    setter(arr)
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }



    if (isInstitute === false) {
        let conInstitute = 'response.data[i].EducationId === 2'
        let conTargetData = 'response.data[i].Code'
        executeOperation(getInstitute, conInstitute, conTargetData, setInstitute)
        setIsInstitute(true)

    }
    if (isEnrolled === false) {
        let conEnrollment = "response.data[i].EnrollmentStatusId === 'E'"
        let conProcessed = "response.data[i].EnrollmentStatusId === 'P'"
        let conTargetDataEnrolled = 'response.data[i]'
        let conAssessed = "response.data[i].EnrollmentStatusId === 'A'"
        // let conWeeklyEnrollment = "response.data[i].EnrollmentDate.slice(0,10) === "
        let conditionDefault = "response.data[i]"
        let slicedEnrolled = "response.data[i].EnrollmentDate.slice(0,10)"

        executeOperation(getEnrollment, conEnrollment, conditionDefault, setEnrolled)
        executeOperation(getEnrollment, conAssessed, conTargetDataEnrolled, setAssessed)
        executeOperation(getEnrollment, conditionDefault, conTargetDataEnrolled, setAllInquiries)
        executeOperation(getEnrollment, conProcessed, conTargetDataEnrolled, setProcessed)
        // executeOperation(getEnrollment, conProcessed, conTargetDataEnrolled, setWeeklyEnrollmentStats)

        setIsEnrolled(true)

    }

    // useEffect(() => {
    //     if (allInquiries !== undefined && Enrolled !== undefined) {
    //         console.log(allInquiries)
    //         const keys = ['StudentId']
    //         const filtered1 = allInquiries.filter(
    //             (s => o =>
    //                 (k => !s.has(k) && s.add(k))
    //                     (keys.map(k => o[k]).join('|'))
    //             )
    //                 (new Set)
    //         );
    //         const filtered2 = Enrolled.filter(
    //             (s => o =>
    //                 (k => !s.has(k) && s.add(k))
    //                     (keys.map(k => o[k]).join('|'))
    //             )
    //                 (new Set)
    //         );

    //         setInquiries(filtered1)
    //         setEnrolled(filtered2)
    //     }
    // }, [allInquiries, Enrolled])


    useEffect(() => {
        let cnt = 0
        if (Enrolled) {
            for (let i = 0; i < Enrolled.length; i++) {
                cnt++
            }
        }
        setTotalEnrolled(cnt)

    }, [Enrolled])

    useEffect(() => {
        let cnt = 0
        if (Assessed) {
            for (let i = 0; i < Assessed.length; i++) {
                cnt++
            }
        }
        setTotalAssessed(cnt)

    }, [Assessed])

    useEffect(() => {
        let cnt = 0
        if (Inquires) {
            for (let i = 0; i < Inquires.length; i++) {
                cnt++
            }
        }
        setTotalInquiries(cnt)

    }, [Inquires])

    useEffect(() => {
        let cnt = 0
        if (processed) {
            for (let i = 0; i < processed.length; i++) {
                cnt++
            }
        }
        setTotalProcessed(cnt)

    }, [processed])

    useEffect(() => {
        if (last14Days === undefined) {
            let arr = []
            let test = new Date(dateTime)
            // arr.push(test.setDate(test.getDate()))
            for (let i = 14; i !== 0; i--) {
                if (arr.length > 0) {
                    arr.push(test.setDate(test.getDate() - 1))
                } else {
                    arr.push(test.setDate(test.getDate()))
                }

            }

            setLast14Days(arr)
        }


    }, [])

    useEffect(() => {
        if (last14Days && isWeek === false) {
            let arr2 = []
            for (let i = 0; i < last14Days.length; i++) {
                arr2.push(new Date(last14Days[i]).toISOString().slice(0, 10))
            }
            setLast14Days(arr2)
            setIsWeek(true)
        }

    }, [last14Days])

    useEffect(() => {

        let arr = []
        let arr2 = []
        let arr3 = []
        if (isEnrolled === true && Enrolled !== undefined && last14Days.length > 0) {

            let e = Enrolled
            for (let i = 0; i < last14Days.length; i++) {
                for (let c = 0; c < Enrolled.length; c++) {

                    if (last14Days[i] === `${e[c].EnrollmentDate ? e[c].EnrollmentDate.slice(0, 10) : ''}`) {
                        if (moment(Enrolled[c].EnrollmentDate).calendar().slice(0, -11) !== 'Today') {
                            arr.push({
                                date: Enrolled[c].EnrollmentDate.slice(0, 10),
                                enrollmentStatus: Enrolled[c].EnrollmentStatusId,
                                day: new Date(Enrolled[c].EnrollmentDate).getDay(),
                                status: moment(new Date(Enrolled[c].EnrollmentDate)).calendar()
                            })
                        } else {
                            arr.push({
                                date: Enrolled[c].EnrollmentDate.slice(0, 10),
                                enrollmentStatus: Enrolled[c].EnrollmentStatusId,
                                day: new Date(Enrolled[c].EnrollmentDate).getDay(),
                                status: moment(Enrolled[c].EnrollmentDate).calendar().slice(0, -11)
                            })
                        }

                    }
                }
            }

            for (let c = 0; c < Enrolled.length; c++) {

                if (e[c].EnrollmentDate.slice(0, 10) === date2) {
                    console.log(e[c].EnrollmentDate.slice(0, 10))
                    console.log(date)
                    arr2.push({
                        enrollmentStatus: Enrolled[c].EnrollmentStatusId,
                        year: Enrolled[c].YearLevelId
                    })
                }


            }


            for (let v = 0; v < Enrolled.length; v++) {
                if (Enrolled[v].EnrollmentStatusId === 'E') {
                    arr3.push({
                        enrollmentStatus: Enrolled[v].EnrollmentStatusId,
                        institute: Enrolled[v].InstituteId

                    })
                }

            }
            console.log(last14Days)
            setInstituteEnrollmentStats(arr3)
            setDailyEnrollmentStats(arr2)
            setWeeklyEnrollmentStats(arr)



        }

    }, [Enrolled, last14Days])

    console.log(instituteEnrollmentStats)


    const [yearlyStats, setYearlyStats] = useState()
    const [oneTimeRun1, setOneTimeRun1] = useState(true)
    const [monthlyEStats, setMonthlyEStats] = useState()
    const [monthlyStats, setMonthlyStats] = useState()
    const [monthlyStats2, setMonthlyStats2] = useState()

    useEffect(() => {
        let Mon = 0
        let Tue = 0
        let Wed = 0
        let Thu = 0
        let Fri = 0
        let Sat = 0
        let Sun = 0
        let arr = []

        let LMon = 0
        let LTue = 0
        let LWed = 0
        let LThu = 0
        let LFri = 0
        let LSat = 0
        let LSun = 0
        let arr2 = []

        let firstYr = 0
        let secondYr = 0
        let thirdYr = 0
        let firthYr = 0
        let arr3 = []

        let con = 0
        let cba = 0
        let coe = 0
        let coh = 0
        let cas = 0
        let coed = 0
        let chm = 0
        let ccit = 0
        let cops = 0
        let arr4 = []


        let arr5 = []
        if (weeklyEnrollmentStats) {
            for (let i = 0; i < weeklyEnrollmentStats.length; i++) {
                if (weeklyEnrollmentStats[i].enrollmentStatus === 'E' && weeklyEnrollmentStats[i].status.includes('Last') === false) {
                    console.log(weeklyEnrollmentStats[i])
                    if (weeklyEnrollmentStats[i].day === 1) {
                        Mon++
                    } if (weeklyEnrollmentStats[i].day === 2) {
                        Tue++
                    } if (weeklyEnrollmentStats[i].day === 3) {
                        Wed++
                    } if (weeklyEnrollmentStats[i].day === 4) {
                        Thu++
                    } if (weeklyEnrollmentStats[i].day === 5) {
                        Fri++
                    } if (weeklyEnrollmentStats[i].day === 6) {
                        Sat++
                    } if (weeklyEnrollmentStats[i].day === 7) {
                        Sun++
                    }


                } else if (weeklyEnrollmentStats[i].enrollmentStatus === 'E' && weeklyEnrollmentStats[i].status.includes('Last') === true) {
                    if (weeklyEnrollmentStats[i].day === 1) {
                        LMon++
                    } else if (weeklyEnrollmentStats[i].day === 2) {
                        LTue++
                    } else if (weeklyEnrollmentStats[i].day === 3) {
                        LWed++
                    } else if (weeklyEnrollmentStats[i].day === 4) {
                        LThu++
                    } else if (weeklyEnrollmentStats[i].day === 5) {
                        LFri++
                    } else if (weeklyEnrollmentStats[i].day === 6) {
                        LSat++
                    } else if (weeklyEnrollmentStats[i].day === 7) {
                        LSun++
                    }
                }
            }
            arr.push(Sun, Mon, Tue, Wed, Thu, Fri, Sat)
            arr2.push(LSun, LMon, LTue, LWed, LThu, LFri, LSat)
            setWeeklyThisWeek(arr)
            setWeeklyLastWeek(arr2)
        }


        if (dailyEnrollmentStats) {
            for (let i = 0; i < dailyEnrollmentStats.length; i++) {
                if (dailyEnrollmentStats[i].enrollmentStatus === 'E') {
                    if (dailyEnrollmentStats[i].year === 16) {
                        firstYr++
                    } if (dailyEnrollmentStats[i].year === 17) {
                        secondYr++
                    } if (dailyEnrollmentStats[i].year === 18) {
                        thirdYr++
                    } if (dailyEnrollmentStats[i].year === 19) {
                        firthYr++
                    }
                }
            }
            arr3.push(firstYr, secondYr, thirdYr, firthYr)
            setYearlyStats(arr3)
        }


        if (instituteEnrollmentStats && oneTimeRun1 === true) {
            for (let p = 0; p < instituteEnrollmentStats.length; p++) {

                if (instituteEnrollmentStats[p].institute === 6) {
                    con++
                } if (instituteEnrollmentStats[p].institute === 7) {
                    cba++
                } if (instituteEnrollmentStats[p].institute === 8) {
                    coe++
                } if (instituteEnrollmentStats[p].institute === 9) {
                    coh++
                } if (instituteEnrollmentStats[p].institute === 10) {
                    cas++
                } if (instituteEnrollmentStats[p].institute === 11) {
                    coed++
                } if (instituteEnrollmentStats[p].institute === 12) {
                    chm++
                } if (instituteEnrollmentStats[p].institute === 13) {

                    ccit++
                } if (instituteEnrollmentStats[p].institute === 14) {
                    cops++
                }
            }
            arr4.push(con, cba, coe, coh, cas, coed, chm, ccit, cops)
            setInstituteStats(arr4)
            setOneTimeRun1(false)
        }

        if (Enrolled) {
            let conEnrolled = 0
            let conLY = 0
            let conAssessed = 0
            let conProcessed = 0
            let conInquire = 0

            let cbaEnrolled = 0
            let cbaLY = 0
            let cbaAssessed = 0
            let cbaProcessed = 0
            let cbaInquire = 0

            let coeEnrolled = 0
            let coeLY = 0
            let coeAssessed = 0
            let coeProcessed = 0
            let coeInquire = 0

            let cohEnrolled = 0
            let cohLY = 0
            let cohAssessed = 0
            let cohProcessed = 0
            let cohInquire = 0

            let casEnrolled = 0
            let casLY = 0
            let casAssessed = 0
            let casProcessed = 0
            let casInquire = 0

            let coedEnrolled = 0
            let coedLY = 0
            let coedAssessed = 0
            let coedProcessed = 0
            let coedInquire = 0

            let chmEnrolled = 0
            let chmLY = 0
            let chmAssessed = 0
            let chmProcessed = 0
            let chmInquire = 0

            let ccitEnrolled = 0
            let ccitLY = 0
            let ccitAssessed = 0
            let ccitProcessed = 0
            let ccitInquire = 0

            let copsEnrolled = 0
            let copsLY = 0
            let copsAssessed = 0
            let copsProcessed = 0
            let copsInquire = 0


            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 6) {
                    conInquire++
                }
                if (Enrolled[x].InstituteId === 6 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    conLY++
                } else if (Enrolled[x].InstituteId === 6 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    conEnrolled++

                } else if (Enrolled[x].InstituteId === 6 && Enrolled[x].EnrollmentStatusId === 'A') {
                    conAssessed++
                } else if (Enrolled[x].InstituteId === 6 && Enrolled[x].EnrollmentStatusId === 'P') {
                    conProcessed++
                }
            }
            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 7) {
                    cbaInquire++
                }
                if (Enrolled[x].InstituteId === 7 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    cbaLY++
                } else if (Enrolled[x].InstituteId === 7 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    cbaEnrolled++

                } else if (Enrolled[x].InstituteId === 7 && Enrolled[x].EnrollmentStatusId === 'A') {
                    cbaAssessed++
                } else if (Enrolled[x].InstituteId === 7 && Enrolled[x].EnrollmentStatusId === 'P') {
                    cbaProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 8) {
                    coeInquire++
                }
                if (Enrolled[x].InstituteId === 8 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    coeLY++
                } else if (Enrolled[x].InstituteId === 8 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    coeEnrolled++

                } else if (Enrolled[x].InstituteId === 8 && Enrolled[x].EnrollmentStatusId === 'A') {
                    coeAssessed++
                } else if (Enrolled[x].InstituteId === 8 && Enrolled[x].EnrollmentStatusId === 'P') {
                    coeProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 9) {
                    cohInquire++
                }
                if (Enrolled[x].InstituteId === 9 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    cohLY++
                } else if (Enrolled[x].InstituteId === 9 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    cohEnrolled++

                } else if (Enrolled[x].InstituteId === 9 && Enrolled[x].EnrollmentStatusId === 'A') {
                    cohAssessed++
                } else if (Enrolled[x].InstituteId === 9 && Enrolled[x].EnrollmentStatusId === 'P') {
                    cohProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 10) {
                    casInquire++
                }
                if (Enrolled[x].InstituteId === 10 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    casLY++
                } else if (Enrolled[x].InstituteId === 10 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    casEnrolled++

                } else if (Enrolled[x].InstituteId === 10 && Enrolled[x].EnrollmentStatusId === 'A') {
                    casAssessed++
                } else if (Enrolled[x].InstituteId === 10 && Enrolled[x].EnrollmentStatusId === 'P') {
                    casProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 11) {
                    coedInquire++
                }
                if (Enrolled[x].InstituteId === 11 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    coedLY++
                } else if (Enrolled[x].InstituteId === 11 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    coedEnrolled++

                } else if (Enrolled[x].InstituteId === 11 && Enrolled[x].EnrollmentStatusId === 'A') {
                    coedAssessed++
                } else if (Enrolled[x].InstituteId === 11 && Enrolled[x].EnrollmentStatusId === 'P') {
                    coedProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 12) {
                    chmInquire++
                }
                if (Enrolled[x].InstituteId === 12 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    chmLY++
                } else if (Enrolled[x].InstituteId === 12 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    chmEnrolled++

                } else if (Enrolled[x].InstituteId === 12 && Enrolled[x].EnrollmentStatusId === 'A') {
                    chmAssessed++
                } else if (Enrolled[x].InstituteId === 12 && Enrolled[x].EnrollmentStatusId === 'P') {
                    chmProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 13) {
                    ccitInquire++
                }
                if (Enrolled[x].InstituteId === 13 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    ccitLY++
                } else if (Enrolled[x].InstituteId === 13 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    ccitEnrolled++
                } else if (Enrolled[x].InstituteId === 13 && Enrolled[x].EnrollmentStatusId === 'A') {
                    ccitAssessed++
                } else if (Enrolled[x].InstituteId === 13 && Enrolled[x].EnrollmentStatusId === 'P') {
                    ccitProcessed++
                }
            }

            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 14) {
                    copsInquire++
                }
                if (Enrolled[x].InstituteId === 14 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) === parseInt(lastYear)) {
                    copsLY++
                } else if (Enrolled[x].InstituteId === 14 && Enrolled[x].EnrollmentStatusId === 'E' && parseInt(Enrolled[x].EnrollmentDate.slice(0, 4)) == parseInt(lastYear) + 1) {
                    copsEnrolled++

                } else if (Enrolled[x].InstituteId === 14 && Enrolled[x].EnrollmentStatusId === 'A') {
                    copsAssessed++
                } else if (Enrolled[x].InstituteId === 14 && Enrolled[x].EnrollmentStatusId === 'P') {
                    copsProcessed++
                }
            }



            for (let x = 0; x < Enrolled.length; x++) {
                if (Enrolled[x].InstituteId === 6 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'CON',
                        enrolled: conEnrolled,
                        enrolledLY: conLY,
                        assessed: conAssessed,
                        inquired: conInquire,
                        processed: conProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'CON',
                        enrolled: conEnrolled,
                        enrolledLY: conLY,
                        assessed: conAssessed,
                        inquired: conInquire,
                        processed: conProcessed
                    })
                } if (Enrolled[x].InstituteId === 7 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'CBA',
                        enrolled: cbaEnrolled,
                        enrolledLY: cbaLY,
                        assessed: cbaAssessed,
                        inquired: cbaInquire,
                        processed: cbaProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'CBA',
                        enrolled: cbaEnrolled,
                        enrolledLY: cbaLY,
                        assessed: cbaAssessed,
                        inquired: cbaInquire,
                        processed: cbaProcessed
                    })
                } if (Enrolled[x].InstituteId === 8 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'COE',
                        enrolled: coeEnrolled,
                        enrolledLY: coeLY,
                        assessed: coeAssessed,
                        inquired: coeInquire,
                        processed: coeProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'COE',
                        enrolled: coeEnrolled,
                        enrolledLY: coeLY,
                        assessed: coeAssessed,
                        inquired: coeInquire,
                        processed: coeProcessed
                    })
                } if (Enrolled[x].InstituteId === 9 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'COH',
                        enrolled: cohEnrolled,
                        enrolledLY: cohLY,
                        assessed: cohAssessed,
                        inquired: cohInquire,
                        processed: cohProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'COH',
                        enrolled: cohEnrolled,
                        enrolledLY: cohLY,
                        assessed: cohAssessed,
                        inquired: cohInquire,
                        processed: cohProcessed
                    })
                } if (Enrolled[x].InstituteId === 10 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'CAS',
                        enrolled: casEnrolled,
                        enrolledLY: casLY,
                        assessed: casAssessed,
                        inquired: casInquire,
                        processed: casProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'CAS',
                        enrolled: casEnrolled,
                        enrolledLY: casLY,
                        assessed: casAssessed,
                        inquired: casInquire,
                        processed: casProcessed
                    })
                } if (Enrolled[x].InstituteId === 11 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'COED',
                        enrolled: coedEnrolled,
                        enrolledLY: coedLY,
                        assessed: coedAssessed,
                        inquired: coedInquire,
                        processed: coedProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'COED',
                        enrolled: coedEnrolled,
                        enrolledLY: coedLY,
                        assessed: coedAssessed,
                        inquired: coedInquire,
                        processed: coedProcessed
                    })
                } if (Enrolled[x].InstituteId === 12 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'CHM',
                        enrolled: chmEnrolled,
                        enrolledLY: chmLY,
                        assessed: chmAssessed,
                        inquired: chmInquire,
                        processed: chmProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'CHM',
                        enrolled: chmEnrolled,
                        enrolledLY: chmLY,
                        assessed: chmAssessed,
                        inquired: chmInquire,
                        processed: chmProcessed
                    })
                } if (Enrolled[x].InstituteId === 13 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'CCIT',
                        enrolled: ccitEnrolled,
                        enrolledLY: ccitLY,
                        assessed: ccitAssessed,
                        inquired: ccitInquire,
                        processed: ccitProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'CCIT',
                        enrolled: ccitEnrolled,
                        enrolledLY: ccitLY,
                        assessed: ccitAssessed,
                        inquired: ccitInquire,
                        processed: ccitProcessed
                    })
                } if (Enrolled[x].InstituteId === 14 && Enrolled[x].EnrollmentStatusId === 'E') {
                    arr5.push({
                        institute: 'COPS',
                        enrolled: copsEnrolled,
                        enrolledLY: copsLY,
                        assessed: copsAssessed,
                        inquired: copsInquire,
                        processed: copsProcessed
                    })
                } else {
                    arr5.push({
                        institute: 'COPS',
                        enrolled: copsEnrolled,
                        enrolledLY: copsLY,
                        assessed: copsAssessed,
                        inquired: copsInquire,
                        processed: copsProcessed
                    })
                }
            }

            const keys = ['institute'],
                filtered = arr5.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );
            console.log(filtered)
            setInstituteStatistics(filtered)
        }

        let arr6 = []
        if (Enrolled) {
            for (let b = 0; b < Enrolled.length; b++) {
                arr6.push({
                    status: Enrolled[b].EnrollmentStatusId,
                    month: Enrolled[b].EnrollmentDate.slice(5, 7),
                    year: parseInt(Enrolled[b].EnrollmentDate.slice(0, 4))
                })
            }
        }

        setMonthlyEStats(arr6)



    }, [weeklyEnrollmentStats, instituteStats, Enrolled])
    console.log(monthlyEStats)

    const [eStatisticLabel, setEStatisticLabel] = useState()
    const [eStatisticEnrolled, setEStatisticEnrolled] = useState()
    const [eStatisticEnrolledLY, setEStatisticEnrolledLY] = useState()
    useEffect(() => {
        let arr = []
        let arr2 = []
        let arr3 = []
        let arr4 = []
        let arr5 = []
        let cjan = 0
        let cjan2 = 0
        let cfeb = 0
        let cfeb2 = 0
        let cmar = 0
        let cmar2 = 0
        let capr = 0
        let capr2 = 0
        let cmay = 0
        let cmay2 = 0
        let cjun = 0
        let cjun2 = 0
        let cjul = 0
        let cjul2 = 0
        let caug = 0
        let caug2 = 0
        let csep = 0
        let csep2 = 0
        let coct = 0
        let coct2 = 0
        let cnov = 0
        let cnov2 = 0
        let cdec = 0
        let cdec2 = 0


        if (instituteStatistics) {
            for (let v = 0; v < instituteStatistics.length; v++) {
                arr.push(instituteStatistics[v].institute)
                arr2.push(instituteStatistics[v].enrolled)
                arr3.push(instituteStatistics[v].enrolledLY)

            }
            setEStatisticLabel(arr)
            setEStatisticEnrolled(arr2)
            setEStatisticEnrolledLY(arr3)
        }
        if (monthlyEStats) {
            for (let u = 0; u < monthlyEStats.length; u++) {
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '01' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cjan2++

                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '01' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cjan++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '02' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cfeb2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '02' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cfeb++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '03' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cmar2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '03' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cmar++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '04' && monthlyEStats[u].year === parseInt(lastYear)) {
                    capr2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '04' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    capr++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '05' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cmay2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '05' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cmay++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '06' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cjun2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '06' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cjun++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '07' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cjul2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '07' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cjul++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '08' && monthlyEStats[u].year === parseInt(lastYear)) {
                    caug2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '08' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    caug++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '09' && monthlyEStats[u].year === parseInt(lastYear)) {
                    csep2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '09' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    csep++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '10' && monthlyEStats[u].year === parseInt(lastYear)) {
                    coct2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '10' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    coct++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '11' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cnov2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '11' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cnov++
                }
                if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '12' && monthlyEStats[u].year === parseInt(lastYear)) {
                    cdec2++
                } else if (monthlyEStats[u].status === 'E' && monthlyEStats[u].month === '12' && monthlyEStats[u].year === parseInt(lastYear) + 1) {
                    cdec++
                }
            }
            arr4.push(cjan, cfeb, cmar, capr, cmay, cjun, cjul, caug, csep, coct, cnov, cdec)
            arr5.push(cjan2, cfeb2, cmar2, capr2, cmay2, cjun2, cjul2, caug2, csep2, coct2, cnov2, cdec2)
            setMonthlyStats(arr4)
            setMonthlyStats2(arr5)
        }



    }, [instituteStatistics, monthlyEStats])

    const weeklyEnrollmentChartLabel = {
        isDataset2: true,

        label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        labelset1: 'This Week',
        dataset1: weeklyThisWeek,
        labelset2: 'Last Week',
        dataset2: weeklyLastWeek,



    }

    const dailyEnrollmentChartLabel = {
        isDataset2: false,
        label: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
        labelset1: 'Enrolled',
        dataset1: yearlyStats,
        // labelset2: 'Last Week',
        // dataset2: [75, 80, 50, 10],
    }

    const institutesPerCourseLabel = {
        isDataset2: false,
        label: ['CON', 'CBA', 'COE', 'COH', 'CAS', 'COED', 'CHM', 'CCIT', 'COPS'],
        labelset1: 'Enrolled',
        dataset1: instituteStats,
        // labelset2: 'Last Week',
        // dataset2: [75, 80, 50, 10],
    }


    const enrollmentStatisticLabel = {
        isDataset2: true,

        label: eStatisticLabel,
        labelset1: 'This Year',
        dataset1: eStatisticEnrolled,
        labelset2: 'Last Year',
        dataset2: eStatisticEnrolledLY,
    }

    const monthlyEnrollmentStatisticLabel = {
        isDataset2: true,

        label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labelset1: 'This Year',
        dataset1: monthlyStats,
        labelset2: 'Last Year',
        dataset2: monthlyStats2,
    }


    const verificationStatistic = {
        isDataset2: true,

        label: ['clreyes', 'others'],
        data: [95, 5]

    }






    return (
        <>
            {weeklyEnrollmentChartLabel && dailyEnrollmentChartLabel && instituteStatistics !== undefined
                && institutesPerCourseLabel && institute && enrollmentStatisticLabel && monthlyEnrollmentStatisticLabel && verificationStatistic ?
                <Form
                    totalEnrolled={totalEnrolled}
                    totalAssessed={totalAssessed}
                    totalInquires={totalInquires}
                    totalProcessed={totalProcessed}
                    weeklyEnrollmentChartLabel={weeklyEnrollmentChartLabel}
                    dailyEnrollmentChartLabel={dailyEnrollmentChartLabel}
                    institutesPerCourseLabel={institutesPerCourseLabel}
                    institute={institute}
                    enrollmentStatisticLabel={enrollmentStatisticLabel}
                    monthlyEnrollmentStatisticLabel={monthlyEnrollmentStatisticLabel}
                    verificationStatistic={verificationStatistic}
                    instituteStatistics={instituteStatistics}


                /> : ''
            }

        </>
    )
}