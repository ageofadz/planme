'use client'

import React, { useEffect } from 'react'
import Reveal from 'reveal.js'
import '../../node_modules/reveal.js/dist/reveal.css'
import '../../node_modules/reveal.js/dist/theme/beige.css'
import { Activity } from '../types/activity'
import { type Row } from '../types/row'
import { type Options } from '../types/options'

function convertToEmbed (url: string): string {
  const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const embedUrl = url.replace(pattern, 'https://www.youtube.com/embed/$1')
  return embedUrl
}

function substituteLetters (str: string, letters: number): string {
  if (letters + 1 >= str.length) {
    letters = str.length - 2
  }
  for (let i = 0; i < letters;) {
    const pos = Math.floor(Math.random() * str.length)
    if (str[pos] === '_') {
      continue
    }
    str = str.substring(0, pos) + '_' + str.substring(pos + 1)
    i++
  }
  return str
}

function fillScreen (tl: Array<{ term: string, image: string }>): React.JSX.Element {
  const contents = []

  for (let i = 0; i < tl.length; i++) {
    contents.push(<div>
        <img className='object-cover' src={tl[i].image}/>
        </div>)
  }

  return (
    <section>
        <div className="grid grid-cols-4 gap-4">
            {contents
            }
        </div>
    </section>)
}

export default function Presentation (props: { rows: Row[], options: Options }): React.JSX.Element {
  const rowsString = localStorage.getItem('rows')
  const tlString = localStorage.getItem('tl')
  const optionsString = localStorage.getItem('options')

  if (!rowsString || !optionsString) {
    return (
            <div>
                Error previewing presentation
            </div>
    )
  }

  const rows = JSON.parse(rowsString) as Row[]
  let tl = JSON.parse(tlString ?? '[]') as Array<{ term: string, image: string, type: string }>
  const receptiveText = tl.filter(tlItem => tlItem.type === 'text')
  tl = tl.filter(tlItem => tlItem.type !== 'text')
  const options = JSON.parse(optionsString) as Options

  useEffect(() => {
    void Reveal.initialize({
      controls: true,
      hash: true,
      margin: 0.1
    })
  }, [])

  const slides = (): React.JSX.Element[] => {
    const slideList = []
    for (const row of rows) {
      if (!row.name) {
        break
      }
      switch (row.name as Activity) {
        case Activity.VocabOnBoard:{
          for (const tlItem of tl) {
            slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        {tlItem.term}
                        </div>
                        <div className='w-1/2'>
                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                        </div>
                        </div>
                    </section>)
          }
          break }

        case Activity.SpellingRace:{
          slideList.push(<section>
                      <div className='flex flex-col w-full'>
                      <div className='h-1/3'>
                      <h1>Spelling race!</h1>
                      </div>
                      <div className='h-1/3'>
                      Two teams. Write the <b>missing letters</b>. Fastest wins!
                      </div>
                      </div>
                  </section>)
          for (const tlItem of tl) {
            slideList.push(<section>
                          <div className='flex flex-row w-full'>
                          <div className='w-1/2'>
                          {substituteLetters(tlItem.term, 3)}
                          </div>
                          <div className='w-1/2'>

                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                          </div>
                          </div>
                      </section>)
          }
          break }

        case Activity.Zombie:{
          slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        Say the magic spell to scare away the zombie!
                        </div>
                        <div className='w-1/2'>
                        <h1>🧟</h1>
                        </div>
                        </div>
                    </section>)
          break }

        case Activity.HowAreYou:{
          slideList.push(<section>
                        <div className='flex flex-col w-full'>
                        <div className='h-1/3'>
                        <h1>😃😭😡😋😴🤪</h1>
                        </div>
                        <div className='h-1/3'>
                        How are you today? Pass the ball and answer.
                        </div>
                        <div className='h-1/3'>
                        Happy, sad, angry, hungry, tired, silly
                        </div>
                        </div>
                    </section>)
          break }

        case Activity.Dragon:{
          slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-1/2'>
                    Stand up and say the word. If you see the dragon, sit down and be silent!
                    </div>
                    <div className='w-1/2'>
                    <img className='object-cover w-full h-full'src={options.dragonImage ?? 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif'}></img>
                    </div>
                    </div>
                </section>)
          for (const tlItem of tl) {
            slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        {tlItem.term}
                        </div>
                        <div className='w-1/2'>

                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                        </div>
                        </div>
                    </section>)
            const d = Math.random()
            if (d > 0.8) {
              slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-full'>
                    <img className='object-cover w-full h-full'src={options.dragonImage ?? 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif'}></img>
                    </div>
                    </div>
                </section>)
            }
          }
          for (const tlItem of tl) {
            slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        {tlItem.term}
                        </div>
                        <div className='w-1/2'>

                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                        </div>
                        </div>
                    </section>)
            const d = Math.random()
            if (d > 0.6) {
              slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-full'>
                    <img className='object-cover w-full h-full'src={options.dragonImage ?? 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif'}></img>
                    </div>
                    </div>
                </section>)
            }
          }
          break
        }

        case Activity.HotPotato:{
          slideList.push(<section>
                    <div className='flex flex-col w-full'>
                    <div className='h-1/3'>
                    <h1>🔥🥔</h1>
                    </div>
                    <div className='h-1/3'>
                    There is one ball. Pass the ball around the room and say the word. If you do not have the ball, sit nicely and quietly.
                    </div>
                    </div>
                </section>)
          for (const tlItem of tl) {
            slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/3'>
                        {tlItem.term}
                        </div>
                        <div className='w-1/3'>

                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                        </div>
                        <iframe width="560" height="315" src={convertToEmbed(options.songs?.timer ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        </div>
                    </section>)
          }
          break }

        case Activity.Intro:{
          slideList.push(<section>
                    <iframe className='h-screen w-full' src={convertToEmbed(options.songs?.intro ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                </section>)
          break }

        case Activity.Cleanup:{
          slideList.push(<section>
                    <iframe className='h-screen w-full' src={convertToEmbed(options.songs?.cleanup ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                </section>)
          break }

        case Activity.Goodbye:{
          slideList.push(<section>
                    <iframe className='h-screen w-full' src={convertToEmbed(options.songs?.goodbye ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                </section>)
          break }

        case Activity.Song1:{
          slideList.push(<section>
                    <iframe className='h-screen w-full' src={convertToEmbed(options.songs?.one ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                </section>)
          break }

        case Activity.Song2:{
          slideList.push(<section>
                    <iframe className='h-screen w-full' src={convertToEmbed(options.songs?.two ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                </section>)
          break }

        case Activity.Song3:{
          slideList.push(<section>
                    <iframe className='h-screen w-full' src={convertToEmbed(options.songs?.three ?? 'https://www.youtube.com/watch?v=tVlcKp3bWH8')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                </section>)
          break }

        case Activity.Rules:{
          if (!options.rules) {
            break
          }
          if (options.rules.english) {
            slideList.push(<section data-transition="fade">

                   <div className='flex flex-row w-full'>
                       <div className='w-1/2'>
                       <h1>🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦</h1>
                       </div>
                       <div className='w-1/2'>
                       <h1>Speak _____</h1>
                       </div>
                       </div>

               </section>)
            slideList.push(<section data-transition="fade">

                    <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        <h1>🇬🇧🇺🇸🇦🇺🇳🇿🇨🇦</h1>
                        </div>
                        <div className='w-1/2'>
                        <h1>Speak English!</h1>
                        </div>
                        </div>

                </section>)
          }
          if (options.rules.english) {
            slideList.push(<section data-transition="fade">

                    <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        <h1>🧏‍♀️🧏‍♂️</h1>
                        </div>
                        <div className='w-1/2'>
                        <h1>_____ to the teacher.</h1>
                        </div>
                        </div>

                </section>)
            slideList.push(<section data-transition="fade">

                     <div className='flex flex-row w-full'>
                         <div className='w-1/2'>
                         <h1>🧏‍♀️🧏‍♂️</h1>
                         </div>
                         <div className='w-1/2'>
                         <h1>Listen to the teacher.</h1>
                         </div>
                         </div>

                 </section>)
          }
          if (options.rules.nice) {
            slideList.push(<section data-transition="fade">

                     <div className='flex flex-row w-full'>
                         <div className='w-1/2'>
                         <h1>😇❤️</h1>
                         </div>
                         <div className='w-1/2'>
                         <h1>Be ____</h1>
                         </div>
                         </div>

                 </section>)
            slideList.push(<section data-transition="fade">

                      <div className='flex flex-row w-full'>
                          <div className='w-1/2'>
                          <h1>😇❤️</h1>
                          </div>
                          <div className='w-1/2'>
                          <h1>Be nice</h1>
                          </div>
                          </div>

                  </section>)
          }
          if (options.rules.raiseHand) {
            slideList.push(<section data-transition="fade">

                      <div className='flex flex-row w-full'>
                          <div className='w-1/2'>
                          <h1>🙋🙋‍♀️</h1>
                          </div>
                          <div className='w-1/2'>
                          <h1>Raise your ____</h1>
                          </div>
                          </div>

                  </section>)
            slideList.push(<section data-transition="fade">

                       <div className='flex flex-row w-full'>
                           <div className='w-1/2'>
                           <h1>🙋🙋‍♀️</h1>
                           </div>
                           <div className='w-1/2'>
                           <h1>Raise your hand</h1>
                           </div>
                           </div>

                   </section>)
          }
          if (options.rules.sitNicely) {
            slideList.push(<section data-transition="fade">

                       <div className='flex flex-row w-full'>
                           <div className='w-1/2'>
                           <h1>🪑🤫</h1>
                           </div>
                           <div className='w-1/2'>
                           <h1>Sit ______</h1>
                           </div>
                           </div>

                   </section>)
            slideList.push(<section data-transition="fade">

                        <div className='flex flex-row w-full'>
                            <div className='w-1/2'>
                            <h1>🪑🤫</h1>
                            </div>
                            <div className='w-1/2'>
                            <h1>Sit nicely</h1>
                            </div>
                            </div>

                    </section>)
          }
          if (options.rules.tryBest) {
            slideList.push(<section data-transition="fade">

                        <div className='flex flex-row w-full'>
                            <div className='w-1/2'>
                            <h1>💪🏋️</h1>
                            </div>
                            <div className='w-1/2'>
                            <h1>Try our ____</h1>
                            </div>
                            </div>

                    </section>)
            slideList.push(<section data-transition="fade">

                         <div className='flex flex-row w-full'>
                             <div className='w-1/2'>
                             <h1>💪🏋️</h1>
                             </div>
                             <div className='w-1/2'>
                             <h1>Try our best</h1>
                             </div>
                             </div>

                     </section>)
          }
          if (options.rules.sticker) {
            slideList.push(<section data-transition="fade">

                         <div className='flex flex-row w-full'>
                             <div className='w-1/2'>
                             <h1>⭐️⭐️⭐️⭐️⭐️</h1>
                             </div>
                             <div className='w-1/2'>
                             <h1>Five stars = 1 sticker!</h1>
                             </div>
                             </div>

                     </section>)
          }
          break }

        case Activity.StickyCollage:{
          slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-1/2'>
                    Throw a sticky ball and say the word!
                    </div>
                    <div className='w-1/2'>
                    <h1>☄️</h1>
                    </div>
                    </div>
                </section>)

          slideList.push(
            fillScreen(tl))
          break }

        case Activity.SlapOrder:{
          slideList.push(<section>
                      <div className='flex flex-row w-full'>
                      <div className='w-1/2'>
                      Slap the scenes in the right order!
                      </div>
                      <div className='w-1/2'>
                      <h1>☄️</h1>
                      </div>
                      </div>
                  </section>)

          const randomOrder = receptiveText
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

          slideList.push(
            fillScreen(randomOrder))
          break }

        case Activity.StickyTargets:{
          slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-full'>
                    Sticky balls!
                    </div>
                    </div>
                </section>)

          slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-1/2'>
                    Throw the ball at the target!
                    </div>
                    <div className='w-1/2'>
                    🎯
                    </div>
                    </div>
                </section>)

          for (const tlItem of tl) {
            const terms = [(tl.at(Math.floor(tl.length * Math.random()))?.term), (tl.at(Math.floor(tl.length * Math.random()))?.term), tlItem.term]
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
            slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-1/2 flex flex-col my-auto text-5xl'>
                    <div className='my-auto'>
                    🎯  {terms.pop()}
                    </div>
                    <div className='my-auto'>
                    🎯  {terms.pop()}
                    </div>
                    <div className='my-auto'>
                    🎯  {terms.pop()}
                    </div>
                    </div>
                    <div className='w-1/2'>

                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                    </div>
                    </div>
                </section>)
          }
          break }

        case Activity.Charades:{
          slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-full'>
                        Charades!
                        </div>
                        </div>
                    </section>)

          slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        Two teams. One person in your team faces you, and guesses. If you are sitting, you do not move your mouth.
                        </div>
                        <div className='w-1/2'>
                        🗣️ 🪑🤐🪑🤐🪑🤐🪑🤐
                        </div>
                        </div>
                    </section>)

          slideList.push(<section>
                        <div className='flex flex-row w-full'>
                        <div className='w-1/2'>
                        Teacher points at a picture. The group has to act the picture out, and not speak. The standing person has to not look at the board. If the standing person the word from your groups acting, your team gets a point.
                        </div>
                        <div className='w-1/2'>
                        🗣️ 🪑🤐🪑🤐🪑🤐🪑🤐
                        </div>
                        </div>
                    </section>)

          slideList.push(
            fillScreen(tl))
          break }

        case Activity.SlapCollage:{
          slideList.push(<section>
                            <div className='flex flex-row w-full'>
                            <div className='w-1/2'>
                            Slap the board and say the word!
                            </div>
                            <div className='w-1/2'>
                            <h1>☄️</h1>
                            </div>
                            </div>
                        </section>)

          slideList.push(
            fillScreen(tl))
          break }

        case Activity.SlapTargets:{
          slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-full'>
                    Slap the board!
                    </div>
                    </div>
                </section>)

          slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-1/2'>
                    Slap the target! Slap once 1️⃣ and slap gently 😊
                    </div>
                    <div className='w-1/2'>
                    🎯
                    </div>
                    </div>
                </section>)

          for (const tlItem of tl) {
            let ts = [(tl.at(Math.floor(tl.length * Math.random()))?.term), (tl.at(Math.floor(tl.length * Math.random()))?.term), tlItem.term]
            ts = ts
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
            slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-1/2 flex flex-col my-auto text-5xl'>
                    <div className='my-auto'>
                    🎯  {ts.pop()}
                    </div>
                    <div className='my-auto'>
                    🎯  {ts.pop()}
                    </div>
                    <div className='my-auto'>
                    🎯  {ts.pop()}
                    </div>
                    </div>
                    <div className='w-1/2'>

                        {tlItem.image ? <img className='object-cover w-full h-full' src={tlItem.image}/> : <></>}
                    </div>
                    </div>
                </section>)
          }
          break }

        default:
          break
      }
    }

    return slideList
  }

  return (
        <div className="reveal">
            <div className="slides">
                {slides()}
            </div>
        </div>
  )
}
