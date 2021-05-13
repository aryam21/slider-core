module.exports = function generate_output(res, data, error=false, message="success", statusCode=200){
    let output = {
        "error": error,
        "msg": message,
        "data": data
    };
    return res.status(statusCode).json(output);
}
