
import {bind} from './node_modules/hyperhtml/esm/index.js';


class CustomElement extends HTMLElement {

    constructor(...args) {
        super(...args);
        this.ops = [];
        this.html = bind(this.attachShadow({mode: 'open'}));
    }

    handleEvent(e) {
        if (e.target.textContent) {
            this.ops.push(e.target.textContent);
            this.render();
        }
    }

    evaluate(e) {
        console.log(this);
        try {
            this.ops = [eval(this.ops.join(""))];
            this.render();
        } catch (e) {
            this.ops = ["Invalid syntax!"];
            this.render();
            this.ops.length = 0;
        }
    }

    clear() {
        this.ops.length = 0;
        this.render();
    }

    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }
    render() {
        return this.html`
            <style>
                :host {
                    display: table;
                    padding: 1em;
                }
                table { margin: 0 auto; }
                td {
                    padding: 1em;
                    border: 2px solid gray;
                }
            </style>
            <table>
                <tr>
                    <td colspan="3" style="border: initial"></td>
                    <td onclick="${this}">/</td>
                </tr>
                <tr>
                    <td onclick="${this}">7</td>
                    <td onclick="${this}">8</td>
                    <td onclick="${this}">9</td>
                    <td onclick="${this}">*</td>
                </tr>
                <tr>
                    <td onclick="${this}">4</td>
                    <td onclick="${this}">5</td>
                    <td onclick="${this}">6</td>
                    <td onclick="${this}">-</td>
                </tr>
                <tr>
                    <td onclick="${this}">1</td>
                    <td onclick="${this}">2</td>
                    <td onclick="${this}">3</td>
                    <td onclick="${this}">+</td>
                </tr>
                <tr>
                    <td onclick="${this}">.</td>
                    <td onclick="${this}">0</td>
                    <td onclick="${e => this.clear(e)}">C</td>
                    <td onclick="${e => this.evaluate(e)}">=</td>
                </tr>
            </table>
            <h1>${this.ops.join("")}</h1>
        `;
    }
}

window.customElements.define('my-calculator', CustomElement);
