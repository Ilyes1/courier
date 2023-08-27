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
		const standardCarPrice = 7;
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
		
		
		var originAddress = $('#address-1').val();
		var destinationAddress = $('#address-2').val();
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
					collection_address: $('#address-1').val(),
					collection_postcode: $('#c-postcode').val(),
					delivery_address: $('#address-2').val(),
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


	function calculateMultiDropCharge(numStops, totalDistanceMiles, vehicleType, itemsWeight, isWeekend, isPriorityBooking, isOutOfHours) {
		const standardFirstMileCharge = 8.5;
		const perMileCharge = 2.20;
		const additionalItemCharge = 1.20;
		const vanMultiplier = 1.75;
		const extraLargeVanMultiplier = 2.0;
		const weightThreshold = 10;
		const additionalWeightCharge = 5;
		const bikeDiscount = 1;
		const weekendSurcharge = 2;
		const priorityBookingMultiplier = 0.75;
		const outOfHoursChargeWeekday = 12.50;
		const outOfHoursChargeWeekend = 15;
	
		let totalCharge = 0;
	
		if (vehicleType === 'van') {
			totalCharge = (standardFirstMileCharge + (totalDistanceMiles - 1) * perMileCharge) * vanMultiplier;
		} else if (vehicleType === 'large van') {
			totalCharge = (standardFirstMileCharge + (totalDistanceMiles - 1) * perMileCharge) * extraLargeVanMultiplier;
		} else {
			totalCharge = (standardFirstMileCharge - bikeDiscount + (totalDistanceMiles - 1) * perMileCharge);
		}
	
		if (itemsWeight > weightThreshold) {
			totalCharge += (itemsWeight - weightThreshold) * additionalWeightCharge;
		}
	
		totalCharge += (numStops - 1) * additionalItemCharge;
	
		if (isWeekend) {
			totalCharge += weekendSurcharge;
		}
	
		if (isPriorityBooking) {
			totalCharge *= (1 + priorityBookingMultiplier);
		}
	
		if (isOutOfHours) {
			if (isWeekend) {
				totalCharge += outOfHoursChargeWeekend;
			} else {
				totalCharge += outOfHoursChargeWeekday;
			}
		}
	
		return totalCharge;
	}


	$('#multiDropsForm').submit(function(e) {

		e.preventDefault()

		const vehicleType = $('#carType span').text().toLowerCase(); // 'car', 'van', or 'bike'
		const weight = $('#weight').val(); // in kg
		const distanceInMiles = $('#distance').val();
		const numItems = $('#numItems').val();

		const numStops = $('#numStops').val();
		const isWeekend = $('#weekendCheck').prop('checked');
		const isPriorityBooking = $('#priorityCheck').prop('checked');
		const isOutOfHours = $('#outCheck').prop('checked');


		if ($('.terms-check').prop('checked')) {
			var originAddress = $('#address-1').val();
			var destinationAddress = $('#address-2').val();
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
					var price = calculateMultiDropCharge(numStops, distance, vehicleType, weight, isWeekend, isPriorityBooking, isOutOfHours)
					var message = `
Distance: ${distance} miles 
Price: £${price}`
					alert(message)
					window.location.pathname = '/quotation-success.html'
			  }
			  
			});
		} else {
			$('.terms-error').addClass('active')
			setTimeout(() => {
				$('.terms-error').removeClass('active')
			}, 3000);
		}
		
		

	})



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
				alert('Message sent successfully')
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

        emailjs.send('service_mcguz7k', 'template_ci7zx4l', data)
		.then(function(response) {
            window.location.pathname = '/application-success.html'
		}, function(error) {
			console.log('FAILED...', error);
		});
          
        // Add one line to the sheet
        // fetch("https://sheet.best/api/sheets/359d117b-bf00-4e7b-bfad-346d05010bdb", {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then((r) => r.json())
        // .then((data) => {
        //     // The response comes here
        //     console.log(data);
        //     window.location.pathname = '/application-success.html'
        // })
        // .catch((error) => {
        //     // Errors are reported there
        //     console.log(error);
        // });

    })

});