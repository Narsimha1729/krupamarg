# Connecting Krupamarg to Firebase (one-time, about 5 minutes)

Until this is done, the devotee app keeps everything on the device and the priest app runs in sample mode.
Everything below stays on Firebase's free (Spark) plan.

## 1. Create the project
1. Open <https://console.firebase.google.com> and sign in with the Google account that should own Krupamarg.
2. **Add project** → name it `krupamarg` → Google Analytics can be off → **Create**.

## 2. Add the web app and copy its config
1. On the project home, click the **Web** icon (`</>`), nickname `krupamarg-web`, **Register app** (no hosting needed).
2. Copy the `firebaseConfig = { ... }` object it shows.
3. Paste it into [`firebase-config.js`](firebase-config.js) as `window.KM_FIREBASE = { ... };` and push (or send it to Claude to push).

## 3. Turn on sign-in
**Build → Authentication → Get started → Sign-in method**, enable:
- **Anonymous** (devotees, no account needed)
- **Email/Password** (priests)

Then **Settings → Authorized domains → Add domain**: `narsimha1729.github.io`.

## 4. Create the database
1. **Build → Firestore Database → Create database** → location **asia-south1 (Mumbai)** → start in **production mode**.
2. Open the **Rules** tab, replace everything with the contents of [`firestore.rules`](firestore.rules), and **Publish**.

## 5. Approve a priest
1. The priest opens `https://narsimha1729.github.io/krupamarg/priest/`, chooses **Request access**, and signs up with name, email, password and temple.
2. In **Firestore → Data → priests → (their ID)**, edit the document:
   - `approved` → `true`
   - `temples` → an array with the temple IDs they serve, e.g. `grish`

   Temple IDs: `grish` Grishneshwar · `trimb` Trimbakeshwar · `siddhi` Siddhivinayak · `somnath` Somnath · `ambaji` Ambaji · `tulja` Tuljabhavani
3. The priest taps **Check again** and is in.

## How data flows
- A devotee chooses **Temples → Share with temple priests**, ticks consent (and optionally allows WhatsApp). Their sankalp is written to `temples/{temple}/devotees/{their id}` and stays in sync.
- Only approved priests of that temple can read it (enforced by `firestore.rules`, not just the app).
- Priests' readings, photos and blessings go to `.../proofs`, which the devotee sees under **Proofs**.
- Priest notes live in `temples/{temple}/notes`, never visible to devotees.
- **Stop sharing** or **Delete my data** in the devotee app removes their documents and proofs.

## Before a public launch
- Have the temple trust agree in writing before listing them, and have a native speaker review Hindi and Marathi text.
- Publish a privacy policy (India's DPDP Act, 2023): what is collected, why, who sees it, and how to delete it.
