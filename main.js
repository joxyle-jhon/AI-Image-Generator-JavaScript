const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".imaghe-gallery");

const OPENAI_API_KEY  = "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";
let isImageGenerating = false;

const updateImageCard = (imageDataArray) => {
    imageDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelector(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;
        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href", aiGeneratedImg);
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);

        }
    });
}

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

        if(!response.ok) throw new Error("Failed to generate images! Please try again.")


        const { data } = await response.json();
        updateImageCard([...data]);
        
    } catch (error) {
        alert(error.messsage);
    } finally {
        isImageGenerating = false;  
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    if(isImageGenerating) return;
    isImageGenerating = true;
    
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