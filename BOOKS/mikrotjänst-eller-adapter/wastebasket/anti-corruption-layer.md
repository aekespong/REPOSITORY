# Anti-Corruption Layer
The Anti-Corruption Layer (ACL) is a software design pattern used to integrate systems or subsystems with differing models, without polluting one domain’s logic with another’s. It acts as a protective boundary, translating and isolating external system concepts to preserve the internal domain’s integrity.

Key facts
Pattern type: Integration and boundary pattern

Origin: Popularized in Domain-Driven Design (Eric Evans, 2003)

Primary goal: Prevent model corruption from external systems

Core mechanism: Translation between domain and external models

Concept and Purpose
An Anti-Corruption Layer provides an intermediary layer between a domain model and external systems with incompatible models or legacy APIs. It prevents the internal domain logic from depending on external data representations, business rules, or technical inconsistencies. By translating inputs and outputs, it ensures each system evolves independently without mutual interference.

Components
The ACL typically consists of several cooperating elements:

Facades: Simplify and control access to external systems.

Adapters: Convert data formats and structures between domains.

Translators: Map external objects into internal domain concepts and vice versa.

Services: Coordinate interaction across these components.

Together, they encapsulate communication and enforce clear boundaries.

Benefits and Use Cases
The pattern is particularly valuable when integrating with legacy systems, third-party APIs, or external services whose data or rules cannot be changed. It allows modernization, gradual migration, or coexistence of old and new architectures while protecting the core domain from model drift and conceptual contamination.

Relation to Domain-Driven Design
Within Domain-Driven Design (DDD), the Anti-Corruption Layer complements concepts like bounded contexts and context mapping. It is a defensive measure—one context’s model should not “leak” into another’s, and the ACL enforces this by translating all cross-context interactions.