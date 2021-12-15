//#region Outline removed for mouse
(function(document, window){
	if (!document || !window) {
		return;
	}
	
	var styleText = '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
	var unfocus_style = document.createElement('STYLE');

	window.unfocus = function(){
		document.getElementsByTagName('HEAD')[0].appendChild(unfocus_style);

		document.addEventListener('mousedown', function(){
			unfocus_style.innerHTML = styleText+'}';
		});
		document.addEventListener('keydown', function(){
			unfocus_style.innerHTML = '';
		});
	};

	unfocus.style = function(style){
		styleText += style;
	};

	unfocus();
})(document, window);
//#endregion

const carousels = document.getElementsByClassName("carousel");
let carouselsObjects = [];

const frequency = 5000;

function createCarousels(carousel) {
	let c = {
		"imgs": carousel.getElementsByTagName("img"),
		"leftBtn": carousel.getElementsByClassName("leftButton")[0],
		"rightBtn": carousel.getElementsByClassName("rightButton")[0],
		"idx": 0,
		"interval": 0,
		runCarousel: function() {
			c["idx"]++;
			changeImage(c);
		}
	}
	c["interval"] = setInterval(c.runCarousel, frequency);
	carouselsObjects.push(c);
}

for (let item of carousels) {
    createCarousels(item);
}

function runCarousel(carousel) {
    carousel["idx"]++;
    changeImage(carousel);
}

function changeImage(carousel) {
	if (carousel["idx"] > carousel["imgs"].length - 1) {
		carousel["idx"] = 0;
	}
	else if (carousel["idx"] < 0)
	{
		carousel["idx"] = carousel["imgs"].length - 1;
	}

	let parent = carousel["imgs"][0].parentElement;
	parent.style.transform = `translateX(${-carousel["idx"] * carousel["imgs"][carousel["idx"]].width}px`;
}


function resetInterval(carousel) {
    clearInterval(carousel["interval"]);
    carousel["interval"] = setInterval(carousel.runCarousel, frequency);
}

function listenBtns(carousel) {
	carousel["leftBtn"].addEventListener("click", () => {
		carousel["idx"]--;
		changeImage(carousel);
		resetInterval(carousel);
	});
	carousel["rightBtn"].addEventListener("click", () => {
		carousel["idx"]++;
		changeImage(carousel);
		resetInterval(carousel);
	});
}

carouselsObjects.forEach(listenBtns);

