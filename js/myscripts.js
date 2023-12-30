var selectList = document.getElementById("selectList");
var mainContent = document.getElementById("main-content");
var cdetails;
var cfacts;
var clocation;
var cnews;
var data;
var added = 0;
const countriesMapped = new Map();
selectList.onchange = function(e) {
    console.log("changed");
    var selectedCountry = e.target.value;
    printPage(selectedCountry);
}


async function getData() {
    const data = async function() {
        const res = await fetch("https://restcountries.com/v3.1/all")
        return res.json();
    }
    var jsonData = await data();
    return jsonData;
}
function addNames(countriesData) {
    var namesArray = [];
    countriesData.forEach(element => {
        namesArray.push(element.name.common);
        countriesMapped.set(element.name.common, element);
    });
    namesArray.sort();
    for (var i=0;i<namesArray.length;i++) {
        selectList.innerHTML+=`<option>${namesArray[i]}</option>`
    }
}
async function initList() {
    if (isNaN(data)) {
        data = await getData();
    }
    addNames(data);
}


function countryDetails(selectedCountry) {
    var selectedCountryData = countriesMapped.get(selectedCountry);
    var unMemOutput;
    var independentOutput;
    if(selectedCountryData.unMember) {
        unMemOutput=`<i class="fas fa-check"></i>`
    }
    else {
        unMemOutput=`<i class="fas fa-times"></i> `
    }
    if(selectedCountryData.independent) {
        independentOutput=`<i class="fas fa-check"></i>`
    }
    else {
        independentOutput=`<i class="fas fa-times"></i> `
    }
    cdetails=`
        <section class="wf100 p80 h2-local-brands depart-info" id="cdetails">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    <div class="section-title">
                        <h2>Country Informations</h2>
                        <p>For the beginning of a new paragraph marks a change of topic or a step in the development of an<br>
                            argument or of a story. In writing essays or other compositions too include.
                        </p>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <!--Local Box Start-->
                    <div class="col-md-3 col-sm-3">
                    <div class="deprt-icon-box">
                        <img src="${selectedCountryData.flags.png}" alt="">
                        <h6> <a href="#">Flag</a> </h6>
                    </div>
                    </div>
                    <!--Local Box End--> 
                    <!--Local Box Start-->
                    <div class="col-md-3 col-sm-3">
                    <div class="deprt-icon-box">
                        <img src="${selectedCountryData.coatOfArms.png}" alt="">
                        <h6> <a href="">Coat Of Arms</a> </h6>
                    </div>
                    </div>
                    <!--Local Box End--> 
                    <!--Local Box Start-->
                    <div class="col-md-3 col-sm-3">
                    <div class="deprt-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/200px-UN_emblem_blue.svg.png" alt="">
                        <h6> <a href="aboutus.html#">United Nations 
                            ${unMemOutput}
                        </a> </h6>
                    </div>
                    </div>
                    <!--Local Box End--> 
                    <!--Local Box Start-->
                    <div class="col-md-3 col-sm-3">
                    <div class="deprt-icon-box">
                        <img src="https://cdn4.iconfinder.com/data/icons/digital-nomad-volume-1/1000/INDEPENDENT-512.png" alt="">
                        <h6> <a href="#">Independent 
                            ${independentOutput}
                        </a> 
                        </h6>
                    </div>
                    </div>
                    <!--Local Box End--> 
                </div>
            </div>
        </section>
   `
}
function countryFacts(selectedCountry) {
    var selectedCountryData = countriesMapped.get(selectedCountry);
    
    cfacts=`
        <section class="wf100 some-facts" id="cfacts">
            <div class="container">
            <h2>Read Some Facts</h2>
            <ul>
                <li>
                    <div class="facts-icon"><i class="fas fa-users"></i></div>
                    <strong>${(selectedCountryData.population).toLocaleString()}</strong> <span>Population</span> 
                </li>
                <li>
                    <div class="facts-icon"><i class="fas fa-map-marked-alt"></i></div>
                    <strong>${selectedCountryData.region}</strong> <span>Region</span> 
                </li>
                <li>
                    <div class="facts-icon"><i class="fas fa-calendar-alt"></i></div>
                    <strong>${selectedCountryData.startOfWeek}</strong> <span>Start Of Week</span> 
                </li>
                <li>
                    <div class="facts-icon"><i class="fas fa-clock"></i></div>
                    <strong>${selectedCountryData.timezones[0]}</strong> <span>Time zone</span> 
                </li>
                <li>
                    <div class="facts-icon"><i class="fas fa-home"></i></div>
                    <strong>${selectedCountryData.capital[0]}</strong> <span>Capital</span> 
                </li>
            </ul>
            </div>
        </section>
    `
}
function countryLocation(selectedCountry) {
    var selectedCountryData = countriesMapped.get(selectedCountry);
    
    clocation=`
        <div class="map-form p80" id="clocation">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-5">
                        <h3 class="stitle">Location On Map</h3>
                        <p class="m80">Discover the world with Google Maps. Experience Street View, 3D Mapping, turn-by-turn directions, indoor maps and more across your devices.</p>

                        <a href=${selectedCountryData.maps.googleMaps} class="btn btn-danger">
                        See On Google Maps
                        </a>
                        
                    </div>
                    <div class="col-md-8 col-sm-7">
                        <div class="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7292340.776536581!2d25.58376013091712!3d26.81725701347487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1703545573653!5m2!1sen!2seg"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
function countryNews(selectedCountry) {
    var selectedCountryData = countriesMapped.get(selectedCountry);
    
    cnews=`
        <section class="wf100 city-news p75" id="cnews">
    <div class="container">
        <div class="title-style-3">
        <h3>Be Updated with City News</h3>
        <p>Read the News Updates and Articles about Government </p>
        </div>
        <div class="row"> 
        <!--News Box Start-->
        <div class="col-md-3 col-sm-6">
            <div class="news-box">
            <div class="new-thumb"> <span class="cat c1">Economy</span> <img src="images/h3citynews-1.jpg" alt=""> </div>
            <div class="new-txt">
                <ul class="news-meta">
                <li>20 MAR, 2019</li>
                </ul>
                <h6><a href="index.html#">Media talking about foriegn affairs</a></h6>
                <p> How all this mistaken idea of denounce pleasure and praising pain was born I will give you an. </p>
            </div>
            <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> Johny Stewart <a href="index.html#"><i class="fas fa-arrow-right"></i></a> </div>
            </div>
        </div>
        <!--News Box End--> 
        <!--News Box Start-->
        <div class="col-md-3  col-sm-6">
            <div class="news-box">
            <div class="new-thumb"> <span class="cat c2">Business</span> <img src="images/h3citynews-2.jpg" alt=""> </div>
            <div class="new-txt">
                <ul class="news-meta">
                <li>21 MAR, 2019</li>
                </ul>
                <h6><a href="index.html#">Integer mollis urna et egestas pretium</a></h6>
                <p> How all this mistaken idea of denounce pleasure and praising pain was born I will give you an. </p>
            </div>
            <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> Mathew Dan <a href="index.html#"><i class="fas fa-arrow-right"></i></a> </div>
            </div>
        </div>
        <!--News Box End--> 
        <!--News Box Start-->
        <div class="col-md-3  col-sm-6">
            <div class="news-box">
            <div class="new-thumb"> <span class="cat c3">Policies</span> <img src="images/h3citynews-3.jpg" alt=""> </div>
            <div class="new-txt">
                <ul class="news-meta">
                <li>05 MAY, 2019</li>
                </ul>
                <h6><a href="index.html#">In ut erat in  dictum a et purus</a></h6>
                <p> How all this mistaken idea of denounce pleasure and praising pain was born I will give you an. </p>
            </div>
            <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> Smith Jones <a href="index.html#"><i class="fas fa-arrow-right"></i></a> </div>
            </div>
        </div>
        <!--News Box End--> 
        <!--News Box Start-->
        <div class="col-md-3  col-sm-6">
            <div class="news-box">
            <div class="new-thumb"> <span class="cat c4">Education</span> <img src="images/h3citynews-4.jpg" alt=""> </div>
            <div class="new-txt">
                <ul class="news-meta">
                <li>15 OCT, 2019</li>
                </ul>
                <h6><a href="index.html#">Cras accumsan mauris eget massa</a></h6>
                <p> How all this mistaken idea of denounce pleasure and praising pain was born I will give you an. </p>
            </div>
            <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> Nathan Taylor <a href="index.html#"><i class="fas fa-arrow-right"></i></a> </div>
            </div>
        </div>
        <!--News Box End--> 
        </div>
    </div>
    </section>
    `
}
async function printPage(selectedCountry) {
    countryDetails(selectedCountry);
    countryFacts(selectedCountry);
    countryLocation(selectedCountry);
    countryNews(selectedCountry);
    if (added == 0) {
        mainContent.innerHTML += cdetails;
        mainContent.innerHTML += cfacts;
        mainContent.innerHTML += clocation;
        mainContent.innerHTML += cnews;
        added=1;
        selectList = document.getElementById("selectList");
        selectList.onchange = function(e) {
            console.log("changed");
            var selectedCountry = e.target.value;
            printPage(selectedCountry);
        }
    }
    else {
        
        document.getElementById("cdetails").innerHTML = cdetails;
        document.getElementById("cfacts").innerHTML = cfacts;
        document.getElementById("clocation").innerHTML = clocation;
        document.getElementById("cnews").innerHTML = cnews;
    }
}

initList();



(function(){
    emailjs.init("vSJH6trKdrK_AD4gP");
 })();
document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();
    // these IDs from the previous steps
    emailjs.sendForm('service_zwvc5yo', 'contact_form', this)
        .then(function() {
            document.getElementById("myForm").reset();
        }, function(error) {
            console.log('FAILED...', error);
        });
});