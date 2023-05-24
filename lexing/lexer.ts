import { LanguageError } from '../util/error';
import { Token } from './token';

export class LexerError extends LanguageError {
    constructor(component, message) {
        super(component.line, message);
        component.mark();
        this.line = component.line;
        this.message = message;
    }

    toString() {
        return `${this.line.getMarks()}\n${this.constructor.name}: ${this.message}`;
    }
}

export class Lexer {
    line;

    newToken(kind) {
        return new Token(kind, this.line);
    }

    makeTokens(line) {
        this.line = line;
        const tokens: Token[] = [];

        while (!this.line.finished()) {
            this.ignoreSpaces();
            if (this.line.finished()) break;

            tokens.push(this.makeToken());
        }

        tokens.push(this.newToken("Punctuator"));
        return tokens;
    }

    ignoreSpaces() {
        while (this.line.next() === " ") {
            this.line.take();
            this.line.ignore();
        }
    }

    makeToken() {
        if (this.line.next() === "(" || this.line.next() === ")" || this.line.next() === "|" || this.line.next() === "_" || this.line.next() === "^") {
            return this.makePunctuator();
        }

        if (this.line.next() === "~" || this.line.next() === "+" || this.line.next() === "-" || this.line.next() === "*" || this.line.next() === "/" || this.line.next() === "%") {
            return this.makeOperator();
        }

        if (this.line.next().match(/[0-9.]/)) {
            return this.makeNumber();
        }

        this.line.take();
        throw new LexerError(this.newToken("?"), "Unrecognized symbol");
    }

    makePunctuator() {
        this.line.take();
        return this.newToken("Punctuator");
    }

    makeOperator() {
        const op = this.line.take();

        if (op === "*" && this.line.next() === "*") {
            this.line.take();
        }

        return this.newToken("Operator");
    }

    makeNumber() {
        while (this.line.next().match(/[0-9.]/)) {
            this.line.take();
        }

        if (this.line.taken().split(".").length - 1 < 2) {
            return this.newToken("Number");
        }

        throw new LexerError(this.newToken("Number"), "Numbers can have, at most, one decimal point");
    }
}
