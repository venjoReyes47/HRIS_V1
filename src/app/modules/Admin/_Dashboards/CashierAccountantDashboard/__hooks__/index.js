import instance from "../../../../../apis/local/systemAPI";

export const getUserInRole = async () => {
    const result = await instance.get("api/role/user-in-role");
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getInstitute = async () => {
    const result = await instance.get("api/references/institutes");
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