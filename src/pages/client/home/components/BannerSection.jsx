import React from "react";

const BannerSection = ({ src, fallback }) => {
  const styles = {
    bannerWrap: {
      width: "100%",
      height: 700,
      borderRadius: 8,
      marginBottom: 20,
      overflow: "hidden",
    },
    bannerImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  };

  return (
    <div style={styles.bannerWrap}>
      <img
        src={src}
        alt="Banner"
        style={styles.bannerImg}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallback;
        }}
      />
    </div>
  );
};

export default BannerSection;
