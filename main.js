const buttonSaves = document.querySelectorAll('.save')
const buttonRemoves = document.querySelectorAll('.remove')
const buttonDeliveries = document.querySelectorAll('.has-delivery')
const statusDeliveries = document.querySelectorAll('.delivery-status')
const images = document.querySelectorAll('.item__photo')
const titles = document.querySelectorAll('.title')
const allItems = document.querySelectorAll('.item')

const inputStocks = document.querySelectorAll('.stock')
const inputCosts = document.querySelectorAll('.cost')

const api = fetch(`http://localhost:1717/pastry`)
const allId = []


api
    .then(x => {
        return x.json()
    })
    .then(async (responsePastry) => {
        responsePastry.forEach(k => {
            allId.push(k.id)
        })
        
        const redactPastry = async (id, data) => {
            console.log(data)
            console.log(id)

            const response = await fetch(`http://localhost:1717/pastry/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              })        
              if (!response.ok) {
                const message = await response.text()
                console.error(`Error updating pastry: ${message}`)
                return
              }
              console.log(JSON.stringify(data))
        } 

        const removePastry = async (id, index) => {
            allItems[index].style.display = 'none'
            const response = await fetch(`http://localhost:1717/pastry/delete/${id}`, {
                method: 'DELETE'
            })
            
            console.log(response)
        }

            setTimeout(() => {
                for (let i = 0; i < allId.length; i++) {
                console.log(i)
                console.log(buttonSaves[i])
                buttonRemoves[i].addEventListener('click', () => {
                    removePastry(allId[i], i)
                })
                buttonSaves[i].addEventListener('click', () => {
                    console.log(inputStocks[i].value)
                    console.log(inputCosts[i].value)
                    redactPastry(allId[i], {
                    inStock: Number(`${inputStocks[i].value}`),
                    cost: Number(`${inputCosts[i].value}`)
                })
    
                })
            }
            }, 2000)


        for (let i = 0; i<responsePastry.length; i++) {

            const timerImages = await responsePastry[i]
            setTimeout(() => {
                images[i].style.backgroundImage = `url(${responsePastry[i].image})`
                titles[i].textContent = `${responsePastry[i].name}`
                fetch(`http://localhost:1717/pastry/detail/${responsePastry[i].id}`)  
                .then(x => x.json() )
                .then(async (responseDetails) => {

                    buttonDeliveries[i].addEventListener('click', () => {
                    statusDeliveries[i].textContent = `${responseDetails.hasDelivery}`
        
                    })
                })         
            }, timerImages)
        }
        for (let i = 0; i<responsePastry.length; i++) {

        }
    })

