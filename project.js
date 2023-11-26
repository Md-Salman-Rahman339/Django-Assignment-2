const fetchCategoryData = (categoryID) => {
    console.log('Fetching data for category ID:', categoryID);
    
    // console.log(currentCategoryID);
    const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
   
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {

            if (data && data.data) {
                displayData (data.data);
                
            } else {
                console.error('Invalid response structure:', data);
            }
        })
        .catch((error) => console.error('Error fetching data:', error));
};

function sortByView() {
    const container = document.getElementById('container');
    const cards = Array.from(container.children);
 
    const sortedCards = cards.sort((a, b) => {
        const viewsA = parseInt(a.getAttribute('data-views'));
        const viewsB = parseInt(b.getAttribute('data-views'));
 
        return viewsB - viewsA;
    });
 
    container.innerHTML = '';
 
    sortedCards.forEach((card) => {
        container.appendChild(card);
    });
}
const displayData = (data) => {
    // console.log(data);

    
    
    const container = document.getElementById('container');
    container.innerHTML=``;
    if (data.length === 0) {
        const defaultCard = document.createElement("div");
        defaultCard.classList.add("box");
        defaultCard.innerHTML = `
        <img class="box-img" src="Icon.png" alt="">
        <div class="picture-title">
            <h3>Oops!!Sorry There is no content here</h3>
        </div>
       
        `;
        container.appendChild(defaultCard);
    } else {
    data.forEach((e) => {
        // console.log(e.thumbnail);
        const card = document.createElement("div");
        card.classList.add("box");
        card.setAttribute('data-views', e.others.views);
        const uploadTime = new Date(e.others.posted_date); 
        const currentTime = new Date();
        const timeDifferenceInSeconds = Math.floor((currentTime - uploadTime) / 1000); 
        const timeDifferenceInHours = Math.floor(timeDifferenceInSeconds / 3600);
       const timeDifferenceInMinutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    //    console.log(timeDifferenceInMinutes);
        
        let timeAgoText = '';
        if (timeDifferenceInHours > 0) {
            timeAgoText = `${timeDifferenceInHours} ${timeDifferenceInHours === 1 ? 'hour' : 'hours'} ago`;
        } else{
            timeAgoText = `${timeDifferenceInMinutes} ${timeDifferenceInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        }
        // else{
        //     timeAgoText="0 min ago"
        // }

        const firstAuthor = e.authors && e.authors.length > 0 ? e.authors[0] : null;


    card.innerHTML = `
    <div class="time-image">
    <img class="box-img" src=${e.thumbnail
    } alt="">
    <div class="converted-time">${timeAgoText}</div> 
    </div>
    <div class="picture-title">
    <img class="profile-picture" src="${firstAuthor ? firstAuthor.profile_picture : 'default-profile-image.jpg'}" alt="Profile Picture">

    <h3>${e.title}</h3></div>
    <div class="name-Verified"> <div>${firstAuthor ? firstAuthor.profile_name : 'N/A'}</div>
   
   
    ${firstAuthor && firstAuthor.verified ? '<img class="verified-sign" src="https://cdn-icons-png.flaticon.com/512/6928/6928921.png" alt="Verified">' : ''}
    
    </div>
    <div>${e.others.views} views</div>
   `;

    container.appendChild(card);
  
    

    })
    
};
}


    
function openBlog() {
    
    var blogURL = 'http://127.0.0.1:5500/blog.html';
    var newTab = window.open(blogURL, '_blank');
    if (newTab) {
        newTab.focus();
    }
}

fetchCategoryData(1000);

