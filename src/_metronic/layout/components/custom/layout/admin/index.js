import React, { useEffect, useMemo } from "react";
import { Switch, Route } from 'react-router-dom';
import objectPath from "object-path";
// LAYOUT CONTEXT
import { useHtmlClassService } from "../../../../_core/MetronicLayout";
import { Header } from "../../../../components/header/Header";
import { HeaderMobile } from "../../../../components/header-mobile/HeaderMobile";
import { Aside } from "../../../../components/aside/Aside";
import { Footer } from "../../../../components/footer/Footer";
import { LayoutInit } from "../../../LayoutInit";
import { SubHeader } from "../../../../components/subheader/SubHeader";
import { QuickPanel } from "../../../../components/extras/offcanvas/QuickPanel";
import { QuickUser } from "../../../../components/extras/offcanvas/QuickUser";
import { ScrollTop } from "../../../../components/extras/ScrollTop";
// import { StickyToolbar } from "./extras/StickyToolbar";
import routes from '../../../../../../app/routes';
import history from '../../../../../../app/history';
import firebase from '../../../../../../app/apis/firebase/firebase.config';
import { loginWithGoogle } from '../../../../../../app/modules/Auth/__hooks__';
import { useAppContext } from '../../../../../../app/contexts/useAppContext';
import { authTypes } from '../../../../../../app/modules/Auth/__hooks__/types';
import { login } from '../../../../../../app/modules/Auth/__hooks__/';
import { componentTypes } from '../../../snackbar/__hooks__/types';
import MiniDrawer from "../../../aside/aside/AsideKO";
import CustomSnackbar from '../../../../components/snackbar/snackbar';

export default function AdminLayout(props) {
  const { state: { auth, snackbar }, dispatch } = useAppContext();

  // useEffect(() => {
  //   if (auth.loginType === 'L') {
  //     // LOCAL LOGIN
  //     if (!localStorage.getItem('Username') && !localStorage.getItem('Password')) {
  //       history.push('../auth/login');
  //     } else {
  //       if (!auth.isUserVerified) {
  //         const formValues = {
  //           emailAddress: localStorage.getItem('Username'),
  //           password: localStorage.getItem('Password')
  //         }

  //         const execute = async () => {
  //           await login(formValues)
  //             .then(result => {
  //               if (result.success) {
  //                 dispatch({ type: authTypes.LOGIN, data: result.data, loginType: 'L' });
  //               } else {
  //                 // dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 3000, snackBarMessage: result.message });
  //               }
  //             })
  //         }
  //         execute();
  //       }
  //     }
  //   } else if (auth.loginType === 'G') {
  //     // FIREBASE GOOGLE AUTH
  //     firebase.auth().onAuthStateChanged(function (user) {
  //       if (user) {
  //         const execute = async () => {
  //           const response = await loginWithGoogle(user.refreshToken, user.email);
  //           if (response.success) {
  //             dispatch({ type: authTypes.LOGIN_WITH_GOOGLE, accessToken: user.refreshToken, data: user.providerData[0], isAdmin: response.data.IsAdmin, roleId: response.data.RoleId, designation: response.data.Designation, defaults: response.defaults.data });
  //           }
  //         }
  //         execute();
  //       } else {
  //         // USER IS SIGNED OUT
  //         history.push('../auth/login');
  //       }
  //     });
  //   } else if (auth.loginType === 'F') {
  //     // FIREBASE FACEBOOK AUTH
  //   }
  // }, [dispatch, auth])

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.subLayout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const uiService = useHtmlClassService();
  // LAYOUT SETTINGS (cssClasses/cssAttributes)
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, "self.layout"),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
      desktopHeaderDisplay: objectPath.get(
        uiService.config,
        "header.self.fixed.desktop"
      ),
      contentCssClasses: uiService.getClasses("content", true),
      contentContainerClasses: uiService.getClasses("content_container", true),
      contentExtended: objectPath.get(uiService.config, "content.extended")
    };
  }, [uiService]);

  console.log(auth)

  return (
    <>
      {/*begin::Main*/}
      <MiniDrawer />

      {/*begin::Container*/}

      {/*end::Container*/}

    </>
  );
}