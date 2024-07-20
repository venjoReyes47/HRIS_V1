import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { verifyUserByEmailAddress, loginWithGoogle, login, getTasks } from '../__hooks__';
import { authTypes } from '../__hooks__/types';
import { componentTypes } from '../../../../_metronic/layout/components/snackbar/__hooks__/types';
import { useAppContext } from '../../../contexts/useAppContext';
import firebase from '../../../apis/firebase/firebase.config';
import history from '../../../history';
import SideBackground from '../../../../_metronic/_assets/logo/SchoolAttendanceLogo.png'

export default function Login() {
  const { state: { auth }, dispatch } = useAppContext();
  const { register, handleSubmit, errors } = useForm();

  //LISTEN TO USER
  useEffect(() => {
    if (auth.loginType === 'L') {
      if (localStorage.getItem('Username') && localStorage.getItem('Password')) {
        history.push('../admin/dashboard');
      } else {
        // USER IS SIGNED OUT
        var element = document.getElementsByClassName('offcanvas-overlay');
        if (element.length > 0) {
          element[0].remove()
        }
        history.push('../auth/login');
      }
    } else if (auth.loginType === 'G') {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // USER IS SIGNED IN
          if (auth.isUserVerified) {
            history.push('../admin/dashboard');
          }
        } else {
          // USER IS SIGNED OUT
          var element = document.getElementsByClassName('offcanvas-overlay');
          if (element.length > 0) {
            element[0].remove()
          }
          history.push('../auth/login');
        }
      });
    } else if (auth.loginType === 'F') {

    }
  }, [auth, dispatch])

  // // VERIFY AND LOGIN
  const verifyUser = (data, accessToken) => {
    const { email } = data[0];
    // VERIFY USER
    const executeVerify = async () => {
      const verify = await verifyUserByEmailAddress(email);
      if (verify.success) {
        // LOGIN
        const executeLogin = async () => {
          const login = await loginWithGoogle(accessToken, email);
          if (login.success) {
          } else {
            logout();
          }
        }
        executeLogin();
      } else {
        logout();
      }
    }
    executeVerify();
  }

  //LOGIN WITH GOOGLE
  const btnGoogleAuth = () => {
    // USING A POPUP
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider).then(function (result) {
      const token = result.credential.accessToken;
      const data = result.user.providerData;
      verifyUser(data, token);
    }).catch(function (error) {
      // HANDLE ERRORS HERE    
      console.log('Error Logs: ', error.message);
    });
  }

  //LOGOUT WITH GOOGLE
  const logout = () => {
    firebase.auth().signOut().then(function () {
      setTimeout(() => {
      }, 1000)
      history.push('/auth/login');
    }).catch(function (error) {
      console.log("Error Logs: ", error.message);
    });
  }

  const onSubmit = formValues => {
    // LOGIN
    console.log(formValues)
    const execute = async () => {
      // history.push('../admin/dashboard');

      await login(formValues)
        .then(result => {
          console.log(result)
          if (result.user) {
            dispatch({ type: authTypes.LOGIN, data: result, loginType: 'L' });
            localStorage.setItem('Username', formValues.username);
            localStorage.setItem('Password', formValues.password);
            localStorage.setItem('userId', result.user.userId)
            localStorage.setItem('AccessToken', result.token)
            localStorage.setItem('UserType', 'U');

            // localStorage.setItem('AccessToken', result.data.AccessToken);
            history.push('../admin/dashboard');
          } else {
            dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 3000, snackBarMessage: 'Invalid Username or Password' });
          }
        })
        .catch(error => {
          console.log(error)
          if (error.response.status === 401) {
            localStorage.clear();
            history.push('/auth/login');
          } else {
            dispatch({ type: componentTypes.SHOW_SNACKBAR, snackBarStatus: 'error', snackBarDuration: 3000, snackBarMessage: 'Invalid Username or Password' });
          }
        })
    }
    execute();
  }

  useEffect(() => {
    const execute = async () => {

      await getTasks()
        .then(response => {
          if (response.success) {
            console.log(response.data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
    execute()
  }, [])

  console.log(auth)

  return (
    <>



      <main className="vh-100 d-flex align-items-center" style={{ width: '30%' }}>

        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">



            <div className="col-md-12 col-lg-12 col-xl-12 offset-xl-1">
              <div className="text-center">
                <img className="mb-5" style={{ width: '80px' }} src={SideBackground} /> <br />
                <div className="d-flex align-items-center mb-4">

                  <h1 className="text-center fw-bold mx-3 mb-0 display-4 text-center">HRIS System</h1>
                </div>



                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      name="usernameorEmail"
                      ref={register({
                        required: true
                      })}
                      autoFocus
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      ref={register({
                        required: true
                      })}
                      autoFocus
                    />
                  </div>


                  <div className="text-center  mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-block">Login</button>


                  </div>


                </form>
              </div>

            </div>

            {/* <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div> */}
          </div>
        </div>

      </main>

    </>

  );
}
