var requestBody = context.getVariable("request.content");

if (requestBody) {
    try {
        var parsedBody = JSON.parse(requestBody);
        var name = parsedBody.name;
        var dob = parsedBody.dob;
        var securityQuestion = parsedBody.securityQuestion;

        var xmlContent = 
            '<User>' +
                '<Name>' + name + '</Name>' +
                '<DOB>' + dob + '</DOB>' +
                '<SecurityQuestion>' + securityQuestion + '</SecurityQuestion>' +
            '</User>';

        context.setVariable("request.content", xmlContent);
        context.setVariable("request.headers.content-type", "application/xml");
    } catch (e) {
        context.setVariable("error", "Invalid JSON");
    }
} else {
    context.setVariable("error", "Empty Body");
}
