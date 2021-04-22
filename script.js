var searchBar = document.getElementById('searchBar')
var titre = document.getElementById('searchBar')
var submit = document.getElementById('submit')
var cross = document.getElementById('cross')

var bg = document.getElementsByClassName('bg')
    var popup = document.getElementsByClassName('popup')

const movieFinder = function() {
    var total = titre.value.split(' ')
    var urlPlus = total.join('+')

    let observer = new IntersectionObserver(function (observables) {
        observables.forEach(function(observable) {
            if(observable.intersectionRatio > 0.5) {
                observable.target.classList.remove('not-visible')
            }else if (observable.intersectionRatio < 0.5) {
                observable.target.classList.add('not-visible')
            }
        })
    }, {
        threshold: [0.5]
    })

    var url = `http://www.omdbapi.com/?apikey=13704b77&s=${urlPlus}`

    console.log(url);

    let body = document.querySelector('.liste')



    fetch(url)

    .then((reponse) => reponse.json())
    .then((json) => {
        console.log(json.Search);
        for(let i = 0; i < json.Search.length; i++) {
            console.log(json.Search[i].Title);
            body.innerHTML +=  `
        <div class="card">
        <div class="haut">
            <img src="${json.Search[i].Poster}" alt="v" class="image">
        </div>
        <div class="bas">
            <p class="info">titre : ${json.Search[i].Title}</p>
            <p class="info">année de sortie : ${json.Search[i].Year}</p>
            <button class="btn">En voir plus</button>
        </div>
    </div>`

    var CTA = document.getElementsByClassName('btn')
    
    
        }
        
        for(let c = 0; c < CTA.length; c++ ){

            let name = json.Search[c].Title.split(' ').join('+')
            let fullUrl = `http://www.omdbapi.com/?apikey=13704b77&t=${name}`

            CTA[c].addEventListener('click', function() {
                bg[0].classList.add('visible')
                popup[0].classList.add('visible')
                fetch(fullUrl)
                .then((response) => response.json())
                .then((film) => {
                    popup[0].innerHTML = `
                        <div class="gauche">
                            <img src="${film.Poster}" alt="">
                        </div>
                        <div class="droite">
                            <h1>${film.Title}</h1>
                            <h2>${film.Year}</h2>
                            <p>${film.Plot}</p>
                        </div>
                    `
                })

                
            });

            

            
        }

        var test = document.getElementsByClassName('card')
        for(let i = 0; i < test.length; i++){
            observer.observe(test[i])
            test[i].classList.add('not-visible')
        }

       
    })
    .catch((error) => console.error(error));
}


        
submit.addEventListener("click", movieFinder)


