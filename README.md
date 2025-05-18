
# cy-gemma-server

So this thing right here, it's an API server. It juggles Google Gemini API keys. You throw in a bunch of them and it'll figure out which ones still have a pulse.

Built on Next.js (app router) with zero intention of looking pretty. Connects to MongoDB, filters crap keys, stores the good ones, and hands them out one by one based on how much abuse they've taken.

---

## What It Does (Barely)

- `GET /api/ai/key?secret=...`  
  Gives you the least-abused key that still responds to "Hi".  
  Requires secret or it won’t talk to you.  
  Picks based on `hit` count, so yeah, round robin-ish.

- `POST /api/ai/key`  
  Feed it a single key (plus your secret)  
  It'll check if the key's alive  
  If it's not, you'll be ignored.  
  If it's a dupe, also ignored.

- `GET /api/ai/keys?secret=...`  
  Just dumps all keys in your DB sorted by usage.  
  Nothing fancy, no hiding.

- `POST /api/ai/keys`  
  Throw in an array of keys. It'll silently validate one by one.  
  Junk keys get silently trashed.  
  Duplicates are ignored.  
  Returns what it kept.

---

## How Keys Are Validated

There’s a `validate()` helper. It says "Hi" to Gemini with each key.

If Gemini replies? Cool.  
If it doesn’t? Into the bin.

No retries. No mercy.  
Also logs the first 10 characters of each key, because full keys are none of your business.

---

## Tech Used (because you’ll ask)

- Next.js 14  
- MongoDB (via Mongoose)  
- TypeScript, obviously  
- Axios to bother Google's endpoint  
- Tailwind is there but probably irrelevant here  
- Styled-components, because why not

---

## Setup (if you’re into that)

Create a `.env` file like this:

```

MONGODB\_URI=mongodb+srv://something
GEMINI\_API\_KEY=whatever-you-call-secret
GEMINI\_SECRET=post-secret-thing

```

Then run it:

```

npm install
npm run dev

```

Good luck.

---

## Notes You’ll Ignore

- If you abuse `GET /api/ai/key`, it’ll cycle keys with the lowest `hit`. No rate limit here, congrats.
- No logging middleware. If it breaks, check your terminal. That’s all you get.
- The secret checks are there just to keep randoms out. This ain't production-grade auth. You’ve been warned.
- No Swagger docs. Read the code. You’re a dev, not a customer.

---

## Final Thought

Yes, it works. No, it won’t scale unless you baby it.  
You wanna scale? Rate limit it yourself, fix the error handling, add Redis, cry a little, then try again.