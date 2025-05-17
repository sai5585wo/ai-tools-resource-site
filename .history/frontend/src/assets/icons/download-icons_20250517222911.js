const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  {
    name: 'midjourney.png',
    url: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_black_RGB.svg'
  },
  {
    name: 'stable-diffusion.png',
    url: 'https://stability.ai/favicon.ico'
  },
  {
    name: 'wenxinyige.png',
    url: 'https://yige.baidu.com/favicon.ico'
  },
  {
    name: 'chatgpt.png',
    url: 'https://chat.openai.com/apple-touch-icon.png'
  },
  {
    name: 'claude.png',
    url: 'https://claude.ai/favicon.ico'
  },
  {
    name: 'xiezuomao.png',
    url: 'https://xiezuocat.com/favicon.ico'
  },
  {
    name: 'runway.png',
    url: 'https://runwayml.com/favicon.ico'
  },
  {
    name: 'pika.png',
    url: 'https://pika.art/favicon.ico'
  },
  {
    name: 'heygen.png',
    url: 'https://www.heygen.com/favicon.ico'
  },
  {
    name: 'notion.png',
    url: 'https://www.notion.so/images/favicon.ico'
  },
  {
    name: 'microsoft.png',
    url: 'https://www.microsoft.com/favicon.ico'
  },
  {
    name: 'canva.png',
    url: 'https://www.canva.com/favicon.ico'
  },
  {
    name: 'github.png',
    url: 'https://github.com/favicon.ico'
  },
  {
    name: 'codewhisperer.png',
    url: 'https://aws.amazon.com/favicon.ico'
  },
  {
    name: 'cursor.png',
    url: 'https://cursor.sh/favicon.ico'
  }
];

const downloadIcon = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filename);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function downloadAllIcons() {
  const iconsDir = path.join(__dirname);
  
  for (const icon of icons) {
    const filePath = path.join(iconsDir, icon.name);
    try {
      await downloadIcon(icon.url, filePath);
      console.log(`Downloaded ${icon.name}`);
    } catch (error) {
      console.error(`Error downloading ${icon.name}:`, error);
    }
  }
}

downloadAllIcons(); 