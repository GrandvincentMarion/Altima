// slideshow
var list = document.querySelectorAll(".slide li"),
    listWidth = document.querySelector(".slide li").offsetWidth,
    listWidthTotal = listWidth + (document.querySelector(".slide li").offsetLeft * 2),
    current = 0,
    buttonRight = document.querySelector(".slideshow li.arrow-right"),
    buttonLeft = document.querySelector(".slideshow li.arrow-left");

for (var i = 0; i < list.length; i++ ) {
    list[i].style.left = listWidthTotal * [i] + "px"
}

buttonRight.addEventListener("click", function() {
    for (var i = 0; i < list.length; i++ ) {
        list[i].style.left = parseInt(list[i].style.left) - (listWidthTotal * 2) + "px";
    }

    if (list[list.length - 2].style.left == "0px") {
        for (var i = 0; i < list.length; i++ ) {
            list[i].style.left = listWidthTotal * [i] + "px"
        }
    }
}); 

buttonLeft.addEventListener("click", function() {
    for (var i = 0; i < list.length; i++ ) {
        list[i].style.left = parseInt(list[i].style.left) + (listWidthTotal * 2) + "px";
    }
    
    if (list[0].style.left > "0px") {
        for (var i = 0; i < list.length; i++ ) {
           list[i].style.left = parseInt(list[i].style.left) - (listWidthTotal * (list.length - 2)) + "px";
        }
    }
}); 



// menu mobile
var cloneIt = document.querySelector('.menu').cloneNode(true);
document.querySelector('.wrap-menu-mobile').appendChild(cloneIt)

var menu = document.querySelector('.menu-mobile'),
    container = document.querySelectorAll('.container'),
    wrapMobile = document.querySelector('.wrap-menu-mobile');

menu.addEventListener('click', function() {
    this.classList.toggle('active');

    if(menu.classList.contains('active')) {
        for (i=0; i < container.length; i++) {
            container[i].style.left = "-210px";
            wrapMobile.style.right = "0px"
        }
    } else {
        for (i=0; i < container.length; i++) {
            container[i].style.left = "0";
            wrapMobile.style.right = "-210px"
        }       
    }
});


function indexArticle() {
    var article = document.querySelectorAll('.article');
    var elementArticle = document.querySelectorAll('.article a');

    for (var i = 0; i < elementArticle.length; i++ ) {
        elementArticle[i].addEventListener('click', function(e) {
            e.preventDefault
            // recupere l'index de l'article au click
            var that = this.closest('.article');
            var arr = Array.prototype.slice.call(article);
            var index = arr.indexOf(that);
            articleClick(index);
        });
    }
}
//indexArticle()


function hashchange() {
    var hashLocation = window.location.hash;
    var arr = ["#blog-crm", "#altima-sur-iphone" , "#altima-demenage"];
    var index = arr.indexOf(hashLocation);

    if (window.location.hash.length > 1) {
        articleClick(index);
    }

    window.addEventListener("hashchange", function() {            
        var hashLocation = window.location.hash;
        var index = arr.indexOf(hashLocation);

        if (window.location.hash.length > 1) { 
            articleClick(index);
        }
        else if (window.location.hash.length === 0) { 
            document.querySelector('.wrapper').style.display = "block";
            document.querySelector('.actu').remove();
        }
    });

}
hashchange()



function articleClick(index) {

    var getJSON = new XMLHttpRequest();

    // affiche le wrapper "actu"
    document.querySelector('.wrapper').style.display = "none";
    var actuDiv = document.createElement('div');
    actuDiv.className = 'actu';
    document.querySelector('body').appendChild(actuDiv);
    document.body.insertBefore(actuDiv,document.querySelector('.footer'))  

    // requete JSON
    getJSON.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(getJSON.responseText);
            actuDiv.innerHTML = 
            "<div class='container'>"
            + "<img src=" + jsonObj[index].picture + " alt=''>" 
            + "<h2>" + jsonObj[index].title + "</h2>"
            + "<span>" + jsonObj[index].date + "</span>"
            + "<p class='intro'>" + jsonObj[index].intro + "</p>"
            + "<div class='text'>" + jsonObj[index].content + "</div>"
            + "</div>"
        }
    };
    getJSON.open("GET", "api/articles.json", true);
    getJSON.send();


}

