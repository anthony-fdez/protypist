import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, subject, screen, keywords }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="subject" content={subject} />
      <meta name="rating" content="General" />
      <meta name="referrer" content="no-referrer" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="keywords" content={keywords} />

      <title>{title}</title>
      <link rel="canonical" href={`https://protypist.app/${screen}`} />
    </Helmet>
  );
};

export default SEO;
