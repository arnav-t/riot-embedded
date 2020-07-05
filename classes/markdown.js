import commonmark from 'commonmark';

/**
 * Class for generating HTML from markdown messages
 * 
 * @param   {string} input - Message body containing markdown
 */
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

