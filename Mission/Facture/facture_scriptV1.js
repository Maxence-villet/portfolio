function remplir(){
    const tabDesc = new Array("portable", "bureau", "ram 8go", "clef usb 16go", "souris", "ecran 17 pouces");
    var qte = Math.floor(10*Math.random()+1);
    var prix = Math.floor(100*Math.random()+1);

    var listePrix = document.getElementsByClassName("prix");
    var listeQte = document.getElementsByClassName("qte");
    var listeDesc = document.getElementsByClassName("desc");




    for (var i=0; i< listeDesc.length; i++){
        var idesc = Math.floor(tabDesc.length * Math.random());
        listeDesc[i].value = tabDesc[idesc];
    
        var qte = Math.floor(10*Math.random()+1);
        var prix = Math.floor(100*Math.random()+1);
        listeQte[i].value = qte;
        listePrix[i].value = prix;
    
    }

}


function ajouterLigne(){
    var newLi = document.getElementById("modeleLigne").cloneNode(true);
    var lastLi = document.getElementById("lastLigne");

    var pere =document.getElementById("table_inv").firstChild.nextSibling;
    pere.insertBefore(newLi, lastLi);

}



function calculate(){
    var total = 0;
    var sousTlt = 0;
    var ssTotal = document.getElementsByClassName("sousTotal");
    var listePrix = document.getElementsByClassName("prix");
    var listeQte = document.getElementsByClassName("qte");
    var listeTtl = document.getElementsByClassName("totalLigne");


    for (var i=0; i<listePrix.length; i++){
        listeTtl[i].value = parseInt(listeQte[i].value)* parseInt(listePrix[i].value);
        total = total + parseInt(listeTtl[i].value);
        sousTlt = parseInt(sousTlt) + total;
        
    }
    ssTotal.value = parseInt(sousTlt);
}


