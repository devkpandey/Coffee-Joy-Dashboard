'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from "@/app/redux/store"

const ReduxProvider = ({children}) => {
  return (
    <div>
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  )
}

export default ReduxProvider
