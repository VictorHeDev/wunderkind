/* LOGIC FOR MODAL CONTENT */
const getNumItemsInCart = () => {
  let numItemsInCart = $('.number-items.boss-number-items.nonzero-items')[0]
    .innerHTML;
  return numItemsInCart;
};

const calculateCartTotal = () => {
  let subTotal = $('.subtotal')[0].innerHTML;
  return subTotal;
};

/*
- extracts the item images from the page
- to make this better, I think we can use a JS object. That way we can hold the key (name of product) and value (img link) add a check to determine if there are any items in cart anyways
- we should return a more descriptive message instead of an undefined

POSSIBLE BUG
- need to click on the cart on the homepage before the image links actually load in the popup modal :(
*/
const extractCartItemImages = () => {
  let items = $('.kas-newpb-product-image');
  let imgItemsLength = items.length;
  let imgLinks = [];
  for (let i = 0; i < imgItemsLength; i++) {
    let itemName = items[i].alt;
    let link = items[i].currentSrc;
    let newItem = { itemName, link };
    imgLinks.push(newItem);
  }
  return imgLinks;
};

// create trigger that activates when the user scrolls into the bottom 10% of the page
$(window).scroll(() => {
  console.log('scrolled!~');
});

// for bottom 10%
const checkIfBottomHalf = () => {
  $(window).scroll(function () {
    if ($(window).scrollTop() > $('body').height() / 2) {
      console.log("I'm a banana");
    }
  });
};

// event listener to detect scroll
const alertWhenInBottomTenPercent = () => {
  $(window).scroll(() => {
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - $(document).height() / 10
    ) {
      console.log('Bottom 10% of page');
    }
  });
};

const createModal = () => {
  $('body').prepend('<div class="wunderkind-modal">This is an added div</div>');

  let winH = $(window).height();
  let winW = $(window).width();
  let modal = $('.wunderkind-modal');

  //Set the popup window to center

  $('.wunderkind-modal').css({
    display: 'flex',
    'flex-direction': 'column',
    width: '40%',
    height: '30%',
    position: 'fixed',
    'z-index': '10000',
    border: '3px solid red',
    'background-color': 'white',
  });

  modal.css('top', winH / 2 - modal.height() / 2);
  modal.css('left', winW / 2 - modal.width() / 2);
};

const addCartInfoToModal = () => {
  let numCartItems = getNumItemsInCart();
  let cartTotal = calculateCartTotal();
  let itemImagesObj = extractCartItemImages();
  let itemImages = itemImagesObj.map((img) => img.link);

  $('.wunderkind-modal').append(
    `<div>Number of Cart Items: ${numCartItems}</div>`
  );
  $('.wunderkind-modal').append(`<div>Cart Total: ${cartTotal}</div>`);
  $('.wunderkind-modal').append(`<div>Item Links: ${itemImages[0]}</div>`);
};

const addCloseBtn = () => {
  $('.wunderkind-modal').append(
    '<button class="wunderkind-modal-close-btn">x</button>'
  );

  $(function () {
    $('.wunderkind-modal-close-btn').click(function () {
      $('.wunderkind-modal').hide(400);
    });
  });
};
const addGoToCartBtn = () => {
  $('.wunderkind-modal').append(
    '<button class="wunderkind-modal-cart-btn">Go To Cart</button>'
  );
};

// create modal for webpage
const addModalToPage = () => {
  createModal();
  addCloseBtn();
  addCartInfoToModal();
  addGoToCartBtn();
};

// toggle the modal visibility
// let modal = $('.wunderkind-modal');
// let closeBtn = $('.wunderkind-modal-close-btn');
// // .click?
// closeBtn.click = function (e) {
//   e.preventDefault();
//   modal.style.display = 'none';
// };

// when the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

/*
.modal {
   width: 300px;
   height: 300px;
   position: absolute;
   left: 50%;
   top: 50%;
   margin-left: -150px;
   margin-top: -150px;
}

$(class).remove() ... more expensive DOM manipulation
*/
