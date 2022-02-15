import React from 'react'

import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const JournalApp = () => {
    return (
        //Provider es higher-order comp y es como el UserContext.Provider, pero con Redux, el cual tiene la información, en este caso el store
        //y con esto terminamos de configurar el redux en la app
            
            <Provider store={ store }>
                <AppRouter />
            </Provider>

    )
}
