# Environment variables

Values that must not live in the repository (such as phone numbers) are read from environment variables. Next.js loads them from `.env` files.

## Setup

```bash
cp .env.example .env
```

Then replace the fictitious values in `.env` with the real ones (ask the owner). `.env` is gitignored and must never be committed. `.env.example` is committed and must only contain fictitious values.

## Variables

| Variable                                     | Required | Format                       | Description                                                                                    |
| -------------------------------------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER`          | Yes      | E.164, e.g. `+5524900000000` | Official Nossa Matilha WhatsApp. Used by every booking, quote and cancellation call to action. |
| `NEXT_PUBLIC_GROOMING_WHATSAPP_PHONE_NUMBER` | Yes      | E.164, e.g. `+5524900000001` | WhatsApp of the bath and grooming partner (Encantacão), shown in the grooming section.         |

Read them only through `lib/contact.ts` (`getWhatsApp`, `getGroomingWhatsApp`, `whatsAppLink`), which validates the format and fails with a clear error if a variable is missing.

## Notes

- `NEXT_PUBLIC_` variables are inlined into the JavaScript at build time and are visible to visitors. Only use the prefix for values that are meant to be public (like a business WhatsApp). Secrets never get the prefix.
- Because they are inlined at build time, changing a value requires a new build.
- CI builds copy `.env.example` to `.env`, so the pipeline never needs the real numbers. The hosting provider must have the real values configured.
- When adding a variable: add it to `.env.example` with a fictitious value, document it here, and read it through a typed helper.
