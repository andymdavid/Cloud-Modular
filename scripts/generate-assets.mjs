import sharp from 'sharp';

const PUBLIC_DIR = './public';

async function generateFavicons() {
  console.log('Generating favicon assets...\n');

  // Use the cloud icon or logo as source
  const sourceImage = `${PUBLIC_DIR}/logo.png`;

  try {
    // Generate apple-touch-icon (180x180)
    await sharp(sourceImage)
      .resize(180, 180, { fit: 'contain', background: { r: 1, g: 1, b: 1, alpha: 1 } })
      .png()
      .toFile(`${PUBLIC_DIR}/apple-touch-icon.png`);
    console.log('✅ Created apple-touch-icon.png (180x180)');

    // Generate icon-192 for PWA
    await sharp(sourceImage)
      .resize(192, 192, { fit: 'contain', background: { r: 1, g: 1, b: 1, alpha: 1 } })
      .png()
      .toFile(`${PUBLIC_DIR}/icon-192.png`);
    console.log('✅ Created icon-192.png (192x192)');

    // Generate icon-512 for PWA
    await sharp(sourceImage)
      .resize(512, 512, { fit: 'contain', background: { r: 1, g: 1, b: 1, alpha: 1 } })
      .png()
      .toFile(`${PUBLIC_DIR}/icon-512.png`);
    console.log('✅ Created icon-512.png (512x512)');

    // Generate favicon.ico (32x32)
    await sharp(sourceImage)
      .resize(32, 32, { fit: 'contain', background: { r: 1, g: 1, b: 1, alpha: 1 } })
      .png()
      .toFile(`${PUBLIC_DIR}/favicon-32.png`);

    // Note: sharp doesn't create .ico directly, but browsers accept PNG favicons
    await sharp(sourceImage)
      .resize(32, 32, { fit: 'contain', background: { r: 1, g: 1, b: 1, alpha: 1 } })
      .png()
      .toFile(`${PUBLIC_DIR}/favicon.png`);
    console.log('✅ Created favicon.png (32x32)');

    // Generate SVG icon placeholder info
    console.log('ℹ️  For icon.svg, use your existing logo SVG or create one');

  } catch (err) {
    console.error('❌ Error generating favicons:', err.message);
  }
}

async function generateOGImage() {
  console.log('\nGenerating Open Graph image...\n');

  try {
    // Create a branded OG image (1200x630)
    // Using hero background with overlay
    const heroImage = `${PUBLIC_DIR}/hero-background.webp`;

    await sharp(heroImage)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .composite([
        {
          // Add a dark overlay for text readability
          input: Buffer.from(
            `<svg width="1200" height="630">
              <defs>
                <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:rgb(1,1,1);stop-opacity:0.7" />
                  <stop offset="50%" style="stop-color:rgb(1,1,1);stop-opacity:0.5" />
                  <stop offset="100%" style="stop-color:rgb(1,1,1);stop-opacity:0.8" />
                </linearGradient>
              </defs>
              <rect width="1200" height="630" fill="url(#overlay)"/>
              <text x="600" y="280" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">Cloud Modular</text>
              <text x="600" y="360" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)" text-anchor="middle">Precision-Engineered Modular Construction</text>
              <text x="600" y="410" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">Perth &amp; Western Australia</text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
      ])
      .png({ quality: 90 })
      .toFile(`${PUBLIC_DIR}/og-image.png`);

    console.log('✅ Created og-image.png (1200x630)');

  } catch (err) {
    console.error('❌ Error generating OG image:', err.message);

    // Fallback: create a simple branded image
    console.log('Attempting fallback OG image generation...');
    try {
      await sharp({
        create: {
          width: 1200,
          height: 630,
          channels: 4,
          background: { r: 1, g: 1, b: 1, alpha: 1 }
        }
      })
      .composite([
        {
          input: Buffer.from(
            `<svg width="1200" height="630">
              <rect width="1200" height="630" fill="#010101"/>
              <text x="600" y="280" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">Cloud Modular</text>
              <text x="600" y="360" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)" text-anchor="middle">Precision-Engineered Modular Construction</text>
              <text x="600" y="410" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">Perth &amp; Western Australia</text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toFile(`${PUBLIC_DIR}/og-image.png`);

      console.log('✅ Created fallback og-image.png (1200x630)');
    } catch (fallbackErr) {
      console.error('❌ Fallback also failed:', fallbackErr.message);
    }
  }
}

async function main() {
  await generateFavicons();
  await generateOGImage();
  console.log('\n✨ Asset generation complete!');
}

main().catch(console.error);
