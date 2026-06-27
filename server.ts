import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required by skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});


interface Project {
  slug: string;
  title: string;
  industry: string;
  country: string;
  summary: string;
  details: string;
  companyName: string;
  contactEmail: string;
  contactPhone?: string;
  status: 'open' | 'closed' | 'pending';
  createdAt: string;
}

const initialProjects: Project[] = [
  {
    slug: "project-aurora-renewable-energy-spain",
    title: "Project Aurora: Renewable Energy Expansion",
    industry: "Energy & Utilities",
    country: "Spain",
    summary: "Solar and wind development portfolio with over 150MW pipeline ready-to-build, seeking joint venture partnership.",
    details: "Connect Ventures has been retained to identify strategic investors or joint venture partners for a top-tier European renewable energy developer. The portfolio includes 3 fully permitted solar farms and 2 wind farms under advanced development in southern Spain. Great feed-in tariff conditions and secured grid connections.",
    companyName: "Aurora Iberia CleanTech",
    contactEmail: "partnerships@theconnectventures.com",
    contactPhone: "+34 91 123 4567",
    status: "open",
    createdAt: "2026-05-12T10:00:00.000Z"
  },
  {
    slug: "project-sterling-robotics-germany",
    title: "Project Sterling: Advanced Robotics & AI Logistics",
    industry: "Technology & Automation",
    country: "Germany",
    summary: "Leading manufacturer of autonomous mobile robots (AMRs) for industrial and warehouse automation, seeking growth capital.",
    details: "A highly profitable, German-engineered robotics provider looking for a strategic growth partner to expand manufacturing footprint into APAC and Americas markets. Intellectual property includes patented vision-guided navigation algorithms and high-density battery swapping systems. Strong year-over-year growth.",
    companyName: "Sterling Robotics GmbH",
    contactEmail: "partnerships@theconnectventures.com",
    contactPhone: "+49 89 9876543",
    status: "open",
    createdAt: "2026-05-28T14:30:00.000Z"
  },
  {
    slug: "project-oasis-sustainable-agritech-israel",
    title: "Project Oasis: Sustainable Agriculture Technology",
    industry: "Agriculture & AgriTech",
    country: "Israel",
    summary: "Hydroponic and drip irrigation solution provider with established presence in Middle East and Africa.",
    details: "Market leader in arid-zone agriculture solutions seeking expansion capital or a strategic merger to commercialize automated vertical farming stacks in European cities. Highly efficient water usage technology and proprietary organic liquid fertilizers.",
    companyName: "Oasis Farming Systems Ltd.",
    contactEmail: "partnerships@theconnectventures.com",
    contactPhone: "+972 3 555 1212",
    status: "open",
    createdAt: "2026-06-05T08:15:00.000Z"
  },
  {
    slug: "project-medtech-diagnostic-equipment-japan",
    title: "Project MedTech: Precision Diagnostic Equipment",
    industry: "Healthcare & Life Sciences",
    country: "Japan",
    summary: "ISO-certified manufacturer of advanced ultrasound and non-invasive cardiovascular diagnostic tools.",
    details: "Highly specialized, medical device company with FDA and CE clearances seeking distribution and regulatory partners in Latin America and the US. Outstanding patent portfolio with over 45 active filings and proprietary machine learning analytics pipeline.",
    companyName: "Tokyo MedTech Systems KK",
    contactEmail: "partnerships@theconnectventures.com",
    contactPhone: "+81 3 4444 5555",
    status: "open",
    createdAt: "2026-06-18T11:45:00.000Z"
  }
];

let projectsDb: Project[] = [...initialProjects];

app.get("/api/projects", (req, res) => {
  res.json({ projects: projectsDb });
});

app.get("/api/projects/:slug", (req, res) => {
  const { slug } = req.params;
  const project = projectsDb.find(p => p.slug === slug);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(project);
});

app.post("/api/projects", (req, res) => {
  const { title, industry, country, summary, details, companyName, contactEmail, contactPhone } = req.body;
  if (!title || !industry || !country || !summary || !details || !companyName || !contactEmail) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const baseSlug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const newProject: Project = {
    slug: `${baseSlug}-${Date.now()}`,
    title,
    industry,
    country,
    summary,
    details,
    companyName,
    contactEmail,
    contactPhone,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  projectsDb.push(newProject);
  res.status(201).json(newProject);
});

// Real-world web search endpoint utilizing Gemini 3.5 Flash Search Grounding
app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  
  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Query is required" });
    return;
  }

  const systemInstruction = `You are an expert business acquisition research assistant.
The user wants to find real, active businesses for sale from around the web based on their query.

You MUST use the googleSearch tool to search for real, actual, current business-for-sale listings on sites like BizBuySell, BusinessesForSale.com, Acquire.com, Flippa, BusinessBroker.net, DealStream, MergerNetwork, Axial, or similar global marketplaces.

Return ONLY a raw JSON array of up to 12 real listings you find. Do not include any other text, markdown blocks, preambles, or explanations. Just return the JSON.
Each object in the array must have exactly these fields:
{
  "title": "exact listing title or a descriptive name if not clear",
  "country": "country",
  "industry": "industry category (e.g., Manufacturing, Food & Beverages, Retail, Healthcare, Technology, etc.)",
  "dealType": "acquisition|merger|franchise|investment",
  "askingPrice": "price as string e.g. $2.5M or USD 500,000 or On request",
  "revenue": "annual revenue or Undisclosed",
  "summary": "2-3 sentence description of the business",
  "highlights": ["point 1", "point 2", "point 3"],
  "yearEstablished": "year or empty string",
  "employees": "employee count or range",
  "sourceUrl": "direct URL to the listing",
  "sourceName": "BizBuySell / Acquire.com / etc"
}

Only include REAL listings you actually found via googleSearch. If you find fewer than 12 real results, return only what you found. If you find none, return an empty array [].`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Search query: "${query}"`,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      }
    });

    let text = response.text || "";
    
    // Clean markdown code blocks if present
    if (text.includes("```")) {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) {
        text = match[1];
      }
    }
    
    text = text.trim();
    
    if (!text) {
      res.json([]);
      return;
    }

    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON output:", text);
      res.status(500).json({ error: "Failed to parse search results" });
    }
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "An error occurred during search" });
  }
});

// Vite middleware for development or serving built static files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
