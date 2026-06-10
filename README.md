# 2INF Festival 2027

Nettside for karriere- og teknologifestivalen arrangert av VG2 Informasjonsteknologi ved **Hamar katedralskole**, 18. mars 2027.

## Om festivalen

2INF Festival er en årlig festival der teknologibedrifter møter elever og studenter. Besøkende kan delta på foredrag, praktiske workshops og besøke stands fra 20 norske teknologibedrifter.

- **Dato:** 18. mars 2027
- **Tid:** 09:00 – 14:15
- **Sted:** Hamar katedralskole, Teknologibygget

## Sider

| Side          | Rute         | Beskrivelse                                                |
| ------------- | ------------ | ---------------------------------------------------------- |
| Hjem          | `/`          | Oversikt, statistikk og navigasjon                         |
| Program       | `/program`   | Alle foredrag sortert etter tid (tidslinje)                |
| Bedrifter     | `/bedrifter` | 20 utstillende teknologibedrifter                          |
| Workshops     | `/workshops` | 12 praktiske workshops ledet av bedriftene                 |
| Kart          | `/kart`      | Interaktivt kart over skoleområdet (Leaflet/OpenStreetMap) |
| Praktisk info | `/praktisk`  | Transport, WiFi, mat og kontaktpersoner                    |

## Teknologi

- **[Next.js 16](https://nextjs.org)** — App Router, TypeScript, `output: "standalone"` for Docker
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first CSS med klasse-basert mørk modus
- **[react-leaflet](https://react-leaflet.js.org)** — Interaktivt kart uten API-nøkkel
- **[Cookiebot](https://cookiebot.com)** — Samtykkehåndtering (kun i produksjon)
- **Geist** — Font fra Vercel via `next/font`

## Mørk/lys modus

Nettstedet bruker systemets fargepreferanse (`prefers-color-scheme`) ved første besøk. Valget lagres i `localStorage` og kan byttes med knappen i navigasjonsmenyen. Et inline `<script>` i `<head>` forhindrer feil tema ved innlasting.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Bygg og produksjon

```bash
npm run build
npm start
```

### Docker

Prosjektet er konfigurert med `output: "standalone"` og er klart for Docker-deploy:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Datastruktur

All festivaldata ligger i [`data/festival.ts`](data/festival.ts) og eksporteres som TypeScript-konstanter:

| Eksport     | Innhold                                                |
| ----------- | ------------------------------------------------------ |
| `festival`  | Generell info (dato, sted, tider)                      |
| `bedrifter` | 20 utstillende bedrifter med stand, bransje og kontakt |
| `foredrag`  | 30 foredrag med tid, rom og holder                     |
| `workshops` | 12 workshops med tid, rom og forkunnskaper             |
| `rom`       | Rominformasjon (auditorier, lab, klasserom)            |
| `laerere`   | Kontaktpersoner / lærere med ansvarsområde             |

## Sikkerhet

`next.config.ts` setter sikkerhetshoder på alle svar, inkludert `Content-Security-Policy` med støtte for Cookiebot og Leaflet/OpenStreetMap.
