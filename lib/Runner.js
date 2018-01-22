const Solver = require('./Solver');

let currentBatch = -1;
function nextBatch() {
  currentBatch++;
  return currentBatch;
}

async function schedule(fn, next, condition) {
  await fn(next());
  if (condition()) return;
  return schedule(fn, next, condition);
}

async function runInBatches(
  generator,
  generatorArguments,
  operations,
  forEach,
  { batchLength = Infinity },
) {
  const workers = 64;
  const napa = require('napajs');
  const zone = napa.zone.create('problem10958', { workers });

  const store = napa.store.getOrCreate('problem10958');
  const promises = [];
  for (let i = 0; i < workers; i++) {
    const promise = schedule(
      batchNumber => {
        console.log('schedule', i, batchNumber);
        return zone.execute('Runner', 'runInBatchesNormalized', [
          generator,
          generatorArguments,
          forEach,
          { batchLength, batchNumber, worker: i },
          ...operations,
        ]);
      },
      nextBatch,
      () => store.get('done'),
    );
    promises.push(promise);
  }
  await Promise.all(processes);
}

function run(
  generator,
  generatorArguments,
  operations,
  forEach,
  { batchLength } = { batchLength: Infinity },
) {
  if (batchLength === Infinity)
    Solver.run(generator(...generatorArguments), operations, forEach);
  else
    runInBatches(generator, generatorArguments, operations, forEach, {
      batchLength,
    });
}

function runInBatchesNormalized(
  generator,
  generatorArguments,
  forEach,
  options,
  ...operations
) {
  // console.log(options.worker, '!!!', options.batchLength, options.batchNumber);
  const napa = require('napajs');
  const newForEach = value => {
    const store = napa.store.getOrCreate('problem10958');
    const storeDone = store.get('done');
    if (storeDone) return true;
    const done = forEach(value, options.worker);
    if (done) store.set('done', true);
    return done;
  };

  Solver.run(generator(...generatorArguments), operations, newForEach, options);
}

module.exports = { run, runInBatchesNormalized };
