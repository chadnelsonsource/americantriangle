export interface DataRecord {
  id: string;
  groupId?: string;
  values: Record<string, unknown>;
}

export interface FieldRule {
  name: string;
  required?: boolean;
  type?: "string" | "number" | "boolean";
  allowed?: readonly string[];
}

export interface QualityIssue {
  code: "missing" | "duplicate" | "invalid_type" | "schema" | "inconsistent_label";
  recordId?: string;
  field?: string;
}

export type DatasetStage = "raw" | "processed" | "approved";

export function exportable(stage: DatasetStage): boolean {
  return stage === "approved";
}

export function checkDataset(
  records: readonly DataRecord[],
  fields: readonly FieldRule[],
  labelField?: string,
): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const seen = new Map<string, string>();

  for (const record of records) {
    const fingerprint = JSON.stringify(record.values);
    const prior = seen.get(fingerprint);
    if (prior) issues.push({ code: "duplicate", recordId: record.id });
    else seen.set(fingerprint, record.id);

    for (const field of fields) {
      const value = record.values[field.name];
      if (field.required && (value === undefined || value === null || value === "")) {
        issues.push({ code: "missing", recordId: record.id, field: field.name });
        continue;
      }
      if (value === undefined || value === null) continue;
      if (field.type && typeof value !== field.type) {
        issues.push({ code: "invalid_type", recordId: record.id, field: field.name });
      }
      if (field.allowed && typeof value === "string" && !field.allowed.includes(value)) {
        issues.push({ code: "schema", recordId: record.id, field: field.name });
      }
    }
  }

  if (labelField) {
    const labels = new Map<string, { recordId: string; label: unknown }>();
    for (const record of records) {
      if (!record.groupId) continue;
      const label = record.values[labelField];
      const existing = labels.get(record.groupId);
      if (!existing) labels.set(record.groupId, { recordId: record.id, label });
      else if (existing.label !== label) {
        issues.push({ code: "inconsistent_label", recordId: record.id, field: labelField });
      }
    }
  }

  return issues;
}
