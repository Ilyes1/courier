/*
*
* Contact JS
* @ThemeEaster
*/
$(function() {
    // Get the form.
    var form = $('#ajax_contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

	function calculateDeliveryCost(vehicleType, weight, distanceInMiles, numItems) {
		const standardPickupCost = 7;
		const standardMileCost = 2.2;
		const additionalItemCostUnder10kg = 1.1;
		const additionalItemCostOver10kg = 2.2;
		const vanMultiplier = 1.75;
		const bikeDiscount = 1;
		const bikeMileCost = 1.5;
	  
		let totalCost = 0;
	  
		if (vehicleType === 'car') {
		  totalCost += standardPickupCost + standardMileCost * distanceInMiles;
		  totalCost += weight <= 10 ? additionalItemCostUnder10kg * (numItems - 1) : additionalItemCostOver10kg * (numItems - 1);
		} else if (vehicleType === 'van') {
		  totalCost += (standardPickupCost + standardMileCost * distanceInMiles) * vanMultiplier;
		  totalCost += weight <= 10 ? additionalItemCostUnder10kg * (numItems - 1) : additionalItemCostOver10kg * (numItems - 1);
		} else if (vehicleType === 'large van') {
			totalCost += (standardPickupCost + standardMileCost * distanceInMiles) * vanMultiplier;
			totalCost += weight <= 10 ? additionalItemCostUnder10kg * (numItems - 1) : additionalItemCostOver10kg * (numItems - 1);
		} else if (vehicleType === 'bike') {
		  totalCost += standardPickupCost - bikeDiscount + bikeMileCost * distanceInMiles;
		  totalCost += weight <= 10 ? additionalItemCostUnder10kg * (numItems - 1) : additionalItemCostOver10kg * (numItems - 1);
		}
	  
		return totalCost.toFixed(2)
	}



	function calculator() {
		const vehicleType = $('#carType span').text().toLowerCase(); // 'car', 'van', or 'bike'
		const weight = $('#weight').val(); // in kg
		const distanceInMiles = $('#distance').val();
		const numItems = $('#numItems').val();

		
		
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
				var price = calculateDeliveryCost(vehicleType, weight, distance, numItems)
				var message = `
Distance: ${distance} miles 
Price: £${price}`
			  	alert(message)
		  }
		  
        });
	}

    // Set up an event listener for the contact form.
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
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
		const standardFirstMileCharge = 7;
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
			  }
			  
			});
		} else {
			$('.terms-error').addClass('active')
			setTimeout(() => {
				$('.terms-error').removeClass('active')
			}, 3000);
		}
		
		

	})

});