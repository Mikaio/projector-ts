import cli from "command-line-args";

export type Opts = {
    args?: string[],
    pwd?: string,
    config?: string,
};

export default function getOpts(): Opts {
    return cli([
        {
            name: "args",
            type: String,
            multiple: true,
            defaultOption: true,
        }, {
            name: "pwd",
            type: String,
            alias: "p",
        }, {
            name: "config",
            type: String,
            alias: "c",
        }
    ]) as Opts;
}
