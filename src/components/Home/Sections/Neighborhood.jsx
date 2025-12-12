import Scroll from'react-scroll'
import { useEffect, useState, useMemo, useRef } from 'react'

import '../../../assets/styles/neighborhood.css'

import ImageComponent from '../../ImageComponent'

export default function Neighborhood() {
  var Element  = Scroll.Element
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [imageModules, setImageModules] = useState([])
  const sectionRef = useRef(null)

  // Definir solo los hashes y rutas, NO importar las imágenes aún
  const imageData = useMemo(()=>[
    {
      hash:'LYEfveXAMwf+yZxuV?ofIpa#tQj]',
      path: '/src/assets/gallery/1- ACCESO - QUINTAS -FINAL-s.webp'
    },
    {
      hash:'LRGS4Bs:IVxa?wofxaWC.AR%Rjof',
      path: '/src/assets/gallery/2 - BOULEVARD - QUINTAS -FINAL-s.webp'
    },
    {
      hash:'LbFG2yI9WUtSyZITxubJWaxukCV@',
      path: '/src/assets/gallery/3 - BOULEVARD - QUINTAS - FINAL-s.webp'
    },
    {
      hash:'LcHx={IA4mt8?wM{MxR+IpaxxuV@',
      path: '/src/assets/gallery/4 - SUM - QUINTAS - FINAL-s.webp'
    },
    {
      hash:'LQD0o%tSDgt8t:t8V=ay9GM{x[Rj',
      path: '/src/assets/gallery/5 - PEATONAL PARQUE - QUINTAS - FINAL-s.webp'
    },
    {
      hash:'LCCjFXIVDNx^F*n$RNj^V|jYtRM{',
      path: '/src/assets/gallery/6 - VIVIENDAS - QUINTAS - FINAL-s.webp'
    },
    {
      hash:'LJCZ;NIqDgt8JIxtV;WCt3V[x]WB',
      path: '/src/assets/gallery/7 - CIRCUITO - QUINTAS - FINAL-s.webp'
    },
    {
      hash:'LBCQGGRl00NE0uoy-is.?ZoMIoNH',
      path: '/src/assets/gallery/8 - CIRCUITO 2 - QUINTAS - FINAL-s.webp'
    },
    {
      hash:'L9F~BHV$9F?b~ojcM|Rk0N?E-;9G',
      path: '/src/assets/gallery/11 - PARQUE AEREA - QUINTAS -FINAL-s.webp'
    },
    {
      hash:'L7F~EZ0300^+%$?ZxHIn_Nxu-ooN',
      path: '/src/assets/gallery/12 - ACCESO AEREA - QUINTAS - FINAL-s.webp'
    }
  ], [])

  // Cargar imágenes dinámicamente cuando el componente es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !imagesLoaded) {
            // Cargar todas las imágenes dinámicamente
            Promise.all([
              import('../../../assets/gallery/1- ACCESO - QUINTAS -FINAL-s.webp'),
              import('../../../assets/gallery/2 - BOULEVARD - QUINTAS -FINAL-s.webp'),
              import('../../../assets/gallery/3 - BOULEVARD - QUINTAS - FINAL-s.webp'),
              import('../../../assets/gallery/4 - SUM - QUINTAS - FINAL-s.webp'),
              import('../../../assets/gallery/5 - PEATONAL PARQUE - QUINTAS - FINAL-s.webp'),
              import('../../../assets/gallery/6 - VIVIENDAS - QUINTAS - FINAL-s.webp'),
              import('../../../assets/gallery/7 - CIRCUITO - QUINTAS - FINAL-s.webp'),
              import('../../../assets/gallery/8 - CIRCUITO 2 - QUINTAS - FINAL-s.webp'),
              import('../../../assets/gallery/11 - PARQUE AEREA - QUINTAS -FINAL-s.webp'),
              import('../../../assets/gallery/12 - ACCESO AEREA - QUINTAS - FINAL-s.webp')
            ]).then((modules) => {
              const loadedImages = modules.map((module, index) => ({
                hash: imageData[index].hash,
                image: module.default
              }))
              setImageModules(loadedImages)
              setImagesLoaded(true)
            })
          }
        })
      },
      {
        rootMargin: '200px', // Cargar 200px antes de que sea visible
        threshold: 0.01
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [imagesLoaded, imageData])

  const [mainImage, setMainImage] = useState(null)

  // Establecer imagen principal cuando las imágenes se carguen
  useEffect(() => {
    if (imageModules.length > 0 && !mainImage) {
      setMainImage({
        hash: imageModules[0].hash,
        image: imageModules[0].image
      })
    }
  }, [imageModules, mainImage])

  const handleImageClick = (selectedImage) => {
    setMainImage({
      hash: selectedImage.hash,
      image: selectedImage.image
    })
  }

  const nextImage = () => {
    if (!imageModules.length) return
    var index = imageModules.findIndex(image => image.hash === mainImage.hash)
    if (index === imageModules.length - 1) {
      index = 0
    } else {
      index++
    }
    setMainImage({
      hash: imageModules[index].hash,
      image: imageModules[index].image
    })
  }

  const previousImage = () => {
    if (!imageModules.length) return
    var index = imageModules.findIndex(image => image.hash === mainImage.hash)
    if (index === 0) {
      index = imageModules.length - 1
    } else {
      index--
    }
    setMainImage({
      hash: imageModules[index].hash,
      image: imageModules[index].image
    })
  }

  return (
    <div ref={sectionRef}>
      <Element className="container-fluid" id="neighborhood" name='neighborhood'>
        {/* Mostrar placeholder mientras las imágenes se cargan */}
        {!imagesLoaded ? (
          <section className='gallery-main-image d-flex justify-content-center align-items-center' style={{minHeight: '400px'}}>
            <div className="text-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando galería...</span>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className='gallery-main-image'>
              <i onClick={previousImage} className='fa fa-arrow-left' aria-label='Anterior'></i>
              {mainImage && (
                <ImageComponent
                  src={mainImage.image}
                  alt={'imagen'}
                  className='img-fluid gallery-main-image'
                  blurClass='img-fluid'
                  hash={mainImage.hash}
                  width='100%'
                  height='100%'
                />
              )}
              <i onClick={nextImage} className='fa fa-arrow-right' aria-label='Siguiente'></i>
            </section>

            <ul className='gallery-list-image'>
              {imageModules.map((image, index) => {
                return (
                  <li
                    key={index}
                    className={`${mainImage && mainImage.hash === image.hash ? 'selected-image' : ''}`}
                    onClick={() => handleImageClick(image)}
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
          </>
        )}
      </Element>
    </div>
  )
}