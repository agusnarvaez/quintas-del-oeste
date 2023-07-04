
//* REACT-HELMET
import { Helmet,HelmetProvider } from 'react-helmet-async';

export default function HelmetData({metaData}) {

    return (
        <HelmetProvider>
            <Helmet defer={false}>
                <title>Quintas del Oeste | {metaData.title}</title>

                <meta name="description" content={metaData.description} />

                <meta name="keywords" content={metaData.keywords} />

                <meta property="og:title" content={`Quintas del Oeste | ${metaData.title}`}/>

                <meta property="og:description" content={metaData.description}/>

                <link rel="canonical" href={metaData.cannonical}/>
            </Helmet>
        </HelmetProvider>
    )
}