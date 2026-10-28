export default function ExperimentHtmlPopover() {
    return (
        <section className="experiement__html-popover">

            <section className="text__wrap">
                <h1 className="fh3">HTML <span className="code-snippet">popover</span> global attribute   </h1>
                <p>* Work In Progress</p>
                <p>The popover attribute hides the element by default using  <span className="code-snippet">display:none</span>. Popovers are not modal, users can still interact with content outside the Popover. Popovers can be shown and hidden entirely with HTML.
                </p>
                <p><i>CanIUse</i> lists Popovers as 'Baseline 2025
                    Newly available across major browsers'</p>
                <p>** Check this --- Becuase Popover's use <span className="code-snippet">Display: none</span> to hide and show, we need to use the <span className="code-snippet">transition-behaviour</span> property here </p>
            </section>
            
            <section className="btn-wrap">
                <button popoverTarget="test-popover" id="popover-trigger">Open Popover 1</button>
                <button popoverTarget="test-popover-2" id="popover-trigger trigger-2">Open Popover 2</button>
            </section>

            <section popover="auto" id="test-popover" className="popping-element">Popover content</section>
            <section popover="auto" id="test-popover-2" className="popping-element popping-el-2">Popover content 2</section>

        </section>
    )
}