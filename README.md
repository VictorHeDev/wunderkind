# A Wild Challenge (from Wunderkind) Appears!

### Prompt

At `Wunderkind`, we often execute complex problems using entirely front-end JavaScript. For this challenge your solution should work if it is pasted directly into the JavaScript console of the browser after the page has fully loaded. Feel free to use jQuery. Also, our `WKND` products must work across all browsers, but we will be testing your challenge in Chrome.

### Instructions

- [x] Go to kohls.com and add at least 2 products to your cart. Then return to the home page.
- [x] Write a JavaScript snippet that can be run in the console of the browser that does the following:
  - [x] Extracts the number of items in the cart, the cart total, and the item images from the page. Store them in variables.
  - [x] Creates a trigger that activates when the user scrolls into the bottom 10% of the page.
  - [x] The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons:
    - [x] one button should close the overlay
    - [x] the other should take the user to the cart page
  - [x] Behind the overlay add a semi­-transparent black background that obscures the site.
  - [x] The overlay should be able to trigger multiple times if dismissed.
- [x] The overlay should have a style consistent with the website. Design matters.

### Resources Used

- [jQuery](https://api.jquery.com/) - instead of using Vanilla JS to manipulate the DOM
- [Kohls](https://www.kohls.com/) - main website used to practice

### Bugs I encountered

- Images were undefined unless the cart was first clicked on the homepage
  - Added a click event within script to combat this problem
- No cart items -> returns undefined
  - Conditionally render 0 items in cart, $0.00 total in the modal
- Having additional items that did not fit in the modal
  - Used CSS overflow-y for better UI experience

### Lessons I learned

- I guess jQuery is not so bad
- Spent a lot of time trying to get Bootstrap to work with jQuery, but was not successful in that endeavor
- SOLID principles to break up code utility

### Example image of completed modal

[![Wunderkind Modal](wunderkind-modal.png)](wunderkind-modal.png)
