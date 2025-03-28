"use server"

import * as cheerio from "cheerio"

export async function scrapeWebsite(url: string) {
  try {
    // Fetch the website content
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()

    // Parse the HTML with cheerio
    const $ = cheerio.load(html)

    // Extract the title
    const title = $("title").text().trim()

    // Extract the meta description
    const description =
      $('meta[name="description"]').attr("content") || $('meta[property="og:description"]').attr("content") || ""

    // Extract all links
    const links: string[] = []
    $("a").each((_, element) => {
      const href = $(element).attr("href")
      if (href && !href.startsWith("#") && href !== "/") {
        // Convert relative URLs to absolute
        try {
          const absoluteUrl = new URL(href, url).toString()
          if (!links.includes(absoluteUrl)) {
            links.push(absoluteUrl)
          }
        } catch (e) {
          // Skip invalid URLs
        }
      }
    })

    // Extract text content
    const text = $("body").text().replace(/\s+/g, " ").trim()

    return {
      title,
      description,
      links,
      text,
    }
  } catch (error) {
    console.error("Error scraping website:", error)
    throw error
  }
}

