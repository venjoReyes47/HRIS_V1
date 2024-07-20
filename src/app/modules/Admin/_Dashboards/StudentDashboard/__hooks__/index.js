import instance from "../../../../../apis/local/systemAPI";
export const getStudentCampus = async (id) => {
    // const studNo = {studentNo: req.body.studNo};
    const result = await instance.post(`api/testing/campus?studentNo=${id}`,);
    if (result.status === 200 || result.status === 201) {
        console.log(result);
        return result.data;

    }
}



export const getModeOfPayment = async (formValues) => {
    const result = await instance.get("api/references/mode-of-payments", formValues);
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

export const deleteEnrollmentAccountAddsOn = async (id) => {
    const result = await instance.delete(`api/enrollment/account/${id}`);
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

export const updateStudentEnrollmentSubjects = async (id, formValues) => {
    const result = await instance.patch(`api/student/student-enrollment-subjects/${id}`, formValues);
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


export const getStudent = async (condition) => {
    const result = await instance.post("api/students/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSem = async (condition) => {
    const result = await instance.post("api/references/semesters/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSchoolYear = async (condition) => {
    const result = await instance.post("api/references/schoolyears/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getEnrollment = async (condition) => {
    const result = await instance.post("api/enrollments/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getStudentInfo = async (condition) => {
    const result = await instance.post("api/student/infos/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getSubjectSchedule = async (condition) => {
    const result = await instance.post("/api/schedules/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSubjectScheduleDetail = async (condition) => {
    const result = await instance.post(`api/schedule/details/q`, condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}


export const getSubjects = async (condition) => {
    const result = await instance.post("api/references/subjects/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getStudentEnrollmentSubjects = async (condition) => {
    const result = await instance.post("api/student/student-enrollment-subjects/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getSubSchedDetailList = async (condition) => {
    const result = await instance.post("api/schedule/detail-lists/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getEnrollmentAccAddOn = async (condition) => {
    const result = await instance.post("api/enrollment/account/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getStudentDiscount = async (condition) => {
    const result = await instance.post("api/student/discounts/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getAssessmentTemplate = async (condition) => {
    const result = await instance.post("api/assessment/templates/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getFees = async (condition) => {
    const result = await instance.post("api/references/fees/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getAssessmentTemplateDetail = async (condition) => {
    const result = await instance.post("api/assessment/template-details/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getFeeGroup = async (condition) => {
    const result = await instance.post("api/references/feegroups/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getPayment = async (condition) => {
    const result = await instance.post("api/payment/q", condition);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
//api/payment