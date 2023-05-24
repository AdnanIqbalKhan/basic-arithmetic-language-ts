
import { SourceLine } from '../lexing/source_line'


export class LanguageError extends Error {
    line: SourceLine;
    message: string;

    constructor(component: any, message: string) {
        super();
        component.mark();
        this.line = component.line;
        this.message = message;
    }

    toString(): string {
        return `${this.line.getMarks()}\n${this.constructor.name}: ${this.message}`;
    }
}
