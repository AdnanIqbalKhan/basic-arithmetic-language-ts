import { MultiplicativeExpression } from './multiplicative_expression';
import { BinaryNode } from '../node';

export class AdditiveExpression extends BinaryNode {
    static construct(parser: any): AdditiveExpression {
        return BinaryNode.constructBinary(
            parser,
            AdditiveExpression,
            MultiplicativeExpression,
            ["+", "-"]
        );
    }

    interpret(): any {
        const left = this.left.interpret();
        const right = this.right.interpret();

        return this.op.has("-") ? left - right : left + right;
    }
}
