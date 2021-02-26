let config = {
    title:"",
    description:"",
    url:"",
}
export default {
    title:config.title,
    description:config.description,
    canonical:config.url,
    openGraph: {
      url:  config.url,
      title: config.title,
      description: config.description,
      type: 'website',
      url: config.url,
      site_name: config.title,
      images: [
        {
          url: config.url+'/og.jpg',
          width: 1200,
          height: 630,
          alt: 'OG Image'
      },
      ]
    },
  };
