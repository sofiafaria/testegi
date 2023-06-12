/*Initialize DOM elements */
const bannerCarousel = document.querySelector('#carouselBanner');
const bannerContainer =document.querySelector('#carouselBanner .carousel-inner');
const categoryCarousel = document.querySelector('#carouselCategory');
const categoriesContainer = document.querySelector('#carouselCategory .carousel-inner');
const authorsCarousel = document.querySelector('#carouselAuthors');
const authorContainer = document.querySelector('#carouselAuthors .carousel-inner');
const featuredPostContainer = document.querySelector('#featuredPost');
const tablePostContainer = document.querySelector('#tablePosts tbody')

/*-------------------Actions for Banner---------------------------- */
//Show Posts

async function showPostsInBanner(numberOfPosts){
    const banners = await getPosts(1, numberOfPosts);
    bannerContainer.innerHTML='';

    banners.forEach(async post =>{
        //for list of posts
            //get category
        let category = await getCategoriesById(post.categoryId);
        let categoryName = category.name;

            //getUser
        let user = await getUserById(post.userId);
        let userName = user.name;

            //render HTML
        const bannerEl = document.createElement('div');
        bannerEl.classList.add('carousel-item', 'carousel-banner');
        bannerEl.innerHTML = `
        <img src="${post.imageURL}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
        <div class="col-7 text-start">
            <div class="container-fluid py-5">
            <p class="text-uppercase">Posted on ${categoryName}</p>
            <h1 class="display-6">${post.title}</h1>
            <p class="fs-6"><small>By <a href="#" class="text-decoration-none">${userName}</a> | May 23, 2022</small></p>
            <p class="fs-6">${post.summary}</p>
            <button class="btn btn-bd-primary btn-lg" type="button">Read More</button>
            </div>
        </div>
        </div>`;

        bannerContainer.appendChild(bannerEl);
    })
}

/*-------------------Actions for Posts------------------------------ */

async function showPostsInTable(numberOfPosts){
    const posts = await getPosts(1, numberOfPosts);

    //for featured post
    let featuredPost;
    posts.forEach(post =>{
        if(post.featured)
        featuredPost = post
    });
    let user = await getUserById(featuredPost.userId);
    let userName = user.name;

    featuredPostContainer.innerHTML=`
        <h2 class="text-uppercase">Featured Post</h2>
        <div class="p-4 border">
            <img src="${featuredPost.imageURL}" class="card-img-top mb-3" alt="people working">
            <p class="fs-6"><small>By <a href="#" class="text-decoration-none">${userName}</a> | May 23, 2022</small></p>
            <p class="fs-6">${featuredPost.summary}</p>
            <button class="btn btn-bd-primary" type="button">Read More ></button>
        </div>`;
    
    posts.forEach(async post =>{
        let user = await getUserById(post.userId);
        let userName = user.name;

        let tr = document.createElement('tr');
        tr.innerHTML=` 
        <th scope="row" ></th>
        <td>
          <div>
            <small>By <a href="#" class="text-decoration-none">${userName}</a> | May 23, 2022</small>                       
          </div>
          <h4>${post.title}</h4>                         
        </td>`;

        tablePostContainer.appendChild(tr);
    })

}
        


/*-------------------Actions for Tabs------------------------------ */
function openPage(pageName,elmnt,color) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }

    document.getElementById(pageName).style.display = "block";
    
    elmnt.style.backgroundColor = color;
}
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
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

/*--------------------Actions for Authors--------------------------*/
async function showAuthorsInCarousel(){
    const users = await getUsers();
    authorContainer.innerHTML='';

    users.forEach(user =>{
        const authorEl = document.createElement('div');
        authorEl.classList.add('carousel-item', 'carousel-authors');
        authorEl.innerHTML = `
            <div class="card sharp FloydMiles card-carousel">
                <div class="author-thumbnail-wrapper position-relative">
                    <img src="${user.imageURL}" class="author-thumbnail position-absolute top-50 start-50 translate-middle" alt="">
                </div>
                <h5 class="mt-2">${user.name}</h5>                            
                <a class="custom-link text-decoration-none" href="#">${user.jobTitle}@${user.company}</a>
                <div class="mt-2 d-flex author-icons">
                    <div class="p-2"><a href="#" class="icon-light"><i class="fa-brands fa-facebook"></i></a></div>
                    <div class="p-2"><a href="#" class="icon-light"><i class="fa-brands fa-github"></i></a></div>
                    <div class="p-2"><a href="#" class="icon-light"><i class="fa-brands fa-twitter"></i></a></div>
                    <div class="p-2"><a href="#" class="icon-light"><i class="fa-brands fa-instagram"></i></a></div>
                </div>
            </div>`;

            authorContainer.appendChild(authorEl);
    });
};


function renderCarousel(carousel, container){
    if(window.matchMedia("(min-width:576px)").matches){
        const carouselInit = new bootstrap.Carousel(carousel,{
            interval: false,
            wrap: false
        });

        let numberOfItems = container.childElementCount;
        let cardWidth = document.querySelector(`#${carousel.id} .carousel-item`).offsetWidth;
        let scrollPosition = 0;
        
        function scrollNext(){
                if(scrollPosition < cardWidth * numberOfItems){
                    scrollPosition = scrollPosition + cardWidth;
                    document.querySelector(`#${carousel.id} .carousel-inner`).scrollLeft = scrollPosition;
                }
        }
        function scrollPrevious(){
                if(scrollPosition > 0){
                    scrollPosition = scrollPosition - cardWidth;  
                    document.querySelector(`#${carousel.id} .carousel-inner`).scrollLeft = scrollPosition;
                }
        }
    
        document.querySelector(`#${carousel.id} .carousel-control-next`).addEventListener('click', scrollNext);
        document.querySelector(`#${carousel.id} .carousel-control-prev`).addEventListener('click', scrollPrevious);
    }else{
        carousel.classList.add('slide');
    }

}

async function waitForRenderAndRenderCarousel() {
    await showCategoriesInCarousel();
    renderCarousel(categoryCarousel,categoriesContainer);

    await showAuthorsInCarousel();
    renderCarousel(authorsCarousel,authorContainer);
}

async function waitForRenderAndRenderBanner() {
    await showPostsInBanner(2);
  
    // Create a MutationObserver to wait for the postsContainer to render
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.target === bannerContainer && mutation.type === 'childList') {
          // When the postsContainer renders, disconnect the observer and render the carousel
          observer.disconnect();
          renderCarousel(bannerCarousel,bannerContainer);
          break;
        }
      }
    });
  
    // Start observing the postsContainer for changes
    observer.observe(bannerContainer, { childList: true });
  }

  showPostsInTable(20);
  waitForRenderAndRenderCarousel();
  waitForRenderAndRenderBanner();

