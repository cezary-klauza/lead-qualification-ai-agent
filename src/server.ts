import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { scrapeWebsite } from "./lib/scrape/scrape-website.js";
import qualifyLead from "./lib/ai/qualifyLead.js";
import sendSchedulingEmail from "./lib/mails/send-scheduling-mail.js";
import saveLead from "./lib/db/save-lead.js";
import sendApologyEmail from "./lib/mails/send-apology-email.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  // body validation, in larger project should be
  // replaced by zod, or other validation libary.
  if (!body?.name) {
    res.status(400).json({ error: "Lead name is required!" });
    return;
  }

  if (!body?.email) {
    res.status(400).json({ error: "Lead email is required!" });
  }

  if (!body?.url) {
    res.status(400).json({ error: "Lead companys website url is required!" });
  }

  if (!body?.message) {
    res.status(400).json({ error: "Lead message is required!" });
  }

  try {
    const websiteContent = await scrapeWebsite(body.url);

    if (!websiteContent) {
      res.status(400).json({ error: "Provided URL is invalid" });
      return;
    }

    const leadInfo = {
      name: body.name,
      email: body.email,
      message: body.message,
      url: body.url,
    };

    const isQualified = await qualifyLead(leadInfo, websiteContent);

    if (isQualified) {
      const isSended = await sendSchedulingEmail(body.email);

      if (!isSended) {
        res.status(500).json({
          error: "Unexpected error while sending scheduling email to the lead.",
        });
        return;
      }

      await saveLead(leadInfo);
    } else {
      const isSended = await sendApologyEmail(body.email);

      if (!isSended) {
        res.status(500).json({
          error: "Unexpected error while sending apology email to the lead.",
        });
        return;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unexpected error.", details: error });
    return;
  }

  res.status(200).json({ message: "Success!" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port} port.`);
});
