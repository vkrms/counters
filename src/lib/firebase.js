// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDocs, setDoc, getDoc, collection, orderBy } from 'firebase/firestore'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBdFjpaXfrZDsCnh7BK-4CP-bkyx_h4mxo',
  authDomain: 'counters-e1c18.firebaseapp.com',
  projectId: 'counters-e1c18',
  storageBucket: 'counters-e1c18.appspot.com',
  messagingSenderId: '469700667498',
  appId: '1:469700667498:web:1bf1276da78a74c9108213'
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);

export default fireApp

const db = getFirestore(fireApp);

// get all counters
export async function getCounters() {
  const querySnapshot = await getDocs(counters, orderBy('createdAt'));
  const arr = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    
    if (!data.Hidden) {
      arr.push({
        slug: data.Slug,
        title: data.Title,
        id: doc.id,
      })
    }
  });
  console.log(arr)
  return arr
}

export async function getCounter(slug) {
  console.log('getting a counter', {slug,db})
  const docRef = doc(counters, slug)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('error no such doc')
  }
}

const counters = collection(db, 'counters')

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
} // Outputs: hello-world

// function getRandStr(length = 8) {
//   // 36 means we use a caounting system with 9 digits + english alphabet, total 36 "digits", then we unshift whole number, leaving only the float part which is a random string of letters and digits
//   return Math.random().toString(36).substring(2, 2 + length)
// }

export async function writeDoc(Title = 'gtfo404') {
  const Slug = slugify(Title)
  return await setDoc(doc(counters, Slug), {
    Title,
    Slug,
    Current: 0,
    Max: 10,
  })
}

export async function write(obj) {
  // console.log('payload:', obj)
  return await setDoc(doc(counters, obj.Slug), obj)
}