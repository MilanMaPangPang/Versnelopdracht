//gebruik gemaakt van shodow root/dom waardoor ik style in javascript kan aanpassen 
//dit heeft geen invloed op mijn html doormiddel van de shadow root. 
//hierdoor kan ik h1 tweemaal stylen.
const template = document.createElement("template")
template.innerHTML = `
     <style>
         h1{
         display: flex;
         justify-content: center;
         align-self: center;
         color: #A1BD8B;
         font-size: 1.5rem;
         }
     </style>
<h1><slot></slot></h1>`

class basicelement extends HTMLElement {
    constructor(){
        super()
        const shadow = this.attachShadow({ mode: "open"})
        shadow.append(template.content.cloneNode(true))
    }
}

customElements.define("test-item", basicelement)




// hier heb ik een label die werkt doormiddel va
const template2 = document.createElement("template2")
template.innerHTML = `
<style>
     label {
         color: black; 
         display: block;
         font-size: 1rem;
           }
     .smalltext{
         font-size: .75rem;
         color: gray;
               }
</style>
<label>
     <input type="checkbox" />
         <slot></slot>
             <span class="smalltext">
                 <slot name="smalltext"></slot>
             </span>
</label>
`

class checkboxelement extends HTMLElement {
    constructor(){
        super()
        const shadow = this.attachShadow({ mode: "open"})
        shadow.append(template.content.cloneNode(true))
        this.checkbox = shadow.querySelector("input")
    }


     static get observedAttributes(){
return ["checked"]
     }


    attributeChangedCallback(name, oldValue, newValue)
    {
        if (name === "checked") this.updateChecked(newValue)
    }

    updateChecked(value) {
        this.checkbox.checked = value != null && value !== "false"

    }
}

customElements.define("checkbox-item", checkboxelement)

// laat zien wanneer checkbox veranderd dat het de code door gaat en kijkt of het goed is (controle) overgenomen van het internet
const item = document.querySelector("checkbox-item")
let checked = true
setInterval(() => {
    checked = !checked
    item.setAttribute("checked", checked)
}, 1500)


//begin van ExpandableList
class ExpandableList extends HTMLUListElement {
    constructor() {
        super();
        this.style.position = "relative";
        this.toggleBtn = document.createElement("button");
        this.toggleBtn.className = "toggle-btn";
        this.toggleBtn.style.position = "absolute";
        this.toggleBtn.style.border = "none";
        this.toggleBtn.style.background = "none";
        this.toggleBtn.style.padding = "0";
        this.toggleBtn.style.top = "0";
        this.toggleBtn.style.left = "0";
        this.toggleBtn.style.cursor = "pointer";
        this.toggleBtn.style.fontSize = "1.25rem";
        this.toggleBtn.innerText = ">";
        this.appendChild(this.toggleBtn);
        this.dataset.expanded = "false";
        this.toggleBtn.addEventListener("click", () => {
        this.dataset.expanded = !this.isExpanded
        });
        this.appendChild(this.toggleBtn);
    }

    get isExpanded() {
        return this.dataset.expanded !== "false" && this.dataset.expanded != null
    }

    static get observedAttributes(){
        return ["data-expanded"]
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        this.UpdateStyles()
    }

    connectedCallback(){
        this.UpdateStyles()
    }



    // gecopieerde transform code die ervoor zorgt dat ">" 90 graden draait wanneer die uitklapt en terug gaat wanneer die inklapt
    UpdateStyles(){
        const transform = this.isExpanded ? "rotate(90deg)" : ""
        this.toggleBtn.style.transform = transform
        ;[...this.children].forEach(child => {
            if (child !== this.toggleBtn) {
                child.style.display = this.isExpanded ? "" : "none"
            }
        })
    }
}

customElements.define("expandable-list", ExpandableList, {
    extends: "ul"
});