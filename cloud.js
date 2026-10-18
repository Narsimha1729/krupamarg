// Krupamarg devotee cloud sync (Firebase). Loaded as a module; exposes window.KMCloud.
// Does nothing unless firebase-config.js provides window.KM_FIREBASE.
const V = '10.14.1';
const cfg = window.KM_FIREBASE;
const api = { configured: !!cfg, ready: false, uid: null, error: null };
window.KMCloud = api;

if (cfg) {
  try {
    const [{ initializeApp }, A, F] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
    ]);
    const app = initializeApp(cfg);
    const auth = A.getAuth(app);
    const db = F.getFirestore(app);

    const ensureUser = async () => {
      if (auth.currentUser) return auth.currentUser;
      await auth.authStateReady();
      if (auth.currentUser) return auth.currentUser;
      return (await A.signInAnonymously(auth)).user;
    };

    /** Write the devotee's sankalp to every chosen temple; remove it from temples no longer chosen. */
    api.sync = async (temples, payload, previous = []) => {
      const u = await ensureUser();
      api.uid = u.uid;
      const data = { ...payload, consent: true, updatedAt: F.serverTimestamp() };
      await Promise.all(temples.map(t => F.setDoc(F.doc(db, 'temples', t, 'devotees', u.uid), data)));
      const gone = previous.filter(t => !temples.includes(t));
      await Promise.all(gone.map(t => F.deleteDoc(F.doc(db, 'temples', t, 'devotees', u.uid)).catch(() => {})));
      return u.uid;
    };

    /** Stop sharing: delete the devotee's documents and proofs at each temple. */
    api.unshare = async (temples) => {
      const u = await ensureUser();
      for (const t of temples) {
        const proofs = await F.getDocs(F.collection(db, 'temples', t, 'devotees', u.uid, 'proofs')).catch(() => null);
        if (proofs) await Promise.all(proofs.docs.map(d => F.deleteDoc(d.ref).catch(() => {})));
        await F.deleteDoc(F.doc(db, 'temples', t, 'devotees', u.uid)).catch(() => {});
      }
    };

    /** Proofs sent by priests (sankalp readings, photos, blessings), newest first. */
    api.proofs = async (temples) => {
      const u = await ensureUser();
      const all = [];
      for (const t of temples) {
        const snap = await F.getDocs(F.query(F.collection(db, 'temples', t, 'devotees', u.uid, 'proofs'), F.orderBy('at', 'desc'), F.limit(50))).catch(() => null);
        if (snap) snap.forEach(d => all.push({ id: d.id, temple: t, ...d.data(), at: d.data().at?.toMillis?.() || 0 }));
      }
      return all.sort((a, b) => b.at - a.at);
    };

    api.ready = true;
  } catch (e) {
    api.error = String(e && e.message || e);
    console.warn('Krupamarg cloud unavailable:', api.error);
  }
}
window.dispatchEvent(new Event('kmcloud'));
