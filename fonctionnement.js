
const popup=document.getElementById("popup");
const ajauter=document.getElementById("ajauter")
const closepopup=document.getElementById("closeBtn");
const envoyer=document.getElementById("envoyer");


const url=document.getElementById("url");
const image=document.getElementById("image");
const nom=document.getElementById("nom");
const role=document.getElementById("role");
const email=document.getElementById("email");
const telephone=document.getElementById("telephone");


const section_employes=document.getElementById("section_employes");

const popup_liste_selectionner=document.getElementById("popup_liste_selectionner");
const btn_réception_ajauter=document.getElementById("btn_réception_ajauter");

btn_réception_ajauter.addEventListener("click",()=>{
    popup_liste_selectionner.classList.remove("hidden")
})



ajauter.addEventListener("click", () =>{
    popup.classList.remove("hidden");
});

closepopup.addEventListener("click",() =>{
    popup.classList.add("hidden");
})

function updateImage(){
    let value_url=url.value;
    image.src=value_url;
}

const  employes=JSON.parse(localStorage.getItem("employes")) || [];
if(employes.length!==0){
    employes.forEach(element => createCard(element));
}

let currentid = Number(localStorage.getItem("currentid")) || 0;
envoyer.addEventListener("click",() =>{
    const employes=JSON.parse(localStorage.getItem("employes")) || [];
    const url_value=url.value;
    const nom_value=nom.value;
    const role_value=role.value;
    const email_value=email.value;
    const telephone_value=telephone.value;
    const employe={
        id:currentid,
        url:url_value,
        nom:nom_value,
        role:role_value,
        email:email_value,
        telephone:telephone_value
    }
    if(validation(url_value,nom_value,email_value,telephone_value)){
employes.push(employe);
        currentid++;
    localStorage.setItem("currentid", currentid);
   saveLocaleStorage(employes);
     createCard(employe);
   popup.classList.add("hidden");
    }
    
   
    
});


function saveLocaleStorage(employes){
    localStorage.setItem("employes",JSON.stringify(employes))
}


function createCard(employe){
   
    const div=document.createElement("div");
    div.dataset.id=employe.id;
    div.classList.add("flex", "items-center", "gap-3", "bg-gray-100" ,"hover:bg-gray-200", "cursor-pointer" ,"p-3", "rounded-xl", "shadow-sm", "transition");
   const img=document.createElement("img");
   
   img.src=employe.url;
    
   img.classList.add("w-12", "h-12", "rounded-full", "border");
    
           div.appendChild(img);
    const card_info=document.createElement("div");
    card_info.classList.add("flex", "flex-col");
   const p1=document.createElement("p");
   p1.classList.add("text-sm", "font-medium", "text-gray-800");
   p1.textContent=employe.nom
    card_info.appendChild(p1);
       const p2=document.createElement("p");         
       p2.classList.add("text-xs", "text-gray-500");
       p2.textContent=employe.role;
    card_info.appendChild(p2);
        div.appendChild(card_info);
        section_employes.appendChild(div);  
        
     
}

function validation(url_value,nom_value,email_value,telephone_value){
const regex_name=/^[a-zA-ZÀ-ÿ\s]+$/;
const regex_url=/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
const regex_telephone=/^(05|06|07)\d{8}$/;
const regex_email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(regex_name.test(nom_value)){
    nom.classList.add("border-green-500");
}else{
    nom.classList.add("border-red-500");
    return false;
}

if(regex_url.test(url_value)){
    url.classList.add("border-green-500");
}else{
    url.classList.add("border-red-500");
    return false;
}

if(regex_email.test(email_value)){
    email.classList.add("border-green-500");
}else{
    email.classList.add("border-red-500");
    return false;
}

if(regex_telephone.test(telephone_value)){
    telephone.classList.add("border-green-500");
}else{
    telephone.classList.add("border-red-500");
    return false;
}

return true;

}




const zones = [
  { 
    zoneId: 1, 
    zoneName: "Salle de conférence", 
    allowedRoles: ["Manager", "Autres", "Receptionniste", "Technicien IT", "Agent de sécurité", "Nettoyage"], 
    capacity: 10, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 2, 
    zoneName: "Salle Réception", 
    allowedRoles: ["Receptionniste"], 
    capacity: 2, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 3, 
    zoneName: "Salle des serveurs", 
    allowedRoles: ["Technicien IT"], 
    capacity: 3, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 4, 
    zoneName: "Salle de sécurité", 
    allowedRoles: ["Agent de sécurité"], 
    capacity: 2, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 5, 
    zoneName: "Salle du personnel", 
    allowedRoles: ["Manager", "Autres", "Receptionniste", "Technicien IT", "Agent de sécurité", "Nettoyage"], 
    capacity: 10, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 6, 
    zoneName: "Salle d’archives", 
    allowedRoles: ["Manager", "Autres", "Receptionniste", "Technicien IT", "Agent de sécurité"], 
    capacity: 2, 
    assignedEmployees: [] 
  }
];



