import instance from '../../../apis/local/systemAPI';
import { authTypes } from './types';

// START OF AUTH

export const verifyUserByEmailAddress = async emailAddress => {
    let params = {
        key: authTypes.VERIFY_USER_BY_EMAIL_ADDRESS,
        emailAddress: emailAddress
    };

    const result = await instance.post("/im-user-request", params);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const loginWithGoogle = async (accessToken, emailAddress) => {
    let params = {
        key: authTypes.LOGIN_WITH_GOOGLE,
        accessToken: accessToken,
        emailAddress: emailAddress
    };

    const result = await instance.post("/im-user-request", params);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const logoutWithGoogle = async (accessToken, emailAddress) => {
    let params = {
        key: authTypes.LOGOUT_WITH_GOOGLE,
        accessToken: accessToken,
        emailAddress: emailAddress
    };

    const result = await instance.post("/im-user-request", params);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const login = async (formValues) => {
    const result = await instance.post(`api/account`, formValues);
    if (result.status === 200 || result.status === 201) {
        console.log(result)
        return result.data;
    }
}

export const getTasks = async () => {
    const result = await instance.get("AllUsers");
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
// END OF AUTH