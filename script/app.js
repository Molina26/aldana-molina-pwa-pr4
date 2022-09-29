
if(navigator.serviceWorker) {
    const enviroment = window.location.href;
    const pathInit = enviroment.includes('localhost') ? '/sw.js' : 'https://molina26.github.io/aldana-molina-pwa-pr4/sw.js'
    
    navigator.serviceWorker.register(pathInit)
}