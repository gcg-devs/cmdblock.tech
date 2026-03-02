import {
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import type { InvoiceOutputShape } from "../lib/invoice-output";

// ── Font Registration ──

Font.register({
  family: "Syne",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_04uT6k.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_3mvj6k.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_3fvj6k.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_24vj6k.ttf",
      fontWeight: 800,
    },
  ],
});

Font.register({
  family: "Geist Mono",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/geistmono/v4/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeE9KJ5T.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/geistmono/v4/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeHjL55T.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/geistmono/v4/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeHaL55T.ttf",
      fontWeight: 700,
    },
  ],
});

// ── Helpers ──
// Scale factor: A4 width (595pt) / HTML container width (960px)
const S = 595 / 960;

function pt(px: number): number {
  return Math.round(px * S * 10) / 10;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA");
}

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : "PHP ";
  return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Styles ──

const s = StyleSheet.create({
  page: {
    fontFamily: "Syne",
    fontSize: pt(13),
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
    lineHeight: 1.5,
  },
  borderTop: {
    height: pt(8),
    backgroundColor: "#0a0a0a",
  },
  body: {
    paddingTop: pt(56),
    paddingBottom: pt(56),
    paddingLeft: pt(48),
    paddingRight: pt(48),
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: pt(28),
    marginBottom: pt(28),
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  brandName: {
    fontFamily: "Geist Mono",
    fontSize: pt(24),
    fontWeight: 700,
    letterSpacing: pt(-0.72),
    color: "#0a0a0a",
    marginBottom: pt(8),
  },
  brandMuted: { color: "#999" },
  brandDim: { color: "#bbb" },
  contactInfo: {
    fontSize: pt(12),
    color: "#888",
    marginTop: pt(10),
    lineHeight: 1.6,
  },
  soaTitle: {
    fontSize: pt(10),
    fontWeight: 700,
    color: "#bbb",
    letterSpacing: pt(2.5),
    textTransform: "uppercase",
    marginBottom: pt(12),
    textAlign: "right",
  },
  soaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: pt(3),
  },
  soaLabel: {
    fontFamily: "Geist Mono",
    fontSize: pt(12),
    color: "#888",
    marginRight: pt(12),
  },
  soaValue: {
    fontFamily: "Geist Mono",
    fontSize: pt(12),
    color: "#0a0a0a",
  },

  // Label style
  label: {
    fontFamily: "Geist Mono",
    fontSize: pt(10),
    fontWeight: 600,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: pt(2),
    marginBottom: pt(6),
  },

  // Billed To + Project
  billedSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: pt(32),
    gap: pt(32),
  },
  billedCol: { flex: 1 },
  clientName: { fontSize: pt(15), fontWeight: 700, color: "#0a0a0a" },
  clientAddress: { fontSize: pt(12), color: "#666", marginTop: pt(4) },
  projectCol: { flex: 1, alignItems: "flex-end" },
  projectTitle: { fontSize: pt(14), fontWeight: 600, color: "#0a0a0a" },
  projectType: {
    fontFamily: "Geist Mono",
    fontSize: pt(11),
    color: "#999",
    marginTop: pt(4),
  },

  // Scope
  scopeBox: {
    marginBottom: pt(28),
    paddingTop: pt(12),
    paddingBottom: pt(12),
    paddingLeft: pt(16),
    paddingRight: pt(16),
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  scopeText: { fontSize: pt(12), color: "#555", lineHeight: 1.7 },
  scopeContract: {
    fontFamily: "Geist Mono",
    color: "#999",
    marginTop: pt(8),
    fontSize: pt(11),
  },

  // Line Items
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#0a0a0a",
    paddingBottom: pt(8),
    paddingTop: pt(8),
  },
  tableHeaderDesc: {
    flex: 1,
    fontFamily: "Geist Mono",
    fontSize: pt(10),
    fontWeight: 600,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: pt(2),
  },
  tableHeaderAmt: {
    width: pt(140),
    fontFamily: "Geist Mono",
    fontSize: pt(10),
    fontWeight: 600,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: pt(2),
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingTop: pt(14),
    paddingBottom: pt(14),
  },
  itemDescCol: { flex: 1 },
  itemName: {
    fontWeight: 700,
    fontSize: pt(14),
    color: "#0a0a0a",
    marginBottom: pt(2),
  },
  itemDescription: { color: "#777", fontSize: pt(12), lineHeight: 1.6 },
  itemAmtCol: {
    width: pt(140),
    fontFamily: "Geist Mono",
    fontWeight: 600,
    fontSize: pt(14),
    textAlign: "right",
  },
  tableWrap: { marginBottom: pt(24) },

  // Totals
  totalsWrap: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: pt(40),
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  subtotalLabel: {
    fontFamily: "Geist Mono",
    color: "#888",
    paddingRight: pt(24),
    paddingTop: pt(6),
    paddingBottom: pt(6),
    fontSize: pt(13),
    textAlign: "right",
  },
  subtotalValue: {
    fontFamily: "Geist Mono",
    textAlign: "right",
    width: pt(160),
    paddingTop: pt(6),
    paddingBottom: pt(6),
    fontSize: pt(13),
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#0a0a0a",
    alignItems: "center",
  },
  totalLabel: {
    fontWeight: 700,
    fontSize: pt(18),
    paddingRight: pt(24),
    paddingTop: pt(12),
    paddingBottom: pt(12),
  },
  totalValue: {
    fontFamily: "Geist Mono",
    fontWeight: 700,
    fontSize: pt(18),
    textAlign: "right",
    width: pt(160),
    paddingTop: pt(12),
    paddingBottom: pt(12),
  },

  // Footer
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: pt(24),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: pt(32),
  },
  footerCol: { flex: 1 },
  protocolBox: {
    backgroundColor: "#fafafa",
    paddingTop: pt(14),
    paddingBottom: pt(14),
    paddingLeft: pt(16),
    paddingRight: pt(16),
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  protocolLabel: {
    fontWeight: 600,
    color: "#0a0a0a",
    marginBottom: pt(8),
    fontSize: pt(13),
  },
  protocolRow: { flexDirection: "row", marginBottom: pt(2) },
  protocolKey: {
    fontFamily: "Geist Mono",
    fontSize: pt(11),
    color: "#666",
    marginRight: pt(12),
    width: pt(40),
  },
  protocolVal: {
    fontFamily: "Geist Mono",
    fontSize: pt(11),
    color: "#0a0a0a",
    fontWeight: 600,
  },
  termsText: { color: "#999", fontSize: pt(11), lineHeight: 1.7 },
  endOfFile: {
    fontFamily: "Geist Mono",
    fontSize: pt(10),
    color: "#ddd",
    marginTop: pt(16),
  },
});

// ── Document Component ──

interface InvoicePdfDocumentProps {
  data: InvoiceOutputShape;
  qrImageDataUrl?: string | null;
}

export function InvoicePdfDocument({ data, qrImageDataUrl }: InvoicePdfDocumentProps) {
  const cs = data.currency === "USD" ? "$" : "PHP";

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.borderTop} />

        <View style={s.body}>
          {/* ── Header ── */}
          <View style={s.header}>
            <View>
              <Text style={s.brandName}>
                <Text style={s.brandMuted}>{">_"}</Text>
                cmdblock
                <Text style={s.brandDim}>.tech</Text>
              </Text>
              <View style={s.contactInfo}>
                {data.team ? (
                  <>
                    {data.team.address ? (
                      <Text>{data.team.address}</Text>
                    ) : null}
                    {data.team.email ? (
                      <Text>{data.team.email}</Text>
                    ) : null}
                  </>
                ) : (
                  <Text>billing@cmdblock.tech</Text>
                )}
              </View>
            </View>

            <View>
              <Text style={s.soaTitle}>Statement of Account</Text>
              <View style={s.soaRow}>
                <Text style={s.soaLabel}>SOA</Text>
                <Text style={[s.soaValue, { fontWeight: 700 }]}>
                  {data.soa_number}
                </Text>
              </View>
              <View style={s.soaRow}>
                <Text style={s.soaLabel}>Issued</Text>
                <Text style={s.soaValue}>{formatDate(data.issue_date)}</Text>
              </View>
              <View style={[s.soaRow, { marginBottom: 0 }]}>
                <Text style={s.soaLabel}>Due</Text>
                <Text style={[s.soaValue, { fontWeight: 600 }]}>
                  {formatDate(data.due_date)}
                </Text>
              </View>
            </View>
          </View>

          {/* ── Billed To + Project ── */}
          <View style={s.billedSection}>
            <View style={s.billedCol}>
              <Text style={s.label}>Billed To</Text>
              <Text style={s.clientName}>{data.client_name ?? "—"}</Text>
              {data.client_billing_address ? (
                <Text style={s.clientAddress}>
                  {data.client_billing_address}
                </Text>
              ) : null}
            </View>

            {data.project_title ? (
              <View style={s.projectCol}>
                <Text style={[s.label, { textAlign: "right" }]}>Project</Text>
                <Text style={s.projectTitle}>{data.project_title}</Text>
                {data.invoice_type !== "ONE_OFF" ? (
                  <Text style={s.projectType}>
                    {data.invoice_type.toLowerCase().replace("_", " ")}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>

          {/* ── Scope ── */}
          {data.project_scope.enabled && data.project_scope.description ? (
            <View style={s.scopeBox}>
              <Text style={s.scopeText}>
                {data.project_scope.description}
              </Text>
              {data.project_scope.total_contract_value != null ? (
                <Text style={s.scopeContract}>
                  Contract value:{" "}
                  {formatAmount(
                    data.project_scope.total_contract_value,
                    data.currency
                  )}
                </Text>
              ) : null}
            </View>
          ) : null}

          {/* ── Line Items ── */}
          <View style={s.tableWrap}>
            <View style={s.tableHeader}>
              <Text style={s.tableHeaderDesc}>Description</Text>
              <Text style={s.tableHeaderAmt}>Amount ({cs})</Text>
            </View>
            {data.line_items.map((item, i) => (
              <View key={i} style={s.tableRow}>
                <View style={s.itemDescCol}>
                  {item.name ? (
                    <Text style={s.itemName}>{item.name}</Text>
                  ) : null}
                  {item.description ? (
                    <Text style={s.itemDescription}>{item.description}</Text>
                  ) : null}
                </View>
                <Text style={s.itemAmtCol}>
                  {item.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            ))}
          </View>

          {/* ── Totals ── */}
          <View style={s.totalsWrap}>
            <View>
              <View style={s.totalsRow}>
                <Text style={s.subtotalLabel}>Subtotal</Text>
                <Text style={s.subtotalValue}>
                  {formatAmount(data.total_amount, data.currency)}
                </Text>
              </View>
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Amount Due</Text>
                <Text style={s.totalValue}>
                  {formatAmount(data.total_amount, data.currency)}
                </Text>
              </View>
            </View>
          </View>

          {/* ── Footer ── */}
          <View style={s.footer}>
            {data.payment_protocol ? (
              <View style={s.footerCol}>
                <Text style={s.label}>Payment Protocol</Text>
                <View style={[s.protocolBox, { flexDirection: "row", alignItems: "center", gap: pt(12) }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.protocolLabel}>
                      {data.payment_protocol.label}
                    </Text>
                    <View style={s.protocolRow}>
                      <Text style={s.protocolKey}>Bank</Text>
                      <Text style={s.protocolVal}>
                        {data.payment_protocol.bank_name}
                      </Text>
                    </View>
                    <View style={s.protocolRow}>
                      <Text style={s.protocolKey}>Name</Text>
                      <Text style={s.protocolVal}>
                        {data.payment_protocol.account_name}
                      </Text>
                    </View>
                    <View style={[s.protocolRow, { marginBottom: 0 }]}>
                      <Text style={s.protocolKey}>Acct</Text>
                      <Text style={s.protocolVal}>
                        {data.payment_protocol.account_number}
                      </Text>
                    </View>
                  </View>
                  {qrImageDataUrl ? (
                    <Image src={qrImageDataUrl} style={{ width: pt(90), height: pt(90) }} />
                  ) : null}
                </View>
              </View>
            ) : null}

            <View style={s.footerCol}>
              <Text style={s.label}>Terms</Text>
              <Text style={s.termsText}>
                Payment is due within the period indicated. Work commences upon
                clearance of funds. This is a Statement of Account for
                independent technical consultancy services.
              </Text>
              <Text style={s.endOfFile}>{">_"} end_of_file</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
