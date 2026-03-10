import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = "Darshanam";
  const defaultTitle = "Darshanam - Ancient Wisdom for Modern Minds";
  const defaultDescription =
    "Explore the Bhagavad Gita and ancient Indian philosophies (Darshanas) with an AI-powered spiritual guide.";
  const defaultImage = "/swastika.png"; // Fallback image from public directory

  const seo = {
    title: title ? `${title} | ${siteName}` : defaultTitle,
    description: description || defaultDescription,
    keywords:
      keywords ||
      "Bhagavad Gita, Darshana, Indian Philosophy, Spirituality, Vedanta, Yoga, Ask Krishna",
    image: image || defaultImage,
    url: url || (typeof window !== "undefined" ? window.location.href : ""),
  };

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};

export default SEO;
