```markdown
# Node.js Project Template

This is a base Node.js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations in mind. Feel free to change anything as needed.

## Project Structure

```plaintext
src/
  ├── config/
  ├── routes/
  ├── middlewares/
  ├── controllers/
  ├── repositories/
  ├── services/
  └── utils/
```

### src

Inside the `src` folder, all the actual source code related to the project resides. This will not include any kind of tests. (You might want to make a separate `tests` folder.)

### config

In this folder, anything and everything regarding any configurations or setup of a library or module will be done. For example:
- **dotenv**: Setting up `dotenv` so that we can use environment variables anywhere in a cleaner fashion. This is done in `server-config.js`.
- **Logging Library**: Configuration for setting up a logging library to prepare meaningful logs should also be done here.

### routes

In the `routes` folder, we register a route and the corresponding middleware and controllers to it.

### middlewares

Middlewares intercept the incoming requests, where we can write our validators, authenticators, etc.

### controllers

Controllers are like the last middleware, as after them, you call your business layer to execute the business logic. In controllers, we:
- Receive incoming requests and data.
- Pass it to the business layer.
- Structure the API response and send the output once the business layer returns.

### repositories

This folder contains all the logic used to interact with the database by writing queries. All raw queries or ORM queries will go here.

### services

The `services` folder contains the business logic and interacts with repositories to retrieve data from the database.

### utils

The `utils` folder contains helper methods, error classes, etc.

## Setup the Project

1. **Download this template** from GitHub and open it in your favorite text editor.

2. **Install dependencies** by navigating to the project folder and running:

    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory and add the following environment variables:

    ```plaintext
    PORT=<port number of your choice>
    ```

    Example:

    ```plaintext
    PORT=3000
    ```

4. **Initialize Sequelize** by navigating to the `src` folder and executing the following command:

    ```bash
    npx sequelize init
    ```

    By executing the above command, you will get `migrations` and `seeders` folders along with a `config.json` inside the `config` folder.

5. **Database Configuration**:
    - If you're setting up your **development environment**, then write the username of your DB, the password of your DB, and in `dialect`, mention whatever DB you are using (e.g., `mysql`, `mariadb`, etc.).
    - If you're setting up a **test or production environment**, make sure you also replace the host with the hosted DB URL.

6. **Run the Server**:

    To start the server, execute:

    ```bash
    npm run dev
    ```

---

Feel free to contribute to this template and make it even better!
