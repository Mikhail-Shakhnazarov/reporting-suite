# Reporting Suite

**Document-generation system for NGO weekly status reports**

A portfolio project demonstrating deterministic reporting for small NGOs and consultancies. Turns informal weekly updates into structured, queryable reports with professional PDF output.

## What This Solves

Small NGO teams often struggle with inconsistent weekly reporting:
- **Inconsistent structure** across team members and weeks
- **Lost insights** from unstructured Google Docs
- **Manual reporting** burden for directors and funders
- **No audit trail** for decisions and blockers

This system provides:
- **Structured input** → **validated reports** → **deterministic output**
- **Dual artifacts**: Human-readable PDFs + machine-readable data
- **Professional presentation** for board meetings and funder reports
- **CLI-first design** for easy adoption without changing tools

## Quick Demo (30 seconds)

```bash
# Install dependencies
pnpm install

# Generate a report PDF from sample data
pnpm exec tsx packages/cli-demo/src/cli.ts \
  fixtures/sample-reports.json \
  templates/team-detailed.md \
  --pdf harborlight-report.pdf

# Open harborlight-report.pdf - professional NGO report ready for stakeholders
```

## Features

### NGO-Optimized Schema
- **Metadata**: Organization, team, week range, RAG status, sensitivity
- **Sections**: Accomplishments, metrics with deltas, blockers with owners, risks, decisions, next week, asks
- **Validation**: Ensures required fields, week ranges, owner assignments

### Deterministic Rendering
- **Engine-first**: Business logic isolated from output formats
- **Anchored templates**: Consistent structure across reports
- **Provenance tracking**: Version metadata in every output

### Professional Output
- **PDF generation**: Puppeteer-powered with consistent styling
- **Multiple variants**: Team detailed vs executive summary
- **Machine-readable**: NDJSON export for data analysis

### Portfolio Highlights
- **TypeScript throughout**: Type-safe engine with comprehensive tests
- **Modular architecture**: Engine + adapters pattern
- **Real-world scenario**: Based on actual NGO reporting challenges
- **Clean deliverables**: Export removes development artifacts

## Architecture

```
Weekly Report (JSON)
    ↓
Validation + Computation
    ↓
RenderPlan (anchors + provenance)
    ↓
Markdown Template → HTML → PDF
NDJSON Export     → Queryable corpus
```

## Sample Output

Generated reports include:
- **Header**: Organization branding, week range, RAG status
- **Structured sections**: Bulleted accomplishments, metric tables, blocker tracking
- **Professional styling**: Consistent fonts, margins, colors
- **Provenance footer**: Generation timestamp, version info

## Use Cases

Perfect for:
- **Small NGOs** (5-50 staff) needing consistent reporting
- **Consultancies** delivering client reports
- **Any team** wanting structured weekly updates
- **Portfolio showcase** of TypeScript system design

## Development

```bash
# Install
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Generate sample PDF
pnpm exec tsx packages/cli-demo/src/cli.ts \
  fixtures/sample-reports.json \
  templates/team-detailed.md \
  --pdf sample.pdf
```

## Roadmap

- [x] CLI with PDF generation
- [x] Engine validation and computation
- [ ] Google Workspace integration
- [ ] Full 8-week sample dataset
- [ ] Web dashboard for queries

## License

MIT License - Free for personal and commercial use.

## About

Built as a portfolio project demonstrating:
- **System design**: Engine-adapter separation
- **TypeScript expertise**: Type-safe, tested codebase
- **Domain modeling**: NGO-specific requirements
- **User experience**: CLI-first with professional output

For questions: [Your contact info]