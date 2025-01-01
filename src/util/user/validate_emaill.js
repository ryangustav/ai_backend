const validator = require("email-validator");

function validate(email) {
    const valid = validator.validate(email)

    return valid;
}

module.exports = validate;