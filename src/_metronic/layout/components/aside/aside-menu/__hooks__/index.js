import instance from '../../../../../../app/apis/local/systemAPI';
import { menuTypes } from './types';

// START OF ASIDE
export const getMenus = async (roleId, isAdmin) => {
    let params = {
        key: menuTypes.GET_MENUS,
        roleId: roleId === undefined ? null : roleId,
        isAdmin: isAdmin === undefined ? null : isAdmin
    };

    const result = await instance.post("/im-menu-request", params);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getParentMenus = async (roleId, isAdmin) => {
    let params = {
        key: menuTypes.GET_PARENT_MENUS,
        roleId: roleId === undefined ? null : roleId,
        isAdmin: isAdmin === undefined ? null : isAdmin
    };

    const result = await instance.post("/im-menu-request", params);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}

export const getChildMenus = async (parentMenuId, roleId, isAdmin) => {
    let params = {
        key: menuTypes.GET_CHILD_MENUS,
        parentMenuId: parentMenuId === undefined ? null : parentMenuId,
        roleId: roleId === undefined ? null : roleId,
        isAdmin: isAdmin === undefined ? null : isAdmin
    };

    const result = await instance.post("/im-menu-request", params);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
}
// END OF ASIDE