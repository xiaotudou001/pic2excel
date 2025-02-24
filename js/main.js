let imageProcessor = new ImageProcessor();

document.addEventListener('DOMContentLoaded', function() {
    // 初始化拖放区域
    Utils.setupDropZone();

    // 图片上传处理
    document.getElementById("imageInput").addEventListener("change", async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            await imageProcessor.processFile(file);
        } catch (error) {
            Utils.showError(error.message);
        }
    });

    // 缩放控制
    document.getElementById("scaleSlider").addEventListener("input", function(e) {
        document.getElementById("scaleValue").textContent = `${e.target.value}%`;
        const processedImage = imageProcessor.getProcessedImage();
        if (processedImage) {
            imageProcessor.processImage(processedImage.originalImg);
        }
    });
});

async function generateExcel() {
    const processedImage = imageProcessor.getProcessedImage();
    if (!processedImage) {
        Utils.showError("请先上传图片");
        return;
    }

    Utils.showLoading();

    try {
        const excelGenerator = new ExcelGenerator(processedImage);
        const wb = await excelGenerator.generate((progress) => {
            Utils.updateProgress(progress);
        });
        
        ExcelGenerator.saveWorkbook(wb, "pixel-art.xlsx");
    } catch (error) {
        console.error("生成错误:", error);
        Utils.showError("生成 Excel 文件失败，请重试或检查图片是否有效。");
    } finally {
        Utils.hideLoading();
    }
}