export interface SearchResult {
  score: number;
  doc_id: string;
  text: string;
  path: string;
  title: string;
  type: string;
}

export interface ChunkDetail {
  text: string;
  path: string;
  title: string;
  tags: string[];
}
