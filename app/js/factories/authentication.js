(() => {

	'use strict';

	angular.module('app')
		.factory('AuthenticationFactory', function()
		{

			const getAuthenticatedUser = function()
			{
					let authenticatedUser = {
						isAuthenticated: false,
					};

					if(localStorage.getItem('authenticatedUser'))
					{
						let user = JSON.parse(localStorage.getItem('authenticatedUser'));

						authenticatedUser.isAuthenticated 	= true;
						authenticatedUser.username			= user.username;
						authenticatedUser.loginDate 		= user.loginDate;

					}

					return authenticatedUser;
			}



			const setAuthenticatedUser = function(user)
			{
				localStorage.setItem('authenticatedUser', JSON.stringify(user));
			}



			const unauthenticateUser = function()
			{
				let authenticatedUser = {
					isAuthenticated: false,
				};

				localStorage.removeItem('authenticatedUser');

				return authenticatedUser;
			}



			return {
				getAuthenticatedUser,
				setAuthenticatedUser,
				unauthenticateUser,
			}

		})
})();
