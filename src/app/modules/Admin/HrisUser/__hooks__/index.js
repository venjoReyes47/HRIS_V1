import instance from "../../../../apis/local/systemAPI";

export const getAllPosition = async () => {
    const result = await instance.get("api/user");
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}


export const createPosition = async (val) => {
    const result = await instance.post("api/user", val);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const deletePosition = async (id) => {
    const result = await instance.delete(`api/position/${id}`);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}

export const updatePosition = async (id, val) => {
    const result = await instance.put(`api/user/${id}`, val);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}