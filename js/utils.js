class Utils {
    static updateProgress(percent) {
        const progressBar = document.getElementById("progressBar");
        const progressText = document.getElementById("progressText");
        const roundedPercent = Math.round(percent);
        
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `处理中 ${roundedPercent}%`;
    }

    static showLoading() {
        document.getElementById("loading").style.display = "block";
        document.getElementById("generateBtn").disabled = true;
    }

    static hideLoading() {
        document.getElementById("loading").style.display = "none";
        document.getElementById("generateBtn").disabled = false;
        // 重置进度条
        Utils.updateProgress(0);
    }

    static showError(message) {
        alert(message);
    }

    static setupDropZone() {
        const dropZone = document.getElementById("dropZone");
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            });
        });

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                document.getElementById('imageInput').files = files;
                // 触发change事件
                document.getElementById('imageInput').dispatchEvent(new Event('change'));
            }
        });
    }
}