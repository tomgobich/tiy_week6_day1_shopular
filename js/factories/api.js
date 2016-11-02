'use strict';

(function () {

	'use strict';

	angular.module('app').factory('API', function ($http) {

		// ------------------------------------------------------------
		// Name: getTaxRate
		// Abstract: Get tax rate data from API
		// ------------------------------------------------------------
		var getTaxRate = function getTaxRate() {
			$http({
				method: 'GET',
				url: 'https://taxrates.api.avalara.com:443/postal?country=usa&postal=98104&apikey=J49q0EkVDuHf2EwKYHQIchfbmRd11VDb0h4%2B4mIJvhA7K9cnPY5k7BZGAqtD6YajzYuPfV9rz9q%2B8IZJpon7FA%3D%3D'
			}).then(function successCallback(response) {
				console.log(response);
			}, function errorCallback(response) {
				console.log(response);
			});
		};

		return {
			getTaxRate: getTaxRate
		};
	});
})();