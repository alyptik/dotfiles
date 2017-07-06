import { Terminal } from './terminal';
import { IPtyForkOptions, IPtyOpenOptions } from './interfaces';
import { ArgvOrCommandLine } from './types';
export declare class WindowsTerminal extends Terminal {
    private isReady;
    private deferreds;
    private agent;
    constructor(file?: string, args?: ArgvOrCommandLine, opt?: IPtyForkOptions);
    static open(options?: IPtyOpenOptions): void;
    write(data: string): void;
    resize(cols: number, rows: number): void;
    destroy(): void;
    kill(signal?: string): void;
    private _defer(deferredFn);
    readonly process: string;
}
