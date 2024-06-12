// This file exists in order to allow for conditionally importing native
// modules without breaking environments that don't have them. Additionally,
// using a separate file prevents basic static analysis checks that would cause
// warnings saying that the module is not available.

import { AsyncLocalStorage } from 'node:async_hooks';

export { AsyncLocalStorage };
