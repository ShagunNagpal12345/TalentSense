import Groq from "groq-sdk";

// --- 1. SAFE KEY LOADING ---
const keyJD = import.meta.env.VITE_GROQ_API_KEY_CLIENT || "gsk_placeholder";
const keyResume = import.meta.env.VITE_GROQ_API_KEY_RECRUITER || "gsk_placeholder";

// --- 2. INITIALIZE CLIENTS ---
const groqJD = new Groq({ apiKey: keyJD, dangerouslyAllowBrowser: true });
const groqResume = new Groq({ apiKey: keyResume, dangerouslyAllowBrowser: true });

// --- 3. SYSTEM PROMPTS ---
const RECRUITER_PROMPT = `
You are a Senior Technical Recruiter and Compensation Specialist for the Indian Market.
Analyze data with extreme precision. 
Your goal is to ensure Job Descriptions are perfect, competitive, and compliant.
Output MUST be valid JSON only. No markdown.
`;

/**
 * ============================================================
 * FUNCTION 1: ADVANCED JD ANALYSIS (Client Dashboard)
 * ============================================================
 */
export const extractJobDetails = async (jdText) => {
  if (keyJD === "gsk_placeholder") {
    console.error("❌ VITE_GROQ_API_KEY_JD is missing.");
    return null;
  }

  console.log("🚀 [Client Key] Starting Deep JD Analysis...");
  
  const prompt = `
    Analyze the following Job Description (JD). 
    Extract structured data, identify critical gaps, and provide market intelligence for the Indian Job Market.

    JD Text: "${jdText.substring(0, 4000)}"

    RETURN JSON STRUCTURE:
    {
      "basicInfo": {
        "jobTitle": "String (e.g. Sr. React Developer)",
        "role": "String (e.g. Individual Contributor / Lead)",
        "department": "String (e.g. Engineering)",
        "location": "String (City)",
        "workMode": "String (Remote / Hybrid / On-site)",
        "employmentType": "String (Full-time / Contract)",
        "shiftTiming": "String (e.g. General / UK Shift / US Shift / Rotational)"
      },
      "compensation": {
        "minExp": Number (0 if missing),
        "maxExp": Number (0 if missing),
        "minSalary": "String (e.g. 12,00,000 PA",
        "maxSalary": "String (e.g. 25,00,000 PA)",
        "currency": "String (e.g. INR)",
        "isSalaryCompetitive": Boolean
      },
      "skills": {
        "hardSkills": ["String", "String"],
        "softSkills": ["String", "String"],
        "tools": ["String", "String"]
      },
      "marketIntelligence": {
        "industrySalaryRange": "String (e.g. '15-30 LPA for this exp level in India')",
        "avgTimeToFill": "String (e.g. '30-45 Days')",
        "difficultyLevel": "String (Easy / Medium / Hard / Niche)"
      },
      "qualityCheck": {
        "jdScore": Number (0-100),
        "criticalGaps": ["String (List missing MUST-HAVE fields like Salary, Notice Period)"],
        "improvements": ["String (Actionable suggestions to improve candidate attraction)"]
      },
      "sourcingParams": {
        "qualification": "String (e.g. B.Tech/MCA)",
        "noticePeriod": "String (e.g. Immediate - 30 Days)"
      }
    }
  `;

  try {
    const completion = await groqJD.chat.completions.create({
      messages: [
        { role: "system", content: RECRUITER_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    console.log("✅ Deep Analysis Complete:", result);
    return result;
  } catch (error) {
    console.error("❌ Groq Analysis Error:", error);
    return null;
  }
};

/**
 * ============================================================
 * FUNCTION 2: GENERATE TESTS (Client Dashboard)
 * ============================================================
 */
export const generateTestRecommendations = async (jobTitle, skills) => {
  if (keyJD === "gsk_placeholder") return [];

  const prompt = `
    For a "${jobTitle}" with skills "${skills}", recommend 5 industry-standard pre-employment assessments.
    Focus on Technical, Cognitive, and Behavioral tests relevant to the role.
    
    Return JSON: { "tests": [{ "id": "t1", "name": "Test Name", "type": "Technical/Psychometric", "recommended": true }] }
  `;

  try {
    const completion = await groqJD.chat.completions.create({
      messages: [
        { role: "system", content: RECRUITER_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result.tests || [];
  } catch (error) {
    console.error("❌ Groq Test Gen Error:", error);
    return [];
  }
};

/**
 * ============================================================
 * FUNCTION 3: EVALUATE CANDIDATE (Recruiter Dashboard)
 * ============================================================
 */
export const evaluateCandidate = async (resumeText, jdText) => {
  if (keyResume === "gsk_placeholder") {
    alert("VITE_GROQ_API_KEY_RESUME is missing.");
    return null;
  }

  const prompt = `
    Job Description: "${jdText.substring(0, 1000)}"
    Resume: "${resumeText.substring(0, 2500)}"

    TASK: Extract profile, logistics, and calculate Match %.
    
    RETURN JSON:
    {
      "match": Number (0-100),
      "summary": "String (Recruiter summary)",
      "skills": ["String"],
      "interviewQuestions": ["String"],
      "profile": {
        "currentOrg": "String", "currentRole": "String",
        "totalExp": "String", "education": "String", "location": "String"
      },
      "logistics": {
        "noticePeriod": "String (or 'Unknown')",
        "currentCTC": "String (or 'Unknown')",
        "expectedCTC": "String (or 'Unknown')"
      }
    }
  `;

  try {
    const completion = await groqResume.chat.completions.create({
      messages: [
        { role: "system", content: RECRUITER_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("❌ Resume Eval Error:", error);
    return null;
  }
};

/**
 * ============================================================
 * FUNCTION 4: ANALYZE RESUME (Candidate Database Match)
 * ============================================================
 */
export const analyzeResumeGroq = async (resumeText, jdText) => {
  if (keyResume === "gsk_placeholder") {
    console.warn("Missing API Key. Returning mock Resume vs JD analysis.");
    return {
      matchScore: Math.floor(Math.random() * 20) + 75,
      summary: "Candidate possesses a strong foundational skill set that aligns well with the core requirements of the job description. (Mock AI Analysis)",
      skills: ["Analytical Skills", "Communication", "Problem Solving"]
    };
  }

  const prompt = `
    JOB DESCRIPTION:
    "${jdText.substring(0, 1500)}"

    RESUME TEXT:
    "${resumeText.substring(0, 2500)}"

    TASK: Compare the Resume against the Job Description.
    RETURN JSON object with strictly these three keys: 
    'matchScore' (a number between 0-100 representing the fit), 
    'summary' (a concise 2-sentence evaluation of their fit), 
    'skills' (an array of 5 top matching skills found in the resume).
  `;

  try {
    const completion = await groqResume.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert Recruiter ATS AI. Output ONLY valid JSON." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(completion.choices[0].message.content);
    
    return {
      matchScore: content.matchScore || 80,
      summary: content.summary || "Candidate appears to be a solid fit based on extracted data.",
      skills: content.skills || ["Relevant Experience", "Technical Fit"]
    };
  } catch (error) {
    console.error("❌ Groq Resume Analysis Error:", error);
    return {
      matchScore: 85,
      summary: "AI analysis encountered a network error. Showing fallback evaluation. Candidate possesses relevant industry skills.",
      skills: ["Industry Experience", "Communication"]
    };
  }
};