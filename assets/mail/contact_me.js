// @ts-ignore
$(function () {
    // @ts-ignore
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    // @ts-ignore
    ).jqBootstrapValidation({
        preventSubmit: true,
        // @ts-ignore
        // @ts-ignore
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        // @ts-ignore
        // @ts-ignore
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            // @ts-ignore
            var name = $("input#name").val();
            // @ts-ignore
            var email = $("input#email").val();
            // @ts-ignore
            var phone = $("input#phone").val();
            // @ts-ignore
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            // @ts-ignore
            if (firstName.indexOf(" ") >= 0) {
                // @ts-ignore
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            // @ts-ignore
            $this = $("#sendMessageButton");
            // @ts-ignore
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            // @ts-ignore
            $.ajax({
                url: "/assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                cache: false,
                success: function () {
                    // Success message
                    // @ts-ignore
                    $("#success").html("<div class='alert alert-success'>");
                    // @ts-ignore
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    // @ts-ignore
                    $("#success > .alert-success").append(
                        "<strong>Votre message a été envoyé</strong>"
                    );
                    // @ts-ignore
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    // @ts-ignore
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    // Fail message
                    // @ts-ignore
                    $("#success").html("<div class='alert alert-danger'>");
                    // @ts-ignore
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    // @ts-ignore
                    $("#success > .alert-danger").append(
                        // @ts-ignore
                        $("<strong>").text(
                            "Désolé " +
                                firstName +
                                ", on dirait que notre serveur ne repond pas...essayez plus tard."
                        )
                    );
                    // @ts-ignore
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    // @ts-ignore
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        // @ts-ignore
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            // @ts-ignore
            return $(this).is(":visible");
        },
    });

    // @ts-ignore
    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        // @ts-ignore
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
// @ts-ignore
$("#name").focus(function () {
    // @ts-ignore
    $("#success").html("");
});
