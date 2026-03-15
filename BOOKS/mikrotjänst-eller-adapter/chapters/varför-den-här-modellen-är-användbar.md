# Varför den här modellen är användbar

Den löser ett vanligt problem:

Organisationer säger *“vi bygger mikrotjänster”* men bygger egentligen:

- BFF:er
- integrationsadaptrar
- processorkestrering

Allt kallas mikrotjänst, vilket gör arkitekturen otydlig.

--- 

✅ Med denna modell kan man istället säga:

- **Domain services** → verkliga mikrotjänster
- **Integration services** → systemkoppling
- **Experience services** → klientanpassning

--- 

Om du vill kan jag också visa något som ofta blir **en ögonöppnare för lösningsarkitekter**:

>varför många organisationer med mikrotjänster efter några år i praktiken har byggt **en ny ESB fast distribuerad**.

--- 

### **You**

Kan du utveckla varför man gör det så här krångligt? Med så många nivåer? 

--- 

### **ChatGPT**

Det är en väldigt relevant fråga. Många arkitekter reagerar exakt så första gången de ser sådana modeller. Det finns egentligen **tre huvudorsaker** till att arkitekturer har fått fler lager över tid.

---
