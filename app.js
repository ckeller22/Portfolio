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
