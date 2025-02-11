import { exists } from '@/src/bin/utils/file';

export type Commands = 'apply' | 'create';

// Where schemas in code schemas are stored
const SCHEMAS_IN_CODE_DIR = 'schemas';
// Where schemas in migration schemas are stored
const SCHEMAS_IN_MIGRATION_DIR = 'migrations';

export default (command: Commands) => {
  console.log('Migration command is not yet implemented.', command);

  switch (command) {
    case 'apply':
      return apply();
    case 'create':
      return create();
    default:
      console.log('Please specify a valid command.');
      break;
  }

  // Load .env to know which space we are working on

  // 1. load schemas from schemas_in_code_dir

  // 2. get current schema from RONIN

  // 3. compare schemas

  // 4. if there are differences, apply migration
};

const apply = () => {
  console.log('Applying migration');
};

const create = async () => {
  // load schema.ts from schemas_in_code_dir
  // Always start from root of project
  const localSchemasPath = `${SCHEMAS_IN_CODE_DIR}/schemas.ts`;
  if (!exists(localSchemasPath)) {
    console.log('No local schema file found');
    return;
  }

  // import all exported schemas from localSchemasPath
  const schemas = await import(localSchemasPath);
  // get current schema from RONIN

  // compare schemas

  // if there are differences, create migration

  console.log('Creating migration');
};
