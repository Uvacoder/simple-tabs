// Tab Panels
$(document).ready(function(){
	// grab all container panel DIVs
	var tabContainers = $('div.tabs > div');

	// hide them all, then show the first one
	

	// set the first tab to class="selected"
	$('div.tabs ul.tabNavigation a:first').addClass('selected');

	// Animate in the first tab
	const firstTab = tabContainers.hide().filter(':first');
	firstTab.show();
	TweenLite.to(firstTab.find('.wrapper'), 0.3, {
		transform: 'translateX(0)',
		opacity: 1,
	});
	firstTab.addClass('active');

	// add onclick handlers to all tabs
	$('div.tabs ul.tabNavigation a').click(function(){
		// hide active tabContainers
		//tabContainers.hide();
		let _this = this;
		let lastTab = $('.tabs>div.active');
		lastTab.removeClass('active');
		TweenLite.to(lastTab.find('.wrapper'), 0.3, {
			transform: 'translateX(-50px)',
			opacity: 0,
			onComplete: function() {
				lastTab.hide();
				// show only the tabContainer with the ID that matches the href for the A that was clicked
				//alert(this.hash);
				const target = tabContainers.filter(_this.hash);
				target.show();
				target.addClass('active');

				// Add enter animation using GSAP
				TweenLite.to(target.find('.wrapper'), 0.3, {
					transform: 'translateX(0)',
					opacity: 1,
				});

				// remove class="selected" from all tabs
				$('div.tabs ul.tabNavigation a').removeClass('selected');
				// set class="selected" on the tab that was just clicked
				$(_this).addClass('selected');
			}
		});

		
		// stop following links
		return false;
	});

});