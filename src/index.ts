import { runQueriesWithStorageAndHooks as runQueries } from './queries';
import { processStorableObjects } from './storage';
import { createSyntaxFactory } from './syntax';

const { create, get, set, drop, count, batch } = createSyntaxFactory();

export { create, get, set, drop, count, batch, runQueries, processStorableObjects };
export type { RONIN } from './types/codegen';
export default createSyntaxFactory;
