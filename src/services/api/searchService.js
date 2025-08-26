import mockSearchResults from "@/services/mockData/searchResults.json";

class SearchService {
  constructor() {
    this.searchResults = [...mockSearchResults];
  }

  async search(query, pdfIds = []) {
    await this.delay(800); // Simulate semantic search processing
    
    if (!query || query.trim().length === 0) {
      return [];
    }

    // Simulate semantic search by filtering and scoring results
    let results = [...this.searchResults];
    
    // Filter by PDF IDs if specified
    if (pdfIds.length > 0) {
      results = results.filter(result => 
        pdfIds.includes(result.pdfId) || pdfIds.includes(parseInt(result.pdfId))
      );
    }

    // Simulate semantic matching with query
    const queryTerms = query.toLowerCase().split(" ");
    results = results.map(result => {
      let score = result.relevanceScore;
      const snippet = result.snippet.toLowerCase();
      
      // Boost score for exact matches
      queryTerms.forEach(term => {
        if (snippet.includes(term)) {
          score += 0.1;
        }
      });
      
      return {
        ...result,
        relevanceScore: Math.min(score, 1.0)
      };
    });

    // Sort by relevance and return top results
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Simulate some variation in results based on query
    const maxResults = Math.min(results.length, Math.floor(Math.random() * 6) + 2);
    return results.slice(0, maxResults);
  }

  async searchSemantic(query, context = "") {
    await this.delay(1200); // Simulate advanced semantic processing
    
    // This would integrate with an AI service for true semantic search
    // For now, we'll enhance the basic search with contextual understanding
    const results = await this.search(query);
    
    // Simulate semantic enhancement
    return results.map(result => ({
      ...result,
      semanticContext: this.generateSemanticContext(query, result.snippet),
      concepts: this.extractConcepts(result.snippet)
    }));
  }

  generateSemanticContext(query, snippet) {
    // Simulate semantic context generation
    const contexts = [
      "Conceptually related through shared domain knowledge",
      "Methodologically similar approaches and techniques",
      "Theoretical framework alignment and connections",
      "Practical application overlap and use cases"
    ];
    
    return contexts[Math.floor(Math.random() * contexts.length)];
  }

  extractConcepts(text) {
    // Simulate concept extraction
    const concepts = [
      "machine learning", "neural networks", "data analysis",
      "statistical methods", "algorithms", "pattern recognition",
      "artificial intelligence", "deep learning", "data science"
    ];
    
    const numConcepts = Math.floor(Math.random() * 3) + 1;
    return concepts.slice(0, numConcepts);
  }

  async indexDocument(pdfId, textContent) {
    await this.delay(1000);
    
    // Simulate document indexing for search
    // In a real implementation, this would process the text and create searchable indices
    return {
      pdfId,
      indexed: true,
      wordCount: textContent.split(" ").length,
      indexedAt: new Date().toISOString()
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new SearchService();