
let textSearch = document.querySelector('#search');
let btnSubmit = document.querySelector('#search-btn');
let bookSearch = document.querySelector('#bookSearch');
let show = document.querySelector('.data');
//create new array and get data from local storage
let historySearch = JSON.parse(localStorage.getItem("Book Data")) || [];

//api link
const url = "https://www.googleapis.com/books/v1/volumes?q=";
//add event on button
btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    let obj = {};//create new object
    let API = fetch(`${url} + ${textSearch.value}`);
    API.then((response) =>{
        return response.json();
    })
    .then((value)=>{
        // console.log(value);
        // console.log(value.items[0].volumeInfo);
        // console.log(textSearch.value);
        let data = value.items;//store object data in data variable
        show.innerHTML = "";
        obj = {
            searchData: textSearch.value,
            date:new Date().toLocaleDateString(),
            time:new Date().toLocaleTimeString('en-US',{
            hh: '2-digit',
            mm: '2-digit',
            })
        };
        historySearch.push(obj);//push data on array
        bookSearch.innerHTML = `Book Results For <i>${textSearch.value}</i>`;//show data after input data
        bookSearch.style.display = "block";//hide 

        data.map((item) => {
            let bookData= item.volumeInfo;//data store in new variable

            // let show = document.querySelector('.data');
            const div = document.createElement('div');
            div.setAttribute('class','div-item');

            const img = document.createElement('img');
            img.setAttribute('src',`${bookData.imageLinks.thumbnail}`);
            
            const titl = document.createElement('p');
            titl.innerHTML = `<b>Title:</b> ${bookData.title} `;

            const author = document.createElement('p');
            author.innerHTML = `<b>Author:</b> <i>${bookData.authors}</i>`;

            const pageCount= document.createElement('p');
            pageCount.innerHTML = `<b>Page Count :</b> ${bookData.authors}`;

            const publisher=document.createElement('p');
            publisher.innerHTML=`<b>Publisher:</b> ${bookData.publisher}`;

           
            let buyBtn=document.createElement("button");
            buyBtn.setAttribute("class","buy");
            buyBtn.innerText="Buy Now";
            div.append(img,titl,author,pageCount,publisher,buyBtn);
            show.append(div);

        });
        let localData = JSON.stringify(historySearch);
        localStorage.setItem("Book Data",localData);//data store in localstorage
    })
    .catch((error) => alert(error.message));//show error
});
