import React from 'react'
import classes from './App.module.sass'

import SingleElement from '../components/SingleElement'

const Sample: React.FC<{ title: string }> = ({ title, children }) => (
  <div className={classes.sample}>
    <h2 className={classes.subtitle}>{title}</h2>

    {children}
  </div>
)

function App() {
  return (
    <div className={classes.container}>
      {/* header */}
      <h1 className={classes.title}>
        <a
          className={classes.title__link}
          href="http://github.com/lbwa/how-virtual-scroll-works"
          target="_blank"
          rel="noopener noreferrer"
        >
          How virtual scroll works
        </a>
      </h1>

      {/* body */}
      <div className={classes.body}>
        <Sample title="Single element with horizontal scroll">
          <SingleElement width={500} height={100} size={90} count={100} />
        </Sample>
      </div>

      <footer className={classes.footer}>
        Copyright &copy; {new Date().getFullYear()}&nbsp;
        <a href="http://set.sh" target="_blank" rel="noopener noreferrer">
          Bowen Liu
        </a>
      </footer>
    </div>
  )
}

export default App
