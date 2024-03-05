'use client'

import React, { useEffect } from 'react'
import Reveal from 'reveal.js'
import '../../node_modules/reveal.js/dist/reveal.css'
import { Activity } from '../types/activity'
import { type Row } from '../types/row'
import { type Options } from '../types/options'
import Button from '@mui/material/Button'
import { Redo } from '@mui/icons-material'
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material'

let d = Math.random()

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
  console.log(localStorage)
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
  import ('../../node_modules/reveal.js/dist/theme/' + options.theme?.toString() + '.css')

  const [currTL, setCurrentTL] = React.useState(0)
  const [missingCount, setMissingCount] = React.useState(3)

  function targetRun (tl: Array<{ term: string, image: string }>): React.JSX.Element {
    const tempTL = tl.filter(t => t.term !== tl[currTL].term)
    const terms = [(tempTL.splice(Math.floor(tempTL.length * Math.random()))[0]?.term), (tempTL.splice(Math.floor(tempTL.length * Math.random()))[0]?.term), tl[currTL].term]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    return <section>
    <header className="h-10"><Button size='large' variant='outlined' onClick={incrementTL}><Redo /></Button></header>
            <div className='flex flex-col w-4/5 h-screen'>

            <div className='h-1/2'>

            {tl[currTL].image ? <img className='object-contain h-full w-full' src={tl[currTL].image}/> : <></>}

            </div>
            <div className='flex flex-row my-auto text-xl'>
            <div className="font-bold text-white rounded-full bg-red-500 flex items-center justify-center font-mono aspect-square w-1/4 m-auto">{terms.pop()}</div>
            <div className="font-bold text-white rounded-full bg-red-500 flex items-center justify-center font-mono aspect-square w-1/4 m-auto">{terms.pop()}</div>
            <div className="font-bold text-white rounded-full bg-red-500 flex items-center justify-center font-mono aspect-square w-1/4 m-auto">{terms.pop()}</div>
            </div>
            </div>
        </section>
  }

  function fillScreenMissing (tl: Array<{ term: string, image: string }>): React.JSX.Element {
    const contents = []

    for (let i = 0; i < tl.length; i++) {
      if (i === currTL) {
        contents.push(<div>
                <img className='object-cover' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX/////AAD/0ND/5eX/cnL/4eH/3d3/xsb/+fn//Pz/1NT/zc3/ycn/vr7/9PT/f3//d3f/aWn/YmL/Wlr/u7v/2dn/ZWX/GRn/IiL/U1P/MzP/W1v/tbX/r6//qqr/paX/h4f/DQ3/bW3/Kir/Ojr/QUH/SUn/6+v/kZH/i4v/fHz/JSX/Ly//mJj/RETgXsjCAAAE20lEQVR4nN3d13LbQAwFUFFh4oQucnovTrHjtP//vERuEqXlEosFcO8GrxyA9wyfOEtBi0WmVvdyV3lq+VzZ2HddE8Sh6x6oGv8BmyAO65wa4hWwAeJwnbOceAOkJw63OUuJd0By4rDJWUbcAlITh+2c9wsaR0Bi4nKcU07cAdISl7s5pcQ9IClxDyglJoCUxARQRkwCCYlJoIQ4AaQjTgDniZNAMuLhdM48MQOkImaAeWIWSETMAnPEGSANcQY4nXMWSEKcBU7lFAApiAJgOqcISEAUAVM5hUA48UibUwwEE8XA3ZwFQCixADjOWQQEEouA2zkLgTBiIXCTsxgIIh5ocyqAEKIC2HUXWiCAqAKuiae6xnCiEth102+SXEQ18CDzssxEVAOP190NEOuADRBrgfTEeiA50QJITTw2ARITrYC0RDXwYH8WJdESSEm0BRISrYF0RHsgGdEDSEV85gIkInoBaYh+QBKiJ5CCqAYeyebDid5AONEfCCZGAKHEGCCQ+C4ICCOqgYfl94IQI4EQYiwQQIwGhhPjgcFEBDCUiAEGEtXAZR0wjPgeBgwiIoEhRCwwgIgGuhPxQGeiGjjYAV2JHEBH4gcSoBuRB+hEZAK6ELmADkQ2oDmRD2hMZASaEjmBhsSP2jnaHRjRRF6gEZEZaELkBhoQ2YHVRH5gJbEFYA3xog1gDVFbukVJDRHDgdFEADCWCAFGEkHAOCIMGEUEAmOIUGAEEQz0J8KB3sSSHWxu5UmkAHoSSYB+RBqgF5EI6EOkAnoQyYD2RDqgNZEQaEuEb6NKlx2RFGhHpAVaEYmBNkRqoAWRHFhPpAfWEhsA1hGbAO4sSi8q0S9ACer7//4ML/XANohVwBaIlUB+4qdaIDvRAMhNNAEyE42AvEQzICvREMhJNAUyEo2BfMSVNZCN6ADkIroAmYhOQB6iG5CF6AjkIP7wBDIQnYF4ojsQTQwAYokhQCRRvZO/FWIYEEUMBGKIoUAEMRgYT9QCz9S7c4OJ6id4gl47KSzlf9OsgfDNmv7AFoiVQH5iNZCdaADkJmqBZyejMbxEIyAv8bMVkJVoCOQkmgIZicZAPqI5kI342B7IRXQBMhGdgDxELfDlw9nRHERHIAfRFchAfOELxBPdgWhiABBLDAEiiUFAHPFJFBBFDARiiFrgKw0QQQwGxhPDgdFEADCWCAFGEt9igHFENfBRJTCKCATGEJ8q7/DTAhhBBAP9iXCgN1EL/GIH9CVSAD2JJEA/Ig3Qi0gE9CG+ZgJ6ENVAF58DUQv85QW0JhICbYmUQEsiKdCOqAW+8QZaEYmBNkRqoAWRHFhPPGcH1hIbANYRf7cArCCutJ8hfI0Fqon9uldDDAcqif11bzkRAFQR+9veUiIEqCD2m96y03oQsJjYb/eWEGHAQmI/7pUTgcAiYr/bKyVCgQXEPaD0SBQMFBMTQBkRDhQSk0AJ8VssJl0C4gRwnkgBFBAngXNEEuAsMQPME2mAM8QsMEckAmaJM8BpIhUwQ5wFTn2HQQacJAqAaeIf78DllSSKgCkiITBJFAL3iZTABFEM3CWSAveIBcAx8dwrYH0t1cDtE31i4IhYCNwQqYFbxGLgLZEceEdUAK+J9MAbogq4PpNqAHhFVAIXi0vLIH61PM1d/Qts0nPMkOKmUwAAAABJRU5ErkJggg=='/>
                </div>)
      }
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
  <header className="h-10"><Button size='large' variant='outlined' onClick={incrementTL}><Redo /></Button></header>
        </section>)
  }

  const incrementTL = (): void => {
    d = Math.random()
    if (currTL >= tl.length - 1) {
      setCurrentTL(0)
      return
    }
    setCurrentTL(currTL + 1)
  }

  useEffect(() => {
    const clientSideInitialization = async (): Promise<void> => {
      void Reveal.initialize({
        controls: true,
        hash: true,
        margin: 0.1
      })
    }
    clientSideInitialization().then(() => { console.log('reveal inited') }).catch(() => { console.log('reveal not inited') })
  }, [])

  const slides = (): React.JSX.Element[] => {
    const slideList = []
    for (const row of rows) {
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

          slideList.push(<section>
              <div className="flex flex-row mx-auto w-1/3">
              <div className='mx-auto'>
              <Button size='large' variant='outlined' onClick={incrementTL}><Redo /></Button>
              </div>
              <div className='mx-auto'>
              <Typography id="input-slider" gutterBottom>
                  Missing letters
                </Typography>
              <Slider value={missingCount} onChange={(_, v) => { setMissingCount(v as number) }} step={1} marks min={0} max={7}
            valueLabelDisplay="auto" aria-label='Missing letters' />
            </div>
            </div>
                          <div className='flex flex-col w-full h-5/6'>
                          <div className='w-96 h-96 m-auto'>

                          {tl[currTL].image ? <img className='object-contain h-full w-full' src={tl[currTL].image}/> : <></>}
                          </div>
                          <div className='w-1/2 h-1/3 m-auto'>
                          {substituteLetters(tl[currTL].term, missingCount)}
                          </div>
                          </div>
                      </section>)
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
          slideList.push(<section>
                        <div className='flex flex-row w-full h-96'>
                        <div className='w-1/2 my-auto'>
                            <div>
                        {d < 0.8 ? tl[currTL].term : 'Dragon!'}
                        </div>
                        </div>
                        <div className='w-1/2'>

                        {tl[currTL].image ? <img className='object-cover w-full' src={d < 0.8 ? tl[currTL].image : options.dragonImage}/> : <></>}
                        </div>
                        </div>

  <header className="h-10"><Button size='large' variant='outlined' onClick={incrementTL}><Redo /></Button></header>
                    </section>)
          if (d > 0.8) {
            slideList.push(<section>
                    <div className='flex flex-row w-full'>
                    <div className='w-full'>
                    <img className='object-cover w-full h-full'src={options.dragonImage ?? 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif'}></img>
                    </div>
                    </div>
                </section>)
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

          slideList.push(targetRun(tl))
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

          slideList.push(targetRun(tl))
          break }

        case Activity.MissingPicture:{
          slideList.push(<section>
                      <div className='flex flex-row w-full'>
                      <div className='w-1/2'>
                      Find the missing word!
                      </div>
                      </div>
                  </section>)
          slideList.push(
            fillScreenMissing(tl))
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
