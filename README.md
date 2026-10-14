# Sjöbo Books

## Live Website

[Visit Sjöbo Books](https://ephraimlex.github.io/sjobo-books/)

A responsive bookshop built with React, Vite, and Bootstrap.

This frontend learning project lets visitors browse and search for
books, manage a shopping cart, and complete a simulated checkout.

## Features

- Home page, book catalogue, individual book details, cart, and checkout.
- Search by book title, author, or complete ISBN.
- Case-insensitive title and author searches with partial matching.
- Common search words such as "the", "of", and "by" are ignored.
- Pagination displaying up to 12 books per page.
- Cart quantity controls with automatic removal at zero.
- An option to empty the entire cart.
- Cart persistence using localStorage.
- Demo checkout with required fields and email-format validation.
- Order confirmation and automatic cart clearing after submission.
- Responsive layouts for mobile, tablet, and desktop.

ISBN searches require a matching ISBN in the book data. Entries with
an empty or missing ISBN remain searchable by title and author.

## Technologies

- React
- Vite
- JavaScript
- React Router
- Bootstrap
- JSON
- Browser localStorage
- ESLint

## Getting Started

Install dependencies from the project folder:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed in the terminal.

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Check the code with ESLint |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Preview the production build locally |

## Project Structure

- `src/components/` — shared interface components.
- `src/pages/` — Home, Shop, BookDetails, Cart, and Checkout pages.
- `src/hooks/` — reusable hooks, including `useCart`.
- `src/data/books.json` — the book catalogue.
- `src/utils/searchBooks.js` — title, author, and ISBN search logic.

`CartContext` and `CartProvider` share cart state and actions across
the application.

## Design and Extensibility

The project separates page layout, reusable components, cart state,
book data, and search logic. This separation of concerns makes the
code easier to understand, maintain, and extend.

The current catalogue is loaded from a local JSON file. Pagination
limits the number of book cards displayed, but the full catalogue
is still loaded and searched in the browser.

A future version could use a backend and database for searching
and pagination. No backend is included in this project.

## Demo Checkout

Checkout is a simulation:

- No real order is sent.
- No payment is processed.
- No books are shipped.
- Use fictional customer details when testing.
- Customer details are not saved by the app or sent to a server.
- The confirmation is temporary and disappears after leaving or
  refreshing the checkout page.

Only book IDs and quantities are saved in localStorage for cart
persistence. The saved cart is specific to the browser and website;
it does not sync across devices.

## Validation

- ESLint checks passed.
- Production build completed successfully.
- Layouts were manually checked at 375 px, 768 px, and 1280 px.
- Cart quantity controls, clearing, and persistence were tested.
- Demo checkout and order confirmation were tested.
