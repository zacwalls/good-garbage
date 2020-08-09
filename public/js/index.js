$(document).ready(function() {
	// menu
	$('#menu').click(function(){
		$('#icon').toggleClass('close');

		if ($('.dropdown-content').hasClass('close')) {
			$('.dropdown-content').slideDown('slow');
			$('.dropdown-content').toggleClass('close');
		}
		else {
			$('.dropdown-content').slideUp();
			$('.dropdown-content').toggleClass('close');
		}
	});

	$('.dropdown-content a').click(function(event) {
		$('#icon').toggleClass('close');
		$('.dropdown-content').slideUp();
		$('.dropdown-content').toggleClass('close');

		if (this.hash !== '') {
			event.preventDefault();

			let hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 1000, function() {
				window.location.hash = hash;
			});
		}
	});

	// Slideshow
	var index = 1;
	var max = $('.slide').length + 1;

	$('.slide').hide();
	showSlide(index);

	function moveSlide(n) {
		showSlide(index += n);
	}

	function currentSlide(n) {
		showSlide(index = n);
	}

	function showSlide(n) {
		$('.slide').hide();
		$('.active').removeClass('active');

		if (index === 0) {
			index = max - 1;
		}

		else if (index === max) {
			index = 1;
		}

		$('.dot:nth-child(' + index + ')').addClass('active');
		$('.slide:nth-child(' + index + ')').fadeIn('slow');
	}

	$('.dot').click(function() {
		currentSlide($(this).attr('id'));
	});

	$('.close-btn, #menu').click(function() {
				$('.alert').css('opacity', '0');
	});


	// Zipcode check
	var zips = ['97203', '97217', '97211', 
				'97218', '97220', '97005', 
				'97024', '97060', '97229', 
				'97124', '97113', '97123', 
				'97132', '97140', '97070', 
				'97062', '97224', '97223', 
				'97008', '97225', '97210', 
				'97209', '97205', '97201', 
				'97239', '97219', '97034', 
				'97068', '97013', '97013', 
				'97035', '97212', '97232', 
				'97204', '97214', '97202', 
				'97222', '97267', '97027', 
				'97045', '97004', '97213', 
				'97215', '97206', '97216', 
				'97266', '97068', '97015', 
				'97233', '97236', '97030', 
				'97080', '97089', '97009', 
				'97005'
			   ];

	$('#check').click(function(event) {
		event.preventDefault();
		$('.msg').remove();

		if (zips.includes($('#zip').val())) {
			$('.servarea form').append('<p class="msg">We service you!</p>');
		}

		else if ($('#zip').val().length > 1) {
			$('.servarea form').append('<p class="msg">We do not service you.</p>');
		} else {
			$('.zip').css('opacity', '1');
		}
	});

	// contact form
	$('form').on('submit', (event) => {
		event.preventDefault();

		const fname = $('#fname').val().trim();
		const lname = $('#lname').val().trim();
		const email = $('#email').val().trim();
		const message = $('#message').val().trim();

		const data = {
			fname,
			lname,
			email,
			message
		};

		$.post('/email', data, function() {
			console.log('Data recieved');
		});

		$.ajax('/email', {
			type: 'POST',
			data: data,
			statusCode: {
				400: function() {
					$('.contact').css('opacity', '1');
				},
				500: function() {
					$('.contact').css('opacity', '1');
				}, 
				200: function() {
					$('.success').css('opacity', '1');
					$('form').trigger('reset');
				}
			}
		});
	}); 
});