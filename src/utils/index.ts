import { runQueriesWithStorageAndHooks as runQueries } from '@/src/queries';
import { processStorableObjects } from '@/src/storage';
import { getBatchProxy, getSyntaxProxy } from '@/src/syntax/utils';

export { runQueries, processStorableObjects, getSyntaxProxy, getBatchProxy };
