### Author-Liz.W.Wachira
This web scraper application allows you to extract data from websites by simply entering a URL. Here's what it does:
  ### Note: When scraping websites, be mindful of the website's terms of service and robots.txt file. Some websites may prohibit scraping, and excessive requests could lead to your IP being blocked.

1. **Simple Interface**: Enter any website URL and click "Scrape"
2. **Data Extraction**: The app fetches and parses the HTML content using Cheerio
3. **Organized Results**: View the scraped data in three tabs:

1. Overview: Shows the page title, description, and link count
2. Links: Lists all hyperlinks found on the page
3. Full Text: Displays the extracted text content

### How it works:

1. The frontend collects the URL input and sends it to a server action
2. The server action fetches the website content with appropriate headers
3. Cheerio parses the HTML to extract useful information
4. The results are displayed in a user-friendly interface


### Features:

- Automatically adds "https://" if missing from the URL
- Converts relative URLs to absolute URLs
- Handles errors gracefully with informative messages
- Shows a loading state during scraping
- Responsive design that works on all devices

  ## 1. Prerequisites
Thought for 3 seconds### Setting Up a Virtual Environment for the Next.js Web Scraper

To set up and run the Next.js web scraper project I shared earlier, you'll need to create a new Next.js project and install the necessary dependencies. Here's a step-by-step guide:

## 1. Prerequisites

Make sure you have the following installed on your system:

- Node.js (version 16.8 or later)
- npm (comes with Node.js) or yarn


You can check if you have them installed by running:

```shellscript
node -v
npm -v
```

## 2. Create a New Next.js Project

First, create a new Next.js project using the App Router:

```shellscript
npx create-next-app@latest web-scraper
```

When prompted, select the following options:

- Would you like to use TypeScript? → Yes
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Yes
- Would you like to use `src/` directory? → No (or Yes, but adjust paths accordingly)
- Would you like to use App Router? → Yes
- Would you like to customize the default import alias? → No (or Yes if you prefer)


## 3. Navigate to Your Project
Make sure you have the following installed on your system:

- Node.js (version 16.8 or later)
- npm (comes with Node.js) or yarn
 
  ## Create a New Next.js Project 
  npx create-next-app@latest web-scraper
   ### Install Additional Dependencies
npx shadcn@latest init 
npm install cheerio
npm install --save-dev @types/cheerio
# install shadcn/ui Components
npx shadcn@latest init
npx shadcn@latest add button card input alert tabs
npm install typescript@latest
npx shadcn@latest add [component-name]
npm install next@latest react@latest react-dom@latest
npm run dev


Thought for 2 secondsHere's the complete code for the Next.js web scraper project:

```typescriptreact project="web-scraper"
...
```

## How the Web Scraper Works

This web scraper has three main components:

### 1. User Interface (`app/page.tsx`)

- A form to input the URL you want to scrape
- Loading state and error handling
- Tabbed interface to display the scraped data:

- Overview tab: Shows title, description, and link count
- Links tab: Lists all hyperlinks found on the page
- Full Text tab: Shows all text content from the page


### 2. Server Action (`app/actions.ts`)

- A server-side function that performs the actual web scraping
- Uses Cheerio to parse the HTML and extract data
- Returns structured data including title, description, links, and text content


### 3. Layout (`app/layout.tsx`)

- Sets up the basic page structure and theme provider


### Key Features

1. **URL Validation**: Automatically adds "https://" if not present
2. **User-Agent Header**: Uses a standard browser user-agent to avoid being blocked
3. **Link Processing**: Converts relative URLs to absolute URLs
4. **Error Handling**: Provides clear error messages if scraping fails
5. **Responsive Design**: Works well on both desktop and mobile devices


### How to Use

1. Enter a website URL in the input field (e.g., `example.com`)
2. Click the "Scrape" button
3. View the scraped data in the tabs below