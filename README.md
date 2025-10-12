
# Dashboard

This project is a React dashboard application built with Vite, Tailwind CSS, and React Router DOM.

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm or yarn

### Installation
1. Clone the repository:
	```zsh
	git clone https://github.com/Akshitpatel25/dashboard.git
	cd dashboard
	```
2. Install dependencies:
	```zsh
	npm install --legacy-peer-deps
	# or
	yarn install --legacy-peer-deps
	```
	> If you encounter errors related to peer dependencies, use the `--legacy-peer-deps` flag as shown above.

### Running Locally
1. Start the development server:
	```zsh
	npm run dev
	# or
	yarn dev
	```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

To deploy on Vercel, make sure you have a `vercel.json` file in the root directory with the following content:
```json
{
  "rewrites": [
	 { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This ensures proper routing for React Router DOM.

## Design Decisions & Challenges

- **Routing:** Used React Router DOM for client-side routing. Added `vercel.json` for SPA routing support on Vercel.
- **Styling:** Tailwind CSS for rapid UI development and easy customization.
- **State Management:** Redux Toolkit (if used) for scalable state management.
- **Challenge:** Finding exact resources and documentation for some features was time-consuming.
- **Installation Issues:** Faced errors due to outdated package versions; resolved by using `--legacy-peer-deps` during installation.

## Improvements Made
- Improved folder structure for better maintainability.
- Added clear instructions for deployment and local setup.
- Enhanced error handling and documentation.

---
Feel free to contribute or raise issues for improvements!
