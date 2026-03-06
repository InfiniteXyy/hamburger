import Enquirer from 'enquirer';

interface ProjectConfig {
  name: string;
  type: string;
  engine: string;
}

(async () => {
  const config: ProjectConfig = {
    name: '',
    type: '',
    engine: '',
  };
  function merge(obj: Partial<ProjectConfig>) {
    Object.assign(config, obj);
  }
  merge(
    (await Enquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
    })) as Partial<ProjectConfig>,
  );

  merge(
    (await Enquirer.prompt({
      type: 'select',
      name: 'type',
      message: 'Select your project output type',
      choices: ['Static HTML', 'Reactive Application'],
    })) as Partial<ProjectConfig>,
  );

  if (config.type === 'Reactive Application') {
    merge(
      (await Enquirer.prompt({
        type: 'select',
        name: 'engine',
        message: 'Select your web engine',
        choices: ['Hamburger', 'React'],
      })) as Partial<ProjectConfig>,
    );
  }
})().catch(console.log);
