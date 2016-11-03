(() => {

	'use strict';

	angular.module('app')
		.factory('AuthenticationFactory', function()
		{

			// ------------------------------------------------------------
			// Name: getAuthenticatedUser
			// Abstract: Checks if user is already logged in, and returns
			//			 either an authenticated or unauthenticated user
			// ------------------------------------------------------------
			const getAuthenticatedUser = function()
			{
				// Default user as unauthenticated
				let authenticatedUser = {
					isAuthenticated: false,
				};

				// If an authenticated user exists, load details
				if(localStorage.getItem('authenticatedUser'))
				{
					// Get authenticated user details
					let user = JSON.parse(localStorage.getItem('authenticatedUser'));

					// Load details into authenticatedUser object
					authenticatedUser.isAuthenticated 	= true;
					authenticatedUser.username			= user.username;
					authenticatedUser.loginDate 		= user.loginDate;

				}

				// Return either authenticated user or unauthenticated user
				return authenticatedUser;
			}



			// ------------------------------------------------------------
			// Name: setAuthenticatedUser
			// Abstract: Saves an authenticated user in localStorage
			// ------------------------------------------------------------
			const setAuthenticatedUser = function(user)
			{
				localStorage.setItem('authenticatedUser', JSON.stringify(user));
			}



			// ------------------------------------------------------------
			// Name: unauthenticateUser
			// Abstract: Removes a users login state
			// ------------------------------------------------------------
			const unauthenticateUser = function()
			{
				// Set user back to default unauthenticated state
				let authenticatedUser = {
					isAuthenticated: false,
				};

				// Remove user from localStorage
				localStorage.removeItem('authenticatedUser');

				// Return back unauthenticated user
				return authenticatedUser;
			}



			return {
				getAuthenticatedUser,
				setAuthenticatedUser,
				unauthenticateUser,
			}

		})
})();
