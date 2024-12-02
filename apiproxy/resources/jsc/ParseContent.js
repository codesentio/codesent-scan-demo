var requestBody = context.getVariable("request.content");

if (requestBody) {
    try {
        var parsedBody = JSON.parse(requestBody);

        var name = parsedBody.name;
        var dob = parsedBody.dob;
        var securityQuestion = parsedBody.securityQuestion;

        var nameRegex = /^[a-zA-Z\s]+$/;
        var dobRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!name || !nameRegex.test(name)) {
            throw new Error("Invalid name format");
        }
        if (!dob || !dobRegex.test(dob)) {
            throw new Error("Invalid date of birth format");
        }
        if (!securityQuestion) {
            throw new Error("Invalid security question format");
        }

        var newJson = {
            fullName: name,
            dateOfBirth: dob,
            secretQuestion: securityQuestion
        };

        var newJsonString = JSON.stringify(newJson);

        context.setVariable("request.content", newJsonString);
        context.setVariable("request.headers.content-type", "application/json");
    } catch (e) {
        context.setVariable("error", e.message || "Invalid JSON");
    }
} else {
    context.setVariable("error", "Empty Body");
}
