//Fetch Posts
async function getPosts(page, limit){
    const res = await fetch('../resources/json/posts.json');
    const data = await res.json();

    //only return limit posts and start from page
    let dataFiltered=[];

    for(let i=(page-1)*limit; i <= page*limit-1; i++){
        if(i > data.length-1){
            break;
        }
        dataFiltered.push(data[i])
    }
    return dataFiltered;
}

//Fetch Categories

async function getCategories(){
    const res = await fetch('../resources/json/categories.json');
    const data = await res.json();
    return data;
}

async function getCategoriesById(categoryId){
    let categories = await getCategories();
    let cat;
     categories.forEach(category => {
        if(category.id === categoryId){
            cat = category
            return cat;
        }
    });
    return cat;
}

//Fetch Users
async function getUsers(){
    const res = await fetch('../resources/json/users.json');
    const data = await res.json();
    return data;
}

async function getUserById(userId){
    let users = await getUsers();
    let usr;
     users.forEach(user => {
        if(user.id === userId){
            usr = user;
        }
        return usr;
    });
    return usr;
}