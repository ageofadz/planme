import pptxgen from "pptxgenjs";
import { tl } from "./page";

export default function genPowerPoint(rows: Row[]) {
    let pres = new pptxgen();
    console.log(tl);
    pres.theme = { headFontFace: "Arial Light" };
    pres.theme = { bodyFontFace: "Arial" };

    for (const tlItem of tl) {
        if (!tlItem) {
            continue;
        }
        let slide = pres.addSlide();
        if (tlItem.image?.length > 0) {
            slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 4, h: 4} })
        }
    }

    pres.writeFile({ fileName: 'Browser-PowerPoint-Demo.pptx' })
    .then(fileName => {
        console.log(`created file: ${fileName}`);
    });
}