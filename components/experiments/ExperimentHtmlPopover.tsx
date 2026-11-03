import Cs from "@/components/Cs";

export default function ExperimentHtmlPopover() {
    return (
        <section className="experiement__html-popover">

            <section className="text__wrap">
                <h1 className="fh3">HTML <Cs>popover</Cs> global attribute   </h1>
                <p>Giving an HTML element the <Cs>popover</Cs> attribute hides it with <Cs>display: none;</Cs>. We then need at least one control element with the attribute  <Cs>popoverTarget</Cs>, the value of which needs to be the Id of the the Popover element. </p>

                <p> Popovers can be shown and hidden entirely with HTML, no JavaScript is required for default behaviour.</p>



                <p><i>CanIUse</i> lists Popovers as <i>"Baseline 2025 Newly available across major browsers"</i>.</p>

                <p>Because a Popover shows and hides via <Cs>display: none;</Cs> to  <Cs>display: block;</Cs>, we need to use some newer CSS syntax to fade it in and out smoothly. </p>

                <p><b>A few essentials:</b></p>
                <p> <Cs>@starting-style</Cs> -  Historicallly CSS transtions applied when an element went from one style to another, but this is more difficult if an element is created in the DOM, or is initially display: none. So we set the <Cs>@starting-style</Cs> on the Popover to opacity zero, and the background colour of popover backdrop to transparent.  </p>

                <p><Cs>allow-discrete</Cs> - This is used in a CSS transtion, to control transition behaviour. We need to set allow discrete on the properities <Cs>display</Cs> and <Cs>overlay</Cs>. Without this the popover would be set to <Cs>display: none</Cs> at the start of the exit animation, the overlay property ensures the element is not removed from the top layer of the web document until the transition is complete. </p>

            </section>

            <section className="btn-wrap">
                <button popoverTarget="test-popover" id="popover-trigger">Open Popover 1</button>
                <button popoverTarget="test-popover-2" id="popover-trigger trigger-2">Open Popover 2</button>
            </section>

            <section popover="auto" id="test-popover" className="popping-element el-one">Popover content</section>
            <section popover="auto" id="test-popover-2" className="popping-element popping-el-2">This popover 2 , with a bit more content in it</section>

        </section>
    )
}
