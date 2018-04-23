// Tab Panels
$(document).ready(function(){

	let tabs = {

		tabContainers: $('div.tabs > div'),
		tabLinks: $('div.tabs ul.tabNavigation a'),


		// Initializes the tabs
		initialize: function() {
			this.activateFirstTab();
			this.bindClickHandler();
		},

		/**
		 * Binds a click handler that switches tabs
		 */
		bindClickHandler: function() {
			const self = this;

			this.tabLinks.click(function(event) {

				// Set the last active tab container
				const lastTab = self.tabContainers.parent().find('.active');

				// Set the target tab (the one with the target hash)
				const target = self.tabContainers.filter(event.target.hash);

				// Ignore if user clicks on active tab
				if ( lastTab.index() === target.index() ) {
					return false;
				}

				// Deactivate the last tab
				lastTab.removeClass('active');
				
				// Determine the animation direction (from right to left or from left to right)
				const animationDirecton = lastTab.index() < target.index() ? 'right' : 'left';

				// Add exiting animation
				TweenLite.to(lastTab.find('.wrapper'), 0.3, {
					ease: Power2.easeIn,
					transform: animationDirecton == 'right' ? 'translateX(-90px)' : 'translateX(90px)',
					opacity: 0,

					// Enter animation starts when the exiting animation is complete
					onComplete: function() {
						lastTab.hide();

						// Show the target tab
						target.show();
						target.addClass('active');

						// Set initial position
						target.find('.wrapper').css('transform', animationDirecton == 'right' ? 'translateX(90px)' : 'translateX(-90px)');

						// Add enter animation using GSAP
						TweenLite.to(target.find('.wrapper'), 0.3, {
							ease: Power2.easeOut,
							transform: 'translateX(0)',
							opacity: 1,
						});

						// remove class="selected" from all tabs
						self.tabLinks.removeClass('selected');

						// set class="selected" on the tab that was just clicked
						$(event.target).addClass('selected');
					}
				});
				
				// stop following links
				event.preventDefault();
			});
		},

		/**
		 * Activates the first tab when page is loaded
		 */
		activateFirstTab: function() {
			this.tabLinks.first().addClass('selected');

			// Hide all tab containers
			this.tabContainers.hide();

			// Animate in the first tab
			const firstTab = this.tabContainers.filter(':first');
			firstTab.show();
			TweenLite.to(firstTab.find('.wrapper'), 0.3, {
				transform: 'translateX(0)',
				opacity: 1,
			});
			firstTab.addClass('active');
		},

	};

	tabs.initialize();

});