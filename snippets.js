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
- might have to call this multiple times and update the innerHTML values
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

// event listener to detect scroll
const alertWhenInBottomTenPercent = () => {
  $(window).scroll(() => {
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - $(document).height() / 10
    ) {
      // console.log('Bottom 10% of page');

      // $('#overlay').css({ display: 'block' });
      // $('.modal').css({ display: 'block' });
      showModal();
    }
  });
};

/* UTIL FUNCTIONS */
const showModal = () => {
  // $('#overlay').show();
  $('#overlay').fadeIn(300);
  $('#wunderkind-modal').show();
};

const hideModal = () => {
  // $('#overlay').hide();
  $('#overlay').fadeOut(300);
  $('#wunderkind-modal').hide();
};

const addCartInfoToModal = () => {
  let numCartItems = getNumItemsInCart();
  let cartTotal = calculateCartTotal();
  let itemImagesObj = extractCartItemImages();
  let itemImages = itemImagesObj.map((img) => img.link);

  $('.modal-body').append(
    `<div class="modal-cart-info">Number of Cart Items: ${numCartItems}</div>`
  );
  $('.modal-body').append(
    `<div class="modal-cart-info">Cart Total: ${cartTotal}</div>`
  );

  $('.modal-cart-info').css({
    'font-size': '1.5rem',
    padding: '0.5rem',
    border: '1px solid pink',
  });
  $('.modal-body').append(`<div class="modal-img-container"></div>`);
  $('.modal-img-container').css({
    background: 'orange',
    width: '100%',
    height: '100%',
  });

  for (let i = 0; i < itemImages.length; i++) {
    $('.modal-img-container').append(`<img src=${itemImages[i]}></img>`);
  }
};

const createOverlay = () => {
  $('body').prepend('<div id="overlay"><div>');

  $('#overlay').css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: '#000',
    opacity: '0.5',
    filter: 'alpha(opacity=50)',
    'z-index': '5000',
    display: 'none',
  });

  // $('#overlay').hide();
};

const createModal = () => {
  $('body').prepend(
    '<div class="modal fade" id="wunderkind-modal" aria-hidden="true" role="dialog" tabindex="-1"></div>'
  );

  // CSS logic
  let winH = $(window).height();
  let winW = $(window).width();
  let modal = $('#wunderkind-modal');

  //Set the popup window to center
  $('#wunderkind-modal').css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    width: '60%',
    height: '75%',
    position: 'fixed',
    'z-index': '9999',
    border: '3px solid red',
    'background-color': 'white',
    'box-shadow': '0 0 10px #000000',
    'border-radius': '5px',

    // display: 'none',
  });

  modal.css('top', winH / 2 - modal.height() / 2);
  modal.css('left', winW / 2 - modal.width() / 2);

  $('#wunderkind-modal').append('<div class="modal-content"></div>');
  $('.modal-content').append('<div class="modal-header"></div>');
  $('.modal-content').css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    'align-items': 'center',
    border: '1px solid blue',
    width: '90%',
    height: '100%',
    padding: '0.5rem',
  });
  $('.modal-header').css({
    width: '100%',
  });
  $('.modal-header').append('<div class="modal-title">Wunderkind Popup</div>');
  $('.modal-title').css({
    'font-size': '2.5rem',
    background: 'black',
    color: 'white',
    'text-align': 'center',
    padding: '20px, 40px',
    'border-radius': '5px',
  });
  $('.modal-content').append('<div class="modal-body"><div>');
  $('.modal-body').css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100%',
    height: '100%',
    border: '1px solid green',
    background: 'orange',
  });
  $('.modal-content').append('<div class="modal-footer"></div>');
  $('.modal-footer').css({
    width: '80%',
    display: 'flex',
    'justify-content': 'space-evenly',
    'margin-bottom': '4rem',
  });

  $('#wunderkind-modal').hide();
};

const addCloseBtn = () => {
  $('.modal-footer').append(
    '<button class="wunderkind-modal-btn" id="wunderkind-modal-close-btn" data-dismiss="modal">Close</button>'
    // $('.modal-footer').append(
    //   '<button class="close" id="wunderkind-modal-close-btn" data-dismiss="modal">&times;</button>'
  );

  $('.wunderkind-modal-btn').css({
    'background-color': 'black',
    color: 'white',
    border: 'none',
    'border-radius': '12px',
    padding: '15px 30px',
    display: 'inline-block',
    'font-size': '1.5rem',
    'text-align': 'center',
  });

  // $(function () {
  //   $('.modal-close-btn').click(function () {
  //     $('.modal').hide(400);
  //   });
  // });
  $(function () {
    $('#wunderkind-modal-close-btn').click(function (e) {
      e.preventDefault();
      hideModal();
    });
  });
};
const addGoToCartBtn = () => {
  $('.modal-footer').append(
    '<button class="wunderkind-modal-btn" id="wunderkind-modal-cart-btn">Cart</button>'
  );

  $(function () {
    $('#wunderkind-modal-cart-btn').click(function (e) {
      e.preventDefault();
      window.location.href = 'https://www.kohls.com/checkout/shopping_cart.jsp';
    });
  });
};

// create modal for webpage
const addModalToPage = () => {
  createOverlay();
  createModal();
  addCartInfoToModal();
  addGoToCartBtn();
  addCloseBtn();
};

// when the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === $('#overlay')) {
    hideModal();
  }
};

// $('#overlay').click(function () {
//   hideModal();
// });

addModalToPage();
alertWhenInBottomTenPercent();
