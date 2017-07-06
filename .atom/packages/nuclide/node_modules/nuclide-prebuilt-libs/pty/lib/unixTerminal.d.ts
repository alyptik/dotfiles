import { Terminal } from './terminal';
import { IPtyForkOptions, IPtyOpenOptions } from './interfaces';
import { ArgvOrCommandLine } from './types';
export declare class UnixTerminal extends Terminal {
    protected pid: number;
    protected fd: number;
    protected pty: any;
    protected file: string;
    protected name: string;
    protected readable: boolean;
    protected writable: boolean;
    private _boundClose;
    private _emittedClose;
    private master;
    private slave;
    constructor(file?: string, args?: ArgvOrCommandLine, opt?: IPtyForkOptions);
    static open(opt: IPtyOpenOptions): UnixTerminal;
    write(data: string): void;
    destroy(): void;
    kill(signal?: string): void;
    readonly process: string;
    resize(cols: number, rows: number): void;
    private _sanitizeEnv(env);
}
