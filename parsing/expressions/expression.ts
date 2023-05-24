import { AdditiveExpression } from './additive_expression';
import { BasicNode } from '../node';

export abstract class Expression extends BasicNode {
    static construct(parser: any): Expression {
        return AdditiveExpression.construct(parser);
    }
}
