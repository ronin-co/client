import { createSyntaxFactory } from './syntax';

const { create, get, set, drop, count, batch } = createSyntaxFactory({});

export { create, get, set, drop, count, batch };
export type { RONIN } from './types/codegen';
export default createSyntaxFactory;
