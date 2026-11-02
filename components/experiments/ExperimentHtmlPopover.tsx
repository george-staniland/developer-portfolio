import Cs from "@/components/Cs";

export default function ExperimentHtmlPopover() {
    return (
        <section className="experiement__html-popover">

            <section className="text__wrap">
                <h1 className="fh3">HTML <Cs>popover</Cs> global attribute   </h1>
                <p>Giving an HTML element the <Cs>popover</Cs> attribute hides it with <Cs>display: none;</Cs>. We then need at least one control element with the attribute  <Cs>popoverTarget</Cs>, the value of which needs to be the Id of the the popover element. </p>

                <p> Popovers can be shown and hidden entirely with HTML, no JavaScript is required for default behaviour.</p>



                <p><i>CanIUse</i> lists Popovers as <i>Baseline 2025 Newly available across major browsers</i>.</p>

                <p>Becuase a Popover shows and hides with <Cs>display: none;</Cs> to  <Cs>display: block;</Cs>, we need to use some newer CSS syntax to fade it in and out smoothly. </p>

                <p>A few essentials:</p>
                <p> <Cs>@starting-style</Cs> -  Historicallly CSS transtions applied when an element went from one style to another, but this was more difficult if an element was created in the DOM, or was initially display: none.</p>

            </section>

            <section className="btn-wrap">
                <button popoverTarget="test-popover" id="popover-trigger">Open Popover 1</button>
                <button popoverTarget="test-popover-2" id="popover-trigger trigger-2">Open Popover 2</button>
            </section>

            <section popover="auto" id="test-popover" className="popping-element el-one">Popover content</section>
            <section popover="auto" id="test-popover-2" className="popping-element popping-el-2">Popover content 2</section>

        </section>
    )
}
