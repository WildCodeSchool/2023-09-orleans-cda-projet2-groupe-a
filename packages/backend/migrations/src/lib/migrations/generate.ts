import { program } from 'commander';

program
  .name('gen-migration')
  .option('--with-sql')
  .argument('<name>', 'migration name')
  .parse();

const options = program.opts<{
  withSql: boolean;
}>();

const migrationName = program.args[0];

const sourceFile = options.withSql
  ? Bun.file('./src/sample/with-sql.ts')
  : Bun.file('./src/sample/with-query-builder.ts');

const isSourceFileExists = await sourceFile.exists();

if (!isSourceFileExists) {
  throw new Error(`Source file ${sourceFile.name} does not exist.`);
}

const currentDatetime = new Date()
  .toISOString()
  .replaceAll(':', '')
  .replaceAll('-', '')
  .replaceAll('T', '')
  .slice(0, 14);

const fileName = `${currentDatetime}-${migrationName}.ts`;

await Bun.write(`./src/migrations/${fileName}`, sourceFile);

// eslint-disable-next-line no-console
console.log(`Created migration file: ${fileName}`);
