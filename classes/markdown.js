import commonmark from 'commonmark';

export default class Markdown {
    constructor(input) {
        // Replace < to escape HTML
        this.input = input.replace(/</g, '&lt;');
        const parser = new commonmark.Parser();
        this.parsed = parser.parse(this.input);
    }

    /** Return parsed HTML */
    toHtml() {
        const renderer = new commonmark.HtmlRenderer({
            safe: false,
            softbreak: '<br />'
        });

        return renderer.render(this.parsed);
    }
}

