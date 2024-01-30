import pptxgen from "pptxgenjs";
import page, { tl } from "./page";
import { createElement } from "react";
import ReactDom from 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development';
import fileDownload from 'js-file-download'
import { hydrateRoot } from "react-dom/client";




export default function genPowerPoint(rows: Row[], options: Options, item?: any) {


const element = createElement(item)
const html =  ReactDom.renderToStaticMarkup(element) as string
const newHTML = `
<script src="js/reveal.js"></script>${html}`
fileDownload(newHTML, 'page.html')


    let pres = new pptxgen();
    console.log(tl);
    pres.theme = { headFontFace: "Arial Light" };
    pres.theme = { bodyFontFace: "Arial" };

    for (const row of rows) {
        if (!row.name) {
            break;
        }
        switch (row.name) {
            case 'Vocab on board':{
                for (const tlItem of tl) {
                    if (!tlItem) {
                        break;
                    }
                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 6, h: 6} })
                    }
                    slide.addText(tlItem.term,{y:'80%', fontSize:48})
                }
                break;}

            case 'Zombie':{
                    let slide = pres.addSlide();
                    slide.addText('🧟‍♂️',{y:'80%', fontSize:48})
                    slide.addText('Say the magic spell to scare away the zombie!',{y:'50%', fontSize:48})
                break;}

            case 'How are you':{
                    let slide = pres.addSlide();
                    slide.addText('😃😭😡😋😴🤪',{y:'50%', fontSize:48})
                    slide.addText('How are you today? Pass the ball, and answer.',{y:'20%', fontSize:48})
                    slide.addText('Happy, sad, angry, hungry, tired, silly',{y:'80%', fontSize:24})
                break;}

            case 'Dragon drilling':{
                for (const tlItem of tl) {
                    if (!tlItem) {
                        break;
                    }
                    let inst = pres.addSlide();
                    inst.addText('Stand up and say the word. If you see the dragon, sit down and be silent!',{y:'50%', fontSize:48})

                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 6, h: 6} })
                    }
                    slide.addText(tlItem.term,{y:'80%', fontSize:48})
                    var d = Math.random();
                    if (d > 0.8) {
                        let slide2 = pres.addSlide();
                        slide2.addImage({path: options.dragonImage ?? 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif', x:'25%', sizing: {type: 'contain', w: 6, h: 6}});
                    }
                }
                for (const tlItem of tl) {
                    if (!tlItem) {
                        break;
                    }
                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 6, h: 6} })
                    }
                    slide.addText(tlItem.term,{y:'80%', fontSize:48})
                    var d = Math.random();
                    if (d > 0.7) {
                        let slide2 = pres.addSlide();
                        slide2.addImage({path: options.dragonImage ?? 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif', x:'25%', sizing: {type: 'contain', w: 6, h: 6}});
                    }
                }
                break;}


            case 'Vocab bingo':{
                for (const tlItem of tl) {
                    if (!tlItem) {
                        break;
                    }
                    let slide = pres.addSlide();
                    slide.addText(tlItem.term,{y:'80%', fontSize:48})

                    
                
                break;}
                if (options.generateHandouts) {
                //     let handoutSlide = pres.addSlide
                //     for (let i =0; i<tl.length; i++) {
                //     const tlimgs = tl.map(a => a?.term ?? '')
                //     const imgs = tlimgs.filter(a => {if (a && a != tlItem.term){ return a}})
                //     terms.push(tlItem.term)
                //     terms.sort(() => 0.5 - Math.random())
                //     }
                // }
                }
            }


            case 'Hot potato':{
                for (const tlItem of tl) {
                    if (!tlItem) {
                        break;
                    }
                    let inst = pres.addSlide();
                    inst.addText('There is one ball. Pass the ball around the room and say the word. If you do not have the ball, sit nicely and quietly.',{y:'50%', fontSize:48})
                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'50%', sizing: {type: 'contain', w: 6, h: 6} })
                    }

                    slide.addMedia({h:'30%', w:'30%', type: "online", link: options.songs?.timer ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8'});
                    slide.addText(tlItem.term,{y:'80%', fontSize:48})
                }
                break;}

            case  'intro song':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.intro ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8'});
                break;}

            case  'cleanup song':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.cleanup ?? 'https://www.youtube.com/watch?v=SFE0mMWbA-Y'});
                break;}

            case  'Goodbye song':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.goodbye ?? 'https://www.youtube.com/watch?v=PraN5ZoSjiY'});
                break;}

            case  'Song/video 1':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.one});
                break;}

            case  'Song/video 2':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.two});
                break;}

            case  'Song/video 3':{
                let slide = pres.addSlide();
                slide.addMedia({h:'100%', w:'100%', type: "online", link: options.songs?.three});
                break;}

            case 'Rules':{
                if (!options.rules) {
                    break;
                }
                if (options.rules.english) {

                let slide = pres.addSlide();
                slide.addText("🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦",{y: '20%', fontSize:48})
                slide.addText("Speak _____.",{y: '50%', fontSize:48})

                let slide2 = pres.addSlide();
                slide2.addText("🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦",{y: '20%', fontSize:48})
                slide2.addText("Speak English.",{y: '50%', fontSize:48})
                }
                if (options.rules.listen) {

                    let slide = pres.addSlide();
                    slide.addText("🧏‍♀️🧏‍♂️",{y: '20%', fontSize:48})
                    slide.addText("_____ to the teacher.",{y: '50%', fontSize:48})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("🧏‍♀️🧏‍♂️",{y: '20%', fontSize:48})
                    slide2.addText("Listen to the teacher.",{y: '50%', fontSize:48})

                }
                if (options.rules.nice) {

                    let slide = pres.addSlide();
                    slide.addText("😇❤️",{y: '20%', fontSize:48})
                    slide.addText("Be _____.",{y: '50%', fontSize:48})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("😇❤️",{y: '20%', fontSize:48})
                    slide2.addText("Be nice.",{y: '50%', fontSize:48})
                    
                }
                if (options.rules.raiseHand) {

                    let slide = pres.addSlide();
                    slide.addText("🙋🙋‍♀️",{y: '20%', fontSize:48})
                    slide.addText("Raise your _____.",{y: '50%', fontSize:48})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("🙋🙋‍♀️",{y: '20%', fontSize:48})
                    slide2.addText("Raise your hand.",{y: '50%', fontSize:48})
                    
                }
                if (options.rules.sitNicely) {

                    let slide = pres.addSlide();
                    slide.addText("🪑🤫",{y: '20%', fontSize:48})
                    slide.addText("Sit _____.",{y: '50%', fontSize:48})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("🪑🤫",{y: '20%', fontSize:48})
                    slide2.addText("Sit nicely.",{y: '50%', fontSize:48})
                    
                }
                if (options.rules.tryBest) {

                    let slide = pres.addSlide();
                    slide.addText("💪🏋️",{y: '20%', fontSize:48})
                    slide.addText("Try our _____.",{y: '50%', fontSize:48})
    
                    let slide2 = pres.addSlide();
                    slide2.addText("💪🏋️",{y: '20%', fontSize:48})
                    slide2.addText("Try our best.",{y: '50%', fontSize:48})
                    
                }
                if (options.rules.sticker) {
                    let slide = pres.addSlide();
                    slide.addText("⭐️⭐️⭐️⭐️⭐️",{y: '20%', fontSize:48})
                    slide.addText("Five stars - 1 sticker!",{y: '50%', fontSize:48})
                }
                
                break;}

            case 'Sticky ball - collage':{

                let inst = pres.addSlide();
                inst.addText("Listen to the teacher. Repeat after the teacher. Throw the ball at what you hear.",{y: '50%', fontSize:48})

                let slide = pres.addSlide();
                fillSlide(slide, tl.map(a => a?.image!))
                
                break;}

            case 'Charades':{

                let inst = pres.addSlide();
                inst.addText("Two teams. One person in your team faces you. Teacher points at a picture. The group has to act the picture out, and not speak. The standing person has to not look at the board. If the standing person the word from your groups acting, your team gets a point.",{y: '50%', fontSize:24})

                let inst2 = pres.addSlide();
                inst2.addText("Does the person standing guess the word?",{y: '50%', fontSize:48})

                let inst3 = pres.addSlide();
                inst3.addText("Does the person standing guess the word? Yes!",{y: '50%', fontSize:48})

                let inst4 = pres.addSlide();
                inst4.addText("Do you speak if you're sitting down?",{y: '50%', fontSize:48})

                let inst5 = pres.addSlide();
                inst5.addText("Do you speak if you're sitting down? No!",{y: '50%', fontSize:48})

                let slide = pres.addSlide();
                fillSlide(slide, tl.map(a => a?.image!))
                
                break;}

                case 'Sticky ball - targets':{
    
                    let inst = pres.addSlide();
                    inst.addText("Look at the picture. Throw the ball at the right answer at the bottom",{x:0, y: '50%', fontSize:48})
    
    
                    for (const tlItem of tl) {
                        if (!tlItem) {
                            break;
                        }
                        let slide = pres.addSlide();
                        if (tlItem.image?.length > 0) {
                            slide.addImage({ path: tlItem.image, x:'70%', sizing: {type: 'contain', w: 3, h: 3} })
                        }
                        const tlterms = tl.map(a => a?.term ?? '')
                        const terms = tlterms.filter(a => {if (a && a != tlItem.term){ return a}}).slice(0,2)
                        terms.push(tlItem.term)
                        terms.sort(() => 0.5 - Math.random())
                        slide.addText(terms[0],{y:'80%', x:'0%', fontSize:24})
                        slide.addText(terms[1],{y:'80%', x:'30%', fontSize:24})
                        slide.addText(terms[2],{y:'80%', x:'60%', fontSize:24})
                    }
                    
                    break;}

            case 'Slap the board - collage':{

                let inst = pres.addSlide();
                inst.addText("Listen to the teacher. Slap what you hear. Slap one time, and do not slap hard!",{y: '50%', fontSize:48})

                let slide = pres.addSlide();
                fillSlide(slide, tl.map(a => a?.image!))
                
                break;}

            case 'Slap the board - targets':{

                let inst = pres.addSlide();
                inst.addText("Look at the picture. Slap the right answer at the bottom. Slap one time, and do not slap hard!",{x:0, y: '50%', fontSize:48})


                for (const tlItem of tl) {
                    if (!tlItem) {
                        break;
                    }
                    let slide = pres.addSlide();
                    if (tlItem.image?.length > 0) {
                        slide.addImage({ path: tlItem.image, x:'70%', sizing: {type: 'contain', w: 3, h: 3} })
                    }
                    const tlterms = tl.map(a => a?.term ?? '')
                    const terms = tlterms.filter(a => {if (a && a != tlItem.term){ return a}}).slice(0,2)
                    terms.push(tlItem.term)
                    terms.sort(() => 0.5 - Math.random())
                    slide.addText(terms[0],{y:'80%', x:'0%', fontSize:24})
                    slide.addText(terms[1],{y:'80%', x:'30%', fontSize:24})
                    slide.addText(terms[2],{y:'80%', x:'60%', fontSize:24})
                }
                
                break;}

            default:
                break

        }

        switch (row.category) {
            case 'Other':
                break;
            case 'Controlled practice':
                break;
            case 'Freer practice':
                break;
            default:
                if (options.rulesAfterActivities && options.rules) {
                    if (options.rules.english) {
    
                    let slide = pres.addSlide();
                    slide.addText("🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦",{y: '20%', fontSize:48})
                    slide.addText("Did we speak English?",{y: '50%', fontSize:48})
                    }
                    if (options.rules.listen) {
    
                        let slide2 = pres.addSlide();
                        slide2.addText("🧏‍♀️🧏‍♂️",{y: '20%', fontSize:48})
                        slide2.addText("Did we listen to the teacher?",{y: '50%', fontSize:48})
    
                    }
                    if (options.rules.nice) {

                        let slide2 = pres.addSlide();
                        slide2.addText("😇❤️",{y: '20%', fontSize:48})
                        slide2.addText("Were we nice?",{y: '50%', fontSize:48})
                        
                    }
                    if (options.rules.raiseHand) {
        
                        let slide2 = pres.addSlide();
                        slide2.addText("🙋🙋‍♀️",{y: '20%', fontSize:48})
                        slide2.addText("Did we raise our hands?",{y: '50%', fontSize:48})
                        
                    }
                    if (options.rules.tryBest) {

                        let slide2 = pres.addSlide();
                        slide2.addText("💪🏋️",{y: '20%', fontSize:48})
                        slide2.addText("Did we try our best?",{y: '50%', fontSize:48})
                        
                    }
                    if (options.rules.sitNicely) {

                        let slide2 = pres.addSlide();
                        slide2.addText("🪑🤫",{y: '20%', fontSize:48})
                        slide2.addText("Are we sitting nicely? Who's sitting nicely? 🎶",{y: '50%', fontSize:48})
                        
                    }
                    break;
                }
                
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

    function getClozeTests(tl: string[]) {
        const prompt = `Generate cloze tests for each of these words, graded to a beginner level.
        Run
        Jump
        Fly
        Swim
        Drink
        Eat
        
        Output the response as an array of strings`
    }

}