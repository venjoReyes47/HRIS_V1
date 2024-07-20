import instance from "../../../../apis/local/systemAPI";

export const registerUser = async (values) => {
    const result = await instance.post("AddUsers", values);
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


export const updateUser = async (id, values) => {
    const result = await instance.put(`UpdateUser/{id}`, values);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}


export const deleteUser = async (id) => {
    const result = await instance.delete(`DeleteUser/${id}`);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result;
    }
}



