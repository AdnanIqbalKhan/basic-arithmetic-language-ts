import { Lexer } from './lexing/lexer';
import { SourceLine } from './lexing/source_line';
import { Parser } from './parsing/parser';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const prompt = (t: string) => new Promise<string>((resolve, reject) => {
    readline.question(t, (val: string) => {
        resolve(val)
    });
})

async function main() {
    console.log("Arithmetic JS 1.0: ");
    const lexer = new Lexer();
    const parser = new Parser();

    while (true) {
        const line = await prompt('> ');
        if ([null, undefined, ""].includes(line?.trim())) continue;
        if (line.toLocaleLowerCase().trim() === "exit") break;

        try {
            const sourceLine = new SourceLine(line!);
            const tokens = lexer.makeTokens(sourceLine);
            const tree = parser.makeTree(tokens);
            console.log(tree.toString());
            console.log(tree.interpret());
        } catch (error) {
            console.error(error);
        }
    }
    readline.close();
}

main();
