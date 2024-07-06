# Mudra

## How To setup Mudra on local?

### Prerequisites

Requirements for this project

- Node.js >= v14
- pnpm

1. Clone the repository:

   ```sh
   git clone https://github.com/RahulSingh9131/mudra-webapp.git
   cd mudra-webapp
   ```

2. ```
   pnpm install
   ```

3. install postgres locally from [postgresql.org](https://www.postgresql.org/download/) and create a database named `mudra`on your local and run cmd `pnpm db:push` to pull the schema from your local db. You can use **pg Admin** to make your database on local and manage the database activity.
