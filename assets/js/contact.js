/*
*
* Contact JS
* @ThemeEaster
*/
$(function() {

	emailjs.init('ajv0ohMpXvECxamAa');

    // Get the form.
    var form = $('#ajax_contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

	function calculateDeliveryCost(vehicleType, distance, type) {
		const standardCarPrice = 8.5;
		const vanMultiplier = 1.7;
		const largeVanMultiplier = 2.1;
		const bikeDiscount = 1;
		const priorityMultiplier = 1.5;
		const timedMultiplier = 1.3;
		const firstMilePrice = 2.2;

		let basePrice = 0;
		
		switch (vehicleType) {
			case 'car':
			basePrice = standardCarPrice;
			break;
			case 'van':
			basePrice = standardCarPrice * vanMultiplier;
			break;
			case 'large van':
			basePrice = standardCarPrice * largeVanMultiplier;
			break;
			case 'bike':
			basePrice = standardCarPrice - bikeDiscount;
			break;
			default:
			return "Invalid vehicle type";
		}

		let additionalPricePerMile = 0;
		if (distance > 1) {
			additionalPricePerMile = (vehicleType === 'bike') ? 1.5 : firstMilePrice;
		}

		let totalPrice = basePrice + additionalPricePerMile * (distance - 1);
		
		if (type == 'Priority') {
			totalPrice *= priorityMultiplier;
		} else if (type == 'Timed') {
			totalPrice *= timedMultiplier;
		}

		return totalPrice.toFixed(2);
	}



	function calculator() {


		const vehicleType = $('#carType span').text().toLowerCase();
		const type = $('#type').val()
		
		
		var originAddress = $('#c-postcode').val();
		var destinationAddress = $('#d-postcode').val();
		// const distance = calculateDistance(originAddress, destinationAddress);
		var service = new google.maps.DistanceMatrixService();
        
        service.getDistanceMatrix({
          origins: [originAddress],
          destinations: [destinationAddress],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
        }, function(response, status) {
          if (status !== 'OK') {
            console.log('Error:', status);
          } else {
				var distance = (response.rows[0].elements[0].distance.value / 1609).toFixed(2)
				var price = calculateDeliveryCost(vehicleType, distance, type)
				var message = `
Distance: ${distance} miles 
Price: £${price}`

				var templateParams = {
					name: $('#name').val(),
					email: $('#email').val(),
					phone_number: $('#phone').val(),
					vehicle: $('#carType span').text(),
					date: $('#date').val(),
					time: $('#time').val(),
					collection_address: $('#c-house-number').val(),
					collection_postcode: $('#c-postcode').val(),
					delivery_address: $('#d-house-number').val(),
					delivery_postcode: $('#d-postcode').val(),
					type: $('#type').val(),
					distance: `${distance} miles`,
					price: `£${price}`,
					notes: $('#notes').val()
				};
				
				emailjs.send('service_5ibjqp3', 'template_0g9dkri', templateParams)
				.then(function(response) {
						console.log('SUCCESS!', response.status, response.text);
						window.location.pathname = '/quotation-success.html'
				}, function(error) {
					console.log('FAILED...', error);
				});

				// window.location.pathname = '/quotation-success.html'
		  }
		  
        });
	}

    // Set up an event listener for the contact form.
	$(form).submit(function(event) {
		
		event.preventDefault();

		if ($('.terms-check').prop('checked')) {
			calculator()
		} else {
			$('.terms-error').addClass('active')
			setTimeout(() => {
				$('.terms-error').removeClass('active')
			}, 3000);
		}

	});






	$('#contactForm').submit(function(e) {
		e.preventDefault()

		var templateParams = {
			name: `${$('#firstname').val()} ${$('#last').val()}`,
			email: $('#email').val(),
			phone_number: $('#phone').val(),
			message: $('#message').val()
		};

		emailjs.send('service_5ibjqp3', 'template_bhj2bbm', templateParams)
		.then(function(response) {
				console.log('SUCCESS!', response.status, response.text);
				// alert('Message sent successfully')
				window.location.pathname = '/contact-success.html'
		}, function(error) {
			console.log('FAILED...', error);
		});
	})


	

});