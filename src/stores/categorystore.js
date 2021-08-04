import Store from '../libs/store';
import {
    getEnvValue,
} from '../utils';
// import { email, password } from 'constants/regex';


const CategoryStore = new Store({},
[
    {
        label: 'GetAllCategories',
        request: {
            url: `${getEnvValue('API_URL')}/api/category/getcategory`,
            method: 'get',
        },
        error: (error) => {
            return error;
        },
        parse: (output) => {
            return output;
        },
    }
]);

export default CategoryStore;
