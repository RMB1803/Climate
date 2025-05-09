import React, { type PropsWithChildren } from 'react'

const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
      header

      <main>
        {children}
      </main>

      <footer>
        <div>
            <p>Footer lesgooooooooooooo</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
