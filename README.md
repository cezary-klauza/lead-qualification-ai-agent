# Lead Qualification Agent

The **Lead Qualification Agent** is a Node.js-based tool designed to automate the process of qualifying inbound leads for a recruitment firm. It integrates web scraping, AI-based lead qualification, and email communication to streamline the lead management process.

## Features

- **Web Scraping**: Scrapes company websites for additional context using Puppeteer.
- **AI Qualification**: Uses Google GenAI to determine if a lead is qualified based on their submission and scraped data.
- **Email Communication**: Sends scheduling emails to qualified leads and apology emails to unqualified leads.
- **CSV Storage**: Saves qualified leads to a CSV file for record-keeping.

## Prerequisites

- Node.js (v18 or higher)
- TypeScript
- SMTP credentials for sending emails
- Google GenAI API key

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd lead-qualification-agent
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run start
   ```

## Usage

1. Start the server:

   ```bash
   npm run start
   ```

2. Send a POST request to the root endpoint (`/`) with the following JSON payload:

   ```json
   {
     "name": "John Doe",
     "email": "john.doe@example.com",
     "url": "https://example.com",
     "message": "We are looking for recruitment services."
   }
   ```

3. The server will:
   - Scrape the provided URL for content.
   - Use AI to determine if the lead is qualified.
   - Send a scheduling email if qualified or an apology email if unqualified.
   - Save qualified leads to a CSV file in the `data` directory.

## Environment Variables

The following environment variables must be configured for the application to work correctly:

1. **SMTP Configuration**:

   - `SMTP_HOST`: The SMTP host for sending emails.
   - `SMTP_USER`: The SMTP username.
   - `SMTP_PASS`: The SMTP password.
   - `SMTP_FROM`: The sender email address.

2. **Google GenAI API Key**:

   - `GENAI_API_KEY`: The API key for Google GenAI.

3. **Scheduling Email Link**:
   - `SCHEDULING_LINK`: The link to the scheduling page.

## Project Structure

```
lead-qualification-agent/
├── src/
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── index.ts
│   │   │   └── qualifyLead.ts
│   │   ├── db/
│   │   │   └── save-lead.ts
│   │   ├── mails/
│   │   │   ├── send-apology-email.ts
│   │   │   ├── send-mail.ts
│   │   │   └── send-scheduling-mail.ts
│   │   ├── scrape/
│   │   │   └── scrape-website.ts
│   │   └── types/
│   │       └── lead.d.ts
│   ├── server.ts
├── data/ (Generated CSV files are stored here)
├── dist/ (Compiled JavaScript files)
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- Ensure the `data` directory exists in the root of the project for saving CSV files.
- The AI model used is `gemini-2.0-flash` from Google GenAI. You can replace it with another model if needed.
- For production, ensure sensitive data (e.g., API keys, SMTP credentials) is stored securely using environment variables or a secrets manager.

## License

This project is licensed under the MIT License.
