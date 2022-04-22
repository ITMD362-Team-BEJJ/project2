describe('Shipping and Payment Form', function() {

  it('the main page should exist', function(browser) {
    browser
      .url('http://localhost:8080/')
      .assert
        .elementPresent('h1');
  });

  it('the payment page should exist', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .assert
        .elementPresent('h1');
  });

  it('the payment page should exist', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .assert
        .elementPresent('form[name="payment"]');
  });

  it('the billing page should exist', function(browser) {
    browser
      .url('http://localhost:8080/billing/')
      .assert
        .elementPresent('form[name="billing"]');
  });

  it('the shipping page should exist', function(browser) {
    browser
      .url('http://localhost:8080/shipping/')
      .assert
        .elementPresent('form[name="shipping"]');
  });

  it('show incorrect errors on payment form', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .executeScript(function() {
        localStorage.clear();
      })
      .sendKeys('input#name-card', 'Oh')
      .sendKeys('input#card-number', '12345')
      .sendKeys('input#cvv', '12345')
      .waitForElementPresent('.cvv-error')
      .assert.visible('.cvv-error')
      .assert.visible('.card-number-error')
      .assert.visible('.name-card-error')
      .assert.textContains('.cvv-error', 'Cvv must be a valid CVV number')
      .assert.textContains('.card-number-error', 'Card-number must be a valid credit card')
      .assert.textContains('.name-card-error', 'Name-card must be at least 3 characters');
  });

  it('show correct response on payment form', function(browser) {
    browser
      .url('http://localhost:8080/payment/')
      .executeScript(function() {
        localStorage.clear();
      })
      .sendKeys('input#name-card', 'Tester')
      .sendKeys('input#card-number', '1234123412341234')
      .sendKeys('input#cvv', '123')
      .assert.not.visible('.cvv-error')
      .assert.not.visible('.card-number-error')
      .assert.not.visible('.name-card-error')
      .assert.not.textContains('.cvv-error', 'Cvv must be a valid CVV number')
      .assert.not.textContains('.card-number-error', 'Card-number must be a valid credit card')
      .assert.not.textContains('.name-card-error', 'Name-card must be at least 3 characters');
  });

  it('show incorrect errors on billing form', function(browser) {
    browser
      .url('http://localhost:8080/billing/')
      .executeScript(function() {
        localStorage.clear();
      })
      .sendKeys('input#billing-name', 'oh')
      .sendKeys('input#billing-address', 'my')
      .sendKeys('input#billing-city', 'h')
      .sendKeys('input#billing-zip', '111111')
      .sendKeys('input#billing-phone', '7')
      .waitForElementPresent('.billing-phone-error')
      .assert.visible('.billing-phone-error')
      .assert.visible('.billing-zip-error')
      .assert.visible('.billing-address-error')
      .assert.visible('.billing-name-error')
      .assert.textContains('.billing-phone-error', 'Billing-phone must be a valid telephone number')
      .assert.textContains('.billing-zip-error', 'Billing-zip must be a valid ZIP code')
      .assert.textContains('.billing-address-error', 'Billing-address must be at least 3 characters')
      .assert.textContains('.billing-name-error', 'Billing-name must be at least 3 characters');
  });

  it('show correct response on billing form', function(browser) {
    browser
      .url('http://localhost:8080/billing/')
      .executeScript(function() {
        localStorage.clear();
      })
      .sendKeys('input#billing-name', 'Tester')
      .sendKeys('input#billing-address', 'Tester address')
      .sendKeys('input#billing-city', 'Chicago')
      .sendKeys('input#billing-zip', '60616')
      .sendKeys('input#billing-phone', '3121231234')
      .assert.not.visible('.billing-phone-error')
      .assert.not.visible('.billing-zip-error')
      .assert.not.visible('.billing-address-error')
      .assert.not.visible('.billing-name-error')
      .assert.not.textContains('.billing-phone-error', 'Billing-phone must be a valid telephone number')
      .assert.not.textContains('.billing-zip-error', 'Billing-zip must be a valid ZIP code')
      .assert.not.textContains('.billing-address-error', 'Billing-address must be at least 3 characters')
      .assert.not.textContains('.billing-name-error', 'Billing-name must be at least 3 characters');
  });

  it('show incorrect errors on shipping form', function(browser) {
    browser
      .url('http://localhost:8080/shipping/')
      .executeScript(function() {
        localStorage.clear();
      })
      .click('input[id="shipping-is-billing"]')
      .sendKeys('input#shipping-name', 'oh')
      .sendKeys('input#shipping-address', 'my')
      .sendKeys('input#shipping-zip', '111111')
      .sendKeys('input#shipping-phone', '7')
      .waitForElementPresent('.shipping-phone-error')
      .assert.visible('.shipping-phone-error')
      .assert.visible('.shipping-zip-error')
      .assert.visible('.shipping-address-error')
      .assert.visible('.shipping-name-error')
      .assert.visible('.shipping-phone-error')
      .assert.visible('.shipping-zip-error')
      .assert.visible('.shipping-address-error')
      .assert.visible('.shipping-name-error')
      .assert.textContains('.shipping-phone-error', 'Shipping-phone must be a valid telephone number')
      .assert.textContains('.shipping-zip-error', 'Shipping-zip must be a valid ZIP code')
      .assert.textContains('.shipping-address-error', 'Shipping-address must be at least 3 characters')
      .assert.textContains('.shipping-name-error', 'Shipping-name must be at least 3 characters');
  });

  it('show correct response on shipping form', function(browser) {
    browser
      .url('http://localhost:8080/shipping/')
      .executeScript(function() {
        localStorage.clear();
      })
      .click('input[id="shipping-is-billing"]')
      .sendKeys('input#shipping-name', 'oh')
      .sendKeys('input#shipping-address', 'my')
      .sendKeys('input#shipping-zip', '111111')
      .sendKeys('input#shipping-phone', '7')
      .waitForElementPresent('.shipping-phone-error')
      .assert.visible('.shipping-phone-error')
      .assert.visible('.shipping-zip-error')
      .assert.visible('.shipping-address-error')
      .assert.visible('.shipping-name-error')
      .assert.visible('.shipping-phone-error')
      .assert.visible('.shipping-zip-error')
      .assert.visible('.shipping-address-error')
      .assert.visible('.shipping-name-error')
      .assert.textContains('.shipping-phone-error', 'Shipping-phone must be a valid telephone number')
      .assert.textContains('.shipping-zip-error', 'Shipping-zip must be a valid ZIP code')
      .assert.textContains('.shipping-address-error', 'Shipping-address must be at least 3 characters')
      .assert.textContains('.shipping-name-error', 'Shipping-name must be at least 3 characters');
  });

});

describe('Store Page', function() {
  it('the store page should exist', function(browser) {
    browser
      .url('http://localhost:8080/store/')
      .assert
        .elementPresent('h1');
  });
  it('shows correct store items', function(browser) {
    browser
    .url('http://localhost:8080/store/')
    .executeScript(function() {
      localStorage.clear();
    })
      .assert
        //.elementPresent('article[class="product-container"]');
        const plant1 = "section.products:nth-child(1) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, "Albuca spiralis")
        const plant2 = "section.products:nth-child(2) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Echeveria "Perle von Nurnberg"')
        const plant3 = "section.products:nth-child(3) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Kalanchoe tomentosa "Panda Plant"')
        const plant4 = "section.products:nth-child(4) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Adromischus cristatus "Crinkle-Leaf Plant"')
        const plant5 = "section.products:nth-child(5) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Cereus forbesii monstrose "Ming Thing" ')
        const plant6 = "section.products:nth-child(6) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Senecio rowleyanus "String of Pearls"')
        const plant7 = "section.products:nth-child(7) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Aloe aristata "Lace Aloe"')
        const plant8 = "section.products:nth-child(8) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Aeonium "Sunburst"')
        const plant9 = "section.products:nth-child(9) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Haworthia attenuata')
        const plant10 = "section.products:nth-child(10) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Lithops')
        const plant11 = "section.products:nth-child(11) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Sedum rubotinctum "Jelly Bean"')
        const plant12 = "section.products:nth-child(12) > section:nth-child(2) > h5:nth-child(1)"
        .assert.containsText(plant1, 'Titanopsis calcarea "Concrete Leaf"')
  });
})

describe ('Cart Page', function() {
  it('the cart page should exist', function(browser) {
    browser
      .url('http://localhost:8080/cart/')
      .assert
        .elementPresent('h1');
  });
})
