import { Token } from "./token";

export class SourceLine {
    line: string;
    locale: [number, number];
    marked: [number, number];

    constructor(line: string) {
        this.line = line;
        this.locale = [0, 0];
        this.marked = [line.length, -1];
    }

    finished() {
        return this.locale[1] >= this.line.length;
    }

    next() {
        return this.finished() ? "EOF" : this.line[this.locale[1]];
    }

    take() {
        const symbol = this.next();
        this.locale[1] += this.finished() ? 0 : 1;
        return symbol;
    }

    ignore() {
        this.locale[0] = this.locale[1];
    }

    taken() {
        return this.line.slice(this.locale[0], this.locale[1]);
    }

    newLocale(): [[number, number], string] {
        const locale = [...this.locale];
        const taken = this.taken();
        this.locale[0] = this.locale[1];
        return [[locale[0], locale[1]], taken];
    }

    mark(token: Token) {
        this.marked[0] = Math.min(token.locale[0], this.marked[0]);
        this.marked[1] = Math.max(token.locale[1], this.marked[1]);
    }

    getMarks() {
        let marks = "  ";

        for (let i = 0; i < this.line.length + 1; i++) {
            const between = this.marked[0] <= i && i < this.marked[1];
            marks += between || this.marked[0] === i ? "^" : " ";
        }

        return marks;
    }
}
