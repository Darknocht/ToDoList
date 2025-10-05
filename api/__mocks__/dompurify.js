module.exports = function createDOMPurify() {
    //Avoid crashing for GitHub Actions
    return {
        sanitize: (input) => input.replace(/<script.*?>.*?<\/script>/gi, '')
    };
};