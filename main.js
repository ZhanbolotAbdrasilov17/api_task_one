const API = `http://localhost:1717`

// Name
const creatName = (el) => {
  const name = document.createElement('h3')
  name.textContent = el.name
  return name
}

// Image
const createImg = (source) => {
  const image = document.createElement('img')
  image.src = source.image
  image.classList.add('image')
  return image
}

// Stock and Cost
const creatStock = (amount) => {
  const parentStock = document.createElement('div')
  parentStock.classList.add('parent-info')

  const label = document.createElement('label')
  label.setAttribute('id', 'stock')
  label.innerHTML = 'Stock:'

  const inputStock = document.createElement('input')
  inputStock.setAttribute('id', 'stock')
  inputStock.setAttribute('type', "number")
  inputStock.setAttribute('value', amount)

  parentStock.append(label)
  parentStock.append(inputStock)

  return parentStock
}

const creatCost = (price) => {
  const parentCost = document.createElement('div')
  parentCost.classList.add('parent-info')

  const label = document.createElement('label')
  label.setAttribute('id', 'cost')
  label.innerHTML = 'Cost:'

  const inputCost = document.createElement('input')
  inputCost.setAttribute('id', 'cost')
  inputCost.setAttribute('type', "number")
  inputCost.setAttribute('value', price)

  parentCost.append(label)
  parentCost.append(inputCost)

  return parentCost
}


const creatSaveBtn = (id, stock, cost) => {
  const save = document.createElement('button')
  save.textContent = 'Save changes'
  save.classList.add('save')

  save.addEventListener('click', () => {
    const stockValue = stock.querySelector('input').value
    const costValue = cost.querySelector('input').value
    changeSave(id, stockValue, costValue)
  })

  return save
}

 async function changeSave(id, inStock, cost)  {
  console.log('qaqaq', inStock, cost)
  const response = await fetch(`http://localhost:1717/pastry/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inStock: Number(inStock),
      cost: Number(cost)
    })
  })
  const data = await response.json()
  console.log(data);
    // .catch(error => {
    //   console.error('Failed to update:', error)
    // })
}

// Remove
const creatRemoveBtn = (id) => {
  const removeBtn = document.createElement('button')
  removeBtn.classList.add('remove')
  removeBtn.textContent = 'Remove'

  removeBtn.addEventListener('click', () => {
    const del = removeAct(id)
    return del
  })
  return removeBtn
}

const removeAct = async (del) => {
  try {
    const response = await fetch(`http://localhost:1717/pastry/delete/${del.id}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(`Failed to delete`);
  }
}


// Delivery 
const createDelivery = (source) => {
  // Parent div for button and answer
  const deliveryContainer = document.createElement('div')
  deliveryContainer.classList.add('delivery-part')

  // Button has Delivery?
  const deliveryButton = document.createElement('button')
  deliveryButton.textContent = 'Has delivery?'
  deliveryButton.classList.add('delivery-button')

  // Answer: has delivery?
  const deliveryAnswer = document.createElement('p')
  deliveryAnswer.textContent = 'Unknown'
  deliveryAnswer.classList.add('delivery-answer') 

  // new request
  deliveryButton.addEventListener('click', () => {
    changeAnswer(source, deliveryAnswer)
  })

  deliveryContainer.append(deliveryButton, deliveryAnswer)
  return deliveryContainer
}

async function changeAnswer(source, deliveryAnswer) {
  const response = await fetch(`http://localhost:1717/pastry/detail/${source.id}`)
  const data = await response.json()

  const glovo = data.hasDelivery
  if (glovo) {
    deliveryAnswer.innerHTML = 'yes'
  } else {
    deliveryAnswer.innerHTML = 'no'
  }
}


// Show pastry
async function renderAllPastry() {
  try {
    const response = await fetch(`${API}/pastry/`)
    const data = await response.json()
    
    const cardContainer = document.getElementById('card-container')
    cardContainer.classList.add('card-container')
    
    data.forEach(item => {

      const card = document.createElement('div')
      card.classList.add('card')
    
      // Setting name
      const pastryName = creatName(item)
      card.append(pastryName)
  

      // Setting image
      const pastryImage = createImg(item)
      card.append(pastryImage)


      const stock = creatStock(item.inStock)
      const cost = creatCost(item.cost)
      card.append(stock, cost)

      const change = creatSaveBtn(item.id, stock, cost)
      card.append(change)

      // remove
      const removePastry = creatRemoveBtn(item)
      card.append(removePastry)
      

      // Setting delivery forms
      const pastryDelivery = createDelivery(item)
      card.append(pastryDelivery)


      cardContainer.append(card)
    })
  } catch {
    console.log('try');
  }
}

renderAllPastry()