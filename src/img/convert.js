import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./";       // pasta original
const outputDir = "./img-webp"; // pasta de saída

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    const inputPath = path.join(inputDir, file);

    // Mantém o mesmo nome mas garante que seja webp real
    const outputPath = path.join(outputDir, path.parse(file).name + ".webp");

    sharp(inputPath)
      .resize(1200) // opcional: limita a largura máxima
      .webp({ quality: 75 }) // conversão real para webp
      .toFile(outputPath)
      .then(() => console.log(`✅ Convertido: ${file} -> ${outputPath}`))
      .catch(err => console.error(`❌ Erro em ${file}:`, err));
  }
});
