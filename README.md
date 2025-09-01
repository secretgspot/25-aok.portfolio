My Web Portfolio
A personal portfolio website built with SvelteKit and styled with Open Props, designed to showcase my web development projects. This site provides a clean and interactive way to explore my work, offering detailed views of each project without the need for a backend database.

Features
Dynamic Project Pages: Each project has its own dedicated page at a user-friendly URL like /my-project-name.

Graphical Header: The main header for each project page features a screenshot from the project as a background, creating an engaging visual introduction.

Dynamic Screenshot Gallery: The screenshots component automatically discovers and displays all images from a designated project folder (/static/my-project-name/screenshots/).

Live Demos: An integrated iframe component allows for showcasing live previews of web projects from any URL.

Visual Workflow: The workflow component presents a visual narrative of the project's development process, loading images from a dedicated folder (/static/my-project-name/workflow/) and pairing them with explanatory text.

Detailed Project Information: A dedicated component displays project details, including the project's folder structure, technologies used, and other relevant data.

Technologies
SvelteKit: The modern web framework for building performant applications.

Open Props: A CSS custom properties library for beautiful, consistent styling.

Getting Started
To get a local copy of this project up and running, follow these simple steps.

Prerequisites
Node.js (v18 or higher)

npm

Installation
Clone the repository:

git clone [https://github.com/your-username/your-portfolio-repo.git](https://github.com/your-username/your-portfolio-repo.git)
cd your-portfolio-repo

Install the dependencies:

npm install

Start the development server:

npm run dev

Project Structure
Here is a simplified view of the project's folder structure, focusing on the dynamic routing and static assets for each project.

your-portfolio-repo/
├── src/
│   ├── routes/
│   │   ├── [slug]/
│   │   │   ├── +page.svelte
│   │   │   └── +page.js
│   │   └── +page.svelte
│   └── lib/
│       ├── components/
│       │   ├── Header.svelte
│       │   ├── Screenshots.svelte
│       │   ├── Iframe.svelte
│       │   ├── Workflow.svelte
│       │   └── Details.svelte
│       └── ...
└── static/
    ├── project-one/
    │   ├── screenshots/
    │   │   ├── screenshot-1.jpg
    │   │   └── screenshot-2.jpg
    │   └── workflow/
    │       ├── step-1.png
    │       └── step-2.png
    └── project-two/
        ├── screenshots/
        └── workflow/

Deployment
This portfolio is designed to be easily deployed to a platform like Vercel. Simply connect your GitHub repository to a Vercel project, and it will handle the build and deployment process automatically.
