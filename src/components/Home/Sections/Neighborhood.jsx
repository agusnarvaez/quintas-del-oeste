import Scroll from'react-scroll'
import { useEffect, useState,useMemo } from 'react'

import '../../../assets/styles/neighborhood.css'

import image1 from '../../../assets/gallery/1- ACCESO - QUINTAS -FINAL-s.jpg'
import image2 from '../../../assets/gallery/2 - BOULEVARD - QUINTAS -FINAL-s.jpg'
import image3 from '../../../assets/gallery/3 - BOULEVARD -  QUINTAS - FINAL-s.jpg'
import image4 from '../../../assets/gallery/4 - SUM -  QUINTAS - FINAL-s.jpg'
import image5 from '../../../assets/gallery/5 - PEATONAL PARQUE -  QUINTAS - FINAL-s.jpg'
import image6 from '../../../assets/gallery/6 - VIVIENDAS  -  QUINTAS - FINAL-s.jpg'
import image7 from '../../../assets/gallery/7 - CIRCUITO -  QUINTAS - FINAL-s.jpg'
import image8 from '../../../assets/gallery/8 - CIRCUITO 2 -  QUINTAS - FINAL-s.jpg'
import image9 from '../../../assets/gallery/11 - PARQUE AEREA - QUINTAS -FINAL-s.jpg'
import image10 from '../../../assets/gallery/12 - ACCESO AEREA - QUINTAS - FINAL-s.jpg'

import ImageComponent from '../../ImageComponent'

export default function Neighborhood() {
  var Element  = Scroll.Element

  const images = useMemo(()=>[
    {
      hash:'LYEfveXAMwf+yZxuV?ofIpa#tQj]',
      image:image1
    },
    {
      hash:'LRGS4Bs:IVxa?wofxaWC.AR%Rjof',
      image:image2
    },
    {
      hash:'LbFG2yI9WUtSyZITxubJWaxukCV@',
      image:image3
    },
    {
      hash:'LcHx={IA4mt8?wM{MxR+IpaxxuV@',
      image:image4
    },
    {
      hash:'LQD0o%tSDgt8t:t8V=ay9GM{x[Rj',
      image:image5
    },
    {
      hash:'LCCjFXIVDNx^F*n$RNj^V|jYtRM{',
      image:image6
    },
    {
      hash:'LJCZ;NIqDgt8JIxtV;WCt3V[x]WB',
      image:image7
    },
    {
      hash:'LBCQGGRl00NE0uoy-is.?ZoMIoNH',
      image:image8
    },
    {
      hash:'L9F~BHV$9F?b~ojcM|Rk0N?E-;9G',
      image:image9
    },
    {
      hash:'L7F~EZ0300^+%$?ZxHIn_Nxu-ooN',
      image:image10
    }
  ],[ ])

  const [mainImage,setMainImage]=useState({
    hash: images[0].hash,
    image: images[0].image
  })

  const handleImageClick = (selectedImage) => {
    setMainImage({
      hash:selectedImage.hash,
      image:selectedImage.image
    })
  }


  useEffect(() => {
    /* const changeMainImage = (newIndex) => {
      var index = 0
      var interval = setInterval(() => {
        if(index===images.length-1){
          index=0
        }else{
          index++
        }
        setMainImage({
          hash:images[index].hash,
          image:images[index].image
        })
      }, 5000)
      return () => clearInterval(interval)
    }
    changeMainImage() */
  },[mainImage])

  return (
    <Element className="container-fluid" id="neighborhood" name='neighborhood'>
      <section className='gallery-main-image'>
        <ImageComponent
          src={mainImage.image}
          alt={'imagen'}
          className='img-fluid gallery-main-image'
          blurClass='img-fluid'
          hash={mainImage.hash}
          width='100%'
          height='100%'
        />
      </section>

      <ul className='gallery-list-image'>
        {images.map((image,index) => {
          return (
            <li key={index}
            className={`${mainImage.hash === image.hash ? 'selected-image' : ''}`} // Aplicar estilo si es la imagen seleccionada
            onClick={() => handleImageClick(image)} // Manejador de evento click
            >
              <ImageComponent
                src={image.image}
                alt={'imagen'}
                className='img-fluid'
                blurClass='img-fluid'
                hash={image.hash}
                height='100%'

              />
            </li>
          )
        })}
      </ul>
    </Element>
  )
}