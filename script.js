// Element references
const connectCircleInput = document.getElementById('joinCircle')
const transparencyInput = document.getElementById('removeTransparency')
const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')

const particleArray = []

canvas.width = innerWidth
canvas.height = innerHeight


function getTransparencyValue(){
    return transparencyInput.value / 10 * 0.1
}

function generateRandomColor() {
    return `rgba(${Math.random() * 255 + 1},${Math.random() * 255 + 1},${Math.random() * 255 + 1},${Math.random()})`
}

window.addEventListener('resize', ()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
})

document.body.addEventListener('mousemove', (event)=>{
    for(let i = 0; i<5; i++){
        particleArray.push(new Particle(event.clientX, event.clientY, generateRandomColor(), context))
    }
})

document.body.addEventListener('touchmove', (event)=>{
    const touch = event.touches[0]
    for(let i = 0; i<10; i++){
        particleArray.push(new Particle(touch.clientX, touch.clientY, generateRandomColor(), context))
    }
})


function connectCircles(particle1, particle2){ 
    // Parameters are instance of Particle class

    // Math formula to find the distance between two particles in canvas
    const dx = particle1.x - particle2.x
    const dy = particle1.y - particle2.y
    const distance = Math.sqrt(dx*dx + dy*dy) // Pythagoras theorem

    // If distance is greater than 100px then don'st connect two circles
    if(distance < 100){
        context.beginPath()
        context.moveTo(particle1.x, particle1.y)
        context.lineTo(particle2.x, particle2.y)
        context.strokeStyle = particle1.color
        context.stroke()
    }

}

function animate(){
    context.fillStyle = `rgba(0,0,0,${getTransparencyValue()})`
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    particleArray.forEach((particle, i)=>{
        particle.draw()
        if(connectCircleInput.checked){
            for(let j = i; j<particleArray.length; j++){
                connectCircles(particle, particleArray[j])
            }
        }

        if(particle.size <= 0){
            particleArray.splice(i,1) // Remove the particle from array if size is less than 0
        }
    })
    requestAnimationFrame(animate)
}

animate()