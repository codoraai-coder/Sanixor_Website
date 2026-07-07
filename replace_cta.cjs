const fs = require("fs");
const path = require("path");

const routesDir = path.join(__dirname, "src", "routes");

fs.readdirSync(routesDir).forEach((file) => {
  if (file.endsWith(".tsx") && file !== "index.tsx") {
    const filePath = path.join(routesDir, file);
    let content = fs.readFileSync(filePath, "utf-8");

    let changed = false;

    if (content.includes("import { CTASection, Footer }")) {
      content = content.replace(
        'import { CTASection, Footer } from "@/components/sanixor/Footer";',
        'import { Footer } from "@/components/sanixor/Footer";\nimport { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";',
      );
      changed = true;
    }

    if (content.includes("<CTASection ")) {
      content = content.replace(/<CTASection /g, "<InteractiveConsole ");
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`Updated ${file}`);
    }
  }
});

console.log("Done updating routes.");
