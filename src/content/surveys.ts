const vcs = {
  title: "VC Survey",
  elements: [
    { type: "text", name: "name", title: "Name", isRequired: true },
    { type: "text", name: "email", title: "Email", isRequired: true },
    { type: "text", name: "phone", title: "Phone Number" },
    { type: "text", name: "firmName", title: "Firm Name", isRequired: true },
    {
      type: "checkbox",
      name: "investmentFocus",
      title: "Investment Focus/Strategy",
      choices: [
        "Early-stage startups",
        "Growth-stage startups",
        "Industry-specific investments",
        "Geography-specific investments",
      ],
    },
    {
      type: "checkbox",
      name: "industriesOfInterest",
      title: "Industries/Sectors of Interest",
      choices: [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "E-commerce",
        "Energy",
        "Real estate",
        "Other",
      ],
    },
    {
      type: "text",
      name: "investmentSize",
      title: "Typical Investment Size",
      inputType: "number",
    },
    {
      type: "checkbox",
      name: "preferredCompanyStage",
      title: "Preferred Company Stage",
      choices: [
        "Seed",
        "Series A",
        "Series B",
        "Series C and beyond",
        "Pre-IPO",
        "IPO and beyond",
      ],
    },
    {
      type: "comment",
      name: "portfolioCompanies",
      title: "Portfolio Companies (if applicable)",
      placeHolder: "Separate company names with commas",
    },
    {
      type: "checkbox",
      name: "preferredMetric",
      title: "Preferred Key Metric",
      choices: [
        "Monthly Recurring Revenue (MRR)",
        "Customer Acquisition Cost (CAC)",
        "Customer Lifetime Value (LTV)",
        "Churn Rate",
        "Gross Margin",
      ],
    },
  ],
};

const founders = {
  title: "Founder Application",
  showProgressBar: "top",
  progressBarType: "buttons",
  pages: [
    {
      name: "intro",
      title: "Introduction",
      elements: [
        {
          type: "html",
          name: "introText",
          html: `
            <h2>Welcome to the Founder Application</h2>
            <p>This application is designed to gather information about your startup, financial metrics, and supporting documents for the due diligence process.</p>
            <p>Please ensure that you have all the necessary information and documents ready before you begin. The application is divided into multiple sections, each focusing on a different aspect of your startup. You can navigate between sections using the progress bar at the top of the page.</p>
            <p>Once you have completed the application, you will be able to submit it for review by the due diligence team. Make sure to provide accurate and complete information to ensure a smooth and efficient process.</p>
          `,
        },
      ],
    },
    {
      name: "Basic Information",
      elements: [
        { type: "text", name: "name", title: "Name", isRequired: true },
        { type: "text", name: "email", title: "Email", isRequired: true },
        { type: "text", name: "phone", title: "Phone Number" },
        {
          type: "text",
          name: "title",
          title: "Founder's Title",
          isRequired: true,
          description:
            "Please enter the title of the founder (e.g. CEO, CTO, CFO).",
        },
        {
          type: "text",
          name: "startupName",
          title: "Startup Name",
          isRequired: true,
          description: "Please enter the name of your startup.",
        },
        { type: "text", name: "website", title: "Website" },
        { type: "text", name: "location", title: "Location", isRequired: true },
        {
          type: "dropdown",
          name: "primaryGoal",
          title: "Primary Goal of Your Startup",
          choices: [
            "Customer Acquisition",
            "Product Development",
            "Scaling",
            "Profitability",
            "Other",
          ],
          isRequired: true,
          description: "Please select the primary goal of your startup.",
        },
      ],
    },
    {
      name: "Industry & Funding",
      elements: [
        {
          type: "checkbox",
          name: "industry",
          title: "Industry/Sector",
          choices: [
            "Technology",
            "Healthcare",
            "Finance",
            "Education",
            "E-commerce",
            "Energy",
            "Real estate",
            "Other",
          ],
          isRequired: true,
          description:
            "Please select the industry/sector that best describes your startup.",
        },
        {
          type: "text",
          name: "fundingRaised",
          title: "Funding Raised (USD)",
          inputType: "number",
          description:
            "Please enter the total amount of funding raised by your startup in US dollars.",
        },
        {
          type: "radiogroup",
          name: "fundingStage",
          title: "Funding Stage",
          choices: [
            "Pre-seed",
            "Seed",
            "Series A",
            "Series B",
            "Series C and beyond",
          ],
          description: "Please select the funding stage of your startup.",
        },
      ],
    },
    {
      name: "Pitch",
      elements: [
        {
          type: "comment",
          name: "pitch",
          title: "Briefly describe your startup (1-2 sentences)",
          maxLength: 280,
          isRequired: true,
          description:
            "Please provide a brief description of your startup, focusing on your primary goal (1-2 sentences).",
        },
      ],
    },
    {
      name: "Key Metrics",
      elements: [
        {
          type: "text",
          name: "mrr",
          title: "Monthly Recurring Revenue (MRR) (USD)",
          inputType: "number",
          description:
            "Please enter your monthly recurring revenue in US dollars.",
        },
        {
          type: "text",
          name: "cac",
          title: "Customer Acquisition Cost (CAC) (USD)",
          inputType: "number",
          description:
            "Please enter your customer acquisition cost in US dollars.",
        },
        {
          type: "text",
          name: "ltv",
          title: "Customer Lifetime Value (LTV) (USD)",
          inputType: "number",
          description:
            "Please enter your customer lifetime value in US dollars.",
        },
        {
          type: "text",
          name: "churnRate",
          title: "Churn Rate (in %)",
          inputType: "number",
          description: "Please enter your churn rate as a percentage.",
        },
        {
          type: "text",
          name: "grossMargin",
          title: "Gross Margin (in %)",
          inputType: "number",
          description: "Please enter your gross margin as a percentage.",
        },
        {
          type: "text",
          name: "growthRate",
          title: "Growth Rate (in %)",
          inputType: "number",
          description:
            "Please enter your startup's growth rate as a percentage, according to your primary goal.",
        },
      ],
    },

    {
      name: "Financial Requirements",
      elements: [
        {
          type: "text",
          name: "fundingAmount",
          title: "How much money do you need?",
          inputType: "number",
          description:
            "Please enter the amount of funding you are seeking in USD.",
        },
        {
          type: "radiogroup",
          name: "creditScore",
          title: "Credit Score",
          choices: [
            "500 or below",
            "500-575",
            "575-650",
            "650-680",
            "680-720",
            "720-760",
            "760+",
          ],
          description: "Please select your credit score range.",
        },
        {
          type: "radiogroup",
          name: "bankruptcy",
          title: "Bankruptcy in Last 5 Years?",
          choices: ["Yes", "No"],
          description: "Have you filed for bankruptcy in the last 5 years?",
        },
      ],
    },
    {
      name: "Documentation",
      elements: [
        {
          type: "text",
          name: "businessStart",
          title: "Business Start Date",
          description: "Please enter the date when your business was started.",
        },
        {
          type: "file",
          name: "dataRequest2",
          title: "Actual P&L, BS, and CF statements for the past 24 months",
          description:
            "Please upload your company's P&L, balance sheet, and cash flow statements for the past 24 months.",
          accept: ".xlsx, .xls",
        },
        {
          type: "file",
          name: "dataRequest3a",
          title: "Revenue by Client (Sales Data)",
          description:
            "Please provide a spreadsheet with sales data by a customer for the past 36 months that reconcile to the P&L.",
          accept: ".xlsx, .xls",
        },
        {
          type: "file",
          name: "dataRequest3b",
          title: "Revenue by Client(Sales Data) - Breakdown",
          description:
            "Please provide a breakdown of your revenue by client for the past 36 months that reconciles to the P&L.",
          accept: ".xlsx, .xls",
        },
        {
          type: "file",
          name: "dataRequest4",
          title: "Headcount and Salaries",
          description:
            "Please provide a spreadsheet with headcount and salaries by department for the past 24 months.",
          accept: ".xlsx, .xls",
        },
        {
          type: "file",
          name: "dataRequest5",
          title: "Cap Table",
          description: "Please upload your company's cap table.",
          accept: ".xlsx, .xls",
        },
        {
          type: "file",
          name: "dataRequest6",
          title: "Leases and Contracts",
          description:
            "Please provide copies of leases and material contracts.",
          accept: ".pdf",
        },
        {
          type: "file",
          name: "dataRequest7",
          title: "Debt and Credit Agreements",
          description: "Please provide copies of debt and credit agreements.",
          accept: ".pdf",
        },
        {
          type: "file",
          name: "dataRequest8",
          title: "Business Plan / Pitch Deck",
          description: "Please upload your business plan or pitch deck.",
          accept: ".pdf, .pptx, .ppt",
        },
        {
          type: "file",
          name: "dataRequest9",
          title: "Organizational Chart",
          description:
            "Please provide an organizational chart for your company.",
          accept: ".pdf, .pptx, .ppt",
        },
        {
          type: "file",
          name: "dataRequest10",
          title: "Insurance Policies",
          description:
            "Please provide copies of your company's insurance policies.",
          accept: ".pdf",
        },
        {
          type: "submit",
          name: "submit",
          title: "Submit",
        },
        {
          type: "file",
          name: "marketResearch",
          title: "Market Research",
          description:
            "Please upload any market research, customer feedback, or competitor analysis that supports your startup's primary goal.",
          accept: ".pdf, .docx, .doc, .xlsx, .xls",
        },
        {
          type: "file",
          name: "productRoadmap",
          title: "Product Roadmap",
          description:
            "Please upload your product roadmap, outlining how you plan to achieve your startup's primary goal.",
          accept: ".pdf, .docx, .doc, .pptx, .ppt",
        },
        {
          type: "submit",
          name: "submit",
          title: "Submit",
        },
      ],
    },
    {
      name: "Conclusion",
      title: "Conclusion",
      elements: [
        {
          type: "html",
          name: "conclusionText",
          html: `
            <h2>Next Steps</h2>
            <p>Once you have completed the form and gathered all the necessary files, you can click the "Submit" button at the end of the form to send your data to the due diligence team. They will review the information provided and contact you with any additional questions or requests.</p>
            <p>After submitting the form, you can expect to receive a confirmation email acknowledging receipt of your submission. It is a good idea to keep this email for your records.</p>
            <p>During the due diligence process, the team may reach out to you for further clarification or additional documentation. It is essential to respond promptly and provide accurate information to ensure a smooth and efficient process.</p>
            <p>Upon completion of the due diligence process, the team will provide you with a summary report outlining their findings and any areas of concern. This report will play a crucial role in determining the terms and conditions of the proposed transaction, as well as the next steps in the process.</p>
            <p>In summary, the due diligence process requires thorough preparation and documentation from your end. Ensure that you provide all requested information accurately and promptly to facilitate a smooth and efficient review.</p>
          `,
        },
        {
          type: "submit",
          name: "submit",
          title: "Submit",
        },
      ],
    },
  ],
};

export { vcs, founders };
