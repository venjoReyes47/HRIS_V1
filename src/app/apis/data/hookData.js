import instance from "../local/systemAPI";



// ......

export const getStudentCampus = async (id) => {
    // const studNo = {studentNo: req.body.studNo};
    const result = await instance.post(`api/testing/campus?studentNo=${id}`,);
    if (result.status === 200 || result.status === 201) {
        console.log(result);
        return result.data;

    }
}

export const getStudentInfo = async () => {
    const result = await instance.get("api/student/infos");
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getStudent = async (formValues) => {
    const result = await instance.get("api/students", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getInstitute = async (formValues) => {
    const result = await instance.get("api/references/institutes", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getYearLevel = async (formValues) => {
    const result = await instance.get("api/references/yearlevels", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getEnrollmentData = async (formValues) => {
    const result = await instance.get("api/enrollments/", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getClassSections = async (formValues) => {
    const result = await instance.get("api/references/class-sections", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getSubjectSchedule = async (formValues) => {
    const result = await instance.get("/api/schedules/", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
export const getSubjects = async (formValues) => {
    const result = await instance.get("api/references/subjects", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getAllSubjectScheduleDetail = async (formValues) => {
    const result = await instance.get("api/schedule/details", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getAllSubjectMainCopy = async (formValues) => {
    const result = await instance.get("api/references/subject-main-copy", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
export const getSchoolYear = async (formValues) => {
    const result = await instance.get("api/references/schoolyears", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getAssessmentTemplate = async (formValues) => {
    const result = await instance.get("api/assessment/templates", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getAssessmentTemplateDetails = async (formValues) => {
    const result = await instance.get("api/assessment/template-details", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getAssessmentTemplateOther = async (formValues) => {
    const result = await instance.get("api/assessment/template-others", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getPaymentMode = async (formValues) => {
    const result = await instance.get("api/references/mode-of-payments", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getFeeGroups = async (formValues) => {
    const result = await instance.get("api/references/feegroups", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getFees = async (formValues) => {
    const result = await instance.get("api/references/fees", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getStudentDiscounts = async (formValues) => {
    const result = await instance.get("api/student/discounts", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getScholarship = async (formValues) => {
    const result = await instance.get("api/references/scholarships", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getScholarshipFeeGroups = async (formValues) => {
    const result = await instance.get("api/references/scholarship-feegroups", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getStudentEnrollmentSubjects = async (formValues) => {
    const result = await instance.get("api/student/student-enrollment-subjects", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getStudentEnrollmentBatches = async (formValues) => {
    const result = await instance.get("api/enrollment/batches", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getEnrollmentAccountAddOns = async (formValues) => {
    const result = await instance.get("api/enrollment/account", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getEnrollmentAcc = async (formValues) => {
    const result = await instance.get("api/enrollment/account", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getApplicantDataEntryDetail2 = async (id, formValues) => {
    const result = await instance.get(`api/students/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getApplicantDataEntryDetail = async () => {
    const result = await instance.get("api/students");
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const createEnrollment = async (formValues) => {
    const result = await instance.post("api/enrollments", formValues);
    console.log(result)
    if (result.status === 200 || result.status === 201) {
        // console.log(JSON.stringify(result.data) + 'here in index ')
        return result.data;
    }
}

export const createEnrollmentBatches = async (formValues) => {
    const result = await instance.post("api/enrollment/batches", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const createStudentEnrollmentSubjects = async (formValues) => {
    const result = await instance.post("api/student/student-enrollment-subjects", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const createEnrollmentAccountAddsOn = async (formValues) => {
    const result = await instance.post("api/enrollment/account", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const createEnrollmentAccount = async (formValues) => {
    const result = await instance.post("api/enrollment/account", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}







export const getActiveSubjectScheduleDetails = async () => {
    const result = await instance.get("api/schedule/details/active");
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSubjectScheduleDetails = async (page, rowsPerPage, keyword) => {
    var result;
    if (keyword === '') {
        result = await instance.get(`api/schedule/details/page/${page + 1}/${rowsPerPage}`);
    } else {
        const params = {
            where: [
                {
                    "o": "", "p": ["LIKE", "||", {
                        "subjectSchedule": keyword,
                        "schoolYear": keyword,
                        "semesterId": keyword,
                        "classSection": keyword,
                        "subject": keyword,
                        "classCode": keyword,
                        "capacity": keyword
                    }
                    ]
                }
            ]
            , start: page + 1
            , limit: rowsPerPage
        }
        result = await instance.post(`api/schedule/details/q`, params);
    }

    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}



export const getStudentCategory = async (formValues) => {
    const result = await instance.get("api/references/student-categories", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getActiveSemester = async (formValues) => {
    const result = await instance.get("api/references/semesters", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}



export const createSubjectScheduleDetail = async (formValues) => {
    const result = await instance.post("api/schedule/details", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const updateEnrollment = async (id, formValues) => {
    const result = await instance.patch(`api/enrollments/${id}`, formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const updateSubjectScheduleDetail = async (id, formValues) => {
    const result = await instance.patch(`api/schedule/details/${id}`, formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const deleteSubjectScheduleDetail = async (id) => {
    const result = await instance.delete(`api/schedule/details/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSubjectScheduleDetail = async () => {
    const result = await instance.get(`api/schedule/details/`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const createSubjectScheduleDetailList = async (formValues) => {
    const result = await instance.post("api/schedule/detail-lists", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const updateSubjectScheduleDetailList = async (id, formValues) => {
    const result = await instance.patch(`api/schedule/detail-lists/${id}`, formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const updateStudentEnrollmentSubject = async (id, formValues) => {
    const result = await instance.patch(`api/student/student-enrollment-subjects/${id}`, formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const deleteSubjectScheduleDetailList = async (id) => {
    const result = await instance.delete(`api/schedule/detail-lists/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getApplicantDataEntryDetailById = async (id, page, rowsPerPage, keyword) => {
    console.log(keyword);
    var result;
    if (keyword === '') {
        const params = {
            where: [
                { "o": "", "p": ["=", "", { "StudentInfoId": id === undefined ? null : id }] }
            ]
            , start: page + 1
            , limit: rowsPerPage
        }
        result = await instance.post("api/students", params);
    } else {
        const params = {
            where: [
                { "o": "", "p": ["=", "", { "StudentInfoId": id === undefined ? null : id }] },
                {
                    "o": "AND", "p": ["LIKE", "||", {
                        "StudentNo": keyword,
                        "ApplicantNo": keyword,
                    }
                    ]
                }
            ]
            , start: page + 1
            , limit: rowsPerPage
        }
        result = await instance.post(`api/students`, params);
    }

    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}



export const createApplicantDataEntryDetail = async (formValues) => {
    const result = await instance.post("api/students", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const updateApplicantDataEntryDetail = async (id, formValues) => {
    const result = await instance.patch(`api/students/${id}`, formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const deleteApplicantDataEntryDetail = async (id) => {
    const result = await instance.delete(`api/students/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const deleteStudentEnrollmentSubjects = async (id) => {
    const result = await instance.delete(`api/student/student-enrollment-subjects/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const deleteEnrollmentAccountAddOns = async (id) => {
    const result = await instance.delete(`api/enrollment/account/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const deleteEnrollmentAccount = async (id) => {
    const result = await instance.delete(`api/enrollment/account/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const deleteEnrollmentAccountAddsOn = async (id) => {
    const result = await instance.delete(`api/enrollment/account/${id}`);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
export const getAssessmentTemplateDetail = async (formValues) => {
    const result = await instance.get("api/assessment/template-details", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getEnrollment = async () => {
    const result = await instance.get("api/enrollments/");
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getEnrollmentAccAddOn = async (formValues) => {
    const result = await instance.get("api/enrollment/account", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getEnrollmentBatches = async (formValues) => {
    const result = await instance.get("api/enrollment/batches", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getFeeGroup = async (formValues) => {
    const result = await instance.get("api/references/feegroups", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getModeOfPayment = async (formValues) => {
    const result = await instance.get("api/references/mode-of-payments", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSem = async (formValues) => {
    const result = await instance.get("api/references/semesters", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSubMain = async (formValues) => {
    const result = await instance.get("api/references/subject-main-copy", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getSubSchedDetailList = async (formValues) => {
    const result = await instance.get("api/schedule/detail-lists", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getStudentDiscount = async (formValues) => {
    const result = await instance.get("api/student/discounts", formValues);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
//