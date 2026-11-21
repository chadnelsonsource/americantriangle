"use client";

import { useState } from "react";
import { Table, Td, Th } from "@/components/ui/feedback";
import { fieldControl } from "@/components/ui/fields";
import { INQUIRY_LABELS, INTERESTS, PARTNERSHIP_LABELS, PARTNERSHIP_CATEGORIES, type InquiryType, type PartnershipCategory } from "@/services/leads";
import { filterInquiries } from "@/services/inquiry-queue";

export type InquiryRow = {
  id: string;
  createdAt: string;
  inquiryType: string;
  name: string;
  email: string;
  organization: string;
  website: string;
  partnershipCategory: string;
  message: string;
  capabilities: string;
  details: string;
  route: string;
};

function inquiryLabel(value: string): string {
  if ((INTERESTS as readonly string[]).includes(value)) return INQUIRY_LABELS[value as InquiryType];
  return value;
}

function categoryLabel(value: string): string {
  if ((PARTNERSHIP_CATEGORIES as readonly string[]).includes(value)) return PARTNERSHIP_LABELS[value as PartnershipCategory];
  return value;
}

function typeLine(lead: InquiryRow): string {
  const category = lead.inquiryType === "partnerships" && lead.partnershipCategory ? ` · ${categoryLabel(lead.partnershipCategory)}` : "";
  return `${inquiryLabel(lead.inquiryType)}${category} · ${lead.route}`;
}

export function InquiryQueue({ leads }: { leads: readonly InquiryRow[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const shown = filterInquiries(leads, query, type);
  return (
    <div>
      <form className="grid gap-3 sm:grid-cols-[1fr_16rem]" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="inquiry-query" className="block text-sm font-medium">
            Search stored inquiries
          </label>
          <input
            id="inquiry-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, email, organization, or message"
            className={`${fieldControl} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="inquiry-type" className="block text-sm font-medium">
            Type
          </label>
          <select id="inquiry-type" value={type} onChange={(event) => setType(event.target.value)} className={`${fieldControl} mt-2`}>
            <option value="all">All types</option>
            {INTERESTS.map((interest) => (
              <option key={interest} value={interest}>
                {INQUIRY_LABELS[interest]}
              </option>
            ))}
          </select>
        </div>
      </form>
      <p className="mt-4 text-sm text-muted" role="status">
        {shown.length === leads.length ? `${leads.length} stored` : `${shown.length} of ${leads.length} stored`}
      </p>
      {shown.length === 0 ? (
        <p className="mt-4 text-sm">No stored inquiry matches that filter.</p>
      ) : (
        <>
          <ul className="mt-4 grid gap-3 md:hidden">
            {shown.map((lead) => (
              <li key={lead.id} className="surface space-y-2 p-4 text-sm">
                <p className="text-muted">{lead.createdAt.slice(0, 10)}</p>
                <p className="font-medium">{lead.organization}</p>
                <p>{typeLine(lead)}</p>
                <p>
                  {lead.name}
                  <span className="mt-1 block break-words text-muted">{lead.email}</span>
                  {lead.website ? <span className="mt-1 block break-words text-muted">{lead.website}</span> : null}
                </p>
                <p className="whitespace-pre-wrap">
                  {lead.message}
                  {lead.capabilities ? <span className="mt-3 block text-muted">{lead.capabilities}</span> : null}
                  {lead.details ? <span className="mt-3 block text-muted">{lead.details}</span> : null}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 hidden md:block">
            <Table caption="Stored inquiries">
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Organization</Th>
                  <Th>Type</Th>
                  <Th>Contact</Th>
                  <Th>Record</Th>
                </tr>
              </thead>
              <tbody>
                {shown.map((lead) => (
                  <tr key={lead.id}>
                    <Td>{lead.createdAt.slice(0, 10)}</Td>
                    <Td>{lead.organization}</Td>
                    <Td>{typeLine(lead)}</Td>
                    <Td>
                      {lead.name}
                      <span className="mt-1 block text-muted">{lead.email}</span>
                      {lead.website ? <span className="mt-1 block text-muted">{lead.website}</span> : null}
                    </Td>
                    <Td className="max-w-md whitespace-pre-wrap">
                      {lead.message}
                      {lead.capabilities ? <span className="mt-3 block text-muted">{lead.capabilities}</span> : null}
                      {lead.details ? <span className="mt-3 block text-muted">{lead.details}</span> : null}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
