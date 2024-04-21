const obj = {
    "nav" : {
        
        "Me" : {
            "content" : "Me",
            "path" : "Me/",
            "sub_path" : "../Me/"
        },
    
        "Project" : {
            "content" : "Project",
            "path" : "Project/", 
            "sub_path" : "../Project/"
        },
    
        "Technology_watch" : {
            "content" : "Technology watch",
            "path" : "TechnologyWatch",
            "sub_path" : "../TechnologyWatch/"
        },
    
        "Certificate" : {
            "content" : "Certificate",
            "path" : "certificates/",
            "sub_path" : "../certificates/" 
        }  
    },

    "Home" : {
        "content" : "Home",
        "path" : "#",
        "sub_path" : "../"
    }
};


let HeaderHTML = `
<div class="container-fluid">
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">`
      
    if (document.getElementById("Nav")) 
    {
        HeaderHTML += `<a class="nav-link active" aria-current="page" href="${obj.Home.path}">Home</a>`;
    }
    if (document.getElementById("SubNav"))
    {
        HeaderHTML += `<a class="nav-link active" aria-current="page" href="${obj.Home.sub_path}">Home</a>`;
    } 
      
      
    for(const element in obj.nav) 
    {
        if (obj.nav[element] === obj.nav.Technology_watch) {
            HeaderHTML += `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Technology watch
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="https://www.youtube.com/watch?v=YuHoujk8SUc&list=PLbuiz-jlC_VSZ5Lvek5fQzK1lMr2FeyKu&index=3" target="_blank">Youtube</a></li>
                <li><a class="dropdown-item" href="https://github.com/Maxence-villet/portfolio/blob/main/TechnologyWatch/content/Discord.png?raw=true" target="_blank">Discord</a></li>
                <li><a class="dropdown-item" href="https://github.com/Maxence-villet/portfolio/blob/main/TechnologyWatch/content/Newsletter.png?raw=true" target="_blank">Newsletter</a></li>
                <li><a class="dropdown-item" href="https://github.com/Maxence-villet/portfolio/blob/main/TechnologyWatch/content/Udemy.png?raw=true" target="_blank">Udemy</a></li>
                <li><a class="dropdown-item" href="https://www.youtube.com/@a-bunch-o-rust" target="_blank">Stream/live</a></li>
            </ul>
            </li>`; 
        }
        
        if (obj.nav[element] !== obj.nav.Technology_watch) {
            console.log(element);
            if (document.getElementById("Nav")) 
            {
                HeaderHTML += `<a class="nav-link" href="${obj.nav[element].path}">${obj.nav[element].content}</a>`;
            }
            if (document.getElementById("SubNav"))
            {
                HeaderHTML += `<a class="nav-link" href="${obj.nav[element].sub_path}">${obj.nav[element].content}</a>`;
        }
        }

    };
   
   
HeaderHTML    +=  `
                    </div>
                    </div>
                    </div>`;

if (document.getElementById("Nav")) {
    document.getElementById("Nav").innerHTML = HeaderHTML;
} 
if (document.getElementById("SubNav")) {
    document.getElementById("SubNav").innerHTML = HeaderHTML;
}      




