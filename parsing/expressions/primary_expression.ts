import { BasicNode, PrimaryNode } from '../node';
export class PrimaryExpression extends BasicNode {
    left;
    expression;
    right;
    constructor(left, expression, right) {
        super();
        this.left = left;
        this.expression = expression;
        this.right = right;
    }

    nodes() {
        return [this.left, this.expression, this.right];
    }

    static construct(parser) {
        if (!parser.next().has("(", "|", "_", "^")) {
            return NumberNode.construct(parser);
        }

        const left = parser.take();
        const expression = parser.expression.construct(parser);
        const right = parser.expectingHas(left.has("(") ? ")" : left.string);

        return new PrimaryExpression(left, expression, right);
    }

    interpret() {
        const value = this.expression.interpret();

        switch (this.left.string) {
            case "(":
                return value;
            case "|":
                return Math.abs(value);
            case "_":
                return Math.floor(value);
            case "^":
                return Math.ceil(value);
            default:
                throw new Error("Invalid operator");
        }
    }
}

export class NumberNode extends PrimaryNode {
    static construct(parser) {
        return new NumberNode(parser.expectingOf("Number"));
    }

    interpret() {
        return (Number.isInteger(this.token.string) ? parseInt : parseFloat)(this.token.string);
    }
}
