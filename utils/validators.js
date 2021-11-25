const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regEx)) return true
    else return false
}

const isEmpty = (string) => {
    if (string.trim() === '') return true
    else return false
}

const minPasswordSymbols = (password) => {
    return password.length > 4
}


const validateSignupData = (data) => {
    const errors = {}
    const {email, password, confirmPassword, firstName, lastName} = data

    if (isEmpty(email)) {
        errors.email = 'email is empty'
    } else if (!isEmail(email)) {
        errors.email = 'must be valid email address'
    }
    if (isEmpty(password)) {
        errors.password = 'password is empty'
    } else if (!minPasswordSymbols(password)) {
        errors.password = 'password must > 4 symbols'
    }
    if (confirmPassword !== password) {
        errors.confirmPassword = 'password must match'
    }

    if (isEmpty(firstName)) {
        errors.firstName = "firstName is empty"
    }
    if (isEmpty(lastName)) {
        errors.lastName = "lastName is empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

const validateLoginData = (data) => {
    const errors = {}
    if (isEmpty(data.email)) {
        errors.email = 'email is empty'
    }
    if (isEmpty(data.password)) {
        errors.password = 'password is empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

const validateLoginDataPassword = (data) => {
    const errors = {}
    if (data.isMatch === false) {
        errors.isMatch = 'password must match'
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

const validateUserDetails = (data) => {
    const errors = {}

    if (isEmpty(data.firstName.trim())) {
        errors.firstName = 'firstName is empty'
    }

    if (isEmpty(data.lastName.trim())) {
        errors.lastName = 'lastName is empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

const validatePostDetails = (data) => {
    const errors = {}

    if (isEmpty(data.body.trim())) {
        errors.body = 'body is empty'
    }
    if (isEmpty(data.expirationDate.trim())) {
        errors.expirationDate = 'expirationDate is empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}


module.exports = {
    validateSignupData,
    validateLoginData,
    validateLoginDataPassword,
    validateUserDetails,
    validatePostDetails
}

