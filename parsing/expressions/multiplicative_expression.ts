import { ExponentialExpression } from './exponential_expression';
import { BasicNode, BinaryNode } from '../node';

export abstract class MultiplicativeExpression extends BinaryNode {
    constructor(left: BasicNode, op: any, right: BasicNode) {
        super(left, op, right)
    }
    static construct(parser: any): MultiplicativeExpression {
        return BinaryNode.constructBinary(parser, MultiplicativeExpression, ExponentialExpression, ["*", "/", "%"]);
    }

    interpret(): any {
        const left = this.left.interpret();
        const right = this.right.interpret();

        switch (this.op.string) {
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "%":
                return left % right;
            default:
                throw new Error("Invalid operator");
        }
    }
}
