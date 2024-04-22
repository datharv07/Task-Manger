
# Task-Manager MERN Application

This is a full-stack Task-Manager application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Getting Started

To run this application, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Create a `config` folder inside the `server` directory.
4. Inside the `config` folder, create a file named `config.env` , and add the following environment variables:

```plaintext
PORT=4000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET_KEY=ahsfkhdskjfhdsakjfhalkshfdalkshfdk
JWT_EXPIRES=YOUR_JWT_EXPIRATION_TIME
COOKIE_EXPIRE=5
FRONTEND_URL=http://127.0.0.1:5173
CLOUDINARY_CLIENT_NAME=duszgoa23
CLOUDINARY_CLIENT_API=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_CLIENT_SECRET=YOUR_CLOUDINARY_CLIENT_SECRET
```

Replace `YOUR_MONGODB_URI`, `YOUR_JWT_EXPIRATION_TIME`, `YOUR_CLOUDINARY_API_KEY`, and `YOUR_CLOUDINARY_CLIENT_SECRET` with your actual values.

5. Install dependencies for both the server and client by running:
```bash
npm install
```

6. Start the server and client concurrently by running:
```bash
npm run dev
```

## Usage

Once the server and client are running, you can access the application at [http://localhost:5173](http://localhost:5173). You can register a new account, log in, create tasks, update tasks, and delete tasks.

## Technologies Used

- MongoDB: NoSQL database used for storing task data.
- Express.js: Backend framework for handling HTTP requests and routes.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for running server-side code.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- Cloudinary: Cloud-based image and video management service for uploading and storing task images.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub flow: fork the repository, make your changes, and submit a pull request.

## Acknowledgments

- Inspiration: [https://youtu.be/1nMHRFfqJfI?si=KWvb0tkDaMUs94EY]

