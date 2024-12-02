var requestBody = context.getVariable("request.content");

if (requestBody) {
    try {
        var parsedBody = JSON.parse(requestBody);

        var name = parsedBody['name'];
        var dob = parsedBody['dob'];
        var securityQuestion = parsedBody['securityQuestion'];

        var nameRegex = /^[a-zA-Z\s]+$/;
        var dobRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!nameRegex.test(name)) {
            throw new Error("Invalid name format");
        }
        if (!dobRegex.test(dob)) {
            throw new Error("Invalid date of birth format");
        }
        if (!securityQuestion) {
            throw new Error("Invalid security question format");
        }

        parsedBody['dateOfBirth'] = dob;

        var updJsonString = JSON.stringify(parsedBody);

        context.setVariable("request.content", updJsonString);
        context.setVariable("request.headers.content-type", "application/json");
    } catch (e) {
        context.setVariable("error", "Invalid JSON");
    }
} else {
    context.setVariable("error", "Empty Body");
}
