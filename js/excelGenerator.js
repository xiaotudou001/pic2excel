class ExcelGenerator {
    constructor(processedImage) {
        this.processedImage = processedImage;
        this.MAX_COLORS = 256;
    }

    async generate(onProgress) {
        const wb = XLSX.utils.book_new();
        const wsData = Array(this.processedImage.height)
            .fill()
            .map(() => Array(this.processedImage.width).fill(""));
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        const colorTable = await ColorUtils.quantizeColors(
            this.processedImage.data,
            this.processedImage.width,
            this.processedImage.height,
            this.MAX_COLORS
        );

        const totalCells = this.processedImage.height * this.processedImage.width;
        let processedCells = 0;

        for (let y = 0; y < this.processedImage.height; y++) {
            for (let x = 0; x < this.processedImage.width; x++) {
                const idx = (y * this.processedImage.width + x) * 4;
                const r = this.processedImage.data[idx];
                const g = this.processedImage.data[idx + 1];
                const b = this.processedImage.data[idx + 2];
                const hex = ColorUtils.rgbToHex(r, g, b);
                const mappedHex = ColorUtils.findClosestColor(hex, colorTable);

                const cellAddress = XLSX.utils.encode_cell({ c: x, r: y });
                ws[cellAddress] = {
                    t: "s",
                    v: "",
                    s: {
                        fill: {
                            patternType: "solid",
                            fgColor: { rgb: mappedHex },
                        },
                    },
                };

                processedCells++;
                if (processedCells % 100 === 0) {
                    onProgress((processedCells / totalCells) * 100);
                }
            }
        }

        ws["!cols"] = Array(this.processedImage.width).fill({ wch: 2 });
        ws["!rows"] = Array(this.processedImage.height).fill({ hpt: 15 });

        XLSX.utils.book_append_sheet(wb, ws, "像素画");
        onProgress(100);

        return wb;
    }

    static saveWorkbook(wb, filename) {
        const wbout = XLSX.write(wb, {
            type: "array",
            bookType: "xlsx",
            bookSST: true,
        });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        ExcelGenerator.saveAs(blob, filename);
    }

    static saveAs(blob, name) {
        if (!window.URL || !window.URL.createObjectURL) {
            throw new Error("当前浏览器不支持文件下载，请使用现代浏览器（如 Chrome 或 Firefox）。");
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}