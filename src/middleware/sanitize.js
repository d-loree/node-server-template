import xss from "xss";

// Recursive sanitizer
function sanitizeInput(input) {
    if (typeof input === "string") {
        return xss(input);
    } else if (Array.isArray(input)) {
        return input.map(sanitizeInput);
    } else if (typeof input === "object" && input !== null) {
        const sanitized = {};
        for (const key in input) {
            sanitized[key] = sanitizeInput(input[key]);
        }
        return sanitized;
    }
    return input;
}

function sanitizeMiddleware(req, res, next) {
    if (req.body) req.body = sanitizeInput(req.body);
    if (req.params) req.params = sanitizeInput(req.params);

    if (req.query) {
        const sanitized = sanitizeInput(req.query);
        for (const key in sanitized) {
            req.query[key] = sanitized[key];
        }
    }

    next();
}
export { sanitizeMiddleware };
