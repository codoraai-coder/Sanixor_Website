const fs = require("fs");
const https = require("https");
const { exec } = require("child_process");
const path = require("path");

const videos = [
  {
    url: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/hackevel%20video.mp4",
    name: "hackeval",
  },
  {
    url: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/BitBenchmark%20video.mp4",
    name: "bitbenchmark",
  },
  {
    url: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/AutoDash%20video.mp4",
    name: "autodash",
  },
  {
    url: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/Agent%20as%20a%20Service%20video.mp4",
    name: "agent-as-a-service",
  },
  {
    url: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/customized%20Agentic%20Solutionsvideo.mp4",
    name: "custom-agent",
  },
];

const publicDir = path.join(__dirname, "public", "videos");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

function convertToGif(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    // Generate a palette and then use it for better quality, limit fps to 10 and scale width to 600 max
    const command = `ffmpeg -y -i "${inputPath}" -vf "fps=10,scale=600:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting ${inputPath}:`, stderr);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function processAll() {
  for (const video of videos) {
    const mp4Path = path.join(publicDir, `${video.name}.mp4`);
    const gifPath = path.join(publicDir, `${video.name}.gif`);

    console.log(`Downloading ${video.name}...`);
    await download(video.url, mp4Path);

    console.log(`Converting ${video.name} to GIF...`);
    await convertToGif(mp4Path, gifPath);

    // Clean up mp4
    fs.unlinkSync(mp4Path);
    console.log(`Finished ${video.name}`);
  }
  console.log("All done!");
}

processAll().catch(console.error);
