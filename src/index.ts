import App from './app';

const port = App.get('port');
const host = App.get('host');

App.listen(port, host, () => {
    console.log(`Served at https://${host}:${port} port`)
});