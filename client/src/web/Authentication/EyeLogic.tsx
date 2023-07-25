import { Eyelid_1, Eyelid_2 } from './Eye'
import { useState, useEffect } from 'react' 

export const Eye:React.FC = () => {
    const [eyelid, setEyelid] = useState(Eyelid_2)
  
    const hover = (e: MouseEvent) => {
      const eye = document.getElementById('Eye')
      const eyeBall = document.getElementById('EyeCircle')
      const eyeBall2 = document.getElementById('Eyeball')
  
      if (eye !== null && eyeBall !== null && eyeBall2 !== null) {
        const eyeX = eye.getBoundingClientRect().left + 57 + 21/2 + 4
        const eyeY = eye.getBoundingClientRect().top + 57 + 21/2 + 4
  
        let mousePosX = e.clientX
        let mousePosY = e.clientY
  
        let dist = Math.sqrt(Math.pow(mousePosX - eyeX,2) + Math.pow(mousePosY - eyeY,2))
        let scaledDist = dist * 1/60
  
        let radian = Math.atan2(mousePosY - eyeY, mousePosX - eyeX)
  
        let scaledX = Math.cos(radian) * scaledDist * 1.1
        let scaledY = Math.sin(radian) * scaledDist * 1.1
  
        eyeBall2.style.transform = 'translate(' + scaledX + 'px, ' + scaledY + 'px)'      
  
        if (eye.matches(':hover')) {
          setEyelid(Eyelid_1)
        } else {
          setEyelid(Eyelid_2)
        }
      }
    }
  
    useEffect(() => {
      window.addEventListener('mousemove', hover)
      return () => {
        window.removeEventListener('mousemove', hover)
      }
    })
  
    return (
      <div className='Eye_Outer_Container'>
        <div className='Eyebrow_1'></div>
        <div className='Eyebrow_2'></div>
        <div className='Eyebrow_3'></div>
        <div className='Eye' id='Eye'>
          <div className='EyeCircle' id='EyeCircle'>
            <div className='EyeBall' id='Eyeball'>
              <div className='EyeBall2'></div>
            </div>
          </div>
          <div className='Eyelid' style={eyelid}></div>
        </div>
      </div>
    )
}