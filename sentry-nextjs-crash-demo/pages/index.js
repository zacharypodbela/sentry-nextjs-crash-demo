import { useState } from 'react'

const Debug = () => {
  const [value, setValue] = useState({ words: "to test error reporting." });

  return (
    <div>
      <p>
        <button onClick={() => thisIsNotReal()}>
          Cause Intentional ReferenceError
        </button>
        <span>to test error reporting.</span>
      </p>
      <p>
        <button onClick={() => setValue(undefined)}>
          Cause Intentional TypeError (App Crash)
        </button>
        <span>{value.words}</span>
      </p>
    </div>
  );
};

export default Debug;