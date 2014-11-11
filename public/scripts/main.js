var renderProduct = function(productData){

	// Generate a new Product item via jQuery
	var el = $('<li>');

	// Set an attribute on the main containing
	// <li> that will let us access the product's
	// specific database ID
	el.attr('data-id', productData._id);

	// Append elements to the <li>
	el.append('- ' + productData.manufacturer + ' ' + productData.product + '<span class="deleteProduct glyphicon glyphicon-remove></span>');

	// Append some action items to this track
	el.append('<button class="btn btn-danger delete">Delete</button>');
	// <a href="/view/myidhere">View</a>
	// el.append('<a class="btn btn-info" href="/view/' + trackData._id + '">View</a>');
	// Add an edit button too
	el.append('<button class="btn btn-success edit">Edit</button>');

	// Give the new element back to the caller
	return el;
};

$(document).on('ready', function(){

	$('#new-product').on('submit', function(e){
		e.preventDefault();
		$('#new-product-modal').modal('hide');
		// Pull out the values from the form fields manually
		var productManufacturer  = $(this).find('[name=manufacturer]').val();
		var productName = $(this).find('[name=product]').val();
		
		// Build an object out of that data
		var productData = {
			manufacturer: productManufacturer,
			product: productName
		};

		// Print the trackData object to browser
		// console for debugging purposes
		console.log(productData);

		// Make a POST request to the server and send
		// it the trackData object
		$.post('/api/addProduct', productData, function(responseData){
			console.log('responseData', responseData);
			// When the server is done saving the track,
			// it'll send us back the track information
			// that it saved into the database, so
			// we just need to append it to the view
			var productEl = renderProduct(responseData);
			$('#product-list').append(productEl);
		});

	});

	/**
	 * Used to remove a specific product item from DOM
	 * @return {} when remove button is clicked
	 */
	$(document).on('click', '.deleteProduct', function(e){
		e.preventDefault();
		var dataId= $(this).closest('li').data('id');
		console.log(dataId)
		$(this).closest('li').remove();
		$.ajax({
			url: '/api/removeProduct/' + dataId,
			type: "delete",
			success: function(data) {
				console.log(data)
			}
		})
	});

});