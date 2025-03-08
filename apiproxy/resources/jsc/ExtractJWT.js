var authorizationHeader = context.getVariable("request.header.Authorization");

if (authorizationHeader) {
    var parts = authorizationHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
        var token = parts[1];
        context.setVariable("flow.jwt", token);
        context.removeVariable("request.header.Authorization")
    } else {
        throw new Error("Invalid token");
    }
} else {
    throw new Error("Missed token");
}
