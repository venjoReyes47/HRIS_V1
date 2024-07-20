/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useAppContext } from '../../../../../app/contexts/useAppContext';
import { AsideChildMenuList } from './AsideChildMenuList';

export function AsideParentMenuList({ layoutProps }) {
  const { state: { auth } } = useAppContext();
  const [parentMenus, setParentMenus] = useState([]);
  const location = useLocation();

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  // GET PARENT MENUS
  useEffect(() => {
    setParentMenus(auth.data.menus === undefined ? [] : auth.data.menus);
  }, [auth])
  console.log(parentMenus)
  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/admin/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/admin/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Menu</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/* GET MENUS */}
        {
          parentMenus.map(parent => {
            const { MenuId, Description, RoutePath, MenuIcon, children } = parent;
            return (
              // PARENT MENUS
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(RoutePath, true)}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
                key={MenuId}
              >
                <NavLink className="menu-link menu-toggle" to={RoutePath} key={MenuId}>
                  <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl(MenuIcon)} />
                  </span>
                  <span className="menu-text">{Description}</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    <li className="menu-item menu-item-parent" aria-haspopup="true">
                      <span className="menu-link">
                        <span className="menu-text">{Description}</span>
                      </span>
                    </li>
                    {children && <AsideChildMenuList refLocation={location} refChildren={children} />}
                  </ul>
                </div>
              </li>
            );
          })
        }
      </ul>
      {/* end::Menu Nav */}
    </>
  );
}
