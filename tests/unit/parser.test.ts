import { unlink } from 'node:fs/promises';

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

    expect(() => {
      try {
        parseSchemaDefinitions(schema, 'schemas/index.ts');
      } catch (err) {
        expect((err as Error).message).toMatchSnapshot();
        throw err;
      }
    }).toThrow(Error);
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

    expect(() => {
      try {
        parseSchemaDefinitions(schema, 'schemas/index.ts');
      } catch (err) {
        expect((err as Error).message).toMatchSnapshot();
        throw err;
      }
    }).toThrow(Error);
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

    expect(() => {
      try {
        parseSchemaDefinitions(schema, 'schemas/index.ts');
      } catch (err) {
        expect((err as Error).message).toMatchSnapshot();
        throw err;
      }
    }).toThrow(Error);
  });

  test('schema with auto-generated IDs', () => {
    const schema = `
        import * as Schema from 'ronin/schema';

        type Account = Schema.Record<{
            name: string;
        }>

        type Accounts = Schema.Records<Account>;

        declare module 'ronin' {
            interface Schemas {
                account: Account;
                accounts: Accounts;
            }
        }
        `;

    process.env.NODE_ENV = 'development';
    const result = parseSchemaDefinitions(schema, 'schemas/index.ts');
    process.env.NODE_ENV = 'test';

    const fieldId = result[0].fields[0].id;

    expect(fieldId).toMatch(/^string-[a-zA-Z0-9]{24}$/);
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
