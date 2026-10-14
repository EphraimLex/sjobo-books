# Sjöbo Books — Project Plan

## Purpose and Audience

Build an online bookstore for readers who want to browse books, find titles by author or genre, and collect their choices in a shopping cart.

The website will help visitors find books and review an order through a clear, responsive shopping flow. It is an individual frontend training project with a simulated checkout.

**Shop name:** Sjöbo Books  
**Tagline:** Find your next great read.  
**Project folder and repository:** `sjobo-books`

## Learning Goals

- Build a complete interactive application using Vite and React.
- Practise components, props, state, events, and conditional rendering.
- Use React Router to navigate between pages.
- Learn Bootstrap classes for layouts, forms, buttons, and spacing.
- Use React Hooks and share cart state across components.
- Organise the code with separation of concerns, scalability, and extensibility in mind.
- Test and deploy a responsive frontend.

## Technologies

| Technology | Purpose |
|---|---|
| Vite | Development server and production build |
| React and JavaScript | Components, application state, and user interaction |
| JSX | Page structure within React components |
| React Router | Navigation and a reusable book details route |
| Bootstrap CSS | Responsive grid, common interface styling, and utility classes |
| Custom CSS | Shop colours, typography, and visual identity |
| LocalStorage | Preserve the cart between visits in the same browser |
| Git and GitHub | Version control and a public repository |

Use Bootstrap classes directly through `className` in JSX to learn the fundamentals. React will manage interactive behaviour. Tailwind is not included.

## First-Version Scope

### Book Catalogue

- Display book covers, titles, authors, and prices.
- Search by title or author, ignoring letter case.
- Filter by genre and allow search and filtering to work together.
- Show a helpful message when no books match.
- Open a details page for any book.

Suggested starting content: 12 books across four genres, with prices in SEK. The final titles and genres will be selected before entering catalogue data. Fiction, crime, science, and programming are initial options.

### Shopping Cart

- Add a book from its card or details page.
- Increase the quantity when the same book is added again.
- Change quantities using positive whole numbers.
- Remove books from the cart.
- Show line totals and the total price in SEK.
- Show the total number of book units in the header.
- Provide a helpful empty-cart message and a link to the shop.
- Preserve book IDs and quantities in LocalStorage.

### Simulated Checkout

- Show the order summary and total.
- Collect basic customer and delivery details using a validated form.
- Prevent checkout with an empty cart.
- Display an order confirmation after a valid submission.
- Preserve the confirmed order summary on screen while clearing the cart.
- Clearly state that this is a demonstration and no real order or payment is processed.

Customer details will remain in temporary React state and will not be saved to LocalStorage or sent to a server. The demonstration total will be the sum of book prices multiplied by quantities, with no additional delivery charge.

## Page Structure and Sitemap

| Page | Proposed route | Content and purpose |
|---|---|---|
| Home | `/` | Welcome, shop identity, featured books, and a link to the catalogue |
| Shop | `/shop` | All books, search, genre filter, and results or an empty-results message |
| Book Details | `/books/:bookId` | Selected book cover, author, description, genre, price, and Add to Cart |
| Cart | `/cart` | Cart items, quantity controls, removal, totals, and a checkout link |
| Checkout | `/checkout` | Customer form, order summary, and confirmation state |

The shared header links to Home, Shop, and Cart. Book cards lead to Book Details. Cart leads to Checkout. Confirmation offers a link back to the shop.

Book Details uses one reusable page component with different book data. Confirmation is a state of Checkout, so it does not require a sixth main page. Unknown routes and invalid book IDs should show a helpful message and a route back to the shop.

These are logical route paths. The final router configuration will account for the deployment platform and direct-page refreshes.

## Shared Layout and Visual Design

- Use a consistent header, navigation, and footer across pages.
- Aim for a welcoming, elegant bookstore appearance.
- Use Bootstrap containers and grid classes for responsive layouts.
- Define shared colours, typography, and spacing in custom CSS variables.
- Adapt the navigation, book grid, cart, and checkout form for desktop, tablet, and mobile.
- Use semantic HTML, labelled form controls, meaningful image alternatives, and visible keyboard focus.
- Keep validation messages clear and place them near the relevant inputs.

Exact colours, fonts, and visual details will be chosen during wireframing and styling.

## React Hooks and State

| Hook or pattern | Planned use |
|---|---|
| `useState` | Search, selected genre, cart items, form inputs, and confirmation state |
| `useEffect` | Synchronise cart changes with LocalStorage |
| `useContext` | Share cart data and actions across the application |
| Custom `useCart` hook | Provide a consistent way for components to access the cart |

Initial cart state will be loaded through the storage service. Cart totals and filtered book lists will be calculated from existing data rather than stored as duplicate state.

## Scalability and Extensibility

### Reusable Components

Use components such as `Header`, `Footer`, `BookCard`, `BookList`, `SearchBar`, `GenreFilter`, and `CartItem`. Reuse `BookCard` on Home and Shop.

### Separate Data from Presentation

Keep catalogue data in a dedicated file. Each book should have a stable ID, title, author, genre, description, price, cover reference, and a featured flag.

Adding a book should require a new data entry, rather than a new page or copied card markup. Derive genre filter choices from catalogue data so new genres appear automatically.

### Shared Cart and Separate Logic

Use a cart provider and `useCart` to share items and actions. Keep cart calculations and quantity rules separate from page markup. Components should request actions such as adding, updating, or removing an item.

### Separate Storage Access

Keep LocalStorage reads and writes in a storage service. Handle missing or malformed saved data without crashing the application. Initialise the cart before saving so existing data is not overwritten by an empty initial cart.

This separation makes persistence easier to change later. A real backend would still require API integration and additional error handling.

### Consistent Styling

Use Bootstrap for common layouts and controls, with custom CSS for the bookstore identity. Use shared variables and avoid unnecessary page-specific duplication.

This structure supports growth in catalogue size and features. Server-side scaling, shared inventory, and multi-user data are outside the first version.

## Proposed Source Structure

```text
src/
  components/
    Header.jsx
    Footer.jsx
    BookCard.jsx
    BookList.jsx
    SearchBar.jsx
    GenreFilter.jsx
    CartItem.jsx
  pages/
    Home.jsx
    Shop.jsx
    BookDetails.jsx
    Cart.jsx
    Checkout.jsx
    NotFound.jsx
  context/
    CartContext.jsx
  hooks/
    useCart.js
  data/
    books.js
  services/
    storageService.js
  utils/
    cartUtils.js
    formatCurrency.js
  assets/
    books/
  App.jsx
  App.css
  index.css
  main.jsx
```

This is a starting structure. Add files when they have a clear responsibility, and adjust names as implementation develops.

## Outside the First Version

- Real payments or real order processing
- User accounts and authentication
- Backend, database, or live inventory
- Administration tools
- Reviews, wishlists, discounts, and external API integration

Consider extensions only after the complete shopping flow works and the mandatory requirements are met.

## Development Steps

1. Review this plan and confirm the initial catalogue scope.
2. Create desktop and mobile wireframes for the five pages, including key empty and confirmation states. Explain tablet adaptations.
3. Create the Vite + React project and install routing and Bootstrap dependencies.
4. Build the shared layout and page navigation.
5. Add book data, reusable cards, and book details.
6. Implement search and genre filtering.
7. Implement the shared cart and LocalStorage persistence.
8. Implement the validated checkout and confirmation flow.
9. Refine responsive styling and keyboard accessibility.
10. Test the application, write the README, and deploy.

Explain new concepts and add useful code comments during implementation.

## Verification Checklist

- [ ] All page navigation and book detail links work.
- [ ] Invalid routes and book IDs have a useful fallback.
- [ ] Search works by title and author, including mixed letter case.
- [ ] Genre filtering works together with search.
- [ ] No-results and empty-cart states are clear.
- [ ] Adding a book again increases its quantity.
- [ ] Quantity changes, removal, line totals, and cart totals are correct.
- [ ] The header count stays consistent across pages.
- [ ] Cart contents survive a refresh.
- [ ] Missing or malformed saved data does not crash the application.
- [ ] Checkout validates required inputs and rejects an empty cart.
- [ ] Confirmation displays the submitted order summary and clears the cart.
- [ ] Layouts work on desktop, tablet, and mobile.
- [ ] Navigation and forms can be used with a keyboard.
- [ ] The production build succeeds and its preview works.
- [ ] The deployed site works, including page refreshes and book-cover paths.

## Documentation and Delivery

Create a public GitHub repository with organised source code and a README containing:

- Project description and target users
- Main features and technologies
- Setup, development, and build instructions
- The role of React, JavaScript, Hooks, and Bootstrap
- Scalability, extensibility, and separation of concerns
- The simulated-checkout limitation
- Repository and live website links
- Credits for book data and images where applicable

GitHub Pages is the proposed deployment destination. Configure routing and the Vite base path for the final repository location.

Required submission:

1. Public GitHub repository URL
2. Working live project URL
3. Short project description

Project basis: Project 4 – Selected Frontend Project requirements and the agreed Sjöbo Books planning discussion.
