const readlineInterface = require('readline');

const rl = readlineInterface.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Film {
  constructor(filmId, title, cost) {
    this.filmId = filmId;
    this.title = title;
    this.cost = cost;
  }
}

const filmInventory = [
  new Film(1, "The Matrix", 9.99),
  new Film(2, "Breaking Bad", 14.99),
  new Film(3, "The Witcher", 19.99),
];

class Cart {
  constructor() {
    this.cartItems = [];
  }

  addFilm(film, amount) {
    this.cartItems.push({ film, amount });
  }

  computeTotal() {
    return this.cartItems.reduce((total, item) => total + item.film.cost * item.amount, 0);
  }
}

function showFilms() {
  console.log("Films available:");
  filmInventory.forEach((film) => {
    console.log(`[${film.filmId}] ${film.title} - $${film.cost}`);
  });
}

function filmRentalApp() {
  console.log("Welcome to the Film Rental App!");

  console.log("Instructions:");
  console.log("1. View Films");
  console.log("2. Add to Cart");
  console.log("3. View Cart");
  console.log("4. Checkout");
  console.log("5. Exit");

  rl.on('line', (input) => {
    switch (input.trim()) {
      case '1':
        showFilms();
        break;

      case '2':
        rl.question("Enter the Film ID: ", (filmId) => {
          rl.question("Enter the amount: ", (amount) => {
            addToCart(parseInt(filmId, 10), parseInt(amount, 10));
            rl.prompt();
          });
        });
        break;

      case '3':
        displayCart();
        break;

      case '4':
        console.log("Thank you for using our service!");
        rl.close();
        break;

      case '5':
        rl.prompt();
        break;

      default:
        console.log("Invalid choice. Please enter a number between 1 and 5.");
        rl.prompt();
    }
  });

  rl.prompt();
}

function addToCart(filmId, amount) {
  const selectedFilm = filmInventory.find((film) => film.filmId === filmId);

  if (selectedFilm) {
    rentalCart.addFilm(selectedFilm, amount);
    console.log(`Added ${amount} ${selectedFilm.title}(s) to the cart.`);
  } else {
    console.log("Film not found. Please enter a valid Film ID.");
  }
}

function displayCart() {
  console.log("Your Cart:");
  rentalCart.cartItems.forEach((item) => {
    console.log(`[${item.film.filmId}] ${item.film.title} - Amount: ${item.amount}`);
  });
  console.log(`Total: $${rentalCart.computeTotal().toFixed(2)}`);
}

const rentalCart = new Cart();

filmRentalApp();
