const postCarousel = document.querySelector('#carouselPost');
const postsContainer = document.querySelector('#carouselPost .carousel-inner') ;
const maxNumberOfPosts = 10;

async function showPostsInCarousel(numberOfPosts){
        const posts = await getPosts(1, numberOfPosts);
        postsContainer.innerHTML='';
    
        posts.forEach(async post =>{
            //for list of posts
                //get user
            let user = await getUserById(post.userId);
            let userName = user.name;
    
                //render HTML
            const postEl = document.createElement('div');
            postEl.classList.add('carousel-item','carousel-posts');
            postEl.innerHTML = `
                        <div class="card card-carousel border-0">
                            <div class="img-wrapper">
                                <img src="${post.imageURL}" class="d-block w-100 img-carousel" alt="...">
                            </div>
                            <div class="card-body">
                                <p class="fs-6"><small>By <a href="#" class="text-decoration-none">${userName}</a> | May 23, 2022</small></p>
                                <h3 class="card-title">${post.title}</h3>
                                <p class="fs-6 card-text">${post.summary}</p>    
                            </div>
                        </div>`;
    
            postsContainer.appendChild(postEl);
        });
};

async function renderCarousel(){
    if(window.matchMedia("(min-width:576px)").matches){
        const carousel = new bootstrap.Carousel(postCarousel,{
            interval: false,
            wrap: false
        });
        let cardWidth = document.querySelector('.carousel-item').offsetWidth;
        let scrollPosition = 0;
        
        function scrollNext(){
                if(scrollPosition < cardWidth * maxNumberOfPosts){
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
        postCarousel.classList.add('slide');
    }

}

async function waitForRenderAndRenderCarousel() {
    await showPostsInCarousel(maxNumberOfPosts);
  
    // Create a MutationObserver to wait for the postsContainer to render
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.target === postsContainer && mutation.type === 'childList') {
          // When the postsContainer renders, disconnect the observer and render the carousel
          observer.disconnect();
          renderCarousel();
          break;
        }
      }
    });
  
    // Start observing the postsContainer for changes
    observer.observe(postsContainer, { childList: true });
  }
  
  waitForRenderAndRenderCarousel();
  
  
  
  
  
  
  






