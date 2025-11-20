
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




let expIndex = 0;

function addExperience() {
    expIndex++;

    const div = document.createElement("div");
    div.className = "border p-3 rounded-lg bg-gray-100 experienceBlock";
    div.innerHTML = `
        <h3 class="font-semibold">Expérience ${expIndex}</h3>
        <input type="text" placeholder="Poste" class="poste w-full border p-2 rounded-lg mb-2">
        <input type="text" placeholder="Entreprise" class="entreprise w-full border p-2 rounded-lg mb-2">
        <input type="date" placeholder="Début" class="debut w-full border p-2 rounded-lg mb-2">
        <input type="date" placeholder="Fin" class="fin w-full border p-2 rounded-lg mb-2">
        <textarea placeholder="Description" class="description w-full border p-2 rounded-lg"></textarea>
        <button type="button" class="deleteExp bg-red-500 text-white px-3 py-1 rounded mt-2">Supprimer</button>
    `;

    document.getElementById("experiencesContainer").appendChild(div);

   
    div.querySelector(".deleteExp").addEventListener("click", () => {
        div.remove();
    });
}





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
envoyer.addEventListener("click", () => {
     employes = JSON.parse(localStorage.getItem("employes")) || [];

    const url_value = url.value;
    const nom_value = nom.value;
    const role_value = role.value;
    const email_value = email.value;
    const telephone_value = telephone.value;

   
    const expBlocks = document.querySelectorAll(".experienceBlock");
    const experiences = [];

    expBlocks.forEach(block => {
        experiences.push({
            poste: block.querySelector(".poste").value,
            entreprise: block.querySelector(".entreprise").value,
            debut: block.querySelector(".debut").value,
            fin: block.querySelector(".fin").value,
            description: block.querySelector(".description").value
        });
    });

    const employe = {
        id: currentid,
        url: url_value,
        nom: nom_value,
        role: role_value,
        email: email_value,
        telephone: telephone_value,
        experiences: experiences
    };

    if (validation(url_value, nom_value, email_value, telephone_value)) {
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
        const experiences_afficher=document.getElementById("experiences_afficher");
        experiences_afficher.innerHTML="";
      let id=Number(div.dataset.id);
      let employe_cliquer=employes.find(e=>e.id==id);
      empAvatar.src=employe_cliquer.url;
      empNom.textContent=employe_cliquer.nom;
      empRole.textContent=employe_cliquer.role;
      empEmail.textContent=employe_cliquer.email;
      empPhone.textContent=employe_cliquer.telephone;
 

      if(employe_cliquer.experiences.length!==0){
        for(let i=0;i<employe_cliquer.experiences.length;i++){
            const div_exp=document.createElement("div")
            div_exp.innerHTML=`
             <h3 class="text-lg font-bold mb-2 text-orange-400">Expérience Professionnelle ${i+1}</h3>
        
    

        <div class="mb-2">
          <p class="font-semibold text-gray-700">Poste:</p>
          <p id="expPoste" class="text-gray-600">${employe_cliquer.experiences[i].poste}</p>
        </div>

        <div class="mb-2">
          <p class="font-semibold text-gray-700">Entreprise:</p>
          <p id="expEntreprise" class="text-gray-600">${employe_cliquer.experiences[i].entreprise}</p>
        </div>

        <div class="mb-2 flex gap-4">
          <div>
            <p class="font-semibold text-gray-700">Début:</p>
            <p id="expDebut" class="text-gray-600">${employe_cliquer.experiences[i].debut}</p>
          </div>
          <div>
            <p class="font-semibold text-gray-700">Fin:</p>
            <p id="expFin" class="text-gray-600">${employe_cliquer.experiences[i].fin}</p>
          </div>
        </div>

        <div class="mb-2">
          <p class="font-semibold text-gray-700">Description:</p>
          <p id="expDescription" class="text-gray-600">${employe_cliquer.experiences[i].description}</p>
        </div>
            `;

            experiences_afficher.appendChild(div_exp);
            
        }
           
      }

      
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


function changerColor(){
    const réception_complet=document.getElementById("réception_complet");
    const serveurs_complet=document.getElementById("serveurs_complet");
    const sécurité_complet=document.getElementById("sécurité_complet");
    const archive_complet=document.getElementById("archive_complet");
    if(zones[1].assignedEmployees.length==0){
        réception_complet.classList.add("bg-red-600");
    }else{
         réception_complet.classList.remove("bg-red-600");
    }
    if(zones[2].assignedEmployees.length==0){
        serveurs_complet.classList.add("bg-red-600");
    }else{
         serveurs_complet.classList.remove("bg-red-600");
    }
      if(zones[3].assignedEmployees.length==0){
       sécurité_complet.classList.add("bg-red-600");
    }else{
         sécurité_complet.classList.remove("bg-red-600");
    }
      if(zones[5].assignedEmployees.length==0){
        archive_complet.classList.add("bg-red-600");
    }else{
        archive_complet.classList.remove("bg-red-600");
    }
}
changerColor();

function canAssign(employe, zoneId) {
   
    const zone = zones.find(z => z.zoneId === zoneId);
    
    if (zone){
  const role = zone.allowedRoles.includes(employe.role);

   
    const notAlreadyAssigned = !zone.assignedEmployees.some(emp => emp.id === employe.id);
           
   
    // const capacity = zone.assignedEmployees.length < zone.capacity;

   
    return role && notAlreadyAssigned;
    }else{
         
        return false;
       
    }

    
  
}


btn_réception_ajauter.addEventListener("click", () => {

   openPopupForZone(2,salle_réception);
 

});

btn_conférence_ajauter.addEventListener("click",()=>{
      openPopupForZone(1,salle_conférence);
      

})

btn_serveure_ajauter.addEventListener("click",()=>{
      openPopupForZone(3,salle_serveurs);
      

})

btn_securite_ajauter.addEventListener("click",() =>{
    openPopupForZone(4,salle_sécurite);
  

})
btn_personnel_ajauter.addEventListener("click",()=>{
    openPopupForZone(5,salle_personnel);
})

btn_archive_ajauter.addEventListener("click",()=>{
    openPopupForZone(6,salle_archive)
   

})



function openPopupForZone(zoneId, containerElement) {

    popup_liste_selectionner.innerHTML = "";
    const zone = zones.find(z => z.zoneId === zoneId);

    for (let i = 0; i < employes.length; i++) {

        if (canAssign(employes[i], zoneId)) {

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
           
                zone.assignedEmployees.push(employes[i]);
                 changerColor();

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

                containerElement.appendChild(div_salle);

                removeemployer(id);

                popup_liste_selectionner.classList.add("hidden");

                div_salle.querySelector(".remove-btn").addEventListener("click", () => {
                    div_salle.remove();
                    addemployer(zoneId, id);
                     changerColor();
                });
                 
            });

            popup_liste_selectionner.appendChild(div);
        }
    }
    const supprimer=document.createElement("button");
  supprimer.textContent = "Annuler";

supprimer.classList.add( "bg-red-600",  "hover:bg-red-700",  "text-white","px-3","py-1", "rounded-lg", "text-sm","font-medium","transition", "duration-200","shadow"
);
    supprimer.addEventListener("click",()=>{
        popup_liste_selectionner.classList.add("hidden");
    })
    popup_liste_selectionner.appendChild(supprimer);

    popup_liste_selectionner.classList.remove("hidden");
}






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
 console.log(employes)
    employes.push(employe);
   
 saveLocaleStorage(employes);
console.log(employes)
    section_employes.innerHTML = "";
    employes.forEach(e => createCard(e));

   
}

