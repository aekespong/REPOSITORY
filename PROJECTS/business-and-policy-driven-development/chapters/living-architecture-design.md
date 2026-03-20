# Living Architecture Design

## Background

The objective is to establish a pragmatic and effective approach to enterprise architecture—one that is directly embedded in delivery rather than expressed through static documentation.

All projects and enterprise architecture artifacts, including policies, plans, and specifications, are maintained in GitHub and synchronized through pull requests (PRs). Each PR contains both executable code and supporting documentation, ensuring that implementation, requirements, and architectural reasoning are managed together.

Traceability is a core principle. Code, requirements, policies, and architectural decisions are explicitly linked, enabling automated and AI-assisted analysis across these elements.

At every PR submission, changes are evaluated against centrally defined and project-specific plans and specifications, ensuring continuous alignment between implementation and intended architecture.

This approach complements traditional project documentation by making architecture operational, traceable, and continuously validated.

--- 

## 1. Core Principle: Everything is a PR and Everything is Traceable

The model is based on tightly integrating three fundamental elements:

- **Code** (implementation)
- **Requirements and policies** (what must be fulfilled)
- **Architectural decisions and analysis** (why it is done)

All of these are treated as first-class artifacts in Git.

### Example Structure

```
/projects/  /project-a/    /spec/      requirements.md      constraints.md    /architecture/      decisions/        ADR-001.md    /code//enterprise/  /plans/    target-architecture.md  /policies/    security.md    integration.md  /reference-models/
```

This structure enables a unified and version-controlled representation of both implementation and intent.

--- 

## 2. Linking Everything Through Explicit Identifiers

Traceability is achieved through a consistent ID system rather than informal references.

### Identifier Types

- `REQ-123` — Requirement
- `POL-SEC-01` — Policy
- `ADR-7` — Architectural Decision

### Example in Code

```
Python# Implements: REQ-123# Constrained by: POL-SEC-01
```

### Example in Specification

```
Markdown## REQ-123 – User Authentication  Must comply with POL-SEC-01
```

This explicit linking enables both deterministic tooling and AI to understand relationships across artifacts.

--- 

## 3. AI as a Continuous Architecture Reviewer

Each pull request triggers an automated pipeline that performs three types of analysis:

### A. Compliance Check

- Verifies whether the implementation adheres to defined policies
- Detects violations of enterprise-level architectural constraints

Example:

“This PR violates POL-INT-02 (no direct coupling between system X and Y)”

--- 

### B. Consistency Check

- Validates alignment between code and requirements
- Identifies missing implementations
- Detects functionality without corresponding requirements

--- 

### C. Architectural Review

Provides qualitative feedback on design and structure:

- “This resembles a distributed monolith”
- “Duplicated logic compared to project-b”
- “Violates bounded context principles”

This layer provides insight beyond traditional static analysis and is where much of the value is realized.

--- 

## 4. Pull Request Pipeline

When a PR is opened, the following process is executed:

### 1. Parse Content

- Source code
- Documentation (Markdown)
- References (REQ, POL, ADR)

### 2. Build a Context Graph

- Identify impacted components
- Determine applicable policies
- Retrieve relevant architectural decisions

### 3. Execute AI Analysis

The analysis is performed using:

- Code changes (diff)
- Relevant policies
- Architecture plans
- Related ADRs

### 4. Generate Automated Feedback

Example:

>❗ Violates POL-SEC-01: Missing authentication in endpoint X
>
>⚠️ REQ-123 lacks test coverage
>
>💡 Similar solution exists in project-b (risk of duplication)

--- 

## 5. Making Plans and Specifications Machine-Readable

Free-text documentation limits automation and reduces analysis quality.

To enable reliable validation, policies and requirements should be structured.

### Example: Policy

```
YAMLid: POL-SEC-01title: Authentication requiredrule: "All endpoints must require authentication"applies_to: ["api"]severity: "high"
```

### Example: Requirement

```
YAMLid: REQ-123description: User must log inlinked_policies:  - POL-SEC-01
```

This enables a combination of deterministic checks and AI-driven analysis.

--- 

## 6. GitHub as the Execution Platform

The implementation relies on standard tooling:

### GitHub Actions

- Triggered on pull requests
- Executes analysis pipelines

### AI Layer

- Uses external or local models
- Leverages embeddings to retrieve relevant context

### Comment Bot

- Posts structured feedback directly in PRs

--- 

## 7. Minimizing Friction

Adoption depends on usability. If the process introduces too much overhead, it will be bypassed.

Key principles:

- Automatically suggest requirement and policy links
- Generate PR summaries
- Provide actionable suggestions, not just criticism

--- 

## 8. Key Risks

### Over-governance

Excessive control leads to workarounds and reduced adoption

### Poor policy quality

Weak or unclear policies result in unreliable analysis

### False confidence

AI may miss critical issues or produce incorrect conclusions

**Mitigation:**

AI should function as an assistant, not a final authority.

--- 

## 9. Extended Capabilities

Once established, the model enables additional capabilities:

### Impact Analysis

“What systems are affected by a change in this policy?”

### Knowledge Graph

A fully searchable representation of architecture and implementation

### Automated Refactoring Suggestions

“Move this logic to a shared service”

--- 

This reframed version positions your idea more clearly as an **operating model**, not just a technical solution, while keeping it grounded and implementable.

---
