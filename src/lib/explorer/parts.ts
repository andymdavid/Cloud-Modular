/** A selectable part in a 3D explorer's full view: its name, one plain sentence and any facts. */
export interface ExplorerFact {
  label: string;
  value: string;
  /** Where the fact comes from (a drawing sheet or document), shown under the value. */
  source?: string;
}

export interface ExplorerPart {
  id: string;
  name: string;
  summary: string;
  facts: readonly ExplorerFact[];
}
