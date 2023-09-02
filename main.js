const phTube = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const btnContainer = document.getElementById('btn-container');
    data.data.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML =`<button onclick="loadTube('${element.category_id}')" class="btn">${element.category}</button>`
        btnContainer.appendChild(div);
    });

    
};
let globalData =[];
const loadTube = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json();
    const cardContainer = document.getElementById('card-container')
    globalData= data.data
    
    if(data.data.length == 0){
        window.location.href = './files/nodata.html'
    }
    else {
    cardContainer.innerHTML = "";
    data.data.forEach(element =>{

        const div = document.createElement("div");
        div.innerHTML= `<div class="w-11/12 mx-auto bg-base-100 shadow-xl">
        <div class="relative">
          <figure>
              <img class="h-40 w-full"
                src=${element.thumbnail}
                alt=""
              />
            </figure>
            <div class="absolute bottom-0 right-0 bg-[#363535cc] text-white p-1 mr-2 mb-2">
              <p>${hoursMinutes(element.others.posted_date)
              }</p>
            </div>
        </div>
        
        <div class="card-body h-40">
          <div class="flex gap-2 items-center">
              <div class="w-16 rounded-full">
                  <img class="w-10 h-10 rounded-full"
                    src= ${element.authors[0].profile_picture

                    }
                  />
              </div>
              <div>
                  <h2 class="text-lg font-semibold">
                    ${element.title
                    }
                    </h2>
              </div>
          </div>
          <div class="flex gap-3 items-center">
              <div><p class=""> ${element.authors[0].profile_name
              } </p></div>
              <div>${(element.authors[0].verified? "<img src=./img/bage.svg>" : "")}</div>
          </div>
          <div><p>${element.others.views
          }</p></div>
        </div>
      </div>`
      cardContainer.appendChild(div)
      // time function
      function hoursMinutes(posted_date){
        const hours = parseInt(posted_date / 3600);
        const remainSeconds = posted_date % 3600;
        const minutes = parseInt(remainSeconds/60);
        let time = hours + "Hours" + minutes + "minutes ago";
        return time;
    }
   
    })}
     
}

function sortBtn(){
  console.log('sort btn clicked');
  // trying to sort
  function viewsInNumber(viewsString) {
    const num = viewsString.endsWith('K') ? 1000 : 1;
    return parseFloat(viewsString) * num;
  }
  
  // Sort the data
  const sortByView = globalData.sort((a, b) => {
    const viewsA = viewsInNumber(a.others.views);
    const viewsB = viewsInNumber(b.others.views);
    return viewsB - viewsA;
  });
  const cardContainer = document.getElementById('card-container')
  if(sortByView.length == 0){
    window.location.href = './files/nodata.html'
  }

  else {
    cardContainer.innerHTML = "";
    sortByView.forEach(element =>{

        const div = document.createElement("div");
        div.innerHTML= `<div class="w-11/12 mx-auto bg-base-100 shadow-xl">
        <div class="relative">
          <figure>
              <img class="h-40 w-full"
                src=${element.thumbnail}
                alt=""
              />
            </figure>
            <div class="absolute bottom-0 right-0 bg-[#363535cc] text-white p-1 mr-2 mb-2">
              <p>${hoursMinutes(element.others.posted_date)
              }</p>
            </div>
        </div>
        
        <div class="card-body h-40">
          <div class="flex gap-2 items-center">
              <div class="w-16 rounded-full">
                  <img class="w-10 h-10 rounded-full"
                    src= ${element.authors[0].profile_picture

                    }
                  />
              </div>
              <div>
                  <h2 class="text-lg font-semibold">
                    ${element.title
                    }
                    </h2>
              </div>
          </div>
          <div class="flex gap-3 items-center">
              <div><p class=""> ${element.authors[0].profile_name
              } </p></div>
              <div>${(element.authors[0].verified? "<img src=./img/bage.svg>" : "")}</div>
          </div>
          <div><p>${element.others.views
          }</p></div>
        </div>
      </div>`
      cardContainer.appendChild(div)
      // time function
      function hoursMinutes(posted_date){
        const hours = parseInt(posted_date / 3600);
        const remainSeconds = posted_date % 3600;
        const minutes = parseInt(remainSeconds/60);
        let time = hours + "Hours" + minutes + "minutes ago";
        return time;
    }
   
    })}

}
phTube();
loadTube("1000");
function blogPage(){
    window.location.href = './blog.html'
}