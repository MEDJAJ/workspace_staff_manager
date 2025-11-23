
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
        <button type="button" class="deleteExp bg-red-500 text-white px-3 py-1 rounded mt-2">Supprimer</button>
    `;

    document.getElementById("experiencesContainer").appendChild(div);

   
    div.querySelector(".deleteExp").addEventListener("click", () => {
        div.remove();
    });
}





ajauter.addEventListener("click", () =>{
    resetPopupForm();
    popup.classList.remove("hidden");
});

closepopup.addEventListener("click",() =>{
      resetPopupForm();
    popup.classList.add("hidden");
})



function updateImage(){
    let value_url=url.value;
    if(value_url!==""){
 image.src=value_url;
    }else{
        image.src="user.jpg";
    }
   
}



let  employes=JSON.parse(localStorage.getItem("employes")) || [];

if(employes.length!==0){
    employes.forEach(element => createCard(element));
}



let currentid = Number(localStorage.getItem("currentid")) || 0;



envoyer.addEventListener("click", () => {

    const url_value = url.value;
    const nom_value = nom.value;
    const role_value = role.value;
    const email_value = email.value;
    const telephone_value = telephone.value;

    const expBlocks = document.querySelectorAll(".experienceBlock");
    const experiences = [];

    expBlocks.forEach(block =>{
        experiences.push({
            poste: block.querySelector(".poste").value,
            entreprise: block.querySelector(".entreprise").value,
            debut: block.querySelector(".debut").value,
            fin: block.querySelector(".fin").value
        });
    });

   
    const isValidMain = validation(url_value, nom_value, email_value, telephone_value);
    if (!isValidMain) {
        alert("Veuillez vérifier vos informations de base : nom, email, téléphone ou URL.");
        return;
    }

  
    const expValidation = validateExperiences(experiences);
    if (!expValidation.valid){
        alert(expValidation.message);
        return;
    }


    const employe = {
        id: currentid,
        url: url_value,
        nom: nom_value,
        role: role_value,
        email: email_value,
        telephone: telephone_value,
        experiences: experiences,
        currentezone: null
    };

    employes.push(employe);
    currentid++;
    localStorage.setItem("currentid", currentid);

    saveLocaleStorage(employes);
    createCard(employe);

    resetPopupForm();

    popup.classList.add("hidden");
});




function resetPopupForm() {
    const inputs = [url, nom, role, email, telephone];

    inputs.forEach(input => {
        input.classList.remove("border-green-500", "border-red-500");
        input.value = "";
    });

   
    image.src = "user.jpg";

  
    document.getElementById("experiencesContainer").innerHTML = "";
    expIndex = 0;
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

if(regex_url.test(url_value) || url_value==""){
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





function validateExperiences(experiences) {

    for (let i = 0; i < experiences.length; i++) {
        const exp = experiences[i];

        if (!exp.poste || !exp.entreprise || !exp.debut || !exp.fin) {
            return { valid: false, message: `Remplissez tous les champs de la expérience ${i + 1}` };
        }

        const debutDate = new Date(exp.debut);
        const finDate = new Date(exp.fin);

        if (debutDate >= finDate) {
            return { valid: false, message: `La date de début doit être avant la date de fin pour la expérience ${i + 1}` };
        }

        for (let j = 0; j < i; j++) {
            const otherExp = experiences[j];
            const otherDebut = new Date(otherExp.debut);
            const otherFin = new Date(otherExp.fin);

            if ((debutDate <= otherFin && finDate >= otherDebut)) {
                return { valid: false, message: `Chevauchement entre la expérience ${i + 1} et la expérience ${j + 1}` };
            }
        }
    }

    return { valid: true };
}







closeModalEmploye.addEventListener("click",()=>{
    modalEmploye.classList.add("hidden");
})




function saveLocaleStorage(employes){
    localStorage.setItem("employes",JSON.stringify(employes))
}






function createCard(employe){

    const div=document.createElement("div");

    div.dataset.id=employe.id;

    div.classList.add("flex", "items-center", "gap-3", "bg-gray-100" ,"hover:bg-gray-200", "cursor-pointer" ,"p-3", "rounded-xl", "shadow-sm", "transition","shrink-0","transform", "hover:scale-105","hover:rounded-none");
       
   const img=document.createElement("img");
   
   img.src = employe.url || "user.jpg";
    
   img.classList.add("w-12", "h-12", "rounded-full", "border");
    
           div.appendChild(img);

    const card_info=document.createElement("div");

    card_info.classList.add("flex", "flex-col");

   const p1=document.createElement("p");

   p1.classList.add("md:text-sm","text-[12px]", "font-medium", "text-gray-800");

   p1.textContent=employe.nom

    card_info.appendChild(p1);

       const p2=document.createElement("p");   

       p2.classList.add("md:text-xs","text-[10px]", "text-gray-500");

       p2.textContent=employe.role;

    card_info.appendChild(p2);

        div.appendChild(card_info);

        section_employes.appendChild(div);  

        checkEmptyEmployees();

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
    allowedRoles: ["Manager","Receptionniste"], 
    capacity: 1, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 3, 
    zoneName: "Salle des serveurs", 
    allowedRoles: ["Technicien IT","Manager"], 
    capacity: 2, 
    assignedEmployees: [] 
  },
  { 
    zoneId: 4, 
    zoneName: "Salle de sécurité", 
    allowedRoles: ["Agent de sécurité","Manager"], 
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





function canAssign(employe, zoneId){
   
    const zone = zones.find(z => z.zoneId === zoneId);

    const allowed = zone.allowedRoles.map(r => r.trim().toLowerCase());

    const empRole = employe.role.trim().toLowerCase();

    const roleAllowed = allowed.includes(empRole);

    const notAlready = !zone.assignedEmployees.some(emp => emp.id === employe.id);

    return roleAllowed && notAlready;
}


    
  



btn_réception_ajauter.addEventListener("click", () =>{

   openPopupForZone(2,salle_réception,"Salle Réception");

});

btn_conférence_ajauter.addEventListener("click",()=>{

      openPopupForZone(1,salle_conférence,"Salle de conférence");

})

btn_serveure_ajauter.addEventListener("click",()=>{

      openPopupForZone(3,salle_serveurs,"Salle des serveurs");
      
})

btn_securite_ajauter.addEventListener("click",() =>{

    openPopupForZone(4,salle_sécurite,"Salle de sécurité");

})
btn_personnel_ajauter.addEventListener("click",()=>{

    openPopupForZone(5,salle_personnel,"Salle du personnel");

})

btn_archive_ajauter.addEventListener("click",()=>{

    openPopupForZone(6,salle_archive,"Salle d’archives")

})





function openPopupForZone(zoneId, containerElement,currentezone){

    popup_liste_selectionner.innerHTML = "";

    const zone = zones.find(z => z.zoneId === zoneId);


    if(zone.assignedEmployees.length>=zone.capacity){
        alert("Cette zone est pleine, il n’y a plus de capacité pour ajouter d’autres employés.");
        return;
    }

      
    for (let i = 0; i < employes.length; i++) {
             
        if (canAssign(employes[i], zoneId)){

            const div = document.createElement("div");

            div.classList.add("flex", "items-center", "gap-[3px]", "bg-gray-100",

                "rounded-lg", "h-[30px]", "px-2", "w-fit", "cursor-pointer");

            div.dataset.id = employes[i].id;

            div.innerHTML = `
                <img src="${employes[i].url || "user.jpg"}" class="w-4 h-4 rounded-full object-cover"/>
                <span class="font-medium text-[8px] text-gray-800">${employes[i].nom}</span>
                <p class="text-xs text-gray-500">${employes[i].role}</p>
            `;


            div.addEventListener("click", () => {

                employes[i].currentezone=currentezone;

                zone.assignedEmployees.push(employes[i]);
              
                 changerColor();

                let id = Number(div.dataset.id);

                const employe = employes.find(e => e.id === id);

                const div_salle = document.createElement("div");

                div_salle.classList.add("flex", "items-center", "gap-[3px]",

                    "bg-gray-100", "rounded-lg", "h-[30px]", "px-2", "w-fit","hover:cursor-pointer");

                div_salle.dataset.id = id;


                 div_salle.addEventListener("click",()=>{

        const experiences_afficher=document.getElementById("experiences_afficher");

        experiences_afficher.innerHTML="";

      let id=Number(div_salle.dataset.id);

      let employe_cliquer=zone.assignedEmployees.find(e=>e.id==id);

      empAvatar.src=employe_cliquer.url || "user.jpg";
      
      empNom.textContent=employe_cliquer.nom;

      empRole.textContent=employe_cliquer.role;

      empEmail.textContent=employe_cliquer.email;

      empPhone.textContent=employe_cliquer.telephone;
 
      
      if(employe_cliquer.experiences.length!==0){

        for(let i=0;i<employe_cliquer.experiences.length;i++){

            const div_exp=document.createElement("div")

            div_exp.innerHTML=`
             <h3 class="text-lg font-bold mb-2 text-orange-400 ">Expérience Professionnelle ${i+1}</h3>
        
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

      
            `;
           

            experiences_afficher.appendChild(div_exp);
            
        }

        
           
      }else{
          const noExp = document.createElement("p");

    noExp.textContent = "Aucune expérience";

    noExp.classList.add("text-center", "text-gray-500", "italic", "mt-4");

    experiences_afficher.appendChild(noExp);
      }

       document.getElementById("localisation").textContent= ` localisation actuelle : ${employe_cliquer.currentezone}`;

modalEmploye.classList.remove("hidden");
                    
                 });



                div_salle.innerHTML = `
                    <img src="${employe.url || "user.jpg"}" class="w-4 h-4 rounded-full object-cover"/>
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

    });

    popup_liste_selectionner.appendChild(supprimer);

    popup_liste_selectionner.classList.remove("hidden");
}






function removeemployer(id){

    employes=employes.filter(e=>e.id !==id);

    section_employes.innerHTML = "";

     employes.forEach(e=>createCard(e));

    saveLocaleStorage(employes);

    checkEmptyEmployees();

}

function addemployer(zoneId, id) {
    
    const zone = zones.find(z => z.zoneId === zoneId);

    if (!zone) return;

    const employe = zone.assignedEmployees.find(e => e.id === id);

    if (!employe) return;

    zone.assignedEmployees = zone.assignedEmployees.filter(e => e.id !== id);



    employes.push(employe);
   
 saveLocaleStorage(employes);


    section_employes.innerHTML = "";

    employes.forEach(e => createCard(e));

    checkEmptyEmployees();


   
}



function checkEmptyEmployees() {

    const noEmployeeImg = document.getElementById("noEmployeeImg");

    if (employes.length === 0) {

        noEmployeeImg.classList.remove("hidden");

    } else {

        noEmployeeImg.classList.add("hidden");
        
    }
}

checkEmptyEmployees();





