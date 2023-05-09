import React from 'react';
import { Button } from "@sonics-team/core/src";
import { useToggle } from '@sonics-team/utils/src/useToggle';

function App() {

    const { value, toggleValue } = useToggle(false);
    return (
        <div className="App">
            <div>{value.toString()}</div>
            <Button onClick={toggleValue}>value</Button>
            <Button onClick={() => toggleValue(true)}>make true</Button>
            <Button onClick={() => toggleValue(false)}>make false</Button>
        </div>
    );
}

export default App;
