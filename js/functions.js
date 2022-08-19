function is_empty(str) {
    return (!str || 0 === str.length);
}

function is_number(str) {
    return !isNaN(str);
}

function is_phone(str) {
    return str.length == 8;
}

function is_date(str) {
    return !isNaN(Date.parse(str));
}

function is_positive(str) {
    return parseInt(str) > 0;
}

function is_valid_date(str) {
    return is_date(str) && new Date(str) < new Date();
}

function is_valid_phone(str) {
    return is_phone(str);
}

function is_valid_number(str) {
    return is_number(str);
}

function is_valid_positive(str) {
    return is_positive(str);
}

function is_valid_empty(str) {
    return is_empty(str);
}