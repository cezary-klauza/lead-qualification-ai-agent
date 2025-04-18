import { Lead } from "../types/lead.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const dataPath = path.resolve(process.cwd(), "./data/");

async function saveLead(lead: Lead): Promise<void> {
  // you can here save lead to google sheet, or any other database
  // but for now we will save it to a CSV file in the data folder.
  try {
    // Check if the file exists
    const fileExists = fs.existsSync(dataPath + "/leads.csv");

    // Prepare the CSV row
    const csvRow = `${lead.name},${lead.email},${lead.message},${lead.url},${os.EOL}`;

    if (!fileExists) {
      // If the file doesn't exist, create it and add a header row
      const header = "name,email,message,website" + os.EOL;
      fs.writeFileSync(dataPath + "/leads.csv", header + csvRow, "utf8");
    } else {
      // Append the new row to the existing file
      fs.appendFileSync(dataPath + "/leads.csv", csvRow, "utf8");
    }
  } catch (error) {
    console.error("Error saving lead to CSV:", error);
    throw error;
  }
}

export default saveLead;
