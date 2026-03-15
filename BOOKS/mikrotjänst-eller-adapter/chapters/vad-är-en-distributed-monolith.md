# Vad är en distributed monolith?

Ett system där:

- funktionaliteten är uppdelad i många tjänster
- men tjänsterna **inte är oberoende**

Resultatet:

- de måste deployas tillsammans
- de är hårt kopplade
- ett fel sprider sig genom hela systemet

Men eftersom de körs separat får man ändå all komplexitet från distribution:

- nätverk
- latens
- retries
- versionering
- observability

Alltså **monolitens koppling + distribuerade systems komplexitet**.

---
