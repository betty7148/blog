export function apiDomin(path) {
    console.log(process.env.NODE_ENV);
    const domin = process.env.NODE_ENV === 'production' ? 'http://www.qianyanxu.com/' : 'http://127.0.0.1:7001/';
    return domin + path;
}
