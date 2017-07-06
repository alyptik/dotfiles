declare class Subscription {
  dispose(): void;
}

declare class Config {
  observe(config: string, cb: Function): Subscription;
  get(configName: string): string;
}

declare class Project {
  relativizePath(file: string): string;
}

declare var atom: {
  project: Project;
  config: Config;
  inDevMode(): boolean;
  notifications: any;
}

declare module 'atom' {
  declare var Range: any;
  declare var CompositeDisposable: any;
  declare var config: Config;
}
