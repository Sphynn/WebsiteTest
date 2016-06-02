// JavaScript Document

$(document).ready(function(){
	"use strict";

	var animating = false,
		submitPhase1 = 1100,
		submitPhase2 = 400,
		logoutPhase1 = 800,
		$login = $(".login"),
		$app = $(".app");

	function ripple(elem, e){
		$(".ripple").remove();
		var elTop = elem.offset().top,
			elLeft = elem.offset().left,
			x = e.pageX - elLeft,
			y = e.pageY - elTop;
		var $ripple = $("<div class='ripple'></div>");
		$ripple.css({top: y, left: x});
		elem.append($ripple);
	}
	
	function loginAnim(elem, e){
		if(animating){
			return;
		}
		animating = elem;
		var that = elem;
		ripple(elem, e);
		$(that).addClass("processing");
		setTimeout(function(){
			$(that).addClass("success");
			setTimeout(function(){
				$app.show();
				$app.css("top");
				$app.addClass("active");
			}, submitPhase2 - 70);
			setTimeout(function(){
				$login.hide();
				$login.addClass("inactive");
				animating = false;
				$(that).removeClass("success processing");
			}, submitPhase2);
		}, submitPhase1);
	}
	
	function logoutAnim(elem){
		if (animating){
			return;
		}
		$(".ripple").remove();
		animating = elem;
		var that = elem;
		$(that).addClass("clicked");
		setTimeout(function(){
			$app.removeClass("active");
			$login.show();
			$login.css("top");
			$login.removeClass("inactive");
		}, logoutPhase1 - 120);
		setTimeout(function(){
			$app.hide();
			animating = false;
			$(that).removeClass("clicked");
		}, logoutPhase1);
	}


	$(document).on("click", ".login_submit", function(e){
		var elem = $(this);
		var form = $('#loginForm').serialize();
		$.ajax({
			type: "POST",
			url: "process_login.php",
			data: form
		})
		.done(function(data){
			if(data && data.message === true){
				loginAnim(elem, e);
				console.log('Login Success', data);
			}
			else{
				console.log('Login Failed', data);
			}
		})
		.fail(function(){
			var Message = "An error occurred while trying to load your content.";
			console.log(Message);
		})
		.always(function(){
		});
	});

	$(document).on("click", ".app_logout", function(){
		var elem = $(this);
		logoutAnim(elem);
		console.log('Logout');
	});

});
