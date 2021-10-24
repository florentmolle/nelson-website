
// ------------------------- HOMEPAGE -------------------------- //

const homepageSlider = document.querySelector('#homepage-slider');
const homepageSliderContent = document.querySelector('#homepage-slider-content');
const homepageImgbox = [...document.querySelectorAll('.homepage-imgbox')];
const homepageImgWrap = [...document.querySelectorAll('.homepage-img-wrap')];
const homepageImg = [...document.querySelectorAll('.homepage-img')];

const galleryPage = document.querySelector('#gallerypage');
const galleryPageTitle = document.querySelector('#gallerypage h2');
const hoveredStoryText = document.querySelector('#hovered-storytext');
const countryNameHovered = document.querySelector('#countryname-hovered');
const countryNameHoveredText = document.querySelector('#countryname-hovered-text');
const galleryBackhomeLink = document.querySelector('#gallery-back-home');
const galleryPageSlider = document.querySelector('#gallerypage-slider');


const socialMedia = document.querySelectorAll('#social-media a');
const nav = document.querySelector('nav');
const galleryLink = document.querySelector('#gallery-link');
const homepageTitle = document.querySelector('#homepage-title');
const homepageTextcontent = document.querySelector('#homepage-text-content');

const customScrollbar = document.querySelector('#custom-scrollbar');
const topBar = document.querySelector('#top-bar');
const scrollNumber = document.querySelector('#scroll-number');

let current = 0;
let target = 0;
let ease = 0.075;

let raf;
let timer;

let totalHeight;

let randomLeft = 25;
let randomTop = 25;
let randomScale = 0;
let randomOpacity = 0;
let minLeft = 10;
let maxLeft = 65;
let minTop = 0;
let maxTop = 100;
let minScale = 0.5;
let maxScale = 1.9;



// put img in homepage
homepageImg.forEach((img, idx)=>{
    img.style.backgroundImage = `url(./assets/img/${idx +1}.jpg)`
});


// random size, position, opacity for homepage images
const randCoord = ()=>{
    randomLeft = Math.floor(Math.random()*(maxLeft-minLeft+1)+minLeft);
    randomTop = Math.floor(Math.random()*(maxTop-minTop+1)+minTop);
    randomScale = Math.floor(Math.random()*(maxScale-minScale+1)+minScale)
    randomOpacity = Math.random()+0.5;
}

timer = setInterval(myTimer, 4000)

function myTimer(){
        randCoord()
        homepageImgWrap.forEach((wrap)=>{
            randCoord()
            wrap.style.transform = 'scale(0)'
            wrap.style.left = `${randomLeft}%`;
            wrap.style.top = `${randomTop}%`;
            wrap.style.opacity = `${randomOpacity}`;
            wrap.style.transition = '1.5s ease';
            wrap.style.transform = `scale(${randomScale})`;
        });
}

function clearTimer(){
    clearInterval(timer)
}

// homepage images animation
homepageImgWrap.forEach((wrap)=>{
    randCoord()
    wrap.style.transform = 'scale(0)'
    wrap.style.left = `${randomLeft}%`;
    wrap.style.top = `${randomTop}%`;
    wrap.style.opacity = `${randomOpacity}`;
    wrap.style.transition = '1.5s ease';
    wrap.style.transform = `scale(${randomScale})`;

    myTimer()

});





// homepage smooth scroll
function init(){
    document.body.style.height = `${homepageSliderContent.getBoundingClientRect().height}px`
}

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function smoothScroll(){
    target = window.scrollY;
    current = lerp(current, target, ease);
    homepageSliderContent.style.transform = `translate3d(0px, ${-current}px, 0px)`;
    raf = requestAnimationFrame(smoothScroll);

//    custom scrollbar
    totalHeight = document.body.getBoundingClientRect().height;
    percentageHeight = (current / (totalHeight - window.innerHeight)) * 100;
    topBar.style.height = `${percentageHeight}%`;
    scrollNumber.style.opacity = `${percentageHeight/100}`;
    scrollNumber.innerHTML = `${Math.round(percentageHeight)}%`;


}
window.addEventListener('resize', init)
init()
smoothScroll()



// GALLERY LINK CLICKED -----//
galleryLink.addEventListener('click', (e)=>{
    e.preventDefault()
    homepageSlider.style.opacity = '0';
    homepageSlider.style.transition = '.2s 0s';
    homepageTitle.style.opacity = '0';
    homepageTitle.style.transition = '.2s';
    homepageTextcontent.style.opacity = '0';
    homepageTextcontent.style.transition = '.2s';
    galleryPage.style.opacity = '1';
    galleryPage.style.pointerEvents = 'all';
    galleryPageSlider.style.opacity = '1';
    galleryPageSlider.style.transition = '.8s .4s';
    galleryPageSlider.style.transform = 'translateX(0%)';
    galleryPageSlider.style.pointerEvents = 'all';
    galleryPageTitle.style.transition = '.5s .3s';
    hoveredStoryText.style.transition = '.5s .3s'
    galleryBackhomeLink.style.transition = '.5s .3s';
    galleryPageTitle.style.opacity = '1';
    hoveredStoryText.style.opacity = '1';
    galleryBackhomeLink.style.opacity = '1';
    galleryBackhomeLink.style.pointerEvents = 'all';
    nav.style.transition = '.5s';
    nav.classList.add('link-hiding');
    customScrollbar.style.transition = '.5s'
    customScrollbar.style.opacity = '0';
    socialMedia.forEach((a)=>{
        a.style.transition = '.5s ';
        a.classList.add('link-hiding');
    });

    clearTimer()

    
    setTimeout(() => {
        cancelAnimationFrame(raf)
        document.body.style.height = '100vh';
        target = 0;
        current = 0;
    }, 300);
});


// BACK HOMEPAGE CLICKED --------------//
galleryBackhomeLink.addEventListener('click', (e)=>{
    e.preventDefault()
    galleryPage.style.opacity = '0';
    galleryPage.style.pointerEvents = 'none';
    galleryPageSlider.style.opacity = '0';
    galleryPageSlider.style.transform = 'translateX(5%)';
    galleryPageSlider.style.pointerEvents = 'none';
    homepageSlider.style.opacity = '1';
    homepageSlider.style.transition = '.8s .3s';
    homepageTitle.style.opacity = '1';
    homepageTitle.style.transition = '.5s .2s';
    homepageTextcontent.style.opacity = '1';
    homepageTextcontent.style.transition = '.5s .2s';
    galleryPageTitle.style.transition = '.5s';
    hoveredStoryText.style.transition = '.5s';
    galleryBackhomeLink.style.transition = '.5s';
    galleryPageTitle.style.opacity = '0';
    hoveredStoryText.style.opacity = '0';
    countryNameHovered.innerHTML = '';
    countryNameHoveredText.innerHTML = '';
    galleryBackhomeLink.style.opacity = '0';
    galleryBackhomeLink.style.pointerEvents = 'none';
    nav.style.transition = '.5s .2s';
    nav.classList.remove('link-hiding');
    customScrollbar.style.transition = '.5s .3s'
    customScrollbar.style.opacity = '1';
    socialMedia.forEach((a)=>{
        a.style.transition = '.5s .3s';
        a.classList.remove('link-hiding');
    });

    topBar.style.height = `0%`;

    timer = setInterval(myTimer, 4000)
    myTimer()

    setTimeout(() => {
        cancelAnimationFrame(rafPopup)
        document.body.style.height = '100vh';
        target = 0;
        current = 0;
        window.addEventListener('resize', init);
        init();
        requestAnimationFrame(smoothScroll);
    }, 300);
});





// ------------------------- GALLERYPAGE -------------------------- //

const galleryPageInnerSlider = document.querySelector('#gallerypage-innerslider');
const galleryInnerslideBox = [...document.querySelectorAll('.gallery-innerslide-box')];
const galleryPagePopup = document.querySelector('#gallerypage-popup');
const popupScrollable = document.querySelector('.popup-scrollable');
const closePopup = document.querySelector('#close-popup');
const countryText = document.querySelector('#country-text');
const popupLightbox = document.querySelector('#popup-lightbox');
const popupLightboxImgDiv = document.querySelector('#popup-lightbox div');
const popupLightboxImg = document.querySelector('#popup-lightbox div img');


let rafPopup;


// gallerypage smooth scroll
function initPopup(){
    document.body.style.height = `${popupScrollable.getBoundingClientRect().height}px`
}

function smoothPopup(){
    target = window.scrollY;
    current = lerp(current, target, ease);
    popupScrollable.style.transform = `translate3d(0px, ${-current}px, 0px)`;

    rafPopup = requestAnimationFrame(smoothPopup)


//    custom scrollbar
    totalHeight = document.body.getBoundingClientRect().height;
    percentageHeight = (current / (totalHeight - window.innerHeight)) * 100;
    topBar.style.height = `${percentageHeight}%`;
    scrollNumber.style.opacity = `${percentageHeight/100}`;
    scrollNumber.innerHTML = `${Math.round(percentageHeight)}%`;
}





galleryInnerslideBox.forEach((b)=>{
    b.addEventListener('mouseenter', (e)=>{
        countryNameHovered.style.transition = '0s';
        countryNameHovered.style.opacity = '0';
        countryNameHovered.style.transform = 'translate(-20px)';
        countryNameHoveredText.style.transition = '0s';
        countryNameHoveredText.style.opacity = '0';
        countryNameHoveredText.style.transform = 'translate(-10px)';
        setTimeout(()=>{
            countryNameHovered.style.transition = '.4s';
            countryNameHovered.style.opacity = '1';
            countryNameHovered.style.transform = 'translateY(0px)';
            countryNameHoveredText.style.transition = '.4s .3s';
            countryNameHoveredText.style.opacity = '1';
            countryNameHoveredText.style.transform = 'translateY(0px)';
            let countryName = e.target.getAttribute('data-country');
            countryNameHovered.innerHTML = `${countryName} :`

            fetch('./assets/data/data.json').then(response =>{
                return response.json()
            }).then(data =>{
                switch(countryName){
                    case 'iceland':
                        countryNameHoveredText.textContent = data.data.gallery.iceland;
                    break;
                    case 'europe':
                        countryNameHoveredText.textContent = data.data.gallery.europe;
                    break;
                    case 'thailand':
                        countryNameHoveredText.textContent = data.data.gallery.thailand;
                    break;
                    case 'japan':
                        countryNameHoveredText.textContent = data.data.gallery.japan;
                    break;
                    case 'scandinavia':
                        countryNameHoveredText.textContent = data.data.gallery.scandinavia;
                    break;
                    case 'indonesia':
                        countryNameHoveredText.textContent = data.data.gallery.indonesia;
                    break;
                }
            }).catch(err=>alert);

        }, 100)
        
    })
})


// ------ check country clicked to fetch the good images ---- //

let galImgArray = [];

function getImg(box){

    let innerBox;

    let country = box.getAttribute("data-country");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `./assets/img/${country}`, true);
    xhr.responseType = 'document';
    xhr.onload = () => {
    if (xhr.status === 200) {
        var elements = xhr.response.getElementsByTagName("a");
        for (x of elements) {
        if ( x.href.match(/\.(jpe?g|png|gif)$/) ) { 
            let img = document.createElement("img");
            img.src = x.href;
            innerBox = document.createElement('div');
            innerBox.className = 'popup-innerbox';
            innerBox.innerHTML = `
                <div><img src=${x.href}></img></div>
            `
            popupScrollable.appendChild(innerBox);
            initPopup();
        } 
        };
    } 
        else {
            alert('cant find images' + xhr.status);
        }
    }
    xhr.send()
}



// click event for each category of images in gallery
galleryInnerslideBox.forEach((box)=>{
    box.addEventListener('click', ()=>{
        galleryPagePopup.style.display = 'flex';
        galleryPagePopup.style.pointerEvents = 'all';
        galleryPagePopup.style.opacity = '1';
        galleryPageSlider.style.transition = '.5s var(--ease-out)'
        galleryPageSlider.style.opacity = '0';
        galleryPageSlider.style.pointerEvents = 'none';
        hoveredStoryText.style.transition = '.5s';
        hoveredStoryText.style.opacity = '0';
        socialMedia.forEach((a)=>{
            a.style.transition = '.5s ';
            a.classList.add('link-hiding');
        });
        nav.style.transition = '.5s'
        nav.classList.add('link-hiding');
        galleryBackhomeLink.style.opacity = '0';
        galleryBackhomeLink.style.pointerEvents = 'none';
        closePopup.style.pointerEvents = 'all';
        customScrollbar.style.transition = '.5s .3s'
        customScrollbar.style.opacity = '1';

        topBar.style.height = `0%`;
        scrollNumber.style.opacity = `0`;
        scrollNumber.innerHTML = `0%`;

        let countryData = box.getAttribute('data-country');
        countryText.innerHTML = `${countryData}`;

        getImg(box);


        

        setTimeout(()=>{
            window.addEventListener('resize', initPopup)
            smoothPopup()
            initPopup()

            // popup lightbox image
            let innerPopupBox = document.querySelectorAll('.popup-innerbox div');
            innerPopupBox.forEach((b)=>{
                b.addEventListener('click', (e)=>{
                    popupLightbox.style.transition = '.5s';
                    popupLightbox.style.opacity = '1';
                    popupLightbox.style.pointerEvents = 'all';
                    popupLightboxImg.src = `${e.target.src}`;
                    popupLightboxImgDiv.style.transition = '.8s .5s var(--ease-out)';
                    popupLightboxImgDiv.style.opacity = '1';
                    popupLightboxImgDiv.style.transform = 'translateY(0vh)';

                })
            });
            
            
        }, 600)
        
    });
});

popupLightbox.addEventListener('click', ()=>{
    popupLightbox.style.opacity = '0';
    popupLightbox.style.pointerEvents = 'none';
    popupLightboxImgDiv.style.transition = '.5s';
    popupLightboxImgDiv.style.opacity = '0';
    popupLightboxImgDiv.style.transform = 'translateY(10vh)';
})

// close gallery pop up
closePopup.addEventListener('click', ()=>{
    galleryPagePopup.style.transition = '0.3s';
    galleryPagePopup.style.opacity = '0';
    galleryPagePopup.style.pointerEvents = 'none';
    galleryBackhomeLink.style.opacity = '1';
    galleryBackhomeLink.style.pointerEvents = 'all';
    hoveredStoryText.style.transition = '.5s';
    hoveredStoryText.style.opacity = '1';
    countryNameHovered.style.transition = '.5s .3s';
    countryNameHovered.style.opacity = '1';
    countryNameHovered.innerHTML = '';
    countryNameHoveredText.style.transition = '.5s .3s';
    countryNameHoveredText.style.opacity = '1';
    countryNameHoveredText.innerHTML = '';
    closePopup.style.pointerEvents = 'none';
    customScrollbar.style.transition = '.5s'
    customScrollbar.style.opacity = '0';

    // remove images inside popup gallery
    let popupinnerBox = document.querySelectorAll('.popup-innerbox');
    popupinnerBox.forEach((b)=>{
        b.remove();
    })

    setTimeout(()=>{
        galleryPagePopup.style.display = 'none';
        galleryPageSlider.style.opacity = '1';
        galleryPageSlider.style.pointerEvents = 'all';
        cancelAnimationFrame(rafPopup)
        document.body.style.height = '100vh';
        target = 0;
        current = 0;
    }, 300)
});






// ------------------ ABOUT & CONTACT PAGE ----------------- //


const aboutpage = document.querySelector('#aboutpage');
const aboutLink = document.querySelectorAll('.about-link');
const aboutBackHome = document.querySelector('#about-back-home');
const aboutPageTittle = document.querySelector('.aboutpage-title');
const aboutPageContent = document.querySelector('#aboutpage-content');
const aboutContentName = document.querySelector('#aboutcontent-name');
const aboutContentImg = document.querySelector('#aboutcontent-img');
const aboutContentText = document.querySelector('#aboutcontent-text');
const aboutContentTextOne = document.querySelector('#aboutcontent-textone');
const aboutContentTextTwo = document.querySelector('#aboutcontent-texttwo');
const aboutContentTextThree = document.querySelector('#aboutcontent-textthree');
const aboutContentTextFour = document.querySelector('#aboutcontent-textfour');





// -- ABOUT LINK CLICKED -- //
aboutLink.forEach((link)=>{

    link.addEventListener('click', (e)=>{
        e.preventDefault();
    
        homepageSlider.style.opacity = '0';
        homepageSlider.style.transition = '.2s 0s';
        homepageTitle.style.opacity = '0';
        homepageTitle.style.transition = '.2s';
        homepageTextcontent.style.opacity = '0';
        homepageTextcontent.style.transition = '.2s';
        nav.style.transition = '.5s';
        nav.classList.add('link-hiding');
        aboutpage.style.opacity = '1';
        aboutpage.style.pointerEvents = 'all';
        aboutPageTittle.style.transition = '.5s .3s';
        aboutPageTittle.style.opacity = '1';
        aboutBackHome.style.transition = '.5s .3s';
        aboutBackHome.style.opacity = '1';
        aboutBackHome.style.pointerEvents = 'all';
        aboutPageContent.style.display = 'flex';
        aboutPageContent.style.transition = '.8s .3s';
        aboutPageContent.style.opacity = '1';
        aboutContentName.style.animation = 'abouttextanime .8s .3s both';
        aboutContentImg.style.animation = 'abouttextanime .8s .5s both';
        aboutContentText.style.animation = 'abouttextanime .8s .5s both';
        customScrollbar.style.transition = '.5s'
        customScrollbar.style.opacity = '0';
        socialMedia.forEach((a)=>{
            a.style.transition = '.5s ';
            a.classList.add('link-hiding');
        });

        let datalink = link.getAttribute("data-link");

        if(datalink === 'aboutlink'){
            aboutContentImg.style.display = 'block';
            aboutPageContent.style.width ='95%';
        }else{
            aboutContentImg.style.display = 'none';
            aboutPageContent.style.width ='60%';
        }
    
    
        fetch('./assets/data/data.json').then(response =>{
            return response.json()
        }).then(data =>{
            switch(datalink){
                case 'aboutlink':
                    aboutPageTittle.textContent = data.data.about.title;
                    aboutContentName.textContent = data.data.about.name;
                    aboutContentTextOne.textContent = data.data.about.textone;
                    aboutContentTextTwo.textContent = data.data.about.texttwo;
                    aboutContentTextThree.textContent = data.data.about.textthree;
                    aboutContentTextFour.textContent = data.data.about.textfour;

                break;
                case 'contactlink':
                    aboutPageTittle.textContent = data.data.contact.title;
                    aboutContentName.textContent = data.data.contact.name;
                    aboutContentTextOne.textContent = data.data.contact.textone;
                    aboutContentTextTwo.textContent = data.data.contact.texttwo;
                    aboutContentTextThree.textContent = data.data.contact.texttwo;
                    aboutContentTextFour.textContent = data.data.contact.texttwo;
                break;
            }
        }).catch(err => {
            alert("can't find any content, sorry",err);
        });

        clearTimer();
    
        setTimeout(() => {
            cancelAnimationFrame(raf)
            document.body.style.height = '100vh';
            target = 0;
            current = 0;
        }, 300);
    
    })

})


aboutBackHome.addEventListener('click', (e)=>{
    e.preventDefault();

    aboutpage.style.opacity = '0';
    aboutpage.style.pointerEvents = 'none';

    aboutPageContent.style.transition = '.5s';
    aboutPageContent.style.opacity = '0';

    homepageSlider.style.opacity = '1';
    homepageSlider.style.transition = '.8s .3s';
    homepageTitle.style.opacity = '1';
    homepageTitle.style.transition = '.5s .2s';
    homepageTextcontent.style.opacity = '1';
    homepageTextcontent.style.transition = '.5s .2s';

    aboutPageTittle.style.transition = '.5s';
    aboutBackHome.style.transition = '.5s';
    aboutPageTittle.style.opacity = '0';
    aboutBackHome.style.opacity = '0';
    aboutBackHome.style.pointerEvents = 'none';
    nav.style.transition = '.5s .2s';
    nav.classList.remove('link-hiding');

    customScrollbar.style.transition = '.5s .3s'
    customScrollbar.style.opacity = '1';

    socialMedia.forEach((a)=>{
        a.style.transition = '.5s .3s';
        a.classList.remove('link-hiding');
    });

    timer = setInterval(myTimer, 4000)
    myTimer()


    setTimeout(() => {
        aboutPageContent.style.display = 'none';
        document.body.style.height = '100vh';
        target = 0;
        current = 0;
        window.addEventListener('resize', init);
        init();
        requestAnimationFrame(smoothScroll);
    }, 300);

})





// --------------------- SMALL DEVICE -----------------------//

const sdSlideshow = document.querySelector('#sd-slideshow');
const slideTransition = document.querySelector('#slide-transition');
const slideTransitionTwo = document.querySelector('#slide-transitiontwo');
const slideTransitionThree = document.querySelector('#slide-transitionthree');

const sdSlideshowImg = document.querySelector('#sd-slideshow img');


let currentSdImg = 1;

let sdTimer = setInterval(mySdTimer, 5000);
function mySdTimer(){

    slideTransition.style.transition = '.7s var(--ease-out)';
    slideTransition.style.width = '100%';
    slideTransitionTwo.style.transition = '.7s ease-in';
    slideTransitionTwo.style.width = '100%';
    slideTransitionThree.style.transition = '.7s ease';
    slideTransitionThree.style.width = '100%';

    if(window.matchMedia("(max-width: 768px)").matches){

        setTimeout(()=>{
            currentSdImg >=13 ? currentSdImg = 1 : currentSdImg +=1;

            fetch(`./assets/img/smalldevice/${currentSdImg}.jpg`).then(response =>{
                return response.blob();
            }).then(myblob=>{
                let sdImgUrl = URL.createObjectURL(myblob)
                sdSlideshowImg.src = sdImgUrl;
            });
            slideTransition.style.transition = '.7s ease-in';
            slideTransition.style.width = '0%';
            slideTransitionTwo.style.transition = '.7s var(--ease-out)';
            slideTransitionTwo.style.width = '0%';
            slideTransitionThree.style.transition = '.7s ease';
            slideTransitionThree.style.width = '0%';

            console.log('yeeyey');

        }, 700)
    
    }
};




