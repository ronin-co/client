import { runQueriesWithStorageAndHooks as runQueries } from '@/src/queries';
import { processStorableObjects } from '@/src/storage';
import { getBatchProxy, getSyntaxProxy } from '@/src/syntax/utils';
import { InvalidQueryError } from '@/src/utils/errors';

export { runQueries, processStorableObjects, getSyntaxProxy, getBatchProxy, InvalidQueryError };
