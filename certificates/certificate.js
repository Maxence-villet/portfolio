const devImages = ["Sololearn_cpp.jpg",
                  "Sololearn_csharp.png",
                  "Sololearn_js_inter.png",
                  "Sololearn_js.png",
                  "Sololearn_python.png",
                  "Sololearn_python.png",
                  "Sololearn_sql_inter.png",
                  "Sololearn_sql.jpg",
                  "Udemy_CMS_Blog_PHP.jpg"];

const scriptImages = ["Udemy_docker.jpg"];

const cyberImages = ["Avant_de_cliquer.png",
                    "cisco.png",
                    "anssi.png",
                    "cnil_mod1.png",
                    "cnil_mod2.png",
                    "cnil_mod3.png",
                    "cnil_mod4.png",
                    "cnil_mod5.png"];

const otherImages = ["Culture in Action.png",
                    "The Big Challenge.png",
                    "Udemy_google_docs.jpg"];


const select = document.querySelector("#type");


let filteredImages = devImages.concat(scriptImages).concat(cyberImages).concat(otherImages);




const ImageGallery = (certif) => {


  for (const image of certif) {


      const div = document.createElement("div");
      div.className = "col-xxl-3 col-lg-4 col-md-6 col-sm-12";

      const a = document.createElement("a");
      a.href = `img/${image}`;
      a.target = "_blank";

      const img = document.createElement("img");
      img.src = `img/${image}`;
      img.alt = "";

      a.appendChild(img);
      div.appendChild(a);

      document.querySelector(".row").appendChild(div);
    }
  };


select.addEventListener("change", (event) => {


const divs = document.querySelectorAll(".col-xxl-3");

for (const div of divs) {
    div.remove();
}


if(select.value === "devImages"){

    filteredImages = devImages;
    

}
else if(select.value === "scriptImages"){

    filteredImages = scriptImages;

}
else if(select.value === "cyberImages"){

    filteredImages = cyberImages;

}
else if(select.value === "otherImages"){

    filteredImages = otherImages;

}
else if(select.value ===  "all"){


    filteredImages = devImages.concat(scriptImages).concat(cyberImages).concat(otherImages);

}




ImageGallery(filteredImages);
})

ImageGallery(filteredImages);
// Create a new array to store the filtered images



