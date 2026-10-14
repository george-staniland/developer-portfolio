export default function ExperimentHtmlPopover () {
    return (
        <section className="experiement__html-popover">

            <p>The popover attribute hides the element by default using  <span className="code-snippet"> display:none </span>. Popovers are not modal, users can still interact with content outside the Popover. Popovers can be shown and hidden entirely with HTMl.
            </p>
            <p><i>CanIUse</i> lists Popovers as 'Baseline 2025
            Newly available across major browsers'</p>
            <p>Becuase Popover's use <span className="code-snippet">Display: none</span> to hide and show, we need to use the <span className="code-snippet">transition-behaviour</span> property here </p>

            <button popoverTarget="test-popover">Open Popover</button>

            <section popover="auto" id="test-popover">Popover content</section>

        </section>
    )
}