const obj = {
    "nav" : {
        
        "Youtube" : {
            "content" : "Youtube",
            "path" : "content/Youtube/",
        },
    
        "Discord" : {
            "content" : "Discord",
            "path" : "content/Discord/", 
        },
    
        "Newsletter" : {
            "content" : "Newsletter",
            "path" : "content/Newsletter",
        },
    
        "Udemy" : {
            "content" : "Udemy",
            "path" : "content/Udemy/",
        }  
    },

};

let nav = ["Youtube", "Discord", "Newsletter", "Udemy"];

let headerHTML = `<nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Veille Technologique - Maxence VILLET SCHOUMAKER</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">`;

        for (let i= 0; i < nav.length; i++) {
            headerHTML += `<li class="nav-item">
                <a class="nav-link active" aria-current="page" href="content/${nav[i]}/img.png">${nav[i]}</a>
            </li>`;
        }


headerHTML += `</ul>
      </div>
    </div>
  </div>
</nav>`;

document.getElementById("nav").innerHTML = headerHTML;