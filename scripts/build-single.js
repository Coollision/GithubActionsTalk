import esbuild from "esbuild";
import ncp from "ncp";

import Archiver from "archiver";
import * as fs from "fs";
import prettyBytes from "pretty-bytes";

import BuildConfig from "@internal/config/configuration/BuildConfig.js";
const { tsSettings, projectCWD, srcFolder, dstFolder, dst, esBuildSettings, esBuildSettingsWithAWS } = BuildConfig;

const argv = process.argv;
const buildSettings = argv.length >= 3 && argv[2] === "includeAWS" ? esBuildSettingsWithAWS : esBuildSettings

const script = async () => {
  esbuild.version && console.log(`esbuild version: ${esbuild.version}`);
  esbuild.buildSync({
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node22",
    outfile: `${srcFolder}/index.mjs`,
    treeShaking: true,
    banner: {
      "js": "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
    },
    logLevel: "info",
    legalComments: "none",
    ...tsSettings,
    ...buildSettings,
  });


  await fs.promises.mkdir(dstFolder, { recursive: true });

  // Specify the files you want to copy
  const staticSrc = "./static";
  if (fs.existsSync(staticSrc)) {
    const files = fs.readdirSync(staticSrc);
    console.log(`static files: ${JSON.stringify(files)}`)

    // Copy static files
    await Promise.all(files.map((file) => new Promise((resolve, reject) => {
      const sourcePath = `${staticSrc}/${file}`;
      const destinationPath = `${srcFolder}/${file}`;

      ncp(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error(`Error copying file ${file}: ${err}`);
          reject(`Error copying file ${file}: ${err}`);
        } else {
          console.log(`Copied: ${file}`);
          resolve(`Copied: ${file}`);
        }
      });
    })))
  }

  // Copy docker file if present
  const dockerFile = "./Dockerfile"
  if (fs.existsSync(dockerFile)) {
    const sourcePath = dockerFile;
    const destinationPath = `${srcFolder}/Dockerfile`;

    await new Promise((resolve, reject) => {
      ncp(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error(`Error copying Dockerfile: ${err}`);
          reject(`Error copying file Dockerfile: ${err}`);
        } else {
          console.log(`Copied Dockerfile`);
          resolve(`Copied Dockerfile`);
        }
      });
    });
  }

  const output = fs.createWriteStream(dst);
  const zipper = new Archiver("zip", { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on("close", (res) => {
      console.log(`Zip file created ${dst.replace(projectCWD, "")} ${prettyBytes(zipper.pointer())}`)
      resolve();
    });
    output.on("error", reject);
    zipper.pipe(output);
    zipper.directory(srcFolder, false);
    zipper.finalize();
  });
};

script().catch((err) => {
  console.error(err);
  process.exit(1);
});
