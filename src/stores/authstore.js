import Store from '../libs/store';

// import { email, password } from 'constants/regex';


const AuthStore = new Store({
    authToken: null
},
[]);

export default AuthStore;
