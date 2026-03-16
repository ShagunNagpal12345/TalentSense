import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY_CLIENT || "gsk_placeholder";

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
You are a Senior HR Strategy Consultant & Technical Recruiter.
Your goal is to analyze Job Descriptions (JDs) to provide:
1. Deep Market Intelligence (Salary, Difficulty).
2. Sourcing Strategy (Boolean Strings, Target Titles).
3. Interview Prep (Questions for the Hiring Manager).
4. "Interview" the user to refine vague JDs.
Output must be strict JSON.
`;

export const extractJobDetails = async (jdText) => {
  if (apiKey === "gsk_placeholder") {
    console.error("❌ Client API Key Missing");
    return null;
  }

  const prompt = `
    Analyze this JD Content: "${jdText.substring(0, 4000)}"

    TASK:
    1. Extract standard JD fields (Role, Exp, Salary, etc.).
    2. Identify 3 critical ambiguities and generate "Clarification Questions".
    3. Generate a "Sourcing Strategy":
       - Boolean Search String for Naukri.
       - Boolean Search String for LinkedIn.
       - List of 5 Target Job Titles.
       - List of 5 Target Companies (if applicable to the domain).
    4. Generate 3 specific "Interview Questions" the Hiring Manager should ask candidates.
    5. Rate the JD Score (0-100).

    RETURN JSON STRUCTURE:
    {
      "basicInfo": {
        "jobTitle": "String",
        "role": "String",
        "department": "String",
        "location": "String",
        "workMode": "String (Remote/Hybrid/On-site)",
        "employmentType": "String (Full-time/Contract)",
        "shiftTiming": "String (General/UK/US)"
      },
      "compensation": {
        "minExp": Number,
        "maxExp": Number,
        "minSalary": "String",
        "maxSalary": "String",
        "currency": "String"
      },
      "skills": {
        "hardSkills": ["String"],
        "softSkills": ["String"],
        "tools": ["String"]
      },
      "marketIntelligence": {
        "industrySalaryRange": "String",
        "avgTimeToFill": "String",
        "difficultyLevel": "String"
      },
      "qualityCheck": {
        "jdScore": Number,
        "criticalGaps": ["String"],
        "improvements": ["String"]
      },
      "sourcingParams": {
        "qualification": "String",
        "noticePeriod": "String"
      },
      "clarificationQuestions": [
        {
          "id": 1,
          "question": "String",
          "options": ["Option A", "Option B"],
          "context": "String"
        }
      ],
      "sourcingStrategy": {
        "naukriBoolean": "String",
        "linkedinBoolean": "String",
        "targetTitles": ["String"],
        "targetCompanies": ["String"]
      },
      "interviewQuestions": ["String", "String", "String"]
    }
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("Client AI Error:", error);
    return null;
  }
};

export const generateTestRecommendations = async (jobTitle, skills) => {
  if (apiKey === "gsk_placeholder") return [];

  const prompt = `
    Recommend 5 pre-employment tests for a "${jobTitle}" with skills: "${skills}".
    Return JSON: { "tests": [{ "id": "t1", "name": "React Proficiency", "type": "Technical", "recommended": true }] }
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content).tests || [];
  } catch (error) {
    return [];
  }
};