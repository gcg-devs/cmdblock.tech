import type { InvoiceOutputShape } from "../lib/invoice-output";

interface InvoiceHtmlTemplateProps {
  data: InvoiceOutputShape;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA");
}

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : "₱";
  return `${symbol} ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

export function InvoiceHtmlTemplate({ data }: InvoiceHtmlTemplateProps) {
  const cs = data.currency === "USD" ? "$" : "₱";

  return (
    <div
      style={{
        fontFamily: sans,
        color: "#1a1a1a",
        background: "#ffffff",
        padding: "56px 48px",
        maxWidth: "960px",
        margin: "0 auto",
        lineHeight: 1.5,
        fontSize: "13px",
      }}
    >
      {/* ── Header ── */}
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
        {/* Left: Brand + Contact */}
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

        {/* Right: SOA meta */}
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
            Statement of Account
          </div>
          <table style={{ marginLeft: "auto", fontSize: "12px", fontFamily: mono }}>
            <tbody>
              <tr>
                <td style={{ color: "#888", paddingRight: "12px", paddingBottom: "3px", textAlign: "right" }}>
                  SOA
                </td>
                <td style={{ color: "#0a0a0a", fontWeight: 700, paddingBottom: "3px" }}>
                  {data.soa_number}
                </td>
              </tr>
              <tr>
                <td style={{ color: "#888", paddingRight: "12px", paddingBottom: "3px", textAlign: "right" }}>
                  Issued
                </td>
                <td style={{ paddingBottom: "3px" }}>{formatDate(data.issue_date)}</td>
              </tr>
              <tr>
                <td style={{ color: "#888", paddingRight: "12px", textAlign: "right" }}>Due</td>
                <td style={{ fontWeight: 600 }}>{formatDate(data.due_date)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Billed To + Project ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "32px",
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={label}>Billed To</p>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a0a0a" }}>
            {data.client_name ?? "—"}
          </div>
          {data.client_billing_address && (
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              {data.client_billing_address}
            </div>
          )}
        </div>

        {data.project_title && (
          <div style={{ flex: 1, textAlign: "right" }}>
            <p style={{ ...label, textAlign: "right" }}>Project</p>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#0a0a0a" }}>
              {data.project_title}
            </div>
            {data.invoice_type !== "ONE_OFF" && (
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: mono,
                  color: "#999",
                  marginTop: "4px",
                }}
              >
                {data.invoice_type.toLowerCase().replace("_", " ")}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Scope (if enabled) ── */}
      {data.project_scope.enabled && data.project_scope.description && (
        <div
          style={{
            marginBottom: "28px",
            padding: "12px 16px",
            background: "#fafafa",
            border: "1px solid #eee",
            fontSize: "12px",
            color: "#555",
            lineHeight: 1.7,
          }}
        >
          {data.project_scope.description}
          {data.project_scope.total_contract_value != null && (
            <div style={{ fontFamily: mono, color: "#999", marginTop: "8px", fontSize: "11px" }}>
              Contract value: {formatAmount(data.project_scope.total_contract_value, data.currency)}
            </div>
          )}
        </div>
      )}

      {/* ── Line Items ── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "24px",
        }}
      >
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
              Description
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
          {data.line_items.map((item, i) => (
            <tr key={i}>
              <td
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f0",
                  verticalAlign: "top",
                }}
              >
                {item.name && (
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#0a0a0a", marginBottom: "2px" }}>
                    {item.name}
                  </div>
                )}
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
                {item.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Totals ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
        <table style={{ fontSize: "13px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "6px 24px 6px 0", color: "#888", fontFamily: mono }}>
                Subtotal
              </td>
              <td style={{ padding: "6px 0", fontFamily: mono, textAlign: "right" }}>
                {formatAmount(data.total_amount, data.currency)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px 24px 12px 0",
                  fontWeight: 700,
                  fontSize: "18px",
                  borderTop: "2px solid #0a0a0a",
                }}
              >
                Amount Due
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

      {/* ── Footer: Payment + Terms ── */}
      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        {data.payment_protocol && (
          <div style={{ flex: 1 }}>
            <p style={label}>Payment Protocol</p>
            <div
              style={{
                background: "#fafafa",
                padding: "14px 16px",
                border: "1px solid #eee",
              }}
            >
              <div style={{ fontWeight: 600, color: "#0a0a0a", marginBottom: "8px", fontSize: "13px" }}>
                {data.payment_protocol.label}
              </div>
              <table style={{ fontFamily: mono, fontSize: "11px", color: "#666" }}>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: "12px", paddingBottom: "2px" }}>Bank</td>
                    <td style={{ color: "#0a0a0a", fontWeight: 600, paddingBottom: "2px" }}>
                      {data.payment_protocol.bank_name}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "12px", paddingBottom: "2px" }}>Name</td>
                    <td style={{ color: "#0a0a0a", fontWeight: 600, paddingBottom: "2px" }}>
                      {data.payment_protocol.account_name}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "12px" }}>Acct</td>
                    <td style={{ color: "#0a0a0a", fontWeight: 600 }}>
                      {data.payment_protocol.account_number}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ flex: 1, color: "#999", fontSize: "11px", lineHeight: 1.7 }}>
          <p style={label}>Terms</p>
          <p style={{ margin: 0 }}>
            Payment is due within the period indicated. Work commences upon clearance of funds.
            This is a Statement of Account for independent technical consultancy services.
          </p>
          <div
            style={{
              marginTop: "16px",
              fontFamily: mono,
              fontSize: "10px",
              color: "#ddd",
            }}
          >
            &gt;_ end_of_file
          </div>
        </div>
      </div>
    </div>
  );
}
