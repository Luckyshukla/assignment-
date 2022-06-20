hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
}


// const slideData =async () =>{
//   try{
//   const res = await fetch(`http://training.panorbitprojects.com/api/GetCarousalData/`)
//   const data1 = await res.json();
//   return data1;
// }catch(error){
//   console.log(error)
// }
// }
// const renderImg = async() =>{
//   let userimage = await slideData();
//   totalSlides = userimage.data.length;
//   console.log(userimage.data)
//   console.log(totalSlides)
//   let html ="";
//   userimage.data.map(imgs =>{
//     let newHtml = `<div class="child active">
//     <img src="${imgs.backgroundImage}"/>
//     </div>`
//     html += newHtml;
//   });
//   document.querySelector(".slider-items").innerHTML += html;
// }
// renderImg();




// var slides=document.querySelector('.slider-items').children;
// var index=0;


// function next(direction){
//   if(direction=="next"){
//     totalSlides;

//      index++;
//       if(index+3 ==totalSlides){    
//        index=0;
//       }
//   }else{
//           if(index==0){
//            index=totalSlides-1;
//           }
//           else{
//            index--;
//           }
//    }


//  for(i=0;i<totalSlides;i++){
//          slides[i].classList.remove("active");
//  }
//  slides[index].classList.add("active");
//  slides[index+1].classList.add("active"); 
//  slides[index+2].classList.add("active"); 
//  slides[index+3].classList.add("active");   
// //  console.log(index,index+1,index+2,index+3,totalSlides)  

// }



const carousel = document.querySelector('.carousel');
const slider = document.querySelector('.slider');

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let direction;

next.addEventListener('click', function () {
  direction = -1;
  carousel.style.justifyContent = 'center';
  slider.style.transform = 'translate(-12.38%)';
});

prev.addEventListener('click', function () {
  direction = 1;
  carousel.style.justifyContent = 'center';
  slider.style.transform = 'translate(12.38%)';

});
// slider =(direction) =>{
//   if (direction===-1){
//     carousel.style.justifyContent = 'center';
//     slider.style.transform = 'translate(-12.38%)';
//   }else if(direction === 1){
//     carousel.style.justifyContent = 'center';    
//     slider.style.transform = 'translate(12.38%)';
//   }
// }

slider.addEventListener('transitionend', function () {
  // get the last element and append it to the front

  if (direction === 1) {
    slider.prepend(slider.lastElementChild);
  } else {
    slider.appendChild(slider.firstElementChild);
  }

  slider.style.transition = 'none';
  slider.style.transform = 'translate(0)';
  setTimeout(() => {
    slider.style.transition = 'all 0.3s';
  })
}, false);



const getCarousalData = async () => {
  try {
    let response = await fetch('http://training.panorbitprojects.com/api/GetCarousalData/')
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const renderImage = async () => {
  let image = await getCarousalData();
  let html = "";
  // console.log(image.data);
  image.data.map(imgs => {
    let apiImages = `<div><img src="${imgs.backgroundImage}" >
                     <h2>${imgs.title}</h2></div>`;
    html += apiImages;
  });

  let slider = document.querySelector('.slider');
  slider.innerHTML = html;
}

renderImage();






//reataurants card Api

const container = document.querySelector('.resturent_card');
let pageCount = 1;
const getData = async () => {
  try {
    const response = await fetch(`http://training.panorbitprojects.com/api/RestaurantsList/?page=${pageCount}`)
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}


const restaurant_data = async () => {
  let resturent_details = await getData();
  resturent_details.data.restaurants.map((value) => {
    const restaurantList = `
    <div class="hidden">
    <div class="card">
    <div class="img"><img src="${value.image}" /></div>
    <div class="resturent_name">${value.name}</div>
    <div class="dishes">${value.items[0]},${value.items[1]},${value.items[2]},${value.items[3]},${value.items[4]}</div>
    <div class="measure">
      <div class="rating"><i class="fa fa-star"></i>${value.rating}</div>
      <div>.</div>
      <div  class="dilevery_time">${value.deliveryTime}</div>
      <div>.</div>
      <div class="costForTwo">₹${value.costForTwo}</div>
    </div>
    <div class="offer"><i class="fa fa-percent"></i>${value.offer}</div>
  </div>
  <div class="quick"><a href="#">Quick view</a></div>
    `
    container.innerHTML += restaurantList;
  });
}
restaurant_data();
const debounce = (fnc, delay) => {
  let timeOutID;
  return function (...args) {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
    timeOutID = setTimeout(() => {
      fnc(...args)
    }, delay)
  }
}


window.addEventListener("scroll", debounce(e => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    pageCount++;
    restaurant_data();
  }
}, 3000));

// restaurant_data();
// const showData =() =>{
//   setTimeout(()=>{
//     pageCount++;
//     restaurant_data()

//   },300)
// }
// const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
// window.addEventListener('scroll',()=>{

//   if(clientHeight+scrollTop>=scrollHeight){
// pageCount++;
// restaurant_data();
//     showData();
//   }
// })


// Count Restaurants
const restaurant_count = async () => {
  let count = await getData();
  document.querySelector(".Count").innerHTML = count.data.count + " " + "restaurants";
}

restaurant_count();