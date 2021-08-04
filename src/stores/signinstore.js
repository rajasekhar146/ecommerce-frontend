import Store from '../libs/store';
import {
    getEnvValue,
    setAuthToken,
    getFromLocalStorage,
    setToLocalStorage,
    removeFromLocalStorage,
} from '../utils';
// import { email, password } from 'constants/regex';


const SignInStore = new Store({},
[
    {
        label: 'Signin',
        request: {
            url: `${getEnvValue('API_URL')}/api/admin/signin`,
            method: 'post',
        },
        formatter(data, request, config) {
            const output = request;
            output.body = {
                email: config.email,
                password: config.password,
                role: "ADMIN"
            };
            return output;
        },
        outputField: 'signinReponse',
        statusLabel: 'signInStatus',
        error: (error) => {
            const err = {};
            return error.body;
        },
        parse: (output) => {
            return output;
        },
    },
    {
        label: 'Signup',
        request: {
            url: `${getEnvValue('API_URL')}/api/admin/signup`,
            method: 'post',
        },
        formatter(data, request, config) {
            const output = request;
            output.body = {
                email: config.email,
                password: config.password,
                firstName: config.firstName,
                lastName: config.lastName,
            };
            return output;
        },
        outputField: 'signinReponse',
        statusLabel: 'signInStatus',
        error: (error) => {
            const err = {};
            return error.body;
        },
        parse: (output) => {
            return output;
        },
    },
    // {
    //     label: 'RequestPassword',
    //     request: {
    //         url: `${getEnvValue('API_URL')}/api/users/send-reset-password-mail`,
    //         method: 'post',
    //     },
    //     formatter(data, request, config) {
    //         const output = request;
    //         output.body = {
    //             email: config.email.toLowerCase(),
    //         };
    //         return output;
    //     },
    //     outputField: 'requestPasswordReponse',
    //     statusLabel: 'requestPasswordStatus',
    //     error: (error) => {
    //         const err = {};
    //         err.status = error.status;
    //         err.message = i18n.t('Password reset link send failed, try after some time');
    //         return err;
    //     },
    //     parse: () => {
    //         const data = {};
    //         data.message = i18n.t('Password reset link sent to given email address');
    //         return data;
    //     },
    // },
    // {
    //     label: 'ResetPassword',
    //     request: {
    //         url: `${getEnvValue('SERVER_URL')}/api/users/reset-password`,
    //         method: 'post',
    //     },
    //     formatter(data, request, config) {
    //         const output = request;
    //         output.body = config.resetData;
    //         return output;
    //     },
    //     error: (error) => {
    //         const err = {};
    //         err.status = error.status;
    //         err.message = i18n.t('Unable to change password. Reset link expired');
    //         return err;
    //     },
    //     parse: (output) => {
    //         const data = {};
    //         data.message = i18n.t('Your Password has been updated. Log in using the new password.');
    //         data.status = output.status;
    //         // const userData = get(output, ['data', 'data'], {})
    //         // setToLocalStorage('userData', JSON.stringify(userData));
    //         // setToLocalStorage('referralURL', '/');
    //         // setToLocalStorage('passwordReset', true)
    //         return data;
    //     },
    // },
    // {
    //     label: 'AcceptRejectClient',
    //     request: {
    //         url: `${getEnvValue('SERVER_URL')}/api/users/accept-reject`,
    //         method: 'post',
    //     },
    //     formatter(data, request, config) {
    //         const output = request;
    //         output.body = config.acceptRejectData;
    //         return output;
    //     },
    //     error: (error) => {
    //         const err = {};
    //         err.status = error.status;
    //         // err.message = i18n.t('Unable to change password. Reset link expired');
    //         return err;
    //     },
    //     parse: (output) => {
    //         const data = {};
    //         // data.message = i18n.t('Your Password has been updated. Log in using the new password.');
    //         data.status = output.status;
    //         // setAuthToken(get(output, ['data', 'data', 'token'], ''));
    //         // setToLocalStorage('referralURL', '/');
    //         // setToLocalStorage('passwordReset', true)
    //         return data;
    //     },
    // },
    {
        label: 'Signout',
        request: {
            url: `${getEnvValue('SERVER_URL')}/api/admin/signout`,
            method: 'post',
        },
        error: (error) => {
            const err = {};
            err.statusCode = error.statusCode;
            err.message = error.body.message;
            return err;
        },
        parse: () => {
            removeFromLocalStorage('satellizer_token');
            // EventStream.next('signout');
        },
    },
]);

export default SignInStore;
