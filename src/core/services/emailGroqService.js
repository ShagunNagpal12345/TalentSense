// src/core/services/emailGroqService.js

// Make sure you have VITE_GROQ_API_KEY in your .env file
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY_EMAIL;

export const generateClientEmail = async (candidateName, jobTitle, candidateSummary, jobDescription) => {
  // 1. Fallback if no API key is found (prevents crashes during testing)
  if (!GROQ_API_KEY) {
    console.warn("Missing GROQ_API_KEY. Returning mock email pitch.");
    return {
      subject: `Highly Recommended Candidate for ${jobTitle}: ${candidateName}`,
      body: `Hi Team,\n\nI'd like to present ${candidateName} for the ${jobTitle} role.\n\nBased on my initial review, they are a strong match for what we are looking for.\n\nKey Highlights:\n${candidateSummary}\n\nPlease review their full profile and let me know if you'd like to proceed to the interview stage.\n\nBest regards,\nTalent Acquisition`
    };
  }

  // 2. Call Groq AI to generate a highly personalized pitch
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${VITE_GROQ_API_KEY_EMAIL}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Fast and excellent for text generation
        messages: [
          {
            role: "system",
            content: "You are an expert executive recruiter writing a concise, highly persuasive email pitch to a hiring manager/client. Return ONLY a JSON object with two keys: 'subject' and 'body'. Do not include any other text, markdown, or greetings outside of the JSON object."
          },
          {
            role: "user",
            content: `Write a pitch email for this candidate.\n\nCandidate Name: ${candidateName}\nJob Title: ${jobTitle}\nCandidate Summary & Skills: ${candidateSummary}\nJob Description Context: ${jobDescription}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    // Parse the JSON returned by Groq
    const content = JSON.parse(data.choices[0].message.content);
    
    return {
      subject: content.subject,
      body: content.body
    };
    
  } catch (error) {
    console.error("Groq Email Generation Error:", error);
    // Fallback if the API call fails
    return {
      subject: `Candidate Submission: ${candidateName} - ${jobTitle}`,
      body: `Hi there,\n\nPlease review the profile for ${candidateName}, who is a strong fit for the ${jobTitle} position.\n\nCandidate Profile Highlights:\n${candidateSummary}\n\nLooking forward to your feedback.\n\nBest regards,\nRecruiter`
    };
  }
};