(() => {

	'use strict';

	angular.module('app')
		.controller('AuthenticationController', function(AuthenticationFactory)
		{

			let vm = this;

			// Get either new or authenticated user
			vm.user = AuthenticationFactory.getAuthenticatedUser();



			// ------------------------------------------------------------
			// Name: authenticateUser
			// Abstract: Authenticates a user on login
			// ------------------------------------------------------------
			vm.authenticateUser = function(isValid, authenticationForm)
			{
				// Was login valid?
				if(isValid)
				{
					// Yes, apply login date to user
					vm.user.loginDate = Date.now();

					// Set user as authenticated
					vm.user.isAuthenticated = true;

					// Save user in localStorage
					AuthenticationFactory.setAuthenticatedUser(vm.user);

					// Reset form Angular state
					authenticationForm.$setPristine();
					authenticationForm.$setUntouched();
				}
				else
				{
					// No, alert the user
					$.notify('Please enter a username between 3 and 18 characters long', 'error');
				}
			}



			// ------------------------------------------------------------
			// Name: logoutUser
			// Abstract: Unauthenticate the user and return back to login screen
			// ------------------------------------------------------------
			vm.logoutUser = function()
			{
				vm.user = AuthenticationFactory.unauthenticateUser();
			}



		})
})();
