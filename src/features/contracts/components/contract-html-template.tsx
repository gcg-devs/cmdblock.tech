"use client";

import type { ContractOutputShape } from "../lib/contract-output";

interface ContractHtmlTemplateProps {
  data: ContractOutputShape;
}

const mono = "'Geist Mono', var(--font-geist-mono), monospace";
const sans = "'Syne', var(--font-syne), system-ui, sans-serif";

const label: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  color: "#999999",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  fontFamily: mono,
  margin: "0 0 6px 0",
};

const sections: { key: keyof ContractOutputShape["sections"]; label: string }[] = [
  { key: "overview", label: "Project Overview" },
  { key: "recommended_scope", label: "Recommended Scope" },
  { key: "integration_notes", label: "Integration Notes" },
  { key: "timeline", label: "Timeline" },
  { key: "payment_terms", label: "Payment Terms" },
  { key: "change_requests", label: "Change Requests" },
  { key: "warranty", label: "Warranty Period" },
  { key: "exclusions", label: "Exclusions" },
  { key: "maintenance", label: "Post Launch Maintenance" },
  { key: "legal_note", label: "Legal Note" },
];

function formatDate(iso: string | null): string {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-CA");
}

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : "PHP ";
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function renderText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line, index) => (
      <p key={index} style={{ margin: index === 0 ? "0" : "8px 0 0" }}>
        {line}
      </p>
    ));
}

export function ContractHtmlTemplate({ data }: ContractHtmlTemplateProps) {
  const cs = data.currency === "USD" ? "$" : "PHP";

  return (
    <div
      style={{
        fontFamily: sans,
        color: "#1a1a1a",
        background: "#ffffff",
        padding: "56px 48px",
        maxWidth: "960px",
        margin: "0 auto",
        lineHeight: 1.55,
        fontSize: "13px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingBottom: "28px",
          marginBottom: "28px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0a0a0a",
              marginBottom: "2px",
            }}
          >
            <span style={{ color: "#999" }}>&gt;_</span>cmdblock
            <span style={{ color: "#bbb" }}>.tech</span>
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "10px", lineHeight: 1.6 }}>
            {data.team ? (
              <>
                {data.team.address && <div>{data.team.address}</div>}
                {data.team.email && <div>{data.team.email}</div>}
              </>
            ) : (
              <div>billing@cmdblock.tech</div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#bbb",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Project Proposal
          </div>
          <table style={{ marginLeft: "auto", fontSize: "12px", fontFamily: mono }}>
            <tbody>
              <tr>
                <td style={{ color: "#888", paddingRight: "12px", paddingBottom: "3px", textAlign: "right" }}>
                  Ref
                </td>
                <td style={{ color: "#0a0a0a", fontWeight: 700, paddingBottom: "3px" }}>
                  {data.contract_number}
                </td>
              </tr>
              <tr>
                <td style={{ color: "#888", paddingRight: "12px", paddingBottom: "3px", textAlign: "right" }}>
                  Issued
                </td>
                <td style={{ paddingBottom: "3px" }}>{formatDate(data.issue_date)}</td>
              </tr>
              <tr>
                <td style={{ color: "#888", paddingRight: "12px", textAlign: "right" }}>
                  Valid
                </td>
                <td style={{ fontWeight: 600 }}>{formatDate(data.valid_until)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "32px",
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={label}>Prepared For</p>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a0a0a" }}>
            {data.client_name}
          </div>
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <p style={{ ...label, textAlign: "right" }}>Prepared By</p>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#0a0a0a" }}>
            {data.prepared_by}
          </div>
          <div style={{ fontSize: "11px", fontFamily: mono, color: "#999", marginTop: "4px" }}>
            operating under cmdblock.tech brand
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <p style={label}>Document</p>
        <h1
          style={{
            fontSize: "28px",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "#0a0a0a",
          }}
        >
          {data.title}
        </h1>
      </div>

      {sections.map((section) => {
        const text = data.sections[section.key];
        if (!text.trim()) return null;

        return (
          <section
            key={section.key}
            style={{
              padding: "16px 0",
              borderTop: "1px solid #eeeeee",
            }}
          >
            <p style={label}>{section.label}</p>
            <div style={{ color: "#555", fontSize: "12px", lineHeight: 1.75 }}>
              {renderText(text)}
            </div>
          </section>
        );
      })}

      <table style={{ width: "100%", borderCollapse: "collapse", margin: "28px 0 24px" }}>
        <thead>
          <tr>
            <th
              style={{
                ...label,
                padding: "8px 0",
                textAlign: "left",
                borderBottom: "2px solid #0a0a0a",
                margin: 0,
              }}
            >
              Deliverable
            </th>
            <th
              style={{
                ...label,
                padding: "8px 0",
                textAlign: "right",
                borderBottom: "2px solid #0a0a0a",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Amount ({cs})
            </th>
          </tr>
        </thead>
        <tbody>
          {data.line_items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "14px 0", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#0a0a0a", marginBottom: "2px" }}>
                  {item.name}
                </div>
                {item.description && (
                  <div style={{ color: "#777", fontSize: "12px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {item.description}
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f0",
                  textAlign: "right",
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "14px",
                  verticalAlign: "top",
                  whiteSpace: "nowrap",
                }}
              >
                {item.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
        <table style={{ fontSize: "13px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "12px 24px 12px 0",
                  fontWeight: 700,
                  fontSize: "18px",
                  borderTop: "2px solid #0a0a0a",
                }}
              >
                Estimated Total
              </td>
              <td
                style={{
                  padding: "12px 0",
                  fontWeight: 700,
                  fontFamily: mono,
                  fontSize: "18px",
                  textAlign: "right",
                  borderTop: "2px solid #0a0a0a",
                }}
              >
                {formatAmount(data.total_amount, data.currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: "24px",
          color: "#999",
          fontSize: "11px",
          lineHeight: 1.7,
        }}
      >
        <p style={label}>Terms</p>
        <p style={{ margin: 0 }}>
          This document is a proposal and draft contract for discussion. Final
          pricing, timeline, and implementation details remain subject to
          requirements validation and written approval by both parties.
        </p>
        <div style={{ marginTop: "16px", fontFamily: mono, fontSize: "10px", color: "#ddd" }}>
          &gt;_ end_of_file
        </div>
      </div>
    </div>
  );
}
