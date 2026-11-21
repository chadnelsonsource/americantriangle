export function filterInquiries<T extends { name: string; email: string; organization: string; inquiryType: string; message: string }>(
  leads: readonly T[],
  query: string,
  type: string,
): T[] {
  const needle = query.trim().toLowerCase();
  return leads.filter((lead) => {
    if (type !== "all" && lead.inquiryType !== type) return false;
    if (!needle) return true;
    return [lead.name, lead.email, lead.organization, lead.message].some((value) => value.toLowerCase().includes(needle));
  });
}
