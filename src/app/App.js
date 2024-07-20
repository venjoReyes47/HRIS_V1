import React, { useReducer } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import history from './history';
import Context from './contexts/context';
import rootReducer from './rootReducer';
// LAYOUT
import AdminLayout from '../_metronic/layout/components/custom/layout/admin/';
import AuthLayout from '../_metronic/layout/components/custom/layout/auth/';
import ApplicantForm from "./modules/Admin/ApplicationForm";
import FormSubmitted from "./modules/Admin/FormSubmitted";
// import WalkInStudentRegistrationLayout from '../_metronic/layout/components/custom/layout/registration/walkIn'
export default function App({ store, persistor, basename }) {
  const initialState = {
    auth: {
      data: [],
      isUserVerified: false,
      loginType: 'L',
    },
    menus: [],
    snackbar: {
      hasMessage: false,
      snackBarStatus: '',
      snackBarDuration: 5000,
      snackBarMessage: ''
    },
    users: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    fees: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    feeGroups: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    scholarships: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    scholarshipFeeGroups: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    scholarshipTags: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    institutes: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    studentCategories: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    courses: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    yearLevels: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    classSections: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    schoolYears: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    semesters: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    civilStatuses: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    modeOfPayments: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    paymentSchedules: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    religions: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    studyTypes: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    subjectTypes: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    subjectCategories: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    subjects: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    countries: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    provinces: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    municipalities: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    nationalities: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    schools: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    educations: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    courseOutlines: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    courseOutlineDetails: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    courseOutlineDetailReqs: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    subjectSchedules: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    subjectScheduleDetails: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    assessmentTemplates: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    assessmentTemplateDetails: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    assessmentSchedules: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    assessmentScheduleDetails: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    assessmentOthers: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    assessmentOtherRates: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    rooms: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    computationTypes: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    applicantData: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    schoolData: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
    familyNetIncome: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    }
    , educationalPlan: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    }
    , familyPosition: {
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalRecords: 0,
      keyword: '',
      id: null
    },
  }

  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
                {/* Render routes with provided `Layout`. */}
                <Context.Provider value={{ state, dispatch }} >
                  <Router history={history}>
                    <Switch>
                      <Route path="/auth" render={props => <AuthLayout {...props} />} />
                      <Route path="/admin" render={props => <AdminLayout {...props} />} />
                      <Route path="/applicant-form" render={props => <ApplicantForm />} />
                      <Route path="/form-submitted" render={props => <FormSubmitted />} />

                      {/* <Route path="/walk-in-student-registration" render={props => <WalkInStudentRegistrationLayout {...props} />} /> */}

                      <Redirect from="/" to="/auth/login" />
                    </Switch>
                  </Router>
                </Context.Provider>
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
