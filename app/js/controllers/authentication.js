(() => {

	'use strict';

	angular.module('app')
		.controller('AuthenticationController', function(AuthenticationFactory)
		{

			let vm = this;

			vm.user = AuthenticationFactory.getAuthenticatedUser();



			vm.authenticateUser = function(isValid, authenticationForm)
			{
				if(isValid)
				{
					vm.user.loginDate = Date.now();

					vm.user.isAuthenticated = true;

					AuthenticationFactory.setAuthenticatedUser(vm.user);
				}
			}



			vm.logoutUser = function()
			{
				vm.user = AuthenticationFactory.unauthenticateUser();
			}



		})
})();
