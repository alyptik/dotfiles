import { ITerminal, IPtyOpenOptions, IPtyForkOptions } from './interfaces';
import { ArgvOrCommandLine } from './types';
export declare function spawn(file?: string, args?: ArgvOrCommandLine, opt?: IPtyForkOptions): ITerminal;
export declare function fork(file?: string, args?: ArgvOrCommandLine, opt?: IPtyForkOptions): ITerminal;
export declare function createTerminal(file?: string, args?: ArgvOrCommandLine, opt?: IPtyForkOptions): ITerminal;
export declare function open(options: IPtyOpenOptions): ITerminal;
