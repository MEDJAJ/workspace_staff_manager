
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

const modalEmploye=document.getElementById("modalEmploye");
const closeModalEmploye=document.getElementById("closeModalEmploye");

const section_employes=document.getElementById("section_employes");

const popup_liste_selectionner=document.getElementById("popup_liste_selectionner");
const btn_réception_ajauter=document.getElementById("btn_réception_ajauter");
const salle_réception=document.getElementById("salle_réception");
const remove_eréception=document.getElementById("remove_eréception");

const salle_conférence=document.getElementById("salle_conférence");
const  remove_econférence=document.getElementById("remove_econférence");
const btn_conférence_ajauter=document.getElementById("btn_conférence_ajauter");

const salle_serveurs=document.getElementById("salle_serveurs");
const remove_eserveur=document.getElementById("remove_eserveur");
const btn_serveure_ajauter=document.getElementById("btn_serveure_ajauter");

const salle_sécurite=document.getElementById("salle_sécurite");
const remove_esécurite=document.getElementById("remove_esécurite");
const btn_securite_ajauter=document.getElementById("btn_securite_ajauter");

const salle_personnel=document.getElementById("salle_personnel");
const remove_epersonnele=document.getElementById("remove_epersonnele");
const btn_personnel_ajauter=document.getElementById("btn_personnel_ajauter");

const salle_archive=document.getElementById("salle_archive");
const remove_earchive=document.getElementById("remove_earchive");
const btn_archive_ajauter=document.getElementById("btn_archive_ajauter");


//detaills informations

const empAvatar=document.getElementById("empAvatar");
const empNom=document.getElementById("empNom");
const empRole=document.getElementById("empRole");
const empEmail=document.getElementById("empEmail");
const empPhone=document.getElementById("empPhone");









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

let  employes=JSON.parse(localStorage.getItem("employes")) || [];
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

closeModalEmploye.addEventListener("click",()=>{
    modalEmploye.classList.add("hidden");
})


function saveLocaleStorage(employes){
    localStorage.setItem("employes",JSON.stringify(employes))
}


function createCard(employe){

    const div=document.createElement("div");
    div.dataset.id=employe.id;
    div.classList.add("flex", "items-center", "gap-3", "bg-gray-100" ,"hover:bg-gray-200", "cursor-pointer" ,"p-3", "rounded-xl", "shadow-sm", "transition");
    div.addEventListener("click",()=>{
      let id=Number(div.dataset.id);
      let employe_cliquer=employes.find(e=>e.id==id);
      empAvatar.src=employe_cliquer.url;
      empNom.textContent=employe_cliquer.nom;
      empRole.textContent=employe_cliquer.role;
      empEmail.textContent=employe_cliquer.email;
      empPhone.textContent=employe_cliquer.telephone;
      
modalEmploye.classList.remove("hidden");

    })
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
    capacity: 3, 
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


function canAssign(employe, zoneId) {
   
    const zone = zones.find(z => z.zoneId === zoneId);
    
    if (zone){
  const role = zone.allowedRoles.includes(employe.role);

   
    const notAlreadyAssigned = !zone.assignedEmployees.some(emp => emp.id === employe.id);

   
    const capacity = zone.assignedEmployees.length < zone.capacity;

   
    return role && notAlreadyAssigned && capacity;
    }else{
        return false;
    }

    
  
}


btn_réception_ajauter.addEventListener("click", () => {

    popup_liste_selectionner.innerHTML = "";

   
    const zone = zones.find(z => z.zoneId === 2);

    for (let i = 0; i < employes.length; i++){

        if (canAssign(employes[i], 2)){

            zone.assignedEmployees.push(employes[i]);  


            const div = document.createElement("div");
            div.classList.add("flex", "items-center", "gap-[3px]", "bg-gray-100",
                "rounded-lg", "h-[30px]", "px-2", "w-fit", "cursor-pointer");

            div.dataset.id = employes[i].id;

            div.innerHTML = `
                <img src="${employes[i].url}" class="w-4 h-4 rounded-full object-cover"/>
                <span class="font-medium text-[8px] text-gray-800">${employes[i].nom}</span>
                <p class="text-xs text-gray-500">${employes[i].role}</p>
            `;

            div.addEventListener("click", () => {

                let id = Number(div.dataset.id);
                const employe = employes.find(e => e.id === id);

                const div_salle = document.createElement("div");
                div_salle.classList.add("flex", "items-center", "gap-[3px]",
                    "bg-gray-100", "rounded-lg", "h-[30px]", "px-2", "w-fit");

                div_salle.dataset.id = id;

                div_salle.innerHTML = `
                    <img src="${employe.url}" class="w-4 h-4 rounded-full object-cover"/>
                    <span class="font-medium text-[8px] text-gray-800">${employe.nom}</span>
                    <button class="ml-auto bg-red-600 text-white rounded-full text-[10px] h-4 w-4 remove-btn">
                        ✕
                    </button>
                `;

                salle_réception.appendChild(div_salle);

                removeemployer(id);

                popup_liste_selectionner.classList.add("hidden");
                div_salle.querySelector(".remove-btn").addEventListener("click", () => {
                    div_salle.remove();
                    addemployer(2, id);
                });

            });

            popup_liste_selectionner.appendChild(div);
        }
    }

    if (zone.assignedEmployees.length == 0) {
        alert("Aucun employé disponible pour ce rôle !");
        popup_liste_selectionner.classList.add("hidden");
        return;
    }

    popup_liste_selectionner.classList.remove("hidden");
});





function removeemployer(id){
    employes=employes.filter(e=>e.id !==id);
    section_employes.innerHTML = "";
     employes.forEach(e=>createCard(e));
    saveLocaleStorage(employes);
}

function addemployer(zoneId, id) {

    const zone = zones.find(z => z.zoneId === zoneId);
    if (!zone) return;

    const employe = zone.assignedEmployees.find(e => e.id === id);
    if (!employe) return;

    zone.assignedEmployees = zone.assignedEmployees.filter(e => e.id !== id);

    employes.push(employe);

    section_employes.innerHTML = "";
    employes.forEach(e => createCard(e));

    saveLocaleStorage(employes);
}

