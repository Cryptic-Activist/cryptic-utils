import path from "path";
import fs from "fs";
import crypto from "crypto";

export const setupEnvironment = () => {
  const envMain = [];
  const envMainPort = [];

  const rootRepoFolder = path
    .dirname(__dirname)
    .split(path.sep)
    .slice(0, 6)
    .join("/");

  const repos = fs
    .readdirSync(rootRepoFolder)
    .filter(
      (file) =>
        file.includes("api") || file.includes("new-cryptic-activist-catalog")
    );

  let port = 5000;

  repos.forEach((repo, index) => {
    if (index < repos.length - 1) {
      const appName = `${repo.split("-")[1][0].toUpperCase()}${repo
        .split("-")[1]
        .substring(1, repo.split("-")[1].length)}`;
      const appSessionhaSecret = crypto.randomBytes(32).toString("hex");
      const jwtSecret1 = crypto.randomBytes(32).toString("hex");
      const jwtSecret2 = crypto.randomBytes(32).toString("hex");
      envMain.push(`${appName.toUpperCase()}_API_ENDPOINT`);
      envMainPort.push(port);

      const fileContent = `NODE_ENV=development

APP_NAME=Cryptic Activist ${appName} API

CRYPTIC_ACTIVIST_CATALOG=http://localhost:3000

APP_SESSION_SECRET=${appSessionhaSecret}

SEQUELIZE_DATABASE=cryptic-activist
SEQUELIZE_USERNAME=postgres
SEQUELIZE_PASSWORD=postgres
SEQUELIZE_HOST=localhost

JWT_SECRET=${jwtSecret1}
JWT_REFRESH_SECRET=${jwtSecret2}

USER_API_ENDPOINT=http://localhost:5000

PORT=${port}`;

      fs.writeFileSync(`${rootRepoFolder}/${repo}/.env`, fileContent);

      const envsContent = `[
  "NODE_ENV",
  "APP_NAME",
  "CRYPTIC_ACTIVIST_CATALOG",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "APP_SESSION_SECRET",
  "SEQUELIZE_DATABASE",
  "SEQUELIZE_USERNAME",
  "SEQUELIZE_PASSWORD",
  "SEQUELIZE_HOST"
]`;

      fs.writeFileSync(`${rootRepoFolder}/${repo}/envs.json`, envsContent);

      port++;
    }
  });

  let envMainContent = "MAIN_DOMAIN=http://localhost:3000\n";

  envMain.forEach((env, index) => {
    envMainContent += `${env}=http://localhost:${envMainPort[index]}\n`;
  });

  fs.writeFileSync(
    `${rootRepoFolder}/new-cryptic-activist-catalog/.env`,
    envMainContent.trim()
  );
};
