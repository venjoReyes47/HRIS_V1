import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";

export function AsideChildMenuList(props) {
    const [childMenus, setChildMenus] = useState([]);

    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(props.refLocation, url)
            ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
            : "";
    };

    useEffect(() => {
        setChildMenus(props.refChildren);
    }, [props])

    return (
        childMenus.map(child => {
            const { MenuId, Description, RoutePath } = child;
            return (
                <li
                    className={`menu-item ${getMenuItemActive(RoutePath, false)}`}
                    aria-haspopup="true"
                    key={MenuId}
                >
                    <NavLink className="menu-link" to={RoutePath} key={MenuId}>
                        <i className="menu-bullet menu-bullet-dot">
                            <span />
                        </i>
                        <span className="menu-text">{Description}</span>
                    </NavLink>
                </li>
            );
        })
    );
}