import { SourceLine } from "./source_line";

export class Token {
    kind: string;
    line: SourceLine;
    locale: [number, number];
    string: string;

    constructor(kind: string, line: SourceLine) {
        this.kind = kind;
        this.line = line;
        [this.locale, this.string] = line.newLocale();
        this.string = this.string || "EOF";
    }

    toString() {
        return `${this.kind[0]}'${this.string}'`;
    }

    treeString() {
        return this.toString();
    }

    mark() {
        this.line.mark(this);
    }

    has(...strings: string[]) {
        return strings.includes(this.string);
    }

    of(...kinds: string[]) {
        return kinds.includes(this.kind);
    }
}
