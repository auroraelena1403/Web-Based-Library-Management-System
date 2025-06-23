
const domainBackend="http://localhost:8080";

const summaryAPI={
    signUp:{
        url: `${domainBackend}/api/sign-up`,
        method:"post"
    },
    signIn:{
        url: `${domainBackend}/api/sign-in`,
        method:"post"
    },
    currentUser:{
        url:'http://localhost:8080/api/user-details',
        method:"get"
    },
    logoutUser:{
        url:`${domainBackend}/api/userLogout`,
        method:"get"
    },
    allUsers:{
        url:`${domainBackend}/api/all-users`,
        method:"get"
    },
    updateUser:{
        url:`${domainBackend}/api/update-user`,
        method:"post"
    },
    uploadProduct:{
        url:`${domainBackend}/api/upload-book`,
        method:"post"
    },
    allBooks:{
        url:`${domainBackend}/api/get-book`,
        method:"get"
    },
    updateBook:{
        url:`${domainBackend}/api/update-book`,
        method:"post"
        
    },
    bookCategory:{
        url:`${domainBackend}/api/get-category`,
        method:"post"
    },
    categoryWiseBooks:{
        url:`${domainBackend}/api/get-books-by-category`,
        method:"post"
    },
    bookDetails:{
        url:`${domainBackend}/api/book-details`,
        method:"post"
    },
    addToCart:{
        url:`${domainBackend}/api/addToCart`,
        method:"post"
    },
    addToFav:{
        url:`${domainBackend}/api/addToFav`,
        method:"post"
    },
    countAddToCart:{
        url:`${domainBackend}/api/countAddToCart`,
        method:"get"
    },
    viewCart:{
        url:`${domainBackend}/api/view-cart`,
        method:"get"
    },
    viewFavs:{
        url:`${domainBackend}/api/view-favs`,
        method:"get"
    },
    deleteCartProduct:{
        url:`${domainBackend}/api/delete-cart-product`,
        method:"post"
    },
    deleteFavProduct:{
        url:`${domainBackend}/api/delete-fav-product`,
        method:"post"
    },
    searchBook:{
        url:`${domainBackend}/api/search`,
        method:"get"
    },
    payment:{
        url:`${domainBackend}/api/checkout`,
        method:"post"
    },
    orders:{
        url:`${domainBackend}/api/orders`,
        method:"get"
    },
    adminOrders:{
        url:`${domainBackend}/api/adminOrders`,
        method:"get"
    },
    filterProduct : {
        url : `${domainBackend}/api/filter-product`,
        method : 'post'
    }

    


}

export default summaryAPI;