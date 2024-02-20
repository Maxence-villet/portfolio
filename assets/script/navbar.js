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
            "path" : "#",
            "sub_path" : "../#/"
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

        console.log(element);
        if (document.getElementById("Nav")) 
        {
            HeaderHTML += `<a class="nav-link" href="${obj.nav[element].path}">${obj.nav[element].content}</a>`
        }
        if (document.getElementById("SubNav"))
        {
            HeaderHTML += `<a class="nav-link" href="${obj.nav[element].sub_path}">${obj.nav[element].content}</a>`
        }

    };
   
   
HeaderHTML    +=  `</div>
                    </div>
                    </div>`;

if (document.getElementById("Nav")) {
    document.getElementById("Nav").innerHTML = HeaderHTML;
} 
if (document.getElementById("SubNav")) {
    document.getElementById("SubNav").innerHTML = HeaderHTML;
}      




