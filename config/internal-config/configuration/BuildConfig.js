const {
    npm_package_name: npmPackageName,
    INIT_CWD: executionCWD,
    PROJECT_CWD: projectCWD,
    npm_package_version: npmPackageVersion,
} = process.env;



const tsSettings = {
    entryPoints: ["./src/index.ts"],
    tsconfig: `./tsconfig.json`,
};


const srcFolder = `${projectCWD}/dist/build/${npmPackageName}`;
const dstFolder = `${projectCWD}/dist/artifacts/`;
const dst = `${dstFolder}${npmPackageName}.zip`;

const esBuildSettings = {
    external: ["better-sqlite3", "oracledb", "mysql2", "sqlite3", "tedious", "mysql", "pg-query-stream"],
};

module.exports = {
    tsSettings,
    srcFolder,
    dstFolder,
    dst,
    projectCWD,
    npmPackageName,
    npmPackageVersion,
    executionCWD,
    esBuildSettings
};
