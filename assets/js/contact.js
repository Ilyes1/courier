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
		} else if (vehicleType === 'bike') {
		  totalCost += standardPickupCost - bikeDiscount + bikeMileCost * distanceInMiles;
		  totalCost += weight <= 10 ? additionalItemCostUnder10kg * (numItems - 1) : additionalItemCostOver10kg * (numItems - 1);
		}
	  
		return totalCost.toFixed(2);
	}

    // Set up an event listener for the contact form.
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		const vehicleType = $('#carType').val().toLowerCase(); // 'car', 'van', or 'bike'
		const weight = $('#weight').val(); // in kg
		const distanceInMiles = $('#distance').val();
		const numItems = $('#numItems').val();

		const deliveryCost = calculateDeliveryCost(vehicleType, weight, distanceInMiles, numItems)

		alert(deliveryCost)

			///////// $(formMessages).removeClass('alert-danger');
			///////// $(formMessages).addClass('alert-success');

			// Set the message text.
			///////// $(formMessages).text('Form submitted successfully! Expect your free quotation soon.');



		// Serialize the form data.
		// var formData = $(form).serialize();
		// // Submit the form using AJAX.
		// $.ajax({
		// 	type: 'POST',
		// 	url: $(form).attr('action'),
		// 	data: formData
		// })
		// .done(function(response) {
		// 	// Make sure that the formMessages div has the 'success' class.
		// 	$(formMessages).removeClass('alert-danger');
		// 	$(formMessages).addClass('alert-success');

		// 	// Set the message text.
		// 	$(formMessages).text(response);

		// 	// Clear the form.
		// 	$('#firstname').val('');
		// 	$('#lastname').val('');
		// 	$('#phone').val('');
		// 	$('#email').val('');
		// 	$('#message').val('');
		// })
		// .fail(function(data) {
		// 	// Make sure that the formMessages div has the 'error' class.
		// 	// $(formMessages).removeClass('alert-success');
		// 	$(formMessages).addClass('alert-success');

		// 	// Set the message text.
		// 	if (data.responseText !== '') {
		// 		$(formMessages).text(data.responseText);
		// 	} else {
		// 		$(formMessages).text('Oops! An error occured and your message could not be sent.');
		// 	}
		// });

	});

});