import { registerHandlers } from 'libs/fetch';

registerHandlers('pre', (url, options) => {
    const output = options;
    let { headers } = options;
    if (!headers) {
        headers = {};
    }
    output.headers = headers;
    return options;
});
