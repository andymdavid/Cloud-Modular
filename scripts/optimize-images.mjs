import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const PUBLIC_DIR = './public';
const MIN_SIZE_KB = 500; // Only convert files larger than 500KB

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  const files = await readdir(PUBLIC_DIR);
  const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  let totalSaved = 0;
  let converted = 0;

  for (const file of imageFiles) {
    const filePath = join(PUBLIC_DIR, file);
    const stats = await stat(filePath);
    const sizeKB = stats.size / 1024;

    if (sizeKB < MIN_SIZE_KB) {
      console.log(`⏭️  Skipping ${file} (${sizeKB.toFixed(0)}KB - below threshold)`);
      continue;
    }

    const { name } = parse(file);
    const webpPath = join(PUBLIC_DIR, `${name}.webp`);

    try {
      const originalSize = stats.size;

      await sharp(filePath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);

      const newStats = await stat(webpPath);
      const newSize = newStats.size;
      const savedKB = (originalSize - newSize) / 1024;
      const savedPercent = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${file} → ${name}.webp`);
      console.log(`   ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (saved ${savedPercent}%)`);

      totalSaved += savedKB;
      converted++;
    } catch (err) {
      console.error(`❌ Error converting ${file}:`, err.message);
    }
  }

  console.log(`\n✨ Done! Converted ${converted} images.`);
  console.log(`💾 Total space saved: ${(totalSaved/1024).toFixed(2)}MB`);
  console.log('\n⚠️  Note: Update your code to use .webp files and remove original PNGs when ready.');
}

optimizeImages().catch(console.error);
