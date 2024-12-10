# Login-Register System

A full-stack user authentication and profile management system built using **Laravel** (backend) and **React** (frontend). This system allows users to register, log in, upload profile photos, and manage posts and comments. The project uses **Ant Design** for UI components, **Laravel Passport** for API authentication, and **Redux** for state management.

## Features

### Authentication
- User registration with validation.
- User login with access tokens (via Laravel Passport).
- Logout functionality with token revocation.
- User profile retrieval and management.

### Profile Management
- Upload and update profile photos.

### Posts and Comments
- Create, view, and delete posts.
- Add and manage comments on posts.

## Technologies Used
- **Backend**: Laravel, PHP
- **Frontend**: React, Redux, React Router, Ant Design
- **API Authentication**: Laravel Passport
- **Database**: SQLite
- **State Management**: Redux Toolkit

## Project Structure

```plaintext
backend/
├── app/Http/Controllers/  # Contains Laravel controllers
├── app/Models/            # Eloquent models
├── app/Http/Requests/     # Custom request validation
├── database/migrations/   # Database migrations
└── routes/api.php         # API routes for backend

frontend/
├── src/components/        # React components (Auth, Posts, Comments, Layout)
├── src/services/redux/    # Redux slices and thunks for state management
├── src/helpers/           # API client helper
├── src/router/            # Application routes
└── .env                   # Environment configuration
```

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** and **npm** (for the frontend).
- **PHP** and **Composer** (for the backend).
- **SQLite** (or any supported database).
- **Git** for version control.

### Backend Setup
1. Clone the Repository and Navigate to Backend Directory:
    ```bash
    git clone https://github.com/LedBajrami/react-laravel-auth.git
    cd react-laravel-auth/backend
    ```
2. Install Backend Dependencies:
    ```bash
    composer install
    ```
3. Configure Environment:
    ```bash
    mv .env.example .env
    ```
4. Set Up Database:
    ```bash
    touch /absolute/path/to/your/database.sqlite
    ```
    Update `.env` to configure the database:
    ```plaintext
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/your/database.sqlite
    ```
5. Run Key and Passport Setup:
    ```bash
    php artisan key:generate
    php artisan passport:install
    ```
6. Run Migrations and Storage Link:
    ```bash
    php artisan migrate
    php artisan storage:link
    ```
7. Start Backend Server:
    ```bash
    php artisan serve
    ```

### Frontend Setup
1. Navigate to Frontend Directory:
    ```bash
    cd ../frontend
    ```
2. Install Dependencies:
    ```bash
    npm install
    ```
3. Configure Environment:
    Create a `.env` file in the `frontend` directory with the following:
    ```plaintext
    REACT_APP_BASE_URL=http://127.0.0.1:8000
    ```
4. Start the React Development Server:
    ```bash
    npm start
    ```

## Usage
1. Register a New Account:
    Go to [http://localhost:3000/register](http://localhost:3000/register) and create an account.
2. Login:
    Access [http://localhost:3000/login](http://localhost:3000/login) and log in with your credentials.
3. Dashboard:
    Access your user dashboard at `/user`, where you can:
    - View your profile information.
    - Upload and update your profile photo.
4. Posts:
    Navigate to `/posts` to:
    - Create posts.
    - View posts with their comments.
5. Comments:
    Add comments to posts or delete your existing comments.

## Available Endpoints

### Authentication
1. `POST /api/register`: Registers a new user.
    - Required fields: `name`, `email`, `password`, `password_confirmation`.
2. `POST /api/login`: Logs in a user and generates an access token.
    - Required fields: `email`, `password`.
3. `GET /api/user`: Retrieves the authenticated user’s profile information.
    - Requires `Authorization: Bearer <token>` header.
4. `POST /api/user/upload`: Uploads or updates the user’s profile photo.
    - Requires `Authorization: Bearer <token>` header.
5. `GET /api/logout`: Logs out the user by revoking their token.
    - Requires `Authorization: Bearer <token>` header.

### Posts
1. `POST /api/post`: Creates a new post.
    - Required fields: `content`.
    - Requires `Authorization: Bearer <token>` header.
2. `GET /api/posts`: Retrieves a list of all posts.
    - Requires `Authorization: Bearer <token>` header.
3. `GET /api/posts/{id}`: Retrieves a single post with its comments and associated users.
    - Requires `Authorization: Bearer <token>` header.
4. `DELETE /api/posts/{id}`: Deletes a specific post (only if created by the authenticated user).
    - Requires `Authorization: Bearer <token>` header.

### Comments
1. `POST /api/posts/{postId}/comments`: Adds a comment to a specific post.
    - Required fields: `content`.
    - Requires `Authorization: Bearer <token>` header.
2. `DELETE /api/comments/{id}`: Deletes a comment (only if created by the authenticated user).
    - Requires `Authorization: Bearer <token>` header.
