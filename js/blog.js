const featurePostContainer = document.querySelector('.p-5.mb-4.vs-bg-purple-light');
const postsContainer = document.querySelector('.container-fluid.post');
const categoryCarousel = document.querySelector('#carouselCategory');
const categoriesContainer = document.querySelector('#carouselCategory .carousel-inner');
let numberOfPosts = 3;
let pageNumber = 1;



/*----------------------------Actions for posts------------------------------------------ */
//Show Posts

async function showPosts(pageNumber, numberOfPosts){
    const posts = await getPosts(pageNumber, numberOfPosts);
    postsContainer.innerHTML='';

            //for featured post
            let featuredPost;
            posts.forEach(post =>{
                if(post.featured)
                featuredPost = post
            });
    
            let user = await getUserById(featuredPost.userId);
            let userName = user.name;
    
            const featurePostEl = document.createElement('div');
            featurePostEl.classList.add('container');
            featurePostEl.innerHTML = `
            <div class="row">
              <div class="col-7">
                <div class="container-fluid py-5">
                  <p class="text-uppercase">Featured Post</p>
                  <h1 class="display-6">${featuredPost.title}</h1>
                  <p class="fs-6"><small>By <a href="/blogpost.html?id=${featuredPost.id}" class="text-decoration-none">${userName}</a> | May 23, 2022</small></p>
                  <p class="fs-6">${featuredPost.summary}</p>
                  <button class="btn btn-bd-primary btn-lg" type="button">Read More</button>
                </div>
              </div>
              <div class="col-5">
                <img src="${featuredPost.imageURL}" class="img-fluid mt-5 mb-4" alt="">
              </div>
            </div>`;
    
            featurePostContainer.appendChild(featurePostEl);

    posts.forEach(async post =>{
        //for list of posts
            //get category
        let category = await getCategoriesById(post.categoryId);
        let categoryName = category.name;
            //render HTML
        const postEl = document.createElement('div');
        postEl.classList.add('row', 'featurette');
        postEl.innerHTML = `
        <div class="col-4 mt-5 mb-4">
        <img src=${post.imageURL} class="img-fluid" alt="">
        </div>
        <div class="col-8 mt-5 mb-4">
        <div class="me-5">
          <p class="fs-6 text-uppercase mt-5 me-5 vs-txt-purple"><small>${categoryName}</small></p>
          <h2 class="fw-bold me-5"><a href="/blogpost.html?id=${post.id}" class="text-decoration-none custom-link">${post.title}</a></h2>
        </div>
        <p class="fs-6">${post.summary}</p>
        </div>`;

        postsContainer.appendChild(postEl);
    })
}


//navigation events
function navigateToPage(instruction){
    if(instruction =='previousBtn'){
        if(pageNumber == 1){
            return pageNumber
        }
        pageNumber = pageNumber-1;
    }else{
        pageNumber = pageNumber+1;   
    }
    showPosts(pageNumber, numberOfPosts);
}

let navigationBtn = document.querySelectorAll('.navigation-button');

navigationBtn.forEach(navBtn => {
    navBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    navigateToPage(event.target.id);
    })
});

/*-----------------------Actions for categories-------------------- */
//Show Categories

async function showCategoriesInCarousel(){
    const categories = await getCategories();
    categoriesContainer.innerHTML='';

    categories.forEach(category =>{
        const categoryEl = document.createElement('div');
        categoryEl.classList.add('carousel-item','carousel-categories','card-carousel','col-xl-3', 'col-lg-4','col-sm-6','col-12');
        categoryEl.innerHTML = `
            <div class="p-3 border card-border fill">
                <div class="rounded border p-3 mb-3 bg-light fixed-icon-width">
                <i class="${category.icon}"></i>
                </div>
                <h4>${category.name}</h4>
                <p>${category.description}</p>
            </div>`;

        categoriesContainer.appendChild(categoryEl);
    });
};

function renderCarousel(){
    if(window.matchMedia("(min-width:576px)").matches){
        const carousel = new bootstrap.Carousel(categoryCarousel,{
            interval: false,
            wrap: false
        });

        let numberOfItems = categoriesContainer.childElementCount;
        let cardWidth = document.querySelector('.carousel-item').offsetWidth;
        let scrollPosition = 0;
        
        function scrollNext(){
                if(scrollPosition < cardWidth * numberOfItems){
                    scrollPosition = scrollPosition + cardWidth; 
                    document.querySelector(".carousel-inner").scrollLeft = scrollPosition;
                }
        }
        function scrollPrevious(){
                if(scrollPosition > 0){
                    scrollPosition = scrollPosition - cardWidth;  
                    document.querySelector(".carousel-inner").scrollLeft = scrollPosition;
                }
        }
    
        document.querySelector('.carousel-control-next').addEventListener('click', scrollNext);
        document.querySelector('.carousel-control-prev').addEventListener('click', scrollPrevious);
    }else{
        categoryCarousel.classList.add('slide');
    }

}

async function waitForRenderAndRenderCarousel() {
    await showCategoriesInCarousel();
    renderCarousel();
  }
/*------------------------------LOADING PAGE----------------- */

showPosts(pageNumber, numberOfPosts);
waitForRenderAndRenderCarousel();

