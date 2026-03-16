import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY_RECRUITER || "gsk_placeholder";

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
You are an expert Technical Recruiter and Resume Analyst.
Your task is to extract structured data from unstructured resumes with HIGH ACCURACY.
1. If "Total Experience" is not explicitly stated, CALCULATE it by summing up the duration of all roles.
2. "Current Organization" is the company associated with the latest date (e.g., "Present" or "Current").
3. "Education" should include the Degree and University/College.
4. Output MUST be valid, strict JSON.
`;

export const evaluateCandidate = async (resumeText, jdText) => {
  if (apiKey === "gsk_placeholder") {
    alert("Recruiter API Key Missing");
    return null;
  }

  console.log("🚀 Analyzing Resume against JD...");

  const prompt = `
    JOB DESCRIPTION:
    "${jdText ? jdText.substring(0, 1500) : 'Generic Role'}"

    CANDIDATE RESUME:
    "${resumeText.substring(0, 3500)}"

    ---------------------------------------------------
    CRITICAL EXTRACTION TASK:
    1. Extract **Current Organization**: Look for the most recent role. If "Present" is found, that's the one.
    2. Extract **Total Experience**: Look for a summary line (e.g. "8 years exp"). If missing, calculate roughly from the first job start date to now. Format as "X Years".
    3. Extract **Education**: Highest degree and university name.
    4. Extract **Logistics**: Current Salary, Expected Salary, Notice Period (if mentioned). Mark "N/A" if absolutely not found.
    5. **Analysis**: Compare the Resume skills/experience strictly against the Job Description provided.

    RETURN JSON STRUCTURE:
    {
      "match": Number (0-100),
      "summary": "String (2-3 sentences explaining why they match or don't match the JD)",
      "skills": ["String", "String", "String"],
      "interviewQuestions": ["String", "String", "String"],
      
      "profile": {
        "name": "String (Extract full name)",
        "email": "String",
        "currentOrg": "String (e.g. Google / Tech Solutions)",
        "currentRole": "String (e.g. Senior Backend Engineer)",
        "totalExp": "String (e.g. 5.5 Years)",
        "education": "String (e.g. B.Tech CS, IIT Delhi)",
        "location": "String"
      },
      
      "logistics": {
        "noticePeriod": "String (e.g. 30 Days / Immediate)",
        "currentCTC": "String (e.g. 15 LPA)",
        "expectedCTC": "String (e.g. 25 LPA)"
      }
    }
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1, // Zero creativity to ensure factual extraction
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    console.log("✅ Parsed Data:", result);
    return result;
  } catch (error) {
    console.error("❌ Recruiter AI Error:", error);
    return null;
  }
};