# Nossa Matilha

Website for **Nossa Matilha**, a dog boarding (hospedagem) and daycare (creche) in Resende/RJ, Brazil.

🌐 https://www.nossamatilharesende.com.br/

Built with [Next.js](https://nextjs.org/) (App Router), React, TypeScript and Tailwind CSS. The site content is in Brazilian Portuguese.

## Requirements

- [nvm](https://github.com/nvm-sh/nvm) — the Node.js version is pinned in [`.nvmrc`](.nvmrc).

This project uses nvm: always run `nvm use` in your shell before any `node` or `npm` command.

## Getting started

Setup your environment:

```bash
nvm install
nvm use
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run dev`          | Starts the development server with hot reload.                       |
| `npm run build`        | Creates an optimized production build.                               |
| `npm run start`        | Serves the production build (run `npm run build` first).             |
| `npm run lint`         | Lints the code with ESLint.                                          |
| `npm run typecheck`    | Generates Next.js route types and checks types with the TS compiler. |
| `npm run format:check` | Checks formatting with Prettier.                                     |
| `npm run format:write` | Formats all files with Prettier.                                     |

## Documentation

- [`docs/`](docs/) — business information and brand reference.
- [`AGENTS.md`](AGENTS.md) — development rules and workflow (this project is developed by AI agents).

## License

[MIT](LICENSE)
