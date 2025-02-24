class ColorUtils {
    static rgbToHex(r, g, b) {
        return "FF" +
            r.toString(16).padStart(2, "0").toUpperCase() +
            g.toString(16).padStart(2, "0").toUpperCase() +
            b.toString(16).padStart(2, "0").toUpperCase();
    }

    static async quantizeColors(data, width, height, maxColors) {
        const colors = new Set();
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            colors.add(this.rgbToHex(r, g, b));
        }
        const colorArray = Array.from(colors);
        if (colorArray.length <= maxColors) return colorArray.map(c => [c]);

        const step = Math.floor(colorArray.length / maxColors);
        const result = [];
        for (let i = 0; i < colorArray.length && result.length < maxColors; i += step) {
            result.push([colorArray[i]]);
        }
        return result;
    }

    static findClosestColor(hex, colorTable) {
        const r1 = parseInt(hex.slice(2, 4), 16);
        const g1 = parseInt(hex.slice(4, 6), 16);
        const b1 = parseInt(hex.slice(6, 8), 16);

        let minDist = Infinity;
        let closest = colorTable[0][0];
        for (const [color] of colorTable) {
            const r2 = parseInt(color.slice(2, 4), 16);
            const g2 = parseInt(color.slice(4, 6), 16);
            const b2 = parseInt(color.slice(6, 8), 16);
            const dist = Math.sqrt(
                (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
            );
            if (dist < minDist) {
                minDist = dist;
                closest = color;
            }
        }
        return closest;
    }
}