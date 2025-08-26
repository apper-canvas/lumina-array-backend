import mockPdfs from "@/services/mockData/pdfs.json";

class PDFService {
  constructor() {
    this.pdfs = [...mockPdfs];
  }

  async getAll() {
    await this.delay(300);
    return [...this.pdfs];
  }

  async getById(id) {
    await this.delay(200);
    const pdf = this.pdfs.find(p => p.Id === parseInt(id));
    if (!pdf) {
      throw new Error(`PDF with id ${id} not found`);
    }
    return { ...pdf };
  }

  async create(pdfData) {
    await this.delay(400);
    const newPdf = {
      ...pdfData,
      Id: Math.max(...this.pdfs.map(p => p.Id)) + 1,
      lastOpened: new Date().toISOString(),
      isOCRProcessed: false,
      extractedText: []
    };
    this.pdfs.unshift(newPdf);
    return { ...newPdf };
  }

  async update(id, updates) {
    await this.delay(250);
    const index = this.pdfs.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`PDF with id ${id} not found`);
    }
    this.pdfs[index] = { ...this.pdfs[index], ...updates };
    return { ...this.pdfs[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.pdfs.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`PDF with id ${id} not found`);
    }
    const deleted = this.pdfs.splice(index, 1)[0];
    return { ...deleted };
  }

  async processOCR(id) {
    await this.delay(2000); // Simulate OCR processing time
    const pdf = await this.getById(id);
    const extractedText = [
      "Sample extracted text from OCR processing...",
      "This would contain the actual text content from scanned pages.",
      "OCR technology converts images of text into machine-readable text."
    ];
    
    return this.update(id, {
      isOCRProcessed: true,
      extractedText
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new PDFService();