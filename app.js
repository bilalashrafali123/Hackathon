import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {auth ,db} from './config.js'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"






    onAuthStateChanged(auth, (user) => {
        if (user) {
       
          const uid = user.uid;
          console.log(uid);
          
          // ...
        } else {
         window.location = 'login.html'
        }
      });

let signOutBtn =document.querySelector('#logout')

      signOutBtn.addEventListener('click' , ()=>{
        signOut(auth).then(() => {
          console.log("signOut successfully");
        //   window.localStorage = 'login.html'
          
        }).catch((error) => {
          console.log('signOut error ==>' + error );
          
        });
      })


let blogForm  = document.querySelector("#form")
let blogTitle = document.querySelector("#title-input")
let blogDes = document.querySelector("#description-input")
let displayBlog = document.querySelector("#new")

let blogArr = []





async function getData() {
    blogArr = []
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      blogArr.push({ ...doc.data(), id: doc.id })
    });
    // console.log(arr);
    renderBlog()
  
  }
  getData()



function renderBlog(){
  displayBlog.innerHTML = ''
blogArr.map((blog)=>{
    displayBlog.innerHTML  += `<div id="blog-post-display"> title <h2 id="blog-title">${blog.title}</h2>
            <p id="blog-description">${blog.description}</p>
 
            <div>
            <button class="btn btn-outline btn-error delete">Delete</button>
            <button class="btn btn-outline btn-warning edit">Edit</button>

              </div>

            </div>
            `
})


// delete blog 

let deleteBtn = document.querySelectorAll(".delete")
deleteBtn.forEach((btn, index) => {

  btn.addEventListener("click", async () => {
    await deleteDoc(doc(db, "blogs", blogArr[index].id));


    blogArr.splice(index, 1)
    renderBlog()
  })
})






// edit blog
let editBth = document.querySelectorAll('.edit')

editBth.forEach((eBtn, index) => {
  eBtn.addEventListener("click", async () => {

    const updateTitle = prompt('Update title')
    const updatedDescription= prompt('update description')

    const todoUpdate = doc(db, "blogs", blogArr[index].id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(todoUpdate, {
      title: updateTitle,
      description: updatedDescription
    });
    blogArr[index].title = updateTitle
    blogArr[index].description = updatedDescription
    renderBlog()

  })
})



}



blogForm.addEventListener('submit' ,async (event)=>{
    event.preventDefault()
    
// blogArr.push({ })

try{
    const docRef = await addDoc(collection(db, "blogs"), {
        title :blogTitle.value , description : blogDes.value
      });
      console.log("Document written with ID: ", docRef.id);

      renderBlog()
}
catch(e){
    console.log(e);
    
}


})



