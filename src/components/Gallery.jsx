import React from "react";

const Gallery = ({ imageUrls }) => {
    return(
        <div className="gallery">
            {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`image-${index}`} />
            ) )}
        </div>
    )
}
export default Gallery;