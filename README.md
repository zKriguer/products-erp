## Products ERP - Technical Test

This monorepo application has two repositories, frontend and backend, built with fastify - Nextjs and Typescript;

## The Technical Test

For backend:

- [x] A POST endpoint for inserting new products;
- [x] A GET endpoint for listing products.

For frontend:

- [x] A view of products in a table format
- [x] A form for product registration

Extras:

- [ ] Sorting in the product table
- [x] Filters by name and product category
- [x] Allow any registered product to be deleted

## Installation

Use a package manager of your choice in order to install all dependencies.

In the root folder of the project run:

```bash
# With NPM
npm install

# With Yarn
yarn install

# With PNPM
pnpm install
```

## Usage

Just run `dev` script.

```bash
# With NPM
npm run dev

# With Yarn
yarn dev

# With PNPM
pnpm dev
```

## Building

To generate the project, just run:

```bash
# With NPM
npm build

# With Yarn
yarn build

# With PNPM
pnpm build
```

## With docker (any package manager)

See the .env.example

In the backend directory run:

```
docker compose up
```

```
# For create the tables on docker db
npm run db:deploy
```

```
# For populate the tables with needed data
npm run db:seed
```

With docker running, go to the root folder and run:

```
npm run dev
```

## Questions

1. What would be your first improvements if you had more implementation time?

Answer: For frontend improvements, I would be excited to add sorting in the table. For the backend, I was thinking about adding JWT and encryption if necessary, and authentication in both projects (frontend and backend). For development experience, scalability, and defect detection, it would be nice to add unit tests or end-to-end tests in both projects.

2. Thinking about your solution, how would maintenance be in case of adding new product categories? What would need to be changed?

Answer: In this case, the database table for categories needs some changes for inserting new product types. The frontend fetches these categories dynamically, so no changes are needed in the frontend.

3. What changes would need to be made to support updates in the product category's discount percentage so that whenever the discount percentage was changed, the new price would be reflected in all products of the same category?

Answer: In the backend, some new endpoints need to be created. The categories are stored in the database, so the only change needed is an endpoint for changing the value field for the discount. The new price is dynamically calculated in the existing query, so this is not a problem.

## 📝 License

This project is under the MIT license. See the [LICENSE](https://github.com/zKriguer/products-erp/blob/master/LICENSE.md) for details.
