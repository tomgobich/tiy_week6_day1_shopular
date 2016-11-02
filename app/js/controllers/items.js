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
		.controller('ItemsController', function($location, $anchorScroll, ItemsFactory)
		{

			let vm = this;

			vm.item = {};

			vm.taxRate 			= 1.0575;
			vm.isAddingItem 	= false;
			vm.isEditingItem 	= false;
			vm.addItemTitle 	= "Add New Item";
			vm.submitButton 	= "Add Item";

			vm.itemList = ItemsFactory.getItemList();


			// ------------------------------------------------------------
			// Name: getTotal
			// Abstract: Calculates total to display as amount due
			// ------------------------------------------------------------
			vm.getTotal = function(price, discount)
			{
				return (price - discount) * vm.taxRate;
			}



			// ------------------------------------------------------------
			// Name: displayNewItemForm
			// Abstract: Displays the new item form and scrolls down to it
			// ------------------------------------------------------------
			vm.displayNewItemForm = function(addItemForm)
			{
				// Reset add item form to clear all data
				vm.resetAddItemForm(addItemForm);

				// Mark as adding item
				vm.isAddingItem = true;
			}



			// ------------------------------------------------------------
			// Name: addNewItem
			// Abstract: Adds new item onto itemList array
			// ------------------------------------------------------------
			vm.addNewItem = function(isValid, addItemForm)
			{
				// Are the form inputs valid?
				if(isValid)
				{
					// Replace discount if left empty
					if( vm.item.discount === '' || vm.item.discount === null || vm.item.discount === undefined)
					{
						vm.item.discount = 0;
					}

					// Is this just an edit?
					if(!vm.isEditingItem)
					{
						// No, give new item an ID value
						vm.item.id = Date.now() + Math.floor(Math.random() * (9999 - 1000) + 1000);

						// Add new item to itemList
						vm.itemList.push(vm.item);

						// Notify the user the add was successful
						$.notify('Item successfully added', 'success');
					}

					// Save new changes to localStorage
					ItemsFactory.setItemList(vm.itemList);

					// Reset addItem form
					vm.resetAddItemForm(addItemForm);

					// Ensure isEditingItem is false
					vm.isEditingItem = false;
				}
				else
				{
					// No, alert the user to try again
					$.notify('Please fill out the required fields and try again.', 'error');
				}
			}



			// ------------------------------------------------------------
			// Name: loadItem
			// Abstract: Loads an already existing object into the current
			//			 editing object for the addItem form
			// ------------------------------------------------------------
			vm.loadItem = function(item)
			{
				// Flag as edit
				vm.isEditingItem = true;

				// Load current item into edited object
				vm.item = item;

				// Change text
				vm.addItemTitle = "Edit Item";
				vm.submitButton = "Save Changes";

				// Display addItem form
				vm.isAddingItem = true;
			}



			// ------------------------------------------------------------
			// Name: resetAddItemForm
			// Abstract: Removes all changes to the form and hides it back away
			// ------------------------------------------------------------
			vm.resetAddItemForm = function(addItemForm)
			{
				// Clear item object
				vm.item = {};

				// Reload itemList
				vm.itemList = ItemsFactory.getItemList();

				// Reset form Angular state
				addItemForm.$setPristine();
				addItemForm.$setUntouched();

				// Reset text
				vm.addItemTitle = "Add New Item";
				vm.submitButton = "Add Item";

				// Mark as no longer adding item
				vm.isAddingItem  = false;
				vm.isEditingItem = false;
			}



		});

})();
