import fs from 'node:fs';
import path from 'node:path';

interface Config {
  spaceId?: string;
  schemasDir?: string;
}

export const saveConfig = (config: Config) => {
  const configDir = path.join(process.cwd(), '.ronin');

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }

  const configPath = path.join(configDir, 'config.json');
  let existingConfig: Config = {};

  if (fs.existsSync(configPath)) {
    existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }

  fs.writeFileSync(configPath, JSON.stringify({ ...existingConfig, ...config }, null, 2));
};

export const resetConfig = () => {
  const configPath = path.join(process.cwd(), '.ronin', 'config.json');

  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }
};

export const readConfig = (): Config => {
  const configPath = path.join(process.cwd(), '.ronin', 'config.json');

  if (!fs.existsSync(configPath)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
};
