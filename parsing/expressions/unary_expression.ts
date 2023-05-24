import { PrimaryExpression } from './primary_expression';
import { BasicNode } from '../node';

export class UnaryExpression extends BasicNode {
    op: any;
    expression: any;
    constructor(op, expression) {
        super();
        this.op = op;
        this.expression = expression;
    }

    nodes() {
        return [this.op, this.expression];
    }

    static construct(parser) {
        if (parser.next().has("+", "-", "~")) {
            const op = parser.take();
            const expression = UnaryExpression.construct(parser);
            return new UnaryExpression(op, expression);
        }

        return PrimaryExpression.construct(parser);
    }

    interpret() {
        const value = this.expression.interpret();

        switch (this.op.string) {
            case "+":
                return value;
            case "-":
                return -value;
            case "~":
                return Math.round(value);
            default:
                throw new Error("Invalid operator");
        }
    }
}
