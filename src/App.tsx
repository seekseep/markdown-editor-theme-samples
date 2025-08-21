import { Highlight, themes, type Token } from 'prism-react-renderer'
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
import { javascript } from '@codemirror/lang-javascript';
type ThemeName = keyof typeof themes;

const themeAndNames: {
  name: string,
  theme: typeof themes[ThemeName]
}[] = [
  {
    name: 'dracula',
    theme: themes.dracula
  },
  {
    name: 'duotoneDark',
    theme: themes.duotoneDark
  },
  {
    name: 'duotoneLight',
    theme: themes.duotoneLight
  },
  {
    name: 'github',
    theme: themes.github
  },
  {
    name: 'gruvboxMaterialDark',
    theme: themes.gruvboxMaterialDark
  },
  {
    name: 'gruvboxMaterialLight',
    theme: themes.gruvboxMaterialLight
  },
  {
    name: 'jettwaveDark',
    theme: themes.jettwaveDark
  },
  {
    name: 'jettwaveLight',
    theme: themes.jettwaveLight
  },
  {
    name: 'nightOwl',
    theme: themes.nightOwl
  },
  {
    name: 'nightOwlLight',
    theme: themes.nightOwlLight
  },
]



function App() {
  const [value, setValue] = useState("console.log('hello world!');");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left:0,
        bottom: 0,
        width: '50%',
        display: 'flex',
        alignItems: 'stretch'
      }}>
        <CodeMirror
        width='100%'
          extensions={[javascript({ jsx: true })]}
          value={value} height='100%' onChange={onChange} />
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '50%',
        height: '100%',
        overflow: 'auto'
      }}>
        {themeAndNames.map(({ name, theme }, i) =>
          <div key={i} style={{
            marginBlockEnd: '1rem'
          }}>
            <div style={{ marginBottom: '0.5rem'}}>
              {name}
            </div>
            <Highlight
              theme={theme}
              code={value}
              language="javascript">
              {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                <div className={highlightClassName} style={{ ...style, padding: "0.5rem" }}>
                  {tokens.map((line: Token[], i: number) => {
                    const { className: lineClassName, ...props } = getLineProps({ line })
                    return (
                      <pre key={i} className={lineClassName} {...props}>
                        {line.map((token: Token, key: number) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </pre>
                    )
                  })}
                </div>
              )}
            </Highlight>
          </div>
        )}
      </div>
    </div>
  )
}
export default App;
