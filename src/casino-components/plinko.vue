<script async setup>
import Matter from 'matter-js'
import { lerpColor } from '../services/utils'
import { onMounted } from 'vue'

onMounted(()=>{
    // THE FOLLOWING IS SAMPLE CODE FROM GAMBLE V1

    // const PLINKO_WIDTH = 1000 * 2
    // const PLINKO_HEIGHT = 700 * 2
    // const PLINKO_X_CENTER = PLINKO_WIDTH / 2
    // const BOUNCE = 0.5
    // const ROWS = 17
    // const PEG_SIZE = PLINKO_WIDTH / ROWS / 15
    // const PEG_SPACING_X = PLINKO_WIDTH / (ROWS / 0.8)
    // const PEG_SPACING_Y = PLINKO_HEIGHT / (ROWS / 0.9)
    // const PEG_OFFSET_Y = 0
    // const BALL_SIZE = PLINKO_WIDTH / ROWS / 5 + 1
    // const RIGGEDNESS = 0.1
    // const MIN_MULTPLIER = 0.125

    // const MULTPLIER_SCALES = [MIN_MULTPLIER]
    // let padSides = ROWS

    // if ((ROWS - 1) % 2 == 0) {
    //     MULTPLIER_SCALES.push(MIN_MULTPLIER)
    //     padSides -= 1
    // }

    // for (let i = 1; i < padSides / 2; i++) {
    //     MULTPLIER_SCALES.push(MULTPLIER_SCALES[MULTPLIER_SCALES.length - 1] * (i + 1))
    //     MULTPLIER_SCALES.unshift(MULTPLIER_SCALES[0] * (i + 1))
    // }


    // let Engine = Matter.Engine,
    //     Render = Matter.Render,
    //     Runner = Matter.Runner,
    //     Bodies = Matter.Bodies,
    //     Composite = Matter.Composite,
    //     Events = Matter.Events,
    //     Body = Matter.Body;

    // let engine = Engine.create()
    // engine.gravity.y = 1.5
    // console.log(document.querySelector("#plinko"))
    // let render = Render.create({
    //     element: document.querySelector("#plinko"),
    //     engine: engine,
    //     options: {
    //         width: PLINKO_WIDTH,
    //         height: PLINKO_HEIGHT,
    //         background: "transparent",
    //         wireframes: false // <-- important
    //     }
    // })

    // const pegs = []

    // for (let row = 1; row < ROWS; row++) {
    //     let leftMost = PLINKO_X_CENTER - row * (PEG_SPACING_X / 2)
    //     for (let peg = 0; peg <= row; peg++) {
    //         let x = leftMost + peg * PEG_SPACING_X

    //         const pegBody = Bodies.circle(x , row * PEG_SPACING_Y + PEG_OFFSET_Y, PEG_SIZE, {
    //             isStatic: true,
    //             render: {
    //                 strokeStyle: "#ffffff",
    //                 fillStyle: "#ffffff"
    //             },
    //             collisionFilter: {
    //                 category: 0x01,
    //                 mask: 0x10,
    //             }
    //         })

    //         pegBody.isPeg = true

    //         pegs.push(pegBody)
    //     }
    // }

    // const multipliers = []
    // const maxDistance = PLINKO_X_CENTER - pegs[pegs.length - ROWS].position.x

    // for (let pegIndex = pegs.length - ROWS; pegIndex < pegs.length - 1; pegIndex++) {
    //     const peg = pegs[pegIndex]
    //     let distance = PLINKO_X_CENTER - (peg.position.x + (PEG_SPACING_X / 2))
    //     let colorT = Math.abs((distance/(maxDistance)))
    //     // alert(colorT)
    //     // alert(peg.offset)
    //     const multiplier = Bodies.rectangle((peg.position.x + pegs[pegIndex + 1].position.x) / 2 , peg.position.y + PEG_SIZE + PEG_SPACING_Y, (pegs[pegIndex + 1].position.x - peg.position.x) - 5 , 50 * 2, {
    //         isStatic: true,
    //         chamfer: {
    //             radius: 20
    //         },
    //         render: {
    //             fillStyle: lerpColor("#f6f79c","#f50a21",colorT)
    //         }
    //     })

    //     multiplier.multiplier = MULTPLIER_SCALES[MULTPLIER_SCALES.length - (pegs.length - 1 - pegIndex)]
    //     multiplier.originalPosition = structuredClone(multiplier.position)
    //     multipliers.push(multiplier)
        
    // }

    // const dividers = []

    // for (let pegIndex = pegs.length - ROWS; pegIndex < pegs.length; pegIndex++) {
    //     const peg = pegs[pegIndex]
    //     dividers.push(Bodies.rectangle(peg.position.x, peg.position.y + 50, PEG_SIZE - 2, 100, {
    //         isStatic: true,
    //         render: {
    //             fillStyle: "rgba(0,0,0,0.1)"
    //         }
    //     }))
    // }

    // // add all of the bodies to the world
    // Composite.add(engine.world, pegs);
    // Composite.add(engine.world, dividers);
    // Composite.add(engine.world, multipliers);

    // const balls = []

    // const dropBall = ()=>{
    //     const bet = 10 // CHANGE LATER

    //     if (cash < bet || bet < 10) {
    //         return
    //     }

    //     cash -= bet

    //     // $("#cash").innerText = abbreviate(cash)

    //     const ball = Bodies.circle(PLINKO_X_CENTER + ((Math.random() - 0.5) * 30), PEG_OFFSET_Y, BALL_SIZE, {
    //         restitution: BOUNCE,
    //         collisionFilter: {
    //             category: 0x10,
    //             mask: 0x01,
    //         },
    //         render: {
    //             fillStyle: "#f5d63d"
    //         }
    //     })

    //     ball.bet = bet

    //     balls.push(ball)
        
    //     Composite.add(engine.world, ball);
    // }

    // const tweens = []

    // Events.on(engine, 'collisionStart', (event)=>{
    //     event.pairs.forEach(pair => {
    //         if (pair.bodyA.multiplier) {
    //             if (true) {
    //                 // pair.bodyA.tweened = true
    //                 let currentTween = Date.now()
    //                 pair.bodyA.currentTween = currentTween
    //                 const newPosY = pair.bodyA.position.y + 10 - Math.sqrt(pair.bodyA.position.y - pair.bodyA.originalPosition.y)
    //                 console.log(pair.bodyA.originalPosition.y)
        
    //                 const coords = {
    //                     x: pair.bodyA.originalPosition.x,
    //                     y: pair.bodyA.position.y
    //                 }
        
    //                 tweens.push(new Tween(coords).to({
    //                         x: pair.bodyA.originalPosition.x,
    //                         y: newPosY
    //                     }, 100)
    //                     .easing(Easing.Quadratic.InOut)
    //                     .onUpdate(()=>{
    //                         Body.setPosition(pair.bodyA, coords)
    //                     })
    //                     .start())
        
    //                 setTimeout(()=>{
    //                     // setTimeout(() => {
    //                     //     pair.bodyA.tweened = false
    //                     // }, 300)
    //                     const coords = {
    //                         x: pair.bodyA.originalPosition.x,
    //                         y: pair.bodyA.position.y
    //                     }

    //                     tweens.push(new Tween(coords)
    //                         .to({
    //                             x: pair.bodyA.originalPosition.x,
    //                             y: pair.bodyA.originalPosition.y
    //                         }, 300)
    //                         .easing(Easing.Quadratic.InOut)
    //                         .onUpdate(()=>{
    //                             if (currentTween != pair.bodyA.currentTween) {
    //                                 return
    //                             }
    //                             Body.setPosition(pair.bodyA, coords)
    //                         })
    //                         .start())
    //                 }, 350)
    //             }

    //             if (pair.bodyA.multiplier >= 90) {
    //                 confetti({
    //                     particleCount: 10 * Math.log(pair.bodyA.multiplier * 5),
    //                     spread: 180,
    //                     origin: {
    //                         x: 0.5,
    //                         y: 1.5
    //                     },
    //                     startVelocity: 90
    //                 })
    //             }
    //             // let click = new Audio("/assets/sounds/hit.wav")
    //             // click.playbackRate = 1.5
    //             // click.addEventListener('canplaythrough', click.play)
    //             if (pair.bodyA.multiplier > 1) {
    //                 showWinnings(pair.bodyB.bet, pair.bodyB.bet * pair.bodyA.multiplier)
    //             }
    //             cash += pair.bodyB.bet * pair.bodyA.multiplier

    //             setCash(cash)

    //             // $("#cash").innerText = abbreviate(cash)
    //             Composite.remove(engine.world, pair.bodyB)
    //             return
    //         }

    //         // if (pair.bodyA.isPeg) {
    //         //     click.play()
    //         //     click = new Audio("/assets/sounds/click.wav")
    //         // }

    //         if (pair.bodyB.bet && Math.random() < (window.riggedness ? window.riggedness : RIGGEDNESS)) {
    //             if (pair.bodyB.position.x < PLINKO_X_CENTER) {
    //                 Body.setVelocity(pair.bodyB, {
    //                     x: window.inverseRig ? -2 : 2,
    //                     y: pair.bodyB.velocity.y
    //                 })
    //             } else if (pair.bodyB.position.x > PLINKO_X_CENTER) {
    //                 Body.setVelocity(pair.bodyB, {
    //                     x: window.inverseRig ? 2 : -2,
    //                     y: pair.bodyB.velocity.y
    //                 })
    //             }
    //         }
    //     });
    // })

    // // run the renderer
    // Render.run(render);
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: PLINKO_WIDTH, y: PLINKO_HEIGHT }
    // })

    // const coinUrl = "/assets/images/coin.webp"
    // const coinImage = document.createElement("img")
    // coinImage.src = coinUrl

    // Events.on(render, 'afterRender', ()=>{
    //     tweens.forEach((tween)=>{
    //         tween.update(document.timeline.currentTime)
    //     })

    //     const canvas = render.canvas
    //     const ctx = canvas.getContext("2d")

    //     ctx.fillStyle = "#000000"
    //     // ctx.strokeStyle = "#000000"
    //     ctx.font = "bold 24px Arial"

    //     multipliers.forEach((multiplier)=>{
    //         const x = multiplier.position.x - ctx.measureText('x'+multiplier.multiplier.toString()).width / 2, 
    //             y = multiplier.position.y + 18 / 2;
    //         ctx.fillText('x'+multiplier.multiplier.toString(), x, y)
    //         // ctx.strokeText(multiplier.multiplier.toString(), x, y)
    //     })

    //     const allBodies = Composite.allBodies(engine.world)

    //     balls.forEach((ball, index)=>{
    //         if (allBodies.includes(ball)) {
    //             try {
    //                 ctx.translate(ball.position.x, ball.position.y)
    //                 ctx.rotate(ball.angle)
    //                 ctx.drawImage(coinImage, -BALL_SIZE - 1.5, -BALL_SIZE - 1.5, BALL_SIZE * 2 + 3, BALL_SIZE * 2 + 3)
    //                 ctx.rotate(-ball.angle)
    //                 ctx.translate(-ball.position.x, -ball.position.y)
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         } else {
    //             balls.splice(index, 1)
    //         }
    //     })
    // })

    // // create runner
    // let runner = Runner.create();

    // // run the engine
    // Runner.run(runner, engine);
})


</script>

<template>
<h1>Plinko</h1>

<div id="plinko"></div>

</template>

<style scoped>
#plinko {
    background-color: rgba(158, 158, 158, 0.1);
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
}

:deep(canvas) {
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
}

</style>