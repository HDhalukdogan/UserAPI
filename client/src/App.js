import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { fetchCurrentUser } from 'store';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const initApp = useCallback(async () => {
        await dispatch(fetchCurrentUser());
    }, [dispatch])



    useEffect(() => {
        initApp()
    }, [initApp])


    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
