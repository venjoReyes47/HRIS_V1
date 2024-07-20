import React, { useMemo } from "react";
// import { Switch, Route } from 'react-router-dom';
import objectPath from "object-path";
// LAYOUT CONTEXT
import { useHtmlClassService } from "../../../../_core/MetronicLayout";
// import { StickyToolbar } from "./extras/StickyToolbar";
// import routes from '../../../../../../app/routes';
import { useAppContext } from '../../../../../../app/contexts/useAppContext';
// import { componentTypes } from '../../../snackbar/__hooks__/types';
import CustomSnackbar from '../../../snackbar/snackbar';
import WalkInEnrollment from '../../../../../../app/modules/Registration/WalkInRegistration/Create'

export default function WalkInRegistrationLayout(props) {
    const { state: { snackbar } } = useAppContext();



    // const getRoutes = routes => {
    //     return routes.map((prop, key) => {
    //         if (prop.layout === "/student-registration") {
    //             return (
    //                 <Route
    //                     path={prop.layout + prop.subLayout + prop.path}
    //                     component={prop.component}
    //                     key={key}
    //                 />
    //             );
    //         } else {
    //             return null;
    //         }
    //     });
    // };

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

    return (
        <>
            <div
                id="kt_content"
                className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
                {!layoutProps.contentExtended && (
                    <div className="d-flex flex-column-fluid container">
                        {/*begin::Container*/}
                        <div className="container-fluid">
                            {/* {<Switch>{getRoutes(routes)}</Switch>} */}
                            <WalkInEnrollment />
                        </div>
                        {/*end::Container*/}
                    </div>
                )}
            </div>

            {snackbar.hasMessage && <CustomSnackbar />}

        </>
    );
}