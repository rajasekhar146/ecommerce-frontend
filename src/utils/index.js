
/* eslint-disable radix */
// import { emailReg, passwordReg } from 'constants/regex';



export const getEnvValue = () => {
    const config = process.env;
    return config.REACT_APP_API_URL;
};

// export const getApiKey = () => {
//     const config = process.env;
//     return config.REACT_APP_GOOGLE_KEY;
// }

// export const getMeetingApiKey = () => {
//     const config = process.env;
//     return config.REACT_APP_MEETING_API;
// }

export const setToLocalStorage = (key, value) => {
    if (localStorage) {
        localStorage.setItem(key, value);
        return true;
    }
    return false;
};

export const removeFromLocalStorage = (key) => {
    if (localStorage) {
        localStorage.removeItem(key);
        return true;
    }
    return false;
};


export const getFromLocalStorage = (key) => {
    let value = null;
    if (localStorage) {
        value = localStorage.getItem(key) || null;
    }
    return value;
};

let authToken = null;

export const getAuthToken = () => {
    if (!authToken) {
        authToken = getFromLocalStorage('token');
    }
    return authToken;
};

export const setAuthToken = (token) => {
    authToken = token;
    setToLocalStorage('token', token);
};

// const validate = (value, key) => {
//     let error = '';
//     if (key === 'email' && !emailReg.test(value)) {
//         error = 'Please check your email address'
//     } else if (key === 'password' && !passwordReg.test(value)) {
//         error = 'Please check your email address';
//     }
//     return error;
// }

// export const validations = (signinData, params) => {
//     const errorArray = []
//     params.forEach((key) => {
//         const output = validate(signinData[key], key);
//         if (output) {
//             errorArray.push(output)
//         }
//     });
//     return errorArray;
// }

export const getUserType = (type, userTypes) => {
    switch (type) {
        case "SUPERADMIN":
            return userTypes.includes(type);
        case 'COMPANYADMIN':
            return userTypes.includes(type);
        default:
            return false
    }
}

export const getSortedArray = (arrayToSort) => {
    const sortedArray = arrayToSort.sort(
        (a, b) => String(a.firstName).toLowerCase()
            .concat(" ")
            .concat(String(a.lastName).toLowerCase())
            .localeCompare(String(b.firstName).toLowerCase()
                .concat(" ")
                .concat(String(b.lastName)))
    )
    return sortedArray
}

export const getSortedQuotes = (arrayToSort) => {
    const sortedArray = arrayToSort.sort(
        (a, b) =>  String(a.text).toLowerCase()
        .localeCompare(String(b.text).toLowerCase())
    )
    return sortedArray
}

export const sortArrayWithDate = (arrayToSort) => {
    const sortedArray = arrayToSort.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created) - new Date(a.created);
      });
      return sortedArray
}


export const getSortedMeetings = (arrayToSort) => {
    const sortedArray = arrayToSort.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return sortedArray
}

// export const getImagePath = (path) => `${process.env.PUBLIC_URL}/images/${path}`;

// export const getOraclePath = (bucket) => `${process.env.ORACLE_URL}/n/${process.env.NAMESPACE}/b/${getEnvValue(bucket)}/o/`;