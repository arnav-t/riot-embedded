import sanitizeHtml from 'sanitize-html';

/**
 * Class for sanitizing HTML
 * 
 * @param   {string} html - HTML to sanitize
 * @param   {object} params - Custom parameters for sanitization (optional)
 */
export default class Sanitizer {
    constructor(html, params=null) {
        this.html = html;

        // Sanitizer Params copied from matrix-react-sdk
        this.sanitizeHtmlParams = {
            allowedTags: [
                'font', // custom to matrix for IRC-style font coloring
                'del', // for markdown
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'sup', 'sub',
                'nl', 'li', 'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', 'img',
            ],
            allowedAttributes: {
                font: ['color', 'data-mx-bg-color', 'data-mx-color', 'style'], // custom to matrix
                span: ['data-mx-bg-color', 'data-mx-color', 'data-mx-spoiler', 'style'], // custom to matrix
                // a: ['href', 'name', 'target', 'rel'], // remote target: custom to matrix
                img: ['src', 'width', 'height', 'alt', 'title'],
                ol: ['start'],
                code: ['class'],
            },
            selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],

            transformTags: {
                'a': 'b',
            }
        };
        if (params) this.sanitizeHtmlParams = params;

        this.sanitize = this.sanitize.bind(this);
    }

    /** Sanitize HTML for client */
    sanitize() {
        return sanitizeHtml(this.html, this.sanitizeHtmlParams);
    }
}