"use client"

import type React from "react"

import { useState } from "react"
import { scrapeWebsite } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle } from "lucide-react"

export default function WebScraper() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    title: string
    description: string
    links: string[]
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!url) {
        throw new Error("Please enter a URL")
      }

      // Add https:// if not present
      let urlToScrape = url
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        urlToScrape = `https://${url}`
      }

      const data = await scrapeWebsite(urlToScrape)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scrape website")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Web Scraper</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter Website URL</CardTitle>
          <CardDescription>Enter the URL of the website you want to scrape</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com"
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                "Scrape"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Scrape Results</CardTitle>
            <CardDescription>Data scraped from {url}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="links">Links ({result.links.length})</TabsTrigger>
                <TabsTrigger value="text">Full Text</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Title</h3>
                    <p>{result.title || "No title found"}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Description</h3>
                    <p>{result.description || "No description found"}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Link Count</h3>
                    <p>{result.links.length} links found</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="links">
                <div className="max-h-96 overflow-y-auto border rounded-md p-4">
                  {result.links.length > 0 ? (
                    <ul className="space-y-2">
                      {result.links.map((link, index) => (
                        <li key={index} className="break-all">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No links found</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="text">
                <div className="max-h-96 overflow-y-auto border rounded-md p-4">
                  <pre className="whitespace-pre-wrap text-sm">{result.text || "No text content found"}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

