import instance from "../../../apis/local/systemAPI";


export const createApplicant = async (val) => {
    const result = await instance.post("Employee", val);
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


export const getStatistics = async () => {
    const result = await instance.get("Employee/approval-statistic  ");
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

