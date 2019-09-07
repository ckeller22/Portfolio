function handleMail() {
	var name = $("#name").val();
	var email = $("#email").val();
	var desc = $("#description").val();

	var alertMessage = "";

	if (name.length <= 0) {
		alertMessage += "Please enter your name. \n";
	}
	if (!validateEmail(email)) {
		alertMessage += "Please enter a valid email address. \n";
	}
	if (desc.length <= 0) {
		alertMessage += "Please tell me about your project. \n";
	}
	if (alertMessage.length > 0) {
		alert(alertMessage);
	} else {
		$.ajax({
			type: "POST",
			url: "handleMail.php",
			data: {
				name: name,
				email: email,
				desc: desc
			},

			success: function(responseCode) {
				if (responseCode == 202) {
					hideForm();
				} else {
					alert(
						"Unfortunately an error has occured. Please wait and try again. \n" +
							responseCode
					);
				}
			},
			failure: function(data) {
				alert(
					"Unfortunately an error has occurred. Please wait and try again."
				);
			}
		});
	}
}

function hideForm() {
	$("#name").hide();
	$("#email").hide();
	$("#description").hide();
	$("#submit").hide();
	$("#emailSent").show("fast");
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

//scroll magic

const controller = new ScrollMagic.Controller();
var projectScroll;
var aboutScroll;

function createScroll() {
	projectScroll = new ScrollMagic.Scene({
		duration: "50%",
		triggerElement: ".projectTitle",
		triggerHook: 0.25
	})
		.setPin(".projectTitle")

		.addTo(controller);

	aboutScroll = new ScrollMagic.Scene({
		duration: "100%",
		triggerElement: ".aboutTitle",
		triggerHook: 0.25
	})
		.setPin(".aboutTitle")

		.addTo(controller);
}

function testScroll() {
	var w = document.documentElement.clientWidth;

	if (w <= 1365) {
		projectScroll.removePin(true);
		aboutScroll.removePin(true);
	} else {
		projectScroll.setPin(".projectTitle");
		aboutScroll.setPin(".aboutTitle");
	}
}

createScroll();
//let mediaQuery = window.matchMedia("(max-width: 600px");

window.addEventListener("resize", testScroll);

testScroll();
