import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// --- THE FIX IS HERE ---
// We use the '.mjs' extension which is required for modern module loaders (Vite/Webpack)
// We also use 'unpkg' as it reliably serves the correct MIME types for these files.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

/**
 * Main function to extract text
 */
export const extractTextFromFile = async (file) => {
  console.log("📂 Parsing file:", file.name, "| Type:", file.type);

  try {
    // Handle PDF
    if (file.type === "application/pdf") {
      return await extractPdfText(file);
    } 
    // Handle Word Docs (.docx)
    else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return await extractDocxText(file);
    } 
    // Handle Plain Text
    else if (file.type === "text/plain") {
      return await extractPlainText(file);
    } 
    else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }
  } catch (error) {
    console.error("❌ File Parsing Failed:", error);
    
    if (error.name === "MissingPDFException") {
      throw new Error("PDF file appears to be empty or corrupted.");
    }
    if (error.message.includes("worker") || error.message.includes("dynamically imported")) {
      throw new Error("PDF Engine failed to load. Please check your internet connection (CDN blocked).");
    }
    throw new Error(`Could not read file: ${error.message}`);
  }
};

// --- PDF EXTRACTION ---
const extractPdfText = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  
  // Use the loading task pattern
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  let fullText = "";
  console.log(`📄 PDF Loaded: ${pdf.numPages} pages`);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  // Check if text was actually extracted (OCR check)
  if (fullText.trim().length < 20) {
    throw new Error("PDF seems to be an image scan. This tool requires text-based PDFs.");
  }

  return fullText;
};

// --- DOCX EXTRACTION ---
const extractDocxText = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  if (!result.value) throw new Error("Word document text is empty.");
  return result.value;
};

// --- TXT EXTRACTION ---
const extractPlainText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};