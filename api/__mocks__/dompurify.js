/*module.exports = function createDOMPurify() {
    //Avoid crashing for GitHub Actions
    console.log("DOMPurify mock loaded");
    return {
        sanitize: (input) => input.replace(/<script.*?>.*?<\/script>/gi, '')
    };
};*/