import { LanguageError } from '../util/error';
import { Expression } from './expressions/expression';

export class ParserError extends LanguageError { }

export class Parser {
    get expression(): typeof Expression {
        return Expression;
    }

    tokens: any[] | null;
    i: number;

    constructor() {
        this.tokens = null;
        this.i = -1;
    }

    next(): any {
        return this.tokens ? this.tokens[this.i] : null;
    }

    take(): any {
        const token = this.next();
        this.i += 1;
        return token;
    }

    expectingHas(...strings: string[]): any {
        if (this.next().has(...strings)) {
            return this.take();
        }

        throw new ParserError(this.next(), `Expecting has ${strings}`);
    }

    expectingOf(...kinds: any[]): any {
        if (this.next().of(...kinds)) {
            return this.take();
        }

        throw new ParserError(this.next(), `Expecting of ${kinds}`);
    }

    makeTree(tokens: any[]): Expression {
        this.tokens = tokens;
        this.i = 0;
        const node = Expression.construct(this);

        if (this.next().has("EOF")) {
            return node;
        }

        throw new ParserError(this.next(), `Unexpected token ${this.next()}`);
    }
}
