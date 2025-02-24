class ImageProcessor {
    constructor() {
        this.MAX_SIZE = 4096;
        this.processedImage = null;
    }

    async processFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > this.MAX_SIZE || img.height > this.MAX_SIZE) {
                        reject(new Error(`图片尺寸过大（${img.width}x${img.height}），请上传宽度和高度不超过 ${this.MAX_SIZE} 像素的图片。`));
                        return;
                    }
                    this.processImage(img);
                    resolve(this.processedImage);
                };
                img.onerror = () => reject(new Error("图片加载失败，请确保上传的文件是有效的图片格式。"));
                img.src = event.target.result;
            };
            reader.onerror = () => reject(new Error("文件读取失败，请重试。"));
            reader.readAsDataURL(file);
        });
    }

    processImage(img) {
        this.processedImage = { originalImg: img };
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = document.getElementById("scaleSlider").value / 100;
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const preview = document.getElementById("preview");
        preview.innerHTML = "";
        preview.appendChild(canvas);

        this.processedImage.width = width;
        this.processedImage.height = height;
        this.processedImage.data = ctx.getImageData(0, 0, width, height).data;
    }

    getProcessedImage() {
        return this.processedImage;
    }
}
