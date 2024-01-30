'use client'

import { useEffect } from 'react';
import Reveal from 'reveal.js';

import '/node_modules/reveal.js/dist/reveal.css';

export default function Presentation() {

    useEffect(() => {
        Reveal.initialize({
            controls: true,
            hash: true,
            margin: 0.1
        });
    }, []);

    return (
        <div className="reveal">
            <div className="slides">
                <section >
                    <h2>Slide 1</h2>
                    <p>First slide</p>
                </section>
                <section >
                    <h2>Slide 2</h2>
                    <p>Second slide</p>
                </section>
            </div>
        </div>
    )
}