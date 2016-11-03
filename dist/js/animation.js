'use strict';

(function ($) {

  'use strict';

  var content = $('#content').smoothState({
    // onStart runs as soon as link has been activated
    onStart: {

      // Set the duration of our animation
      duration: 250,

      // Alterations to the page
      render: function render() {

        // Quickly toggles a class and restarts css animations
        content.toggleAnimationClass('is-exiting');
      }
    }
  }).data('smoothState'); // makes public methods available
})(jQuery);