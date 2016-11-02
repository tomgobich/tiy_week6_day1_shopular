'use strict';

(function () {

	'use strict';

	angular.module('app').factory('AuthenticationFactory', function () {

		var getAuthenticatedUser = function getAuthenticatedUser() {
			var authenticatedUser = {
				isAuthenticated: false
			};

			if (localStorage.getItem('authenticatedUser')) {
				var user = JSON.parse(localStorage.getItem('authenticatedUser'));

				authenticatedUser.isAuthenticated = true;
				authenticatedUser.username = user.username;
				authenticatedUser.loginDate = user.loginDate;
			}

			return authenticatedUser;
		};

		var setAuthenticatedUser = function setAuthenticatedUser(user) {
			localStorage.setItem('authenticatedUser', JSON.stringify(user));
		};

		var unauthenticateUser = function unauthenticateUser() {
			var authenticatedUser = {
				isAuthenticated: false
			};

			localStorage.removeItem('authenticatedUser');

			return authenticatedUser;
		};

		return {
			getAuthenticatedUser: getAuthenticatedUser,
			setAuthenticatedUser: setAuthenticatedUser,
			unauthenticateUser: unauthenticateUser
		};
	});
})();