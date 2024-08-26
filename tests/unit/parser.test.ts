import { unlink } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, test } from 'bun:test';

import { parseSchemaDefinitionFile, parseSchemaDefinitions } from '@/src/bin/parser';

describe('Schema parser', () => {
  test('throw error when plural schema is missing', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            name: string
        }>

        declare module 'ronin' {
            interface Schemas {
                account: Account;
            }
        }
        `;

    const error = `The schema \`Account\` does not have a plural slug and name defined.

Please define them in your schema definition file and include them in the \`Schemas\` interface:

import type * as Schema from 'ronin/schema';

type Accounts = Schema.Records<Account>;

interface Schemas {
  account: Account;
  accounts: Accounts;
}`;

    expect(() => parseSchemaDefinitions(schema, 'schemas/index.ts')).toThrow(error);
  });

  test('throw error referenced schema is not registered', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Session = Schema.Record<{
            device: string;
        }>
            
        type Account = Schema.Record<{
            session: Session;
        }>

        type Accounts = Schema.Records<Account>;
        type Sessions = Schema.Records<Session>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const error = `The following schemas were used as a reference but weren't included in the \`Schemas\` interface:

  - \`Session\` in \`Account\` (schemas/index.ts:9:13)

Please include them in the \`Schemas\` interface or remove their references.`;

    expect(() => parseSchemaDefinitions(schema, 'schemas/index.ts')).toThrow(error);
  });

  test('throw error schema field type cannot be determined', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            session: ThisIsNotAValidType
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const error = `The type of the following fields could not be determined:

  - \`Account.session\` is typed as \`ThisIsNotAValidType\` (schemas/index.ts:5:13)

Please make sure that the field is typed as any of the available field types:

  - \`string\`
  - \`number\`
  - \`boolean\`
  - \`Date\`
  - \`Schema.Blob\`
  - \`Schema.JSON\`
  - or a reference to another schema.`;

    expect(() => parseSchemaDefinitions(schema, 'schemas/index.ts')).toThrow(error);
  });

  test('schema with basic field types', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            name: string;
            active: boolean;
            likes: number;
            activeAt: Date;
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('schema with referenced field type', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Session = Schema.Record<{
            device: string;
        }>

        type Account = Schema.Record<{
            session: Session;
        }>

        type Accounts = Schema.Records<Account>;
        type Sessions = Schema.Records<Session>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
                
                session: Session;
                sessions: Sessions;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('schema with advanced field types', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            avatar: Schema.Blob;
            metadata: Schema.JSON;
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('schema with generic field types', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            metadata1: Schema.JSON<Schema.Blob>;
            metadata2: Schema.JSON<"option-1">;
            metadata3: Schema.JSON<"option-1" | "option-2">;
            metadata4: Schema.JSON<{ name: string }>;
            metadata5: Schema.JSON<{ name: string }[]>;
            metadata6: Schema.JSON<[{ name: string }]>;
            metadata7: Schema.JSON<{ constant: "ronin" }>;
            metadata8: Schema.JSON<{ 
                name: string; 
                status?: "active" | "inactive";
                avatar: Schema.Blob<{ type: "images" }>;
                users: { 
                    name: string; 
                    count?: number 
                }[];
                metadata: {
                    device: string;
                    likes?: number;
                    active: boolean;
                    array: Array<string>;
                    dates: {
                        createdAt: Date;
                    }
                };
            }>;
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('schema with TSDoc', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            /**
             * User name
            */
            name: string;
            /**
             * User's country
             * 
             * This is a field description.
             * 
             * @maxSize 100
             * @minSize 1
             * @pattern ^[A-Z]{2}$
            */
            country: string;
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('with named imports', () => {
    const schema = `
        import { Record, Records, Blob } from 'ronin/schema';

        type Account = Record<{
            name: string;
            active: boolean;
            likes: number;
            activeAt: Date;
            avatar: Blob;
        }>

        type MyAccounts = Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                myAccounts: MyAccounts;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('with aliased imports', () => {
    const schema = `
        import { Record as SchemaRecord, Records as SchemaRecords, Blob as RoninBlob } from 'ronin/schema';

        type Account = SchemaRecord<{
            name: string;
            active: boolean;
            likes: number;
            activeAt: Date;
            avatar: RoninBlob;
        }>

        type MyAccounts = SchemaRecords<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                myAccounts: MyAccounts;
            }
        }
        `;

    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');

    expect(result).toMatchSnapshot();
  });

  test('schema definitions file', async () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            name: string;
            active: boolean;
            likes: number;
            activeAt: Date;
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    const filePath = 'schemas/index.ts';

    await Bun.write(filePath, schema);

    const result = parseSchemaDefinitionFile(filePath);

    await unlink(filePath);

    expect(result).toMatchSnapshot();
  });

  test('throw error when definitions file does not exist', async () => {
    const filePath = 'schemas/index.ts';

    expect(parseSchemaDefinitionFile(filePath)).rejects.toThrow(
      /The given path to the schema definition file does not exist: .*\/schemas\/index\.ts/,
    );
  });
});
