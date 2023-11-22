const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".imaghe-gallery");

const OPENAI_API_KEY  = "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";

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                promt: userPrompt,
                n: userImgQuantity,
                size: "512x512",
                response_format: "b64_json"
            })
        });


        const { data } = await response.json();
        console.log(data)
        
    } catch (error) {
        console.log(error);
    }
}

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
    generateAiImages(userPrompt,userImgQuantity);
}
generateForm.addEventListener("submit", handleFormSubmission);