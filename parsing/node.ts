export abstract class BasicNode {
    abstract nodes(): BasicNode[];
    left;
    op;
    right;

    get line(): string {
        return this.nodes()[0].line;
    }

    toString(): string {
        return this.treeString();
    }

    treeString(prefix: string = " ".repeat(4)): string {
        let string = ""// this.constructor.name;
        const nodes = this.nodes();

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const atLast = i === nodes.length - 1;
            const symbol = atLast ? "└──" : "├──";
            const prefixSymbol = atLast ? "" : "│";

            const nodeString = node.treeString(`${prefix}${prefixSymbol}${" ".repeat(4)}`);
            string += `\n${prefix}${symbol} ${nodeString}`;
        }

        return string;
    }

    mark(): void {
        for (const node of this.nodes()) {
            node.mark();
        }
    }
    abstract interpret(): any;
    static construct(parser: any): BasicNode | void { }
}

export abstract class PrimaryNode extends BasicNode {
    token: any;

    constructor(token: any) {
        super();
        this.token = token;
    }

    nodes(): BasicNode[] {
        return [this.token];
    }

    treeString(prefix: string = " ".repeat(4)): string {
        return `${this.constructor.name} ── ${this.token}`;
    }
}

export abstract class BinaryNode extends BasicNode {
    left: BasicNode;
    op: any;
    right: BasicNode;

    constructor(left: BasicNode, op: any, right: BasicNode) {
        super();
        this.left = left;
        this.op = op;
        this.right = right;
    }

    nodes(): BasicNode[] {
        return [this.left, this.op, this.right];
    }

    static constructBinary(parser: any, make: any, part: any, ops: any): BasicNode {
        let node = part.construct(parser);

        while (parser.next().has(...ops)) {
            const op = parser.take();
            const right = part.construct(parser);
            node = new make(node, op, right);
        }

        return node;
    }
}
