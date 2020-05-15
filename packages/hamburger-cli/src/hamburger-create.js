import Enquirer from 'enquirer';

(async () => {
  const config = {
    name: '',
    type: '',
    engine: '',
  };
  function merge(obj) {
    Object.assign(config, obj);
  }
  merge(
    await Enquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
    }),
  );

  merge(
    await Enquirer.prompt({
      type: 'select',
      name: 'type',
      message: 'Select your project output type',
      choices: ['Static HTML', 'Reactive Application'],
    }),
  );

  if (config.type === 'Reactive Application') {
    merge(
      await Enquirer.prompt({
        type: 'select',
        name: 'engine',
        message: 'Select your web engine',
        choices: ['Hamburger', 'React'],
      }),
    );
  }
})().catch(console.log);
