import instance from "../../../../apis/local/systemAPI";


export const registerStudent = async (values) => {
    const result = await instance.post("AddStudents", values);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const getAllStudent = async () => {
    const result = await instance.get("AllStudents");
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}



export const getUnApproveApplicants = async (id) => {
    if (id) {
        const result = await instance.get(`Employee/un-approved?PositionId=${id}`);
        if (result.status === 200 || result.status === 201) {
            const filteredData = result.data.filter(employee => employee.position.isActive == true);
            console.log(filteredData);
            return filteredData;
        }
    } else {
        const result = await instance.get("Employee/un-approved");
        if (result.status === 200 || result.status === 201) {
            const filteredData = result.data.filter(employee => employee.position.isActive == true);
            console.log(filteredData);
            return filteredData;
        }
    }

}

export const getApproveApplicants = async (id) => {
    if (id) {
        const result = await instance.get(`Employee/approved?PositionId=${id}`);
        if (result.status === 200 || result.status === 201) {
            const filteredData = result.data.filter(employee => employee.position.isActive == true);
            console.log(filteredData);
            return filteredData;
        }
    } else {
        const result = await instance.get("Employee/approved");
        if (result.status === 200 || result.status === 201) {
            const filteredData = result.data.filter(employee => employee.position.isActive == true);
            console.log(filteredData);
            return filteredData;
        }
    }

}

export const updateStudent = async (id, values) => {
    const result = await instance.put(`UpdateStudent/{id}`, values);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const getAllUsers = async () => {
    const result = await instance.get("AllUsers");
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const deleteStudent = async (id) => {
    const result = await instance.delete(`DeleteStudent/${id}`);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}


export const deleteApplicant = async (id) => {
    const result = await instance.delete(`Employee/${id}`);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const getAllPosition = async () => {
    const result = await instance.get("api/position");
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const getIndividualEmployee = async (id) => {
    const result = await instance.get(`Employee/${id}`);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const approvedEmployee = async (val) => {
    const result = await instance.post(`Employee/${val.id}/approve`, val);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const declineEmployee = async (val) => {
    const result = await instance.post(`Employee/${val.id}/approve`, val);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}