import React from 'react'
import Questions from './questions'

export default function Page(){

    function onNext(){
        console.log('On next click')
    }
    function onPrev(){
        console.log('On Prev click')
    }
    return(
        <div className='container'>
            <h1 className='title'>Quiz Appliation</h1>

            {/* display questions*/}
            <Questions></Questions>

            <div className='grid'>
                <button className='btn prev' onClick={onPrev}>Prev</button>
                <button className='btn prev' onClick={onNext}>Next</button>

            </div>
        </div>
    )
}