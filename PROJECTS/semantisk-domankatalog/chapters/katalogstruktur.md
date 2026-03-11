# Katalogstruktur och API

> Chapter-ID: katalogstruktur
> Status: draft

## Katalogen som master

Domankatalogen ar den centrala kallsan for vilka domaner som finns, vilka begrepp de ager, och vilka tjanster de exponerar. Alla system och agenter refererar till katalogen.

## Struktur

```
catalog/
  domains/
    kund/
      concepts.json      # Begrepp som domanen ager
      services.json      # Tjanster som domanen exponerar
      dependencies.json  # Andra domaner som refereras
    order/
      ...
```

## API

- `GET /domains` - Lista alla domaner
- `GET /domains/{id}/concepts` - Begrepp for en doman
- `GET /domains/{id}/services` - Tjanster for en doman
- `GET /concepts/{name}/owner` - Vilken doman ager ett begrepp
- `GET /concepts/{name}/used-by` - Vilka domaner anvander ett begrepp
