'use strict';

(function () {

	'use strict';

	angular.module('app').factory('AuthenticationFactory', function () {

		// ------------------------------------------------------------
		// Name: getAuthenticatedUser
		// Abstract: Checks if user is already logged in, and returns
		//			 either an authenticated or unauthenticated user
		// ------------------------------------------------------------
		var getAuthenticatedUser = function getAuthenticatedUser() {
			// Default user as unauthenticated
			var authenticatedUser = {
				isAuthenticated: false
			};

			// If an authenticated user exists, load details
			if (localStorage.getItem('authenticatedUser')) {
				// Get authenticated user details
				var user = JSON.parse(localStorage.getItem('authenticatedUser'));

				// Load details into authenticatedUser object
				authenticatedUser.isAuthenticated = true;
				authenticatedUser.username = user.username;
				authenticatedUser.loginDate = user.loginDate;
			}

			// Return either authenticated user or unauthenticated user
			return authenticatedUser;
		};

		// ------------------------------------------------------------
		// Name: setAuthenticatedUser
		// Abstract: Saves an authenticated user in localStorage
		// ------------------------------------------------------------
		var setAuthenticatedUser = function setAuthenticatedUser(user) {
			localStorage.setItem('authenticatedUser', JSON.stringify(user));
		};

		// ------------------------------------------------------------
		// Name: unauthenticateUser
		// Abstract: Removes a users login state
		// ------------------------------------------------------------
		var unauthenticateUser = function unauthenticateUser() {
			// Set user back to default unauthenticated state
			var authenticatedUser = {
				isAuthenticated: false
			};

			// Remove user from localStorage
			localStorage.removeItem('authenticatedUser');

			// Return back unauthenticated user
			return authenticatedUser;
		};

		return {
			getAuthenticatedUser: getAuthenticatedUser,
			setAuthenticatedUser: setAuthenticatedUser,
			unauthenticateUser: unauthenticateUser
		};
	});
})();