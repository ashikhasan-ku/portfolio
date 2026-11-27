/* Site settings you may want to change.
   bookingUrl: paste your Google Calendar booking page or Calendly link here, e.g.
   "https://calendar.app.google/xxxx" or "https://calendly.com/ashikhasan/30min".
   Leave it empty and "Book a meeting" opens an email instead. */
window.SITE = {
  bookingUrl: "",
  /* Google Analytics 4: paste your Measurement ID, e.g. "G-ABC123XYZ". Leave empty to turn analytics off. */
  ga4: ""
};

/* =========================================================
   CAREER DATA — the only file to edit when you change jobs.

   New job? Add one entry at the TOP of `roles`, set its end to "now",
   and change the previous role's end from "now" to its last month.
   Dates are "YYYY-MM". The timeline, durations, years of experience
   and "today" line all update themselves from this file.
   ========================================================= */
window.CAREER = {
  roles: [
    {
      id: "bs23",
      company: "Brain Station 23",
      title: "Project Manager",
      team: "Telco & PHP–Node–Cloud",
      start: "2026-09",
      end: "now",
      domain: "brainstation-23.com",
      logos: ["https://brainstation-23.com/wp-content/uploads/2019/03/fav.webp"],
      highlight: "RFPs, WBS and delivery plans for telco and digital platforms"
    },
    {
      id: "daraz",
      company: "Daraz",
      parent: "Alibaba Group",
      title: "Project Manager, Integrated Ops",
      team: "Commercial, Tech & Ops",
      start: "2025-12",
      end: "2026-09",
      domain: "daraz.com",
      logos: ["https://discover.daraz.com/images/favicon/apple-touch-icon.png"],
      highlight: "8+ cross-functional projects, 90% delivered on time"
    },
    {
      id: "wpp",
      company: "WPP Production",
      title: "BI Project Manager",
      team: "Data & Analytics",
      start: "2023-08",
      end: "2025-12",
      domain: "wppproduction.com",
      logos: ["https://media.licdn.com/dms/image/v2/D4E0BAQGNceR4osx-9Q/company-logo_200_200/B4EZyJ5mNsIkAI-/0/1771840104581/hogarthdhaka_logo?e=2147483647&v=beta&t=Fjr4Wv3zH50Uy-jSsZApTyyqJgmy9tWrb4qhhagem9w"],
      highlight: "30+ BI solutions across 25 countries",
      milestones: [
        { date: "2024-08", label: "Promoted" },
        { date: "2025-09", label: "Certified ScrumMaster" }
      ]
    },
    {
      id: "ifarmer",
      company: "iFarmer",
      title: "Assistant Technical Project Manager",
      team: "Tech",
      start: "2022-08",
      end: "2023-08",
      domain: "ifarmer.asia",
      logos: [
        "https://media.licdn.com/dms/image/v2/D560BAQFLyPJUGuH9sw/company-logo_200_200/B56Z6wxtNFI4AE-/0/1781082280977/ifarmerasia_logo?e=2147483647&v=beta&t=pgD8St9dCZXuX7iouvJREOT5ted0YiNwgAhPKlTK9jA",
        "https://framerusercontent.com/images/xLYkgyfP9RcxFdqFQBFVZxS0MBc.png"
      ],
      highlight: "Sprint reliability from 60% to 90%"
    },
    {
      id: "bdjobs",
      company: "Bdjobs.com",
      title: "Product Analyst",
      team: "IT & Product",
      start: "2021-02",
      end: "2022-08",
      domain: "bdjobs.com",
      logos: [
        "https://media.licdn.com/dms/image/v2/D560BAQHIsBqGHskdjg/company-logo_200_200/company-logo_200_200/0/1730114573321/mybdjobs_logo?e=2147483647&v=beta&t=UJQLEl4VIJDEPSL3Iw8LV12y30EbFJrOPqmQHWpc_Zg",
        "https://storage.googleapis.com/bdjobs-assets/images/bdjobs_favicon.png"
      ],
      highlight: "UX research for a 20M+ user platform"
    }
  ]
};
