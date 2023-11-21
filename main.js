const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".imaghe-gallery");


const handleFormSubmission = (e) => {
    e.preventDefault();
    
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    const imgCardMarkup = Array.from({lenght: userImgQuantity}, () => 
        `<div class="img-crd loading">
            <img src="image-loader.svg" alt="image">
            <a href="#" class="download-btn">
                <img src="download.svg" alt="download icon">
             </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
}
generateForm.addEventListener("submit", handleFormSubmission);