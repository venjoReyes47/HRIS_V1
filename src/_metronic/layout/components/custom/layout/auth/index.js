/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../../_helpers";
import "../../../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import routes from '../../../../../../app/routes';
import CustomSnackbar from '../../../../components/snackbar/snackbar';
import { useAppContext } from '../../../../../../app/contexts/useAppContext';

export default function AuthPage() {
  const { state: { snackbar } } = useAppContext();
  const today = new Date().getFullYear();

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {snackbar.hasMessage && <CustomSnackbar />}


      {/* begin::Content body */}
      <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
        <Switch>{getRoutes(routes)}</Switch>
      </div>
      {/*end::Content body*/}


    </>
  );
}
