import { createSyntaxFactory } from '@/src/syntax';

const { get, set, add, remove, count, create, alter, drop, batch } = createSyntaxFactory(
  {},
);

export { get, set, add, remove, count, create, alter, drop, batch };
export type { RONIN } from '@/src/types/codegen';
export default createSyntaxFactory;
