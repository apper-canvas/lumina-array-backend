import mockAnnotations from "@/services/mockData/annotations.json";

class AnnotationService {
  constructor() {
    this.annotations = [...mockAnnotations];
  }

  async getAll() {
    await this.delay(200);
    return [...this.annotations];
  }

  async getById(id) {
    await this.delay(150);
    const annotation = this.annotations.find(a => a.Id === parseInt(id));
    if (!annotation) {
      throw new Error(`Annotation with id ${id} not found`);
    }
    return { ...annotation };
  }

  async getByPdfId(pdfId) {
    await this.delay(200);
    return this.annotations.filter(a => a.pdfId === pdfId.toString());
  }

  async create(annotationData) {
    await this.delay(300);
    const newAnnotation = {
      ...annotationData,
      Id: Math.max(...this.annotations.map(a => a.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    this.annotations.unshift(newAnnotation);
    return { ...newAnnotation };
  }

  async update(id, updates) {
    await this.delay(250);
    const index = this.annotations.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Annotation with id ${id} not found`);
    }
    this.annotations[index] = { ...this.annotations[index], ...updates };
    return { ...this.annotations[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.annotations.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Annotation with id ${id} not found`);
    }
    const deleted = this.annotations.splice(index, 1)[0];
    return { ...deleted };
  }

  async exportAnnotations(pdfId) {
    await this.delay(500);
    const pdfAnnotations = this.annotations.filter(a => a.pdfId === pdfId.toString());
    
    const digest = {
      pdfId,
      exportDate: new Date().toISOString(),
      totalAnnotations: pdfAnnotations.length,
      annotations: pdfAnnotations.map(annotation => ({
        type: annotation.type,
        pageNumber: annotation.pageNumber,
        content: annotation.content,
        color: annotation.color,
        createdAt: annotation.createdAt
      }))
    };
    
    return digest;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new AnnotationService();