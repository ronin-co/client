import { createSyntaxFactory } from '@/src/syntax';

const { create, get, set, drop, count, batch } = createSyntaxFactory({});

export { create, get, set, drop, count, batch };
export type { RONIN } from '@/src/types/codegen';
export default createSyntaxFactory;
