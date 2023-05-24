import { UnaryExpression } from './unary_expression';
import { BasicNode, BinaryNode } from '../node';

export class ExponentialExpression extends BinaryNode {
    constructor(left: BasicNode, op: any, right: BasicNode) {
        super(left, op, right)
    }
    static construct(parser: any): ExponentialExpression {
        const node = UnaryExpression.construct(parser);

        if (!parser.next().has("**")) {
            return node;
        }

        const op = parser.take();
        const right = ExponentialExpression.construct(parser);
        return new ExponentialExpression(node, op, right);
    }

    interpret(): any {
        const left = this.left.interpret();
        const right = this.right.interpret();
        return left ** right;
    }
}
