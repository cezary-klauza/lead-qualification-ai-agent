import { Type } from "@google/genai";
import { ai } from "./index.js";
import { Lead } from "../types/lead.js";

async function qualifyLead(lead: Lead, scrapedData: string): Promise<boolean> {
  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are an inbound lead qualification agent. Your job is to analyze the form submission and company research provided and decide whether they are qualified to work with BB Recruits, a Dallas-based recruitment firm.

BB Recruits specializes in IT and tech talent placements. We are specialists in capturing talent post liquidation and can therefore provide talent to our clients as we hit the market.

We only work with software-based businesses, e.g. SaaS companies or development agencies. These companies are willing to pay much more for developers than your average marketing company or local business, therefore we only work with them.

Your job is to determine if the lead you are provided with is a good fit for Big Boy Recruits, and if so call the 'lead_is_qualified' tool and send the lead information to it. If the lead is not qualified, then you must trigger the gmail send email tool for us to respond to them letting them know we are unable to help them.

Here is the lead information for you to analyze:
Name: ${lead.name}
Company URL: ${lead.url}
Message Request: ${lead.message}
Company Research (scraped from their website):${scrapedData}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.BOOLEAN,
        description: "Is lead qualified",
      },
    },
  });

  if (!res.text) {
    throw new Error("Ai didn't return a response");
  }

  const isQualified = JSON.parse(res.text);

  return isQualified;
}

export default qualifyLead;
