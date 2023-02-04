require('ts-node/register');

require('../../src/db/index').migrator.runAsCLI();
