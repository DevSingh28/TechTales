# TechTales

TechTales is a comprehensive tech blog platform where users can read, create, and manage technology-related articles. The platform includes features like user and admin role protection, JWT-based authentication, and much more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **User and Admin Role Protection**: Different functionalities and access levels for users and admins.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Create, Read, Update, Delete (CRUD) Operations**: Full CRUD support for blog posts.
- **Google OAuth2 Integration**: Log in with Google account.
- **Responsive Design**: Mobile-friendly design using Tailwind CSS.
- **Rich Text Editor**: Enhanced blogging experience with rich text editing capabilities.
- **Form Validation**: Robust form validation using Formik and Yup.
- **Notifications**: Real-time notifications and alerts using React Hot Toast.
- **Search Functionality**: Search through blog posts.
- **Comment System**: Users can comment on blog posts.
- **Likes and Dislikes**: Users can like or dislike blog posts.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/DevSingh28/techtales.git
    cd techtales
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your environment variables:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    Port=Port_on_which_it_run
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

## Usage

- **Homepage**: Browse the latest tech blog posts.
- **Create Post**: Admins can create new blog posts.
- **Edit Post**: Admins can edit existing blog posts.
- **Delete Post**: Admins can delete blog posts.
- **User Profile**: Users can view and edit their profiles.
- **Login/Register**: Users can log in or register using email/password

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding style and include tests for new features.

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m "Add some feature"
    ```
5. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
6. Create a pull request.


---

Happy Coding!
