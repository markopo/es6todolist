import { App } from './components/app';
import { Error } from './components/error';
import './styles/styles.css';



const appElem = document.getElementById('app');

if (appElem) {
    const app = new App(appElem);
} else {
    const divError = document.createElement('divError');
    const error = new Error();
    divError.innerHTML = error.render();
    document.body.appendChild(divError);
}



