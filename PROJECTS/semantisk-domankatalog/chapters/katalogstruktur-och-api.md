# Katalogstruktur och API

> Chapter-ID: katalogstruktur
> Status: draft

## Katalogen som master

Domänkatalogen ar den centrala källan for vilka domäner som finns, vilka begrepp de ager, och vilka tjanster de exponerar. Alla system och agenter refererar till katalogen.

## Struktur

```
catalog/
  domains/
    kund/
      concepts.json      # Begrepp som domänen ager
      services.json      # Tjanster som domänen exponerar
      dependencies.json  # Andra domäner som refereras
    order/
      ...
```

## API

- `GET /domains` - Lista alla domäner
- `GET /domains/{id}/concepts` - Begrepp for en domän
- `GET /domains/{id}/services` - Tjanster for en domän
- `GET /concepts/{name}/owner` - Vilken domän ager ett begrepp
- `GET /concepts/{name}/used-by` - Vilka domäner anvander ett begrepp
