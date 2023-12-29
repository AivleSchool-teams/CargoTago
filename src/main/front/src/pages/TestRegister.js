import React, { useState } from 'react'

function TestRegister () {
    const [state,setState] = useState('');

    return (
        <div>
            <p>state</p>
            <input type='text' value={state} onChange={e=>setState(e.target.value)}></input>
        </div>
    )
}

export default TestRegister;