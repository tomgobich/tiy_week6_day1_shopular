'use strict';

angular.module('app', []).controller('ItemsController', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
	var vm = this;

	vm.item = {};

	vm.taxRate = 1.0575;
	vm.isAddingItem = false;
	vm.isEditingItem = false;
	vm.addItemTitle = "Add New Item";
	vm.submitButton = "Add Item";

	// Structure => ID, Name, Price, Quantity, Color, Discount
	vm.itemList = [{ "id": 2957, "name": "widget", "price": 32, "quantity": 203, "color": "red", "discount": 31 }, { "id": 89274, "name": "golf club", "price": 98, "quantity": 10, "color": "black", "discount": 0 }, { "id": 64, "name": "iPhone", "price": 499, "quantity": 2, "color": "white", "discount": 0 }, { "id": 87363, "name": "bonzai tree", "price": 76, "quantity": 2, "color": "green", "discount": 0 }, { "id": 1736, "name": "towel", "price": 55, "quantity": 30, "color": "brown", "discount": 10 }, { "id": 4836, "name": "dog bed", "price": 99, "quantity": 10, "color": "beige", "discount": 50 }, { "id": 829, "name": "waste basket", "price": 15, "quantity": 40, "color": "silver", "discount": 0 }, { "id": 46, "name": "guitar", "price": 899, "quantity": 0, "color": "blue", "discount": 150 }, { "id": 17456, "name": "matcha tea", "price": 42, "quantity": 4, "color": "green", "discount": 11 }, { "id": 3292, "name": "enlightenment", "price": 99999, "quantity": 1, "color": "red", "discount": 0 }, { "id": 533, "name": "eggs", "price": 5, "quantity": 12, "color": "brown", "discount": 1 }, { "id": 683, "name": "pillow", "price": 27, "quantity": 10, "color": "black", "discount": 12 }];

	// ------------------------------------------------------------
	// Name: getTotal
	// Abstract: Calculates total to display as amount due
	// ------------------------------------------------------------
	vm.getTotal = function (price, discount) {
		return (price - discount) * vm.taxRate;
	};

	// ------------------------------------------------------------
	// Name: displayNewItemForm
	// Abstract: Displays the new item form and scrolls down to it
	// ------------------------------------------------------------
	vm.displayNewItemForm = function (addItemForm) {
		// Reset add item form to clear all data
		vm.resetAddItemForm(addItemForm);

		// Mark as adding item
		vm.isAddingItem = true;

		// Scroll to add item form
		vm.scrollToAddItemForm();
	};

	// ------------------------------------------------------------
	// Name: addNewItem
	// Abstract: Adds new item onto itemList array
	// ------------------------------------------------------------
	vm.addNewItem = function (isValid, addItemForm) {
		// Are the form inputs valid?
		if (isValid) {
			// Yes, give new item an ID value
			vm.item.id = Date.now() + Math.floor(Math.random() * (9999 - 1000) + 1000);

			// Replace discount if left empty
			if (vm.item.discount === '' || vm.item.discount === null || vm.item.discount === undefined) {
				vm.item.discount = 0;
			}

			// Is this just an edit?
			if (!vm.isEditingItem) {
				// No, dd new item to itemList
				vm.itemList.push(vm.item);

				$.notify('Item successfully added', 'success');
			}

			// Reset addItem form
			vm.resetAddItemForm(addItemForm);

			// Ensure isEditingItem is false
			vm.isEditingItem = false;
		} else {
			// No, alert the user to try again
			$.notify('Please fill out the required fields and try again.', 'error');
		}
	};

	// ------------------------------------------------------------
	// Name: loadItem
	// Abstract: Loads an already existing object into the current
	//			 editing object for the addItem form
	// ------------------------------------------------------------
	vm.loadItem = function (item) {
		// Flag as edit
		vm.isEditingItem = true;

		// Load current item into edited object
		vm.item = item;

		// Change text
		vm.addItemTitle = "Edit Item";
		vm.submitButton = "Done Editing";

		// Display addItem form
		vm.isAddingItem = true;

		// Scroll to add item form
		vm.scrollToAddItemForm();
	};

	// ------------------------------------------------------------
	// Name: resetAddItemForm
	// Abstract: Removes all changes to the form and hides it back away
	// ------------------------------------------------------------
	vm.resetAddItemForm = function (addItemForm) {
		// Clear item object
		vm.item = {};

		// Reset form Angular state
		addItemForm.$setPristine();
		addItemForm.$setUntouched();

		// Reset text
		vm.addItemTitle = "Add New Item";
		vm.submitButton = "Add Item";

		// Mark as no longer adding item
		vm.isAddingItem = false;
		vm.isEditingItem = false;
	};

	// ------------------------------------------------------------
	// Name: scrollToAddItemForm
	// Abstract: Scrolls screen to add item form
	// ------------------------------------------------------------
	vm.scrollToAddItemForm = function () {
		// Set hash
		$location.hash('addItem');

		// Scroll to hash
		$anchorScroll();
	};
}]);