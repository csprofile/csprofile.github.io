$(function () {
	var N1;
	var N2;
	
	//Check calc
	N1 = Math.floor(Math.random() * 5) + 1;
	N2 = Math.floor(Math.random() * 5) + 1;
	$("#calc").html("What is " + N1 + " + " + N2 + "?");
	
	
	//Contact form
	var $contactForm = $('#contactForm');
	$contactForm.submit(function(e) {
		e.preventDefault();
		if($("#InputReal").val() == N1 + N2){
			$.ajax({
				url: "https://formspree.io/wd.cristian@gmail.com",
				method: 'POST',
				data: $(this).serialize(),
				dataType: 'json',
				success: function(data) {
					$(".alert-danger").css({'display':'none'});
					$(".alert-success").css({'display':'block'});
					
					N1 = Math.floor(Math.random() * 5) + 1;
					N2 = Math.floor(Math.random() * 5) + 1;
					$("#calc").html("What is " + N1 + " + " + N2 + "?");
				},
				error: function(err) {
					$(".alert-success").css({'display':'none'});
					$(".alert-danger").css({'display':'block'});
				}
			});
		}else{
			$(".alert-success").css({'display':'none'});
			$(".alert-danger").css({'display':'block'});
		}
	});
});