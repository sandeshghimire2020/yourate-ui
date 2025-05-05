# YouRate - Content Creator Rating Platform

YouRate is a web application that allows users to discover, rate, and review content creators across various platforms. With YouRate, you can search for your favorite creators, view their profiles, and share your opinions with the community.

## Features

- **Search Functionality**: Find content creators by name, category, or keywords
- **Creator Profiles**: View detailed profiles with ratings, reviews, and creator information
- **Rating System**: Rate and review your favorite creators
- **Featured Creators**: Discover popular content creators on the homepage
- **User Authentication**: Create an account to save your ratings and reviews

## Project Structure

```
src/
  components/        # UI components
  services/          # API services and utilities
  App.js             # Main application component
  index.js           # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/yourate-frontend.git
cd yourate-frontend
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
```
cp .env.example .env
```
Edit the `.env` file and update the variables with your actual values:
- `REACT_APP_API_BASE_URL`: Your API endpoint URL

4. Start the development server
```
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Environment Variables

The following environment variables can be configured in the `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_BASE_URL | API endpoint URL | None - Required |

## GitHub Repository Setup

When pushing to GitHub, ensure that:

1. The `.gitignore` file properly excludes sensitive files
2. No API keys, tokens, or passwords are hardcoded in the source code
3. Environment variables are used for all configuration values
4. `.env` files are never committed to the repository (only `.env.example`)

## Technology Stack

- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/yourusername/yourate-frontend](https://github.com/yourusername/yourate-frontend)
