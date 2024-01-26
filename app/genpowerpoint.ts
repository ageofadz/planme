import pptxgen from "pptxgenjs";
import { tl } from "./page";

export default function genPowerPoint(rows: Row[], options: Options) {
    let pres = new pptxgen();
    console.log(tl);
    pres.theme = { headFontFace: "Arial Light" };
    pres.theme = { bodyFontFace: "Arial" };

    for (const row of rows) {
        if (!row.name) {
            continue;
        }
        switch (row.name) {
            case 'Vocab on board':{
                for (const tlItem of tl) {
                    if (!tlItem) {
                        continue;
                    }
                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 6, h: 6} })
                    }
                    slide.addText(tlItem.term,{y:'80%', fontSize:48, fontFace:'Verdana'})
                }
                continue;}
            case  'Intro Song':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.intro ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8'});
                continue;}

            case  'Cleanup Song':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.cleanup ?? 'https://www.youtube.com/watch?v=SFE0mMWbA-Y'});
                continue;}

            case  'Goodbye Song':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.goodbye ?? 'https://www.youtube.com/watch?v=PraN5ZoSjiY'});
                continue;}

            case  'Song/Video 1':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.one});
                continue;}

            case  'Song/Video 2':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.two});
                continue;}

            case  'Song/Video 3':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.three});
                continue;}

            case 'Rules':{
                if (!options.rules) {
                    continue;
                }
                if (options.rules.english) {

                let slide = pres.addSlide();
                slide.addText("🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦",{y: '20%', fontSize:48, fontFace:'Verdana'})
                slide.addText("Speak _____.",{y: '50%', fontSize:48, fontFace:'Verdana'})

                let slide2 = pres.addSlide();
                slide2.addText("🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦",{y: '20%', fontSize:48, fontFace:'Verdana'})
                slide2.addText("Speak English.",{y: '50%', fontSize:48, fontFace:'Verdana'})
                }
                if (options.rules.listen) {

                    let slide = pres.addSlide();
                    slide.addText("🧏‍♀️🧏‍♂️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide.addText("_____ to the teacher.",{y: '50%', fontSize:48, fontFace:'Verdana'})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("🧏‍♀️🧏‍♂️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide2.addText("Listen to the teacher.",{y: '50%', fontSize:48, fontFace:'Verdana'})

                }
                if (options.rules.nice) {

                    let slide = pres.addSlide();
                    slide.addText("😇❤️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide.addText("Be _____.",{y: '50%', fontSize:48, fontFace:'Verdana'})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("😇❤️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide2.addText("Be nice.",{y: '50%', fontSize:48, fontFace:'Verdana'})
                    
                }
                if (options.rules.raiseHand) {

                    let slide = pres.addSlide();
                    slide.addText("🙋🙋‍♀️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide.addText("Raise your _____.",{y: '50%', fontSize:48, fontFace:'Verdana'})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("🙋🙋‍♀️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide2.addText("Raise your hand.",{y: '50%', fontSize:48, fontFace:'Verdana'})
                    
                }
                if (options.rules.sitNicely) {

                    let slide = pres.addSlide();
                    slide.addText("🪑🤫",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide.addText("Sit _____.",{y: '50%', fontSize:48, fontFace:'Verdana'})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("🪑🤫",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide2.addText("Sit nicely.",{y: '50%', fontSize:48, fontFace:'Verdana'})
                    
                }
                if (options.rules.tryBest) {

                    let slide = pres.addSlide();
                    slide.addText("💪🏋️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide.addText("Try our _____.",{y: '50%', fontSize:48, fontFace:'Verdana'})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("💪🏋️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide2.addText("Try our best.",{y: '50%', fontSize:48, fontFace:'Verdana'})
                    
                }
                if (options.rules.sticker) {
                    let slide = pres.addSlide();
                    slide.addText("⭐️⭐️⭐️⭐️⭐️",{y: '20%', fontSize:48, fontFace:'Verdana'})
                    slide.addText("Five stars - 1 sticker!",{y: '50%', fontSize:48, fontFace:'Verdana'})
                }
                
                continue;}

            case 'Sticky ball - collage':{

                let inst = pres.addSlide();
                inst.addText("Listen to the teacher. Repeat after the teacher. Throw the ball at what you hear.",{y: '50%', fontSize:48, fontFace:'Verdana'})

                let slide = pres.addSlide();
                fillSlide(slide, tl.map(a => a?.image!))
                
                continue;}

            case 'Slap the board - collage':{

                let inst = pres.addSlide();
                inst.addText("Listen to the teacher. Slap what you hear. Slap one time, and do not slap hard!",{y: '50%', fontSize:48, fontFace:'Verdana'})

                let slide = pres.addSlide();
                fillSlide(slide, tl.map(a => a?.image!))
                
                continue;}

            case 'Slap the board - targets':{

                let inst = pres.addSlide();
                inst.addText("Look at the picture. Slap the right answer at the bottom. Slap one time, and do not slap hard!",{x:0, y: '50%', fontSize:48, fontFace:'Verdana'})


                for (const tlItem of tl) {
                    if (!tlItem) {
                        continue;
                    }
                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 6, h: 6} })
                    }
                    const tlterms = tl.map(a => a?.term ?? '')
                    const terms = tlterms.filter(a => {if (a && a != tlItem.term){ return a}}).slice(0,2)
                    terms.push(tlItem.term)
                    terms.sort(() => 0.5 - Math.random())
                    slide.addText(terms[0],{y:'80%', x:'0%', fontSize:24, fontFace:'Verdana'})
                    slide.addText(terms[1],{y:'80%', x:'30%', fontSize:24, fontFace:'Verdana'})
                    slide.addText(terms[2],{y:'80%', x:'60%', fontSize:24, fontFace:'Verdana'})
                }
                
                continue;}

            default:
                continue

        }
    }


    pres.writeFile({ fileName: 'Browser-PowerPoint-Demo.pptx' })
    .then(fileName => {
        console.log(`created file: ${fileName}`);
    });
}

function fillSlide(slide: any, images: String[]) {
    const rows=Math.floor(images.length/5) + 1
    var imgs = images;

    for (var i = 0; i < rows; i++) {
        const w = imgs.length > 5 ? 20 : 100/imgs.length
        const x = imgs.length > 5 ? 20 : 100/imgs.length
        for (var j = 0; j < 5; j++) {
            const h = 100/rows
        slide.addImage({ path: imgs.pop(), x:`${j*x}%`, y: `${i*(100/rows)}%`, sizing: {type: 'contain', w: `${w}%`, h: `${h}%`} })
        }
        
    }

}