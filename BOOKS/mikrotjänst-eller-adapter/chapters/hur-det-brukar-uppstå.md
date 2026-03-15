# Hur det brukar uppstå

Det sker nästan alltid i tre steg.

### Steg 1 – monolit bryts upp

Organisationen delar upp systemet i många små tjänster.

--- 

### Steg 2 – tjänsterna fortsätter bero på varandra

Utvecklarna fortsätter tänka som i monoliten:

```
Service A → Service B → Service C
```

--- 

### Steg 3 – kedjor av API-anrop

En enkel operation kan kräva 10–20 anrop.

Det ger:

- latens
- instabilitet
- svår felsökning

---
