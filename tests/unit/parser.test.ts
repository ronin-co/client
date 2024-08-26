import { describe, expect, test } from 'bun:test';

import { parseSchemaDefinitions } from '@/src/bin/parser';

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

    let errorMessage;

    parseSchemaDefinitions(schema, 'schemas/index.ts', (error) => (errorMessage = error));

    expect(errorMessage).toMatchSnapshot();
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

    let errorMessage;

    parseSchemaDefinitions(schema, 'schemas/index.ts', (error) => (errorMessage = error));

    expect(errorMessage).toMatchSnapshot();
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

    let errorMessage;

    parseSchemaDefinitions(schema, 'schemas/index.ts', (error) => (errorMessage = error));

    expect(errorMessage).toMatchSnapshot();
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
            metadata1: Schema.JSON<[{ name: string }]>;
            metadata1: Schema.JSON<{ name: string }>;
            metadata2: Schema.JSON<{ 
                name: string; 
                status?: "active" | "inactive";
                users: { 
                    name: string; 
                    count?: number 
                }[];
                metadata: {
                    device: string;
                    likes?: number;
                    active: boolean;
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
});
