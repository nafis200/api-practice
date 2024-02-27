
const loadPhone = async (searchText=13, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data
    displayPhones(phone, isShowAll)
}

const displayPhones = (phones,isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
     

     const Showall = document.getElementById('show-all-container')
     if(phones.length > 12 && !isShowAll){
            Showall.classList.remove('hidden')
     }
     else{
      Showall.classList.add('hidden')
     }
     console.log(isShowAll);
    if(!isShowAll){
      phones = phones.slice(0, 12)
    }

        phones.forEach(phone => {
            const phoneCard = document.createElement('div')
            phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
            phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowdetails('${phone.slug}')" class="btn btn-primary">Show details</button>
              </div>
            `
            phoneContainer.appendChild(phoneCard)

        });

        // hide loading spinner
        toggleLoad(false)


}

const handleShowdetails = async(id)=>{
  console.log("click showdetails", id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)

  const data = await res.json()

  const phone = data.data

  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  const phoneName = document.getElementById('phone-name')
  phoneName.innerText = phone.name
 
  const showDetailContainer = document.getElementById('show-detail-container')

  showDetailContainer.innerHTML = `
   <img src="${phone.image}" alt="" />
   <p><span>Storage:${phone?.mainFeatures?.storage}</span></p>
   <p><span>GPS:${phone.others?.GPS}</span></p>
  `

  show_details_modal.showModal()
}


const handleSearch = (isShowAll)=>{
  toggleLoad(true)
  const Search = document.getElementById('search')

  const searchText = Search.value;

  console.log(searchText);
  loadPhone(searchText, isShowAll);
  
}

const toggleLoad = (isloading)=>{
  const loading = document.getElementById('loadings')
  if(isloading){
    loading.classList.remove('hidden')
  }
  else{
    loading.classList.add('hidden')
  }
}

const handleShowall = ()=>{
      handleSearch(true)
}

loadPhone()