import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ContractOutputShape } from "../lib/contract-output";

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

const S = 595 / 960;

function pt(px: number): number {
  return Math.round(px * S * 10) / 10;
}

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

const sectionDefs: { key: keyof ContractOutputShape["sections"]; label: string }[] = [
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
  docTitle: {
    fontSize: pt(10),
    fontWeight: 700,
    color: "#bbb",
    letterSpacing: pt(2.5),
    textTransform: "uppercase",
    marginBottom: pt(12),
    textAlign: "right",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: pt(3),
  },
  metaLabel: {
    fontFamily: "Geist Mono",
    fontSize: pt(12),
    color: "#888",
    marginRight: pt(12),
  },
  metaValue: {
    fontFamily: "Geist Mono",
    fontSize: pt(12),
    color: "#0a0a0a",
  },
  label: {
    fontFamily: "Geist Mono",
    fontSize: pt(10),
    fontWeight: 600,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: pt(2),
    marginBottom: pt(6),
  },
  partySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: pt(32),
    gap: pt(32),
  },
  partyCol: { flex: 1 },
  partyRight: { flex: 1, alignItems: "flex-end" },
  partyName: { fontSize: pt(15), fontWeight: 700, color: "#0a0a0a" },
  partyNote: {
    fontFamily: "Geist Mono",
    fontSize: pt(11),
    color: "#999",
    marginTop: pt(4),
  },
  titleWrap: { marginBottom: pt(28) },
  h1: {
    fontSize: pt(28),
    lineHeight: 1.15,
    letterSpacing: pt(-0.56),
    color: "#0a0a0a",
    fontWeight: 700,
  },
  section: {
    paddingTop: pt(16),
    paddingBottom: pt(16),
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  sectionText: {
    color: "#555",
    fontSize: pt(12),
    lineHeight: 1.75,
  },
  table: { marginTop: pt(28), marginBottom: pt(24) },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#0a0a0a",
    paddingTop: pt(8),
    paddingBottom: pt(8),
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
  itemAmt: {
    width: pt(140),
    fontFamily: "Geist Mono",
    fontWeight: 600,
    fontSize: pt(14),
    textAlign: "right",
  },
  totalsWrap: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: pt(40),
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
    width: pt(180),
    paddingTop: pt(12),
    paddingBottom: pt(12),
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: pt(24),
  },
  footerText: { color: "#999", fontSize: pt(11), lineHeight: 1.7 },
  endOfFile: {
    fontFamily: "Geist Mono",
    fontSize: pt(10),
    color: "#ddd",
    marginTop: pt(16),
  },
});

export function ContractPdfDocument({ data }: { data: ContractOutputShape }) {
  const cs = data.currency === "USD" ? "$" : "PHP";

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.borderTop} />
        <View style={s.body}>
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
                    {data.team.address ? <Text>{data.team.address}</Text> : null}
                    {data.team.email ? <Text>{data.team.email}</Text> : null}
                  </>
                ) : (
                  <Text>billing@cmdblock.tech</Text>
                )}
              </View>
            </View>

            <View>
              <Text style={s.docTitle}>Project Proposal</Text>
              <View style={s.metaRow}>
                <Text style={s.metaLabel}>Ref</Text>
                <Text style={[s.metaValue, { fontWeight: 700 }]}>
                  {data.contract_number}
                </Text>
              </View>
              <View style={s.metaRow}>
                <Text style={s.metaLabel}>Issued</Text>
                <Text style={s.metaValue}>{formatDate(data.issue_date)}</Text>
              </View>
              <View style={[s.metaRow, { marginBottom: 0 }]}>
                <Text style={s.metaLabel}>Valid</Text>
                <Text style={[s.metaValue, { fontWeight: 600 }]}>
                  {formatDate(data.valid_until)}
                </Text>
              </View>
            </View>
          </View>

          <View style={s.partySection}>
            <View style={s.partyCol}>
              <Text style={s.label}>Prepared For</Text>
              <Text style={s.partyName}>{data.client_name}</Text>
            </View>
            <View style={s.partyRight}>
              <Text style={[s.label, { textAlign: "right" }]}>Prepared By</Text>
              <Text style={s.partyName}>{data.prepared_by}</Text>
              <Text style={s.partyNote}>operating under cmdblock.tech brand</Text>
            </View>
          </View>

          <View style={s.titleWrap}>
            <Text style={s.label}>Document</Text>
            <Text style={s.h1}>{data.title}</Text>
          </View>

          {sectionDefs.map((section) => {
            const text = data.sections[section.key];
            if (!text.trim()) return null;

            return (
              <View key={section.key} style={s.section}>
                <Text style={s.label}>{section.label}</Text>
                <Text style={s.sectionText}>{text}</Text>
              </View>
            );
          })}

          <View style={s.table}>
            <View style={s.tableHeader}>
              <Text style={s.tableHeaderDesc}>Deliverable</Text>
              <Text style={s.tableHeaderAmt}>Amount ({cs})</Text>
            </View>
            {data.line_items.map((item, index) => (
              <View key={index} style={s.tableRow}>
                <View style={s.itemDescCol}>
                  <Text style={s.itemName}>{item.name}</Text>
                  {item.description ? (
                    <Text style={s.itemDescription}>{item.description}</Text>
                  ) : null}
                </View>
                <Text style={s.itemAmt}>
                  {item.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            ))}
          </View>

          <View style={s.totalsWrap}>
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Estimated Total</Text>
              <Text style={s.totalValue}>
                {formatAmount(data.total_amount, data.currency)}
              </Text>
            </View>
          </View>

          <View style={s.footer}>
            <Text style={s.label}>Terms</Text>
            <Text style={s.footerText}>
              This document is a proposal and draft contract for discussion.
              Final pricing, timeline, and implementation details remain
              subject to requirements validation and written approval by both
              parties.
            </Text>
            <Text style={s.endOfFile}>{">_"} end_of_file</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
