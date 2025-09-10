import React from 'react'
import {WalletConnect} from "../../hooks/WalletConnect"

const Layout = () => {
  return (
    <div>
        <h2>Get token balance:</h2>
      <WalletConnect />
    </div>
  )
}

export default Layout
