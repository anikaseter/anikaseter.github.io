const canvas = document.createElement('canvas')
  const c = canvas.getContext('2d')
  document.body.style.margin = 0
  document.body.style.overflow = 'hidden'

  canvas.width = innerWidth * 2
  canvas.height = innerHeight * 2
  document.body.append(canvas)
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'

  c.fillStyle = 'rgba(108, 108, 108, 1)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  function ring(
    t = 0,
    r = Math.min(innerWidth, innerHeight) * .4,
    noiz = Math.min(innerWidth, innerHeight) * .4,
    cx = innerWidth,
    cy = innerHeight,
    num = 100,
    height = 74,
    grad = 1.2,
    step = (Math.PI * 2) / num
  ) {

    let rads = []
    for (let i = 0; i < num; i++) {
      rads.push(Math.random())
    }

    for (let j = 0; j < height; j++) {
      let rColModifier = 1.19 
      let gColModifier = 1 
      let bColModifier = 1.34 

      let Rcol = (108 + j * grad) * rColModifier
      let Gcol = (108 + j * grad) * gColModifier
      let Bcol = (108 + j * grad) * bColModifier
      noiz *= .96 * smooth
      c.fillStyle = `rgba(${Rcol}, ${Gcol}, ${Bcol}, 1)`
      c.beginPath()
      for (let i = 0; i < num; i++) {
        let ro = r + rads[i] * noiz
        //
        let x = cx + ro * Math.cos(t)
        let y = cy + ro * Math.sin(t) - j * 5
        t += step


        c[i === 0 ? 'moveTo' : 'lineTo']
          (x, y)
      }
      t = 0
      for (let i = 0; i < num; i++) {
        let ro = r * .8
        let x = cx + ro * Math.cos(t)
        let y = cy + ro * Math.sin(t) - j * 5
        t += step
        c[i === 0 ? 'moveTo' : 'lineTo']
          (x, y)
      }
      c.fill('evenodd')
    }
  }

  smooth = 1
  c.save()
  c.scale(1, .58)
  c.translate(0, innerHeight * 1.4)
  ring(
    0,
    Math.min(innerWidth, innerHeight) * .2,
    noiz = Math.min(innerWidth, innerHeight) * .4,
    innerWidth / 2, -innerHeight * .7,
    50, 70, .8)

  smooth = .94
  ring(
    0,
    Math.min(innerWidth, innerHeight) * .2,
    noiz = Math.min(innerWidth, innerHeight) * .4,
    innerWidth / 2, innerHeight * .3,
    50, 35, 1.2)

  smooth = 1 
  ring(
    0,
    Math.min(innerWidth, innerHeight) * .2,
    noiz = Math.min(innerWidth, innerHeight) * .4,
    innerWidth * 1.5, -innerHeight * .3,
    40, 70, 1.05)

  ring(
    t = 0,
    r = Math.min(innerWidth, innerHeight) * .4,
    noiz = Math.min(innerWidth, innerHeight) * .4,
    cx = innerWidth,
    cy = innerHeight * 1.4,
    210, 122, .46
  )

  const canvas2 = document.createElement('canvas')
  const c2 = canvas2.getContext('2d')

  canvas2.width = innerWidth * 2
  canvas2.height = innerHeight * 2

  //c2.filter = 'blur(20px)'

  c2.drawImage(canvas, 0, 0, canvas.width, canvas.height)

  c2.globalAlpha = .4
  for (let i = 0 ; i < 50; i++) {
   c2.drawImage(canvas2, -4, -4, canvas.width + 8, canvas.height + 6)
  }

  c.restore()
  c.globalCompositeOperation = 'multiply'
  c.globalAlpha = .5
  c.drawImage(canvas2, 0, 0)
  canvas.style.filter = 'brightness(1.2) contrast(1.8) sepia(.3)'