// Krupamarg Priest · Firebase bridge. Exposes window.PCloud, then fires 'pcloud'.
const V = '10.14.1';
const cfg = window.KM_FIREBASE;
if (cfg) {
  try {
    const [{ initializeApp }, A, F] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
    ]);
    // Named app: keeps the priest's sign-in separate from a devotee's anonymous session in the same browser.
    const app = initializeApp(cfg, 'priest');
    const auth = A.getAuth(app);
    const db = F.getFirestore(app);
    const ms = v => (v && v.toMillis ? v.toMillis() : v || 0);

    window.PCloud = {
      onUser: cb => A.onAuthStateChanged(auth, u => cb(u && !u.isAnonymous ? u : null)),
      signIn: (email, pass) => A.signInWithEmailAndPassword(auth, email, pass),
      signUp: async (name, email, pass, temple) => {
        const { user } = await A.createUserWithEmailAndPassword(auth, email, pass);
        await A.updateProfile(user, { displayName: name });
        await F.setDoc(F.doc(db, 'priests', user.uid), { name, email, requested: temple, approved: false, temples: [], createdAt: F.serverTimestamp() });
        return user;
      },
      signOut: () => A.signOut(auth),
      getPriest: async () => {
        const u = auth.currentUser; if (!u) return null;
        const s = await F.getDoc(F.doc(db, 'priests', u.uid)).catch(() => null);
        return s && s.exists() ? s.data() : { name: u.displayName || u.email, approved: false, temples: [] };
      },
      watchDevotees: (t, cb) => F.onSnapshot(F.collection(db, 'temples', t, 'devotees'),
        snap => cb(snap.docs.map(d => ({ uid: d.id, temple: t, ...d.data(), updatedAt: ms(d.data().updatedAt) }))),
        err => { console.warn(err); cb([]); }),
      watchNotes: (t, cb) => F.onSnapshot(F.collection(db, 'temples', t, 'notes'),
        snap => { const m = {}; snap.forEach(d => m[d.id] = d.data()); cb(m); },
        err => { console.warn(err); cb({}); }),
      saveNote: (t, uid, data) => F.setDoc(F.doc(db, 'temples', t, 'notes', uid), { ...data, updatedAt: F.serverTimestamp() }, { merge: true }),
      addProof: (t, uid, proof) => F.addDoc(F.collection(db, 'temples', t, 'devotees', uid, 'proofs'), { ...proof, by: auth.currentUser.uid, at: F.serverTimestamp() }),
      listProofs: async (t, uid) => {
        const s = await F.getDocs(F.query(F.collection(db, 'temples', t, 'devotees', uid, 'proofs'), F.orderBy('at', 'desc'), F.limit(30)));
        return s.docs.map(d => ({ id: d.id, ...d.data(), at: ms(d.data().at) }));
      }
    };
  } catch (e) {
    console.warn('Krupamarg priest cloud unavailable:', e);
  }
}
window.dispatchEvent(new Event('pcloud'));
