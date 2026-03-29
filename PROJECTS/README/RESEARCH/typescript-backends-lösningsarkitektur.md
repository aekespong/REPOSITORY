# TypeScript-backends lösningsarkitektur

TypeScript-backends för Django/Pydantic-personer

> Ett praktiskt "så här brukar det se ut"-kompendium för Node/TypeScript: projektstruktur, ramverksval, routing/middleware, server-rendering med EJS, validering à la Pydantic och config med `process.env`.

## Kapitel 1: Server.ts-filen – Varför den ska hålla sig under 50 rader

I TypeScript/Node-projekt (Express/Fastify/Nest/Koa) är det "normala" att göra `server.ts` så tunn som möjligt. Den ska mest:

* ladda konfig
* bygga appen
* starta `listen()`

Allt annat (routing, controllers, affärslogik, databasanrop, middleware) ska bo i egna filer. Resultatet blir:

* tydligare ansvar (HTTP → controller → service → repo)
* enklare testning
* mindre "spagetti" och enklare refaktorering

En tumregel som räddar liv:

* `server.ts` helst **< 30–50 rader**
* controllers tunna
* services utan HTTP-kunskap
* repos utan affärsregler


## Kapitel 2: En “standard”-struktur som funkar från litet till medelstort

En vanlig, lättskött struktur:

```text
src/
  server.ts            // bootstrap (start)
  app.ts               // bygger appen (middleware + routes)
  config/
    env.ts             // läser/validerar env → exporterar config
    logger.ts          // logger setup (pino/winston)
  routes/
    index.ts           // mountar feature-routers
    health.ts
    users.routes.ts
  controllers/
    users.controller.ts // HTTP-lager
  services/
    users.service.ts    // affärslogik
  repositories/
    users.repo.ts       // DB-access
  middleware/
    errorHandler.ts
    auth.ts
    requestId.ts
  utils/
    time.ts
    strings.ts
  types/
    express.d.ts        // utökning av Express Request/Response
  domain/               // valfritt: domänmodeller/DTOs/validering
    user.ts
  lib/                  // valfritt: wrappers runt externa klienter
    db.ts
    redis.ts
tests/
```

### Roller: vad ligger var?

* **`server.ts` (bootstrap)**
  Startar servern. Ingen routinglogik.

* **`app.ts` (komposition)**
  Skapar Express/Fastify-instans, kopplar middleware, mountar routes, kopplar error handler sist.

* **`routes/*.ts`**
  URL:er + HTTP-metoder. Kopplar till controllers.

* **`controllers/*.ts`**
  Översätter HTTP (`req/res`) till interna anrop. Validerar input lätt eller delegerar till schema-lager. Returnerar rätt statuskod.

* **`services/*.ts`**
  Affärsregler och flöden. Anropar repos/external clients. Ingen Express-kod.

* **`repositories/*.ts`**
  DB/persistence. Inga `req/res`. Returnerar “rena” objekt.

* **`middleware/*.ts`**
  Auth, error handling, request-id, rate limiting, etc.

* **`utils/*.ts`**
  Små generiska helpers. Om `utils` blir “soptunna” → dela upp i fler mappar.

---

## Kapitel 3: Dela routing från exekvering (och varför det gör testning enklare)

Ett “normalt” upplägg är:

* `server.ts`: bara `listen`
* `app.ts`: bygger app, mountar routes
* `routes/*`: endpoints
* `controllers/*`: HTTP-hantering
* `services/*`: affärslogik

### Mini-exempel

**`server.ts`**

```ts
import { buildApp } from "./app";
import { env } from "./config/env";

const app = buildApp();

app.listen(env.PORT, () => {
  console.log(`Listening on :${env.PORT}`);
});
```

**`app.ts`**

```ts
import express from "express";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export function buildApp() {
  const app = express();
  app.use(express.json());

  registerRoutes(app);

  app.use(errorHandler);
  return app;
}
```

**`routes/index.ts`**

```ts
import type { Express } from "express";
import { usersRouter } from "./users.routes";
import { healthRouter } from "./health";

export function registerRoutes(app: Express) {
  app.use("/health", healthRouter);
  app.use("/users", usersRouter);
}
```

**Varför bra?** Du kan importera `buildApp()` i tester utan att starta servern.

---

## Kapitel 4: Klasser eller funktioner?

Båda funkar. I modern TS/Node ser man ofta:

* **funktioner** för controllers och små services (mindre boilerplate)
* **klasser** när du vill ha:

  * tydlig dependency injection / state
  * lätt mockning
  * många relaterade metoder (ex. `UserService` med 10+ metoder)

Pragmatisk tumregel:

* 1–3 funktioner, få beroenden → funktioner räcker
* många metoder + flera beroenden → klass kan ge ordning

---

## Kapitel 5: Ramverksval: Express, Fastify, NestJS, Koa

### Express

**Fördelar**

* enormt ekosystem av middleware och exempel
* lätt att komma igång, lätt att hitta devs
* flexibel arkitektur

**Nackdelar**

* mindre “styrning” → lätt att få spagetti utan conventions
* TS-typer kan kännas knöliga (request augmentation, etc.)
* prestanda okej men inte topp

**Passar när**

* du vill ha max kompatibilitet och snabb onboarding
* du bygger “vanlig” REST/JSON och kan hålla ordning själv

---

### Fastify

**Fördelar**

* ofta bättre prestanda
* bra TS-stöd, schema-först funkar fint
* plugin-arkitektur uppmuntrar modulär kod
* inbyggd känsla för validering (ofta JSON Schema)

**Nackdelar**

* mindre ekosystem än Express
* plugins/encapsulation kan vara ovant
* Express-middleware funkar inte alltid rakt av

**Passar när**

* du vill ha mer struktur och prestanda, men inte “full framework”
* du gillar modulärt plugin-tänk

---

### NestJS

**Fördelar**

* tydlig, konsekvent struktur: modules/controllers/services
* DI inbyggt → testbarhet och ordning i stora kodbaser
* mycket inbyggt (guards/pipes/interceptors, patterns)

**Nackdelar**

* mer “framework weight” och boilerplate
* decorators/DI kan kännas magiskt
* kan vara overkill för små projekt

**Passar när**

* ni är flera eller kodbasen ska leva länge
* du vill ha “Django-känsla” med tydliga conventions

---

### Koa

**Fördelar**

* ren async/await-middleware-modell
* väldigt minimal → maximal kontroll

**Nackdelar**

* mindre “standard” idag, mindre ekosystem
* kräver mer arkitekturdisciplin än Express

**Passar när**

* du vill ha supertunt ramverk och gillar middleware-kedjor

---

## Kapitel 6: Express i praktiken — `app.use`, routes och `send()`

### Kedjan: “uppifrån och ner”

Express är i grunden en pipeline. Ordningen i filen är avgörande.

```ts
app.use(auth);
app.get("/users", usersHandler);
app.use(errorHandler);
```

### `app.use()`

Registrerar middleware som körs för **alla metoder** och matchar path-prefix (om angivet).

```ts
app.use((req, res, next) => {
  console.log("Alla requests passerar här");
  next();
});

app.use("/admin", adminMiddleware); // bara /admin*
```

### `app.get/post/put/...`

Matchar **metod + path**.

```ts
app.get("/users", (req, res) => res.send("Users"));
app.post("/users", (req, res) => res.status(201).json({ ok: true }));
```

### `res.send / res.json / res.render`

De skickar ett svar och **avslutar kedjan**.

* `res.send(...)` skickar text eller JSON beroende på input
* `res.json(...)` skickar JSON (och sätter JSON headers)
* `res.render(...)` renderar template (EJS/Pug/…)

Efter att du skickat svar ska du **inte** köra `next()`.

---

## Kapitel 7: `next()` — vad det betyder och varför det finns

En middleware i Express ser ut så här:

```ts
(req, res, next) => { ... }
```

* `next()` betyder: **gå vidare till nästa middleware/handler**
* `next(err)` betyder: **hoppa till error middleware**

### Tre “slut” en middleware kan göra

I en middleware ska du göra exakt en av dessa:

1. `next()` → fortsätt
2. `res.send/res.json/res.render/res.redirect` → avsluta
3. `next(err)` → fel

Gör inte flera av dem.

---

## Kapitel 8: `app.use(express.json())` — vad den gör och varför den inte är “default”

### Vad den gör

Den lägger till en middleware som:

* läser request body om `Content-Type: application/json`
* parsar JSON
* sätter resultatet på `req.body`

Utan den är `req.body` oftast `undefined` för JSON-requests.

### Under huven: request body är en stream

I Node kommer body i “chunks”:

* `req.on("data", chunk => ...)`
* `req.on("end", () => ...)`

Express läser inte body automatiskt eftersom det:

* kostar minne (buffrar data)
* kan vara osäkert (DoS om payload är stor)
* är onödigt för många requests (t.ex. GET)

Därför är det opt-in med middleware.

### Sätt en limit (bra vana)

```ts
app.use(express.json({ limit: "1mb" }));
```

---

## Kapitel 9: Server-rendering med Express + EJS — layouts, partials och “flags”

Med Express + EJS är “standard” att tänka i tre nivåer:

1. **Layout**: ramen (html/head/header/sidebar/footer + `body`)
2. **Partials**: byggblock (header.ejs, sidebar.ejs…)
3. **Pages**: sidor (dashboard.ejs, users/index.ejs…)

### Vanlig struktur

```text
views/
  layouts/
    main.ejs
  partials/
    header.ejs
    sidebar.ejs
    footer.ejs
  pages/
    dashboard.ejs
    users/
      index.ejs
```

### Layout med includes

`views/layouts/main.ejs`

```ejs
<!doctype html>
<html>
  <head>
    <title><%= pageTitle ?? "My App" %></title>
  </head>
  <body>
    <%- include("../partials/header", { header: headerConfig }) %>

    <div class="layout">
      <%- include("../partials/sidebar", { sidebar: sidebarConfig }) %>
      <main><%- body %></main>
    </div>

    <%- include("../partials/footer") %>
  </body>
</html>
```

> För `<%- body %>` brukar man använda ett layout-stöd (t.ex. `express-ejs-layouts` eller `ejs-mate`). Alternativet är manuella includes i varje sida, men det blir repetitivt.

### Partials med “feature flags”

`views/partials/header.ejs`

```ejs
<header>
  <a href="/">Logo</a>

  <% if (header?.showSearch) { %>
    <input placeholder="Sök..." />
  <% } %>

  <% if (header?.user) { %>
    <span><%= header.user.name %></span>
    <a href="/logout">Logga ut</a>
  <% } else { %>
    <a href="/login">Logga in</a>
  <% } %>
</header>
```

### Sätt defaults globalt med `res.locals`

```ts
app.use((req, res, next) => {
  res.locals.pageTitle = "My App";
  res.locals.headerConfig = {
    showSearch: true,
    user: (req as any).user ?? null,
  };
  res.locals.sidebarConfig = {
    activePath: req.path,
  };
  next();
});
```

### Override per route

```ts
res.render("pages/users/index", {
  pageTitle: "Users",
  headerConfig: { ...res.locals.headerConfig, showSearch: false },
  sidebarConfig: { ...res.locals.sidebarConfig, activePath: "/users" },
});
```

---

## Kapitel 10: Django + Pydantic-motsvarigheter i TS-världen

Om du är van vid Django (batteries included) + Pydantic (parse/validate/typning), så vill du ofta ha:

* schema-baserad inputvalidering
* config-objekt som valideras vid start
* tydliga lager (controller/service/repo)
* en ORM med migrations

### Den vanligaste “Pydantic-känslan”: Zod

```ts
import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

Validering/parsing:

```ts
const input = CreateUserSchema.parse(req.body);     // kastar vid fel
// eller:
const result = CreateUserSchema.safeParse(req.body); // success + data/error
```

### “Django models”: Prisma (populärt)

Prisma ger typesafe queries + migrations + genererade TS-typer.

### “settings.py / BaseSettings”: `process.env` + schema-parse

```ts
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
```

---

## Kapitel 11: `process.env` och varför ditt `env`-objekt “finns överallt”

### Vad är `process.env`?

Det är Node’s globala objekt för environment variables (motsvarar `os.environ` i Python). Allt är `string | undefined`.

### Varför `env` blir tillgängligt överallt

Om du gör:

```ts
// config/env.ts
export const env = EnvSchema.parse(process.env);
```

…så sker detta:

* första gången någon importerar filen: den exekveras och skapar `env`
* Node cachar modulen
* alla senare imports får samma instans

Alltså: ja, `env` är “globalt” i praktiken via import.

### Två viktiga fallgropar

1. **Ladda `.env` tidigt** (innan andra imports) om du använder `.env` i dev
2. **Mutera inte `process.env` efteråt** (då får du två källor till sanning)

---

## Kapitel 12: Två “referensimplementationer” att utgå från

### A) Express + Zod + Prisma (lego, explicit)

Passar när du vill förstå allt och hålla det lätt.

* `routes` → `controllers` → `services` → `repositories`
* Zod parse i controller eller middleware
* Prisma för DB

### B) NestJS + Zod + Prisma (mest Django-likt)

Passar när du vill ha conventions + DI och skala team/kodbas.

* `Module` → `Controller` → `Service`
* Validation via pipes (kan göras med Zod)
* Prisma som injectable service

---

## Epilog: “Standardregler” som håller kodbasen frisk

* `server.ts` = bootstrap, inget annat
* `app.ts` bygger appen och mountar routes
* controllers: plocka data + kalla service + svara
* services: affärslogik, inga HTTP-typer
* repos: DB-access, inga affärsregler, inga HTTP-typer
* `utils/` ska inte bli en soptunna → dela upp när den växer
* config: läs/validera en gång, importera överallt

---

Om du vill kan jag fortsätta med fler kapitel, t.ex.:

* teststrategier (Jest/Vitest) för controller/service/repo
* auth-flöden (sessions vs JWT) och hur man strukturerar dem
* “feature-first” refaktorering när antalet features växer
* hur du gör en Zod-middleware i Express som känns som DRF/Pydantic pipeline