
const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data
    displayPhones(phone)
}

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
     
     phones = phones.slice(0, 10)

     const Showall = document.getElementById('show-all-container')
     if(phones.length > 3){
            Showall.classList.remove('hidden')
     }
     else{
      Showall.classList.add('hidden')
     }

        phones.forEach(phone => {
            const phoneCard = document.createElement('div')
            phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
            phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            `

            phoneContainer.appendChild(phoneCard)

        });
}


const handleSearch = ()=>{
  const Search = document.getElementById('search')

  const searchText = Search.value;

  console.log(searchText);
  loadPhone(searchText);
  
}

//loadPhone()