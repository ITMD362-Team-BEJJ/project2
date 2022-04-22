'use strict';

var html = document.querySelector('html');
var formPayment;
var formBilling;
var formShipping;
var newAddressFieldset;
var newAddressCheckbox;
var addToCartButton;

// Add a `js` class for any JavaScript-dependent CSS
// See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
html.classList.add('js');

// Logic for Store
if(html.id === 'store') {
  addToCartButton = document.querySelectorAll('button[name="addCart"]');
  addToCartButton.forEach(function(button) {
    button.addEventListener('click', handleCartAddition);
  });
}

// Logic for payment form
if(html.id === 'payment') {
  updateCart();
  formPayment = document.querySelector('form[name="payment"]');
  restoreFormDataFromLocalStorage(formPayment.name);
  formPayment.addEventListener('input', debounce(handleFormInputActivity, 850));
  formPayment.addEventListener('change', handleFormInputActivity);
  formPayment.addEventListener('submit', handleFormSubmission);
}
// Logic for cart
if(html.id === 'cart') {
  updateCart();
}

// Logic for billing form
if(html.id === 'billing') {
  updateCart();
  formBilling = document.querySelector('form[name="billing"]');
  restoreFormDataFromLocalStorage(formBilling.name);
  formBilling.addEventListener('input', debounce(handleFormInputActivity, 850));
  formBilling.addEventListener('change', handleFormInputActivity);
  formBilling.addEventListener('submit', handleFormSubmission);
}

// Logic for shipping form
if(html.id === 'shipping') {
  updateCart();
  formShipping = document.querySelector('form[name="shipping"]');
  restoreFormDataFromLocalStorage(formShipping.name);
  formShipping.addEventListener('input', debounce(handleFormInputActivity, 850));
  formShipping.addEventListener('change', handleFormInputActivity);
  formShipping.addEventListener('submit', handleFormSubmission);
  formShipping.addEventListener('submit', localStorage.clear());

  newAddressFieldset = document.querySelector('fieldset[name="shipping-address"]');
  newAddressCheckbox = document.querySelector('#shipping-is-billing');

  newAddressFieldset.setAttribute('disabled', 'disabled');
  newAddressFieldset.setAttribute('aria-hidden', 'true');

  newAddressCheckbox.addEventListener('change', function(event) {
    // Add logic to set values only on checked state
    if(event.target.checked) {
      newAddressFieldset.setAttribute('disabled', 'disabled');
      newAddressFieldset.setAttribute('aria-hidden', 'true');
    } else {
      newAddressFieldset.removeAttribute('disabled');
      newAddressFieldset.setAttribute('aria-hidden', 'false');
    }
  });
}

/* Callback Functions */

function handleCartAddition(event) { // Name, price, quantity
  var targetElem;
  var item;
  var name;
  var price;
  var jsItems;
  var jsObj;
  var cartFinal;

  targetElem = event.target;
  item = targetElem.parentElement;
  event.preventDefault(); // STOP the default browser behavior
  name = item.getElementsByClassName('plant-name')[0].innerText;
  price = item.getElementsByClassName('plant-price')[0].innerText.replace(/\$|,/g, '');
  console.log(name, price);

  jsItems = JSON.parse(localStorage.getItem('jscart')) || [];
  jsObj = {'name': name, 'price' : price, 'quantity' : "1"};

  jsItems.push(jsObj);
  localStorage.setItem("jscart", JSON.stringify(jsItems));

  cartFinal = JSON.parse(localStorage.getItem("jscart"));
  console.log(cartFinal);
}

function handleFormInputActivity(event) {
  var inputElements = ['INPUT', 'SELECT'];
  var targetElement = event.target;
  var targetType = targetElement.getAttribute('type');
  var errorText = capitalizeFirstLetter(targetElement.name);
  var submitButton = document.getElementById('submit');
  var errorClass = targetElement.name + '-error';
  var errorEl = document.querySelector('.' + errorClass);

  // Regex for validating inputs
  var ccCheck = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  var cvvCheck = /^[0-9]{3,4}$/;
  var zipCheck = /^\d{5}(?:[-\s]\d{4})?$/;
  var telCheck = /\d{9}/;

  if (!inputElements.includes(targetElement.tagName) || targetElement.name === 'billing-address-two' || targetElement.name === 'shipping-address-two' || targetElement.name === 'billing-city' || targetElement.name === 'shipping-city') {
    return; // this is not an element we care about
  }

  // Implicit 'else', care of the `return;` statement above...
  if(targetType === 'text' && targetElement.tagName === 'INPUT') {
    if (targetElement.value.length < 3) {
      // Don't add duplicate errors
      if (!errorEl) {
        errorText += ' must be at least 3 characters';
        errorEl = document.createElement('p');
        errorEl.className = errorClass;
        errorEl.innerText = errorText;
        targetElement.before(errorEl);
        submitButton.disabled = true;
      }
    } else {
      if (errorEl) {
        errorEl.remove();
        submitButton.disabled = false;
      }
    }
  }
  if(targetType === 'number') {
    if(targetElement.name === 'card-number') {
      if(!ccCheck.test(targetElement.value)) {
        if(!errorEl) {
          errorText += ' must be a valid credit card';
          errorEl = document.createElement('p');
          errorEl.className = errorClass;
          errorEl.innerText = errorText;
          targetElement.before(errorEl);
          submitButton.disabled = true;
        }
      } else {
        if (errorEl) {
          errorEl.remove();
          submitButton.disabled = false;
        }
      }
    }
    if(targetElement.name === 'cvv') {
      if(!cvvCheck.test(targetElement.value)) {
        if(!errorEl) {
          errorText += ' must be a valid CVV number';
          errorEl = document.createElement('p');
          errorEl.className = errorClass;
          errorEl.innerText = errorText;
          targetElement.before(errorEl);
          submitButton.disabled = true;
        }
      } else {
        if (errorEl) {
          errorEl.remove();
          submitButton.disabled = false;
        }
      }
    }
    if(targetElement.name === 'billing-zip' || targetElement.name === 'shipping-zip') {
      if(!zipCheck.test(targetElement.value)) {
        if(!errorEl) {
          errorText += ' must be a valid ZIP code';
          errorEl = document.createElement('p');
          errorEl.className = errorClass;
          errorEl.innerText = errorText;
          targetElement.before(errorEl);
          submitButton.disabled = true;
        }
      } else {
        if (errorEl) {
          errorEl.remove();
          submitButton.disabled = false;
        }
      }
    }
  }
  if(targetType === 'tel') {
    if(!telCheck.test(targetElement.value)) {
      if(!errorEl) {
        errorText += ' must be a valid telephone number';
        errorEl = document.createElement('p');
        errorEl.className = errorClass;
        errorEl.innerText = errorText;
        targetElement.before(errorEl);
        submitButton.disabled = true;
      }
    } else {
      if (errorEl) {
        errorEl.remove();
        submitButton.disabled = false;
      }
    }
  }

  writeFormDataToLocalStorage(targetElement.form.name, targetElement);
}

function handleFormSubmission(event) {
  var targetElement = event.target;
  event.preventDefault(); // STOP the default browser behavior
  writeFormDataToLocalStorage(targetElement.name); // STORE all the form data
  window.location.href = targetElement.action; // PROCEED to the URL referenced by the form action
}


/* Core Functions */

function writeFormDataToLocalStorage(formName, inputElement) {
  var formData = findOrCreateLocalStorageObject(formName);
  var formElements;
  var i;
  // Set just a single input value
  if (inputElement) {
    formData[inputElement.name] = inputElement.value;
  } else {
    // Set all form input values, e.g., on a submit event
    formElements = document.forms[formName].elements;
    for (i = 0; i < formElements.length; i++) {
      // Don't store empty elements, like the submit button
      if (formElements[i].value !== "") {
        formData[formElements[i].name] = formElements[i].value;
      }
    }
  }

  // Write the formData JS object to localStorage as JSON
  writeJsonToLocalStorage(formName, formData);
}

function findOrCreateLocalStorageObject(keyName) {
  var jsObject = readJsonFromLocalStorage(keyName);

  if (Object.keys(jsObject).length === 0) {
    writeJsonToLocalStorage(keyName, jsObject);
  }

  return jsObject;
}

function readJsonFromLocalStorage(keyName) {
  var jsonObject = localStorage.getItem(keyName);
  var jsObject = {};

  if (jsonObject) {
    try {
      jsObject = JSON.parse(jsonObject);
    } catch(e) {
      console.error(e);
      jsObject = {};
    }
  }

  return jsObject;
}

function writeJsonToLocalStorage(keyName, jsObject) {
  localStorage.setItem(keyName, JSON.stringify(jsObject));
}

function restoreFormDataFromLocalStorage(formName) {
  var jsObject = readJsonFromLocalStorage(formName);
  var formValues = Object.entries(jsObject);
  var formElements;
  var i;

  if (formValues.length === 0) {
    return; // nothing to restore
  }

  formElements = document.forms[formName].elements;

  for (i = 0; i < formValues.length; i++) {
    console.log('Form input key:', formValues[i][0], 'Form input value:', formValues[i][1]);
    formElements[formValues[i][0]].value = formValues[i][1];
  }
}


function updateCart(formName) {
  var jsObject = readJsonFromLocalStorage("jscart");
  var cartItemContainer = document.getElementById('cart-items');
  var cartLength = Object.keys(jsObject).length;

  var name;
  var nameText;
  var price;
  var priceText;
  var quantity;
  var quantityText;
  var element = document.getElementById("cart-row");

  var total = 0;
  var i;

  console.log("updateCart");
  console.log(formName);

  console.log(cartItemContainer);
  console.log(jsObject);
  console.log(cartLength);

  for (i = 0; i < cartLength; i++) {

    name = document.createElement('p');
    name.setAttribute('id', 'plant-name');
    nameText = document.createTextNode(jsObject[i].name);
    name.appendChild(nameText);

    price = document.createElement('p');
    price.setAttribute('id', 'plant-price');
    priceText = document.createTextNode("$" + jsObject[i].price);
    price.appendChild(priceText);

    quantity = document.createElement('p');
    quantity.setAttribute('id', 'plant-quantity');
    quantityText = document.createTextNode("(" + jsObject[i].quantity + ")");
    quantity.appendChild(quantityText);

    element.appendChild(name);
    element.appendChild(price);
    element.appendChild(quantity);

    total += jsObject[i].price * jsObject[i].quantity;
  }
  document.getElementById("cart-total").innerHTML = "$" + total;
}

/* Utility Functions */

function capitalizeFirstLetter(string) {
  var firstLetter = string[0].toUpperCase();
  return firstLetter + string.substring(1);
}

// debounce to not execute until after an action has stopped (delay)
function debounce(callback, delay) {
  var timer; // function-scope timer to debounce()
  return function() {
    var context = this; // track function-calling context
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    var args = arguments; // hold onto arguments object
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

    // Reset the timer
    clearTimeout(timer);

    // Set the new timer
    timer = setTimeout(function() {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
      callback.apply(context, args);
    }, delay);
  };
}
