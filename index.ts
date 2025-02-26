// import { add, count, get, remove, set } from './src';

// import type { CombinedInstructions, WithInstruction } from '@ronin/compiler';

// interface User {
//   name: string | null;
//   email: string;
// }

// // ----------------------------------------------------------------------------

// await add.user({ with: { email: 'tim@apple.com' } }); // User
// await add.user.with({ email: 'tim@apple.com' }); // User

// await add.users({ with: [{ email: 'tim@apple.com' }] }); // Array<User>
// await add.users.with([{ email: 'tim@apple.com' }]); // Array<User>

// // ----------------------------------------------------------------------------

// await count.users(); // number
// await count.users({ with: { email: 'tim@apple.com' } }); // number
// await count.users.with({ email: 'tim@apple.com' }); // number
// await count.users.with.email('tim@apple.com'); // number
// await count.users.with.email.endingWith('apple.com'); // number

// // ----------------------------------------------------------------------------

// await get.user(); // User | null
// await get.user({ with: { email: 'tim@apple.com' } }); // User | null
// await get.user.with({ email: 'tim@apple.com' }); // User | null
// await get.user.with.email('tim@apple.com'); // User | null
// await get.user.with.email.endingWith('apple.com'); // User | null

// await get.users(); // Array<User>
// await get.users({ with: { email: 'tim@apple.com' } }); // Array<User>
// await get.users.with({ email: 'tim@apple.com' }); // Array<User>
// await get.users.with.email('tim@apple.com'); // Array<User>
// await get.users.with.email.endingWith('apple.com'); // Array<User>

// // ----------------------------------------------------------------------------

// await remove.user({ with: { email: 'tim@apple.com' } }); // User | null
// await remove.user.with({ email: 'tim@apple.com' }); // User | null
// await remove.user.with.email('tim@apple.com'); // User | null
// await remove.user.with.email.endingWith('apple.com'); // User | null

// await remove.users(); // Array<User>
// await remove.users({ with: { email: 'tim@apple.com' } }); // Array<User>
// await remove.users.with({ email: 'tim@apple.com' }); // Array<User>
// await remove.users.with.email('tim@apple.com'); // Array<User>
// await remove.users.with.email.endingWith('apple.com'); // Array<User>

// // ----------------------------------------------------------------------------

// // Singular
// await set.user({
//   with: { email: 'tim@apple.com' },
//   to: { name: 'Timmy' },
// }); // User | null;

// // Plural
// await set.users({
//   with: {
//     email: {
//       endingWith: '@apple.com',
//     },
//   },
//   to: {
//     name: 'Steve Jobs',
//   },
// }); // Array<User>

// // ----------------------------------------------------------------------------

// type Flatten<T extends object> = { [K in keyof T]: T[K] } & {};

// type SchemaSlug = 'user' | 'users' | (string & {});

// // type OriginalResultRecord = Record<string, unknown> & {
// //   id: string;
// //   ronin: {
// //     createdAt: string;
// //     createdBy: string | null;
// //     updatedAt: string;
// //     updatedBy: string | null;
// //   };
// // };

// // type ResultRecord = Omit<OriginalResultRecord, 'ronin'> & {
// //   ronin: Omit<OriginalResultRecord['ronin'], 'createdAt' | 'updatedAt'> & {
// //     createdAt: Date;
// //     updatedAt: Date;
// //   };
// // };

// // type DeepCallable<
// //   //
// //   TQuery,
// //   TResult = ResultRecord,
// // > = [NonNullable<TQuery>] extends [object]
// //   ? ObjectCall<TQuery, TResult, Partial<NonNullable<TQuery>>> & {
// //       [K in keyof NonNullable<TQuery>]-?: DeepCallable<
// //         Exclude<NonNullable<TQuery>[K], null | undefined>,
// //         TResult
// //       >;
// //     }
// //   : ObjectCall<TQuery, TResult, TQuery>;

// // type ObjectCall<
// //   //
// //   TQuery,
// //   TDefaultResult,
// //   TArg,
// // > = (<FinalResult = TDefaultResult>(
// //   arg?: ((f: Record<string, unknown>) => TArg | any) | TArg,
// //   options?: Record<string, unknown>,
// // ) => Promise<FinalResult> & DeepCallable<TQuery, FinalResult>) &
// //   Flatten<ReducedFunction>;

// // interface ReducedFunction {
// //   /**
// //    * @deprecated
// //    */
// //   name: any;
// //   /**
// //    * @deprecated
// //    */
// //   length: never;
// //   /**
// //    * @deprecated
// //    */
// //   apply: never;
// //   /**
// //    * @deprecated
// //    */
// //   call: never;
// //   /**
// //    * @deprecated
// //    */
// //   bind: never;
// //   /**
// //    * @deprecated
// //    */
// //   toString: never;
// //   /**
// //    * @deprecated
// //    */
// //   caller: never;
// //   /**
// //    * @deprecated
// //    */
// //   prototype: never;
// //   /**
// //    * @deprecated
// //    */
// //   arguments: never;
// //   /**
// //    * @deprecated
// //    */
// //   unify: never;
// // }

import { expectTypeOf } from 'expect-type';

import { get, set } from './src';

import type { ResultRecord } from '@ronin/compiler';

interface User {
  name: string | null;
  email: string;
}

// await get.user();
// await get.user({ with: { email: 'tim@apple.com' } });
// await get.user.with({ email: 'tim@apple.com' });
// await get.user.with.email('tim@apple.com');
// await get.user.with.email.endingWith('apple.com');

// await get.users();
// await get.users({ with: { email: 'tim@apple.com' } });
// await get.users.with({ email: 'tim@apple.com' });
// await get.users.with.email('tim@apple.com');
// await get.users.with.email.endingWith('apple.com');

// // biome-ignore format: <explanation>
// expectTypeOf(await get.user()).toMatchTypeOf<ResultRecord>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.user({ with: { email: 'tim@apple.com' } })).toMatchTypeOf<User | null>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.user.with({ email: 'tim@apple.com' })).toMatchTypeOf<User | null>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.user.with.email('tim@apple.com')).toMatchTypeOf<User | null>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.user.with.email.endingWith('apple.com')).toMatchTypeOf<User | null>();

// // biome-ignore format: <explanation>
// expectTypeOf(await get.users()).toMatchTypeOf<Array<User>>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.users({ with: { email: 'tim@apple.com' } })).toMatchTypeOf<Array<User>>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.users.with({ email: 'tim@apple.com' })).toMatchTypeOf<Array<User>>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.users.with.email('tim@apple.com')).toMatchTypeOf<Array<User>>();
// // biome-ignore format: <explanation>
// expectTypeOf(await get.users.with.email.endingWith('apple.com')).toMatchTypeOf<Array<User>>();

get.thought({ with: { id: '1234' } });
get.thought({ with: [{ id: '1234' }] });
get.thought.with({ id: '1234' });
get.thought.with([{ id: '1234' }]);
get.thought.with.id('1234');
get.thought.with((f) => ({ name: f.handle }));

set.thought.with({ id: '1234' }).to({ title: 'Hello World' });

set.thought({
  with: { id: '1234' },
  to: { title: 'Hello World' },
});
