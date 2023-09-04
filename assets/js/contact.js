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

	// Get the current day
	const currentDate = new Date();
	const currentDay = currentDate.getDay();

	function calculateDeliveryCost(vehicleType, distance, type) {
		const basePriceCar = 8.50;
		const basePriceBike = basePriceCar - 1.00;
		const mileagePriceCar = 2.20;
		const mileagePriceBike = 1.50;
		const priceMultiplierVan = 1.7;
		const priceMultiplierLargeVan = 2.1;
		const priceMultiplierPriority = 1.65;
		const priceMultiplierTimed = 1.3;
		const priceMultiplierWeekend = 1.5;
		const priceMultiplierHoliday = 2.0;
	
		let price = 0;
	
		switch (vehicleType) {
			case 'car':
				price = basePriceCar + (distance * mileagePriceCar);
				break;
			case 'van':
				price = (basePriceCar + (distance * mileagePriceCar)) * priceMultiplierVan;
				break;
			case 'large van':
				price = (basePriceCar + (distance * mileagePriceCar)) * priceMultiplierLargeVan;
				break;
			case 'bike':
				price = (basePriceBike + (distance * mileagePriceBike));
				break;
		}
	
		if (currentDay === 0 || currentDay === 6) {
			price *= priceMultiplierWeekend;
		}
	
		// if (isHoliday) {
		// 	price *= priceMultiplierHoliday;
		// }

		if (type == 'Priority') {
			price *= priceMultiplierPriority;
		} else if (type == 'Timed') {
			price *= priceMultiplierTimed;
		}
	
		return price.toFixed(2); // Round to 2 decimal places for currency
	}

	// function calculateDeliveryCost(vehicleType, distance, type) {
	// 	const standardCarPrice = 7;
	// 	const vanMultiplier = 1.7;
	// 	const largeVanMultiplier = 2.1;
	// 	const bikeDiscount = 1;
	// 	const priorityMultiplier = 1.5;
	// 	const timedMultiplier = 1.3;
	// 	const firstMilePrice = 2.2;

	// 	let basePrice = 0;
		
	// 	switch (vehicleType) {
	// 		case 'car':
	// 		basePrice = standardCarPrice;
	// 		break;
	// 		case 'van':
	// 		basePrice = standardCarPrice * vanMultiplier;
	// 		break;
	// 		case 'large van':
	// 		basePrice = standardCarPrice * largeVanMultiplier;
	// 		break;
	// 		case 'bike':
	// 		basePrice = standardCarPrice - bikeDiscount;
	// 		break;
	// 		default:
	// 		return "Invalid vehicle type";
	// 	}

	// 	let additionalPricePerMile = 0;
	// 	if (distance > 1) {
	// 		additionalPricePerMile = (vehicleType === 'bike') ? 1.5 : firstMilePrice;
	// 	}

	// 	let totalPrice = basePrice + additionalPricePerMile * (distance - 1);
		
	// 	if (type == 'Priority') {
	// 		totalPrice *= priorityMultiplier;
	// 	} else if (type == 'Timed') {
	// 		totalPrice *= timedMultiplier;
	// 	}

	// 	return totalPrice.toFixed(2);
	// }



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
					collection_time: $('#c-time').val(),
					delivery_time: $('#d-time').val(),
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

		var cTime = $('#c-time').val()
        var dTime = $('#d-time').val()
		
		// Parse the input times into Date objects
		const date1 = new Date(`2023-08-29T${cTime}:00`);
		const date2 = new Date(`2023-08-29T${dTime}:00`);
		
		// Add 30 minutes (30 * 60 seconds) to date1
		date1.setSeconds(date1.getSeconds() + 30 * 60);
		
		// Compare the two times
		// if (date1 < date2) {
		// 	///
		// } else {
		// 	$('.terms-error').text('Please select a delivery time that is at least 30 minutes later than the collection time.').addClass('active')
		// 	setTimeout(() => {
		// 		$('.terms-error').removeClass('active')
		// 	}, 3000);
		// }

		// if ($('.terms-check').prop('checked')) {
		// 	// calculator()
		// } else {
		// 	$('.terms-error').text('Please agree to the terms & conditions').addClass('active')
		// 	setTimeout(() => {
		// 		$('.terms-error').removeClass('active')
		// 	}, 3000);
		// }

		if($('#phone').val().length < 6) {
				$('.terms-error').text('Please enter a valid phone number').addClass('active')
				setTimeout(() => {
					$('.terms-error').removeClass('active')
				}, 3000);
		} else {
			if ($('.terms-check').prop('checked') && $('#type').val() !== 'Timed' || $('.terms-check').prop('checked') && $('#type').val() == 'Timed' && date1 <= date2) {
				calculator()
			} else if ($('#type').val() == 'Timed' && date1 <= date2 !== true) {
				$('.terms-error').text('Please select a delivery time that is at least 30 minutes later than the collection time.').addClass('active')
				setTimeout(() => {
					$('.terms-error').removeClass('active')
				}, 3000);
			} else if (!$('.terms-check').prop('checked')) {
				$('.terms-error').text('Please agree to the terms & conditions').addClass('active')
				setTimeout(() => {
					$('.terms-error').removeClass('active')
				}, 3000);
			}
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



	$('.application-form').submit(function(e) {
		e.preventDefault()

		// alert($('#ukLicense').is(':checked'))

		const data = {
			name: $('#name').val(),
			surname: $('#surname').val(),
			address: $('#address').val(),
			postcode: $('#postcode').val(),
			license: $('#ukLicense').is(':checked') ? 'UK' : 'EU',
			vehicle: $('#vehicle span').text(),
			phone: $('#phone').val(),
			email: $('#email').val()
		};

		emailjs.send('service_5ibjqp3', 'template_kfwsjyp', data)
		.then(function(response) {
			window.location.pathname = '/application-success.html'
		}, function(error) {
			console.log('FAILED...', error);
		});

	})
	

});