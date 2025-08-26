import mockSummaries from "@/services/mockData/summaries.json";

class SummaryService {
  constructor() {
    this.summaries = [...mockSummaries];
  }

  async getAll() {
    await this.delay(250);
    return [...this.summaries];
  }

  async getById(id) {
    await this.delay(200);
    const summary = this.summaries.find(s => s.Id === parseInt(id));
    if (!summary) {
      throw new Error(`Summary with id ${id} not found`);
    }
    return { ...summary };
  }

  async getByPdfId(pdfId) {
    await this.delay(300);
    return this.summaries.filter(s => s.pdfId === pdfId.toString());
  }

  async generateSummary(pdfId, pageNumber, textContent) {
    await this.delay(2000); // Simulate AI processing time
    
    const summaryText = this.generateSummaryText(textContent);
    const keyPoints = this.extractKeyPoints(textContent);
    
    const newSummary = {
      Id: Math.max(...this.summaries.map(s => s.Id)) + 1,
      pdfId: pdfId.toString(),
      pageNumber,
      summaryText,
      keyPoints,
      generatedAt: new Date().toISOString()
    };
    
    this.summaries.unshift(newSummary);
    return { ...newSummary };
  }

  generateSummaryText(textContent) {
    // Simulate AI-generated summary
    const templates = [
      "This section discusses key concepts related to the main topic, providing foundational understanding and practical applications.",
      "The content explores various methodologies and approaches, highlighting their strengths and limitations in different contexts.",
      "Important theoretical frameworks are presented along with empirical evidence and real-world case studies.",
      "The material covers advanced techniques and their implementation, offering insights into best practices and common pitfalls."
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  extractKeyPoints(textContent) {
    // Simulate AI-extracted key points
    const pointTemplates = [
      "Core concepts and definitions are clearly established",
      "Multiple approaches are compared and contrasted",
      "Practical applications demonstrate real-world relevance",
      "Methodological considerations ensure validity and reliability",
      "Future research directions are identified and discussed"
    ];
    
    const numPoints = Math.floor(Math.random() * 3) + 2; // 2-4 points
    return pointTemplates.slice(0, numPoints);
  }

  async update(id, updates) {
    await this.delay(250);
    const index = this.summaries.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Summary with id ${id} not found`);
    }
    this.summaries[index] = { ...this.summaries[index], ...updates };
    return { ...this.summaries[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.summaries.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Summary with id ${id} not found`);
    }
    const deleted = this.summaries.splice(index, 1)[0];
    return { ...deleted };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new SummaryService();